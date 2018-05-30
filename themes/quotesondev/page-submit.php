<?php
/**
 * The template for displaying the submit a quote page.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

      <section>
  			<header class="page-header">
  				<?php
  					the_title( '<h1 class="page-title">', '</h1>' );
  				?>
  			</header><!-- .page-header -->

        <?php if(is_user_logged_in() && current_user_can('edit_posts')) : ?>
          <div class="quote-submission-wrapper">
            <form name="quoteForm" id="quote-submission-form">
              <div>
                <label for="quote-author">Author for Quote</label>
                <input type="text" name="quote_author" id="quote-author" required aria-required="true">
              </div>
              <div>
                <label for="quote">Quote</label>
                <input type="textarea" rows="3" cols="20" name="quote_content" id="quote-content" required aria-required="true">
              </div>
              <div>
                <label for="quote-source">Where did you find this quote? (e.g. book name)</label>
                <input type="text" name="quote_source" id="quote-source">
              </div>
              <div>
                <label for="quote-source-url">Provide the URL of the quote, if available</label>
                <input type="url" name="quote_source_url" id="quote-source-url">
              </div>
              <input type="submit" value="Submit Quote">
            </form>
            <!--success message upon submission-->
            <p class="submit-subbess-message" style="display: none"></p>

          </div><!--quote submission wrapper-->
        <?php else :?>
          <p>Sorry, you must be logged in to submit a quote!</p>
          <p><?php echo sprintf('<a href="%1s">%2s</a>', esc_url(wp_login_url()),
          'Click here to log in');?></p>
        <?php endif;?>
      </section>
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
