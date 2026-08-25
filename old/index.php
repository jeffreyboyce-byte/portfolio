<?php include ('header.php'); ?> 	

<!--PARALLAX SOURCE FILES-->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script type="text/javascript" src="parallax-scripts/jquery.parallax-1.1.3.js"></script>
<script type="text/javascript" src="parallax-scripts/jquery.localscroll-1.2.7-min.js"></script>
<script type="text/javascript" src="parallax-scripts/jquery.scrollTo-1.4.2-min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('#grid').parallax("50%", 0.1);
	$('.bg').parallax("50%", 0.4);
	$('#about-section').parallax("50%", 0.1);
	$('.smoker').parallax("50%", 0.1);
})
</script>
<!--PARALLAX SOURCE FILES-->

<!--REQUIRED FOR WORDPRESS RECENT POSTS-->
<?php
// Include Wordpress 
define('WP_USE_THEMES', false);
require('blog/wp-load.php');
?>  
<!--REQUIRED FOR WORDPRESS RECENT POSTS-->
    
    <!--HERO-->
	<!--grid-->
	<div id="grid" style="background-position: 50% 10px;">
		<div class="story">
        	<div class="bg" style="background-position: 50% 40px;"></div>
	    	<div class="float-right">
	            <h2>MAKILABAN</h2>
	            <p class="hero" style="width:500px;">Welcome to the design studio of Jeffrey Boyce. <br />I am a multidiscplinary UX designer who enjoys working on products that strongly overlap the digital and physical space.<br /><a class="red-btn" href="about.php" style="padding:8px 40px 8px 40px;">READ MORE</a></p>
	        </div>
	    </div> <!--.story-->
	    
	</div> 
    <!--#grid-->
    <!--HERO-->
    
    <!--CONTENT-->
    <div id="content">
    	
        <!--BLOG-->
        <div id="blog-hdr">BLOG</div>
        
        <div id="blog-posts">
        	
            <!--POST 1-->
        	<div id="post-1">
        	    
				  <?php query_posts('showposts=1'); ?>
                  <!--VALUES TO CHANGE WHICH POSTS TO SHOW-->
                  <?php $posts = get_posts('numberposts=1&offset=0'); foreach ($posts as $post) : start_wp(); ?>
                  <?php static $count1 = 0; if ($count1 == "1") { break; } else { ?>
                  
                  <div id="blog-title"><?php the_title(); ?></div>
                  <div class="post-preview"><?php the_content(); ?></div>
                  
                  <?php $count1++; } ?>
                  
                   <p class="links" style="margin:20px 0px 0px 0px;"><a class="read-more" href="<?php the_permalink(); ?>">Read More</a></p>
                   
                  <?php endforeach; ?>
            	
            </div>
            <!--POST 1-->
            <!--POST 2-->
        	<div id="post-2">
            
				  <?php query_posts('showposts=1'); ?>
                  <!--VALUES TO CHANGE WHICH POSTS TO SHOW-->
                  <?php $posts = get_posts('numberposts=1&offset=1'); foreach ($posts as $post) : start_wp(); ?>
                  <?php static $count2 = 0; if ($count2 == "1") { break; } else { ?>
                  
                  <div id="blog-title"><?php the_title(); ?></div>
                  <div class="post-preview"><?php the_content(); ?></div>
                  
                  <?php $count1++; } ?>
                  
                   <p class="links" style="margin:20px 0px 0px 0px;"><a class="read-more" href="<?php the_permalink(); ?>">Read More</a></p>
                   
                  <?php endforeach; ?>
            
			</div>
            <!--POST 2-->
            <!--POST 3-->
        	<div id="post-3">
            
				  <?php query_posts('showposts=1'); ?>
                  <!--VALUES TO CHANGE WHICH POSTS TO SHOW-->
                  <?php $posts = get_posts('numberposts=1&offset=2'); foreach ($posts as $post) : start_wp(); ?>
                  <?php static $count3 = 0; if ($count3 == "1") { break; } else { ?>
                  
                  <div id="blog-title"><?php the_title(); ?></div>
                  <div class="post-preview"><?php the_content(); ?></div>
                  
                  <?php $count1++; } ?>
                  
                   <p class="links" style="margin:20px 0px 0px 0px;"><a class="read-more" href="<?php the_permalink(); ?>">Read More</a></p>
                   
                  <?php endforeach; ?>
            
			</div>
            <!--POST 3-->
          
        </div>
        
        <a class="red-btn" style="float:right;" href="http://makilaban.com/blog">VIEW ALL POSTS</a>
    	<!--BLOG-->
        
        <div style="clear:both;"></div>
        <!--WORK-->
        <div id="pencil"></div>
        
        <div>
			<div id="work-hdr">WORK</div>
            
            <div id="thumbs" style="margin:-11px 0px 0px 0px;">
                <div id="work-thumb"><a class="thumb" href="projects/astro-tag-customizer"><span class="title-hover"><p class="title">Astro Gaming<br />Tag Customizer</p></span><img class="project-thumb" src="projects/astro-tag-customizer/images/thumb.jpg" /></a></div>
                <div id="work-thumb-2"><a class="thumb" href="projects/astro-firmware-updater"><span class="title-hover"><p class="title">Astro Gaming<br />Firmware Updater</p></span><img class="project-thumb" src="projects/astro-firmware-updater/images/thumb.jpg" /></a></div>
                <div id="work-thumb-3"><a class="thumb" href="projects/astro-checkout-process"><span class="title-hover"><p class="title">Astro Gaming<br />Checkout Process</p></span><img class="project-thumb" src="projects/astro-checkout-process/images/thumb.jpg" /></a></div>
            </div>
            
            <div style="clear:both;"></div>
            
            <div id="thumbs" style="margin:0px 0px 0px 0px;">
                <div id="work-thumb"><a class="thumb" href="projects/tapjoy-birthday-selector/index.php"><span class="title-hover"><p class="title">Tapjoy<br />Birthday Selector</p></span><img class="project-thumb" src="projects/tapjoy-mobile-calendar/images/thumb.jpg" /></a></div>
                <div id="work-thumb-2"><a class="thumb" href="projects/tapjoy-settings"><span class="title-hover"><p class="title">Tapjoy User Settings</p></span><img class="project-thumb" src="projects/tapjoy-settings/images/thumb.jpg" /></a></div>	
                <div id="work-thumb-3"><a class="thumb" href="projects/tapjoy-notifications/index.php"><span class="title-hover"><p class="title">Tapjoy<br />Notification System</p></span><img class="project-thumb" src="projects/tapjoy-notifications/images/thumb.jpg" /></a></div>
            </div>
           
            <a class="red-btn" style="margin:10px 0px 0px 0px;float:right;" href="work.php">VIEW ALL WORK</a><br />
            
            <div style="clear:both;"></div>            
           
		</div>
        <!--WORK-->
        
        <!--ABOUT-->
        
        <div id="gray">
        </div>
        
        <div id="about-section">
		<div class="about-elements">
        	<div class="smoker"></div>
	    	<div class="float-right" style="margin:60px 0px 0px 0px;">
	            <h3>ABOUT</h3>
	            <p>Makilaban is the design studio of Jeffrey Perona Boyce. Originally created as a cultural exploration project, it has evolved into a design studio that works on a variety of client and studio projects. I am a UX designer who lives in the beautiful city of San Francisco, California.<a class="red-btn" href="about.php">READ MORE</a></p>
	        </div>
	    </div> <!--.story-->
	    </div> 
        
        <!--ABOUT-->
        
    </div>
    <!--CONTENT-->
    <div style="clear:both;height:585px;"></div>
    <?php include ('footer.php'); ?> 	