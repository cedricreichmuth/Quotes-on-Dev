(function($) {
  'use strict';

/**
*Ajax based random post fetching
*/
  $(function quoteGenerate(){
    $('#new-quote-button').on('click', function (event){
      event.preventDefault();
      var lastPage = window.location.href; //stores current url for popstate to go back to
      $.ajax({
        method: 'get',
        url: api_vars.rest_url + 'wp/v2/posts/?filter[orderby]=rand&filter[posts_per_page]=1'
      }).done(function(data){
        //ajax request randomizes fetching of posts
        //removes the old article, appends a new one with unique id and fills it with the content, title and source(if there is)
        var postid = 'post-' + data[0].id;
        $('article').remove();
        $('.site-main').prepend('<article></article>')
        $('article').attr('id', postid);
        $('article').append(data[0].content.rendered);
        $('article').append('<div class="entry-meta"><h2 class="title">-- ' + data[0].title.rendered) + '</h2></div>';
        if(data[0]._qod_quote_source_url && data[0]._qod_quote_source){
          $('.entry-meta').append('<span class="source"><a href="' + data[0]._qod_quote_source_url + '">' + data[0]._qod_quote_source + '</a></span>');
        } else if(data[0]._qod_quote_source){
          $('.entry-meta').append('<span class="source">' + data[0]._qod_quote_source + '</span>');
        } else{
          $('.entry-meta .source').remove();
        }
        //makes the browser memorize posts in the history
        var url = api_vars.home_url + '/' + data[0].slug;
        console.log();
        history.pushState(null, null, url);
        });
        //navigates back to previous url
        $(window).on('popstate', function() {
          window.location.replace(lastPage);
        });
      });

    });

  /**
  *Ajax based front-end post submission
  */
  $(function quoteSubmit(){
    $('#quote-submission-form').on('submit', function (event){
      event.preventDefault();
      var author = $('#quote-author').val();
      var content = $('#quote-content').val();
      var source = $('#quote-source').val();
      var sourceUrl = $('#quote-source-url').val();
      //stores data from inputs in variables^
      $.ajax({
        method: 'post',
        url: api_vars.rest_url + 'wp/v2/posts/',
        data: {
          'title': author,
          'content': content,
          '_qod_quote_source': source,
          '_qod_quote_source_url': sourceUrl
          //defines which data we want to post to the db^
        }, beforeSend: function(xhr) {
         xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
         //verifies user is authorized to post^
      }
    }).done (function(){
      $('#quote-submission-form').trigger('reset');
      $('#quote-submission-form').css('display', 'none');
      $('.submit-success-message').css('display', 'block');
      $('#submit-another-quote').css('display', 'block');
      $('#submit-another-quote').on('click', function(){
        $('#quote-submission-form').css('display', 'block');
        $('.submit-success-message').css('display', 'none');
        $('#submit-another-quote').css('display', 'none');
        //resets and hides form, shows success message and button to reopen form
      });
    });
    });
  });
})(jQuery);
