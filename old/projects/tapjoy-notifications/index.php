<?php include ('../header.php'); ?> 	

<!--GLOBAL STYLESHEET-->
<link href="../../global.css" rel="stylesheet" type="text/css" />
    
    <div id="tapjoy-gray-hero">
    		<div id="project-logo"><img src="images/tapjoy-logo.png" class="project-logo" /></div>
    		<div id="project-header-title"><img src="images/header.png" class="project-header-title" /></div>
        	<div id="project-description">We needed a way to drive users back to tapjoy.com to earn more rewards and discover more apps. Naturally, notifications effectively increase engagement in other platforms so they were a logical solution.</div>
    		<div style="margin:auto;height:399px;width:880px;background:url(images/hero.png) no-repeat 50px 25px;"></div>
    </div>
    
    <!--CONTENT-->
    <div id="content">
    	
        <div id="research-section" style="border:0px solid red;">
        
        	<div id="section-icon" style="background:url(images/research-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Research</div>
            <div id="section-text"><div style="float:left;height:154px;width:425px;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;text-align:justify;overflow:hidden;">Tapjoy is a platform where users can discover new apps or earn virtual currency through various offer incentives such as an app download. After examining and analyzing the general user flow through the Tapjoy ecosystem, I realized the lack of confirmation or any re-engagement tool to bring the user back after they have successfully completed one of these offers. The diagram below is an example of a user earning</div></div>
        	<div id="section-text"><div style="float:right;width:425px;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;text-align:justify;">earning a reward by downloading a sponsored app. The user who opts to earn virtual currency through an incentivized app download must leave the system, enter the app store, download the app and finally run the app to earn their reward. After this sequence of events, its easy to forget why the app was downloaded in the first place.</div></div>
            <div id="section-subtitle" style="clear:both;margin:0 auto;padding:30px 0px 30px 0px;width:500px;text-align:center;">Notifications simply closed the loop and tied everything back to the user.</div>
        	<div style="margin:0 auto;padding:0px 0px 100px 0px;width:771px;height:685px;background:url(images/diagram-1.png) no-repeat 50px 0px;"></div>
            <div id="section-subtitle" style="margin:0 auto;padding:15px 0px 15px 0px;width:880px;border-top:2px solid black;border-bottom:2px solid black;text-align:center;">Goals &amp; scope</div>
        	<div id="section-text" style="color:#000;">
            	<div id="section-text-middle" style="padding: 30px 0px 0px 0px;">After realizing the potential impact of this feature, I sat down with the head of product to help define a list of what we wanted to accomplish in this project.</div>
            	<ul class="red-squares" style="padding:30px 0px 0px 0px;width:350px;">
              		<li class="red-squares"><b>Understand all types of offer completions that would result in a notification delivery</b></li><br />
              		<li class="red-squares"><b>Understand all possible actions beyond offer completions that could benefit from notifications</b></li><br />
              		<li class="red-squares"><b>Design a settings panel for users to control the frequency and delivery methods of their notifications</b></li><br />
              		<li class="red-squares"><b>Realize the frequency and delivery methods of all notifications based on the actions they stem from</b></li>
              	</ul>
            </div>
            
        </div>
        
        <div style="clear:both;height:1883px;"></div>
        
        <div id="brainstorm-section" style="height:3551px;">
        
        	<div id="section-icon" style="background:url(images/brainstorm-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Brainstorm</div>
            <div id="section-text-middle" style="text-align:justify;">We started off by defining all of the different offer types that a user can complete. This was critical to understand the nature of the action and the delivery method we wanted to provide to the user.</div>
        	<div id="section-subtitle-large" style="margin:0 auto;padding:15px 0px 15px 0px;width:880px;border-top:2px solid black;border-bottom:1px solid black;">Offer types</div>
        	<div id="section-text" style="height:250px;border-bottom:1px solid black;padding:30px 0px 0px 0px;font-size:14px;">
            	<div style="display:inline;width:150px;float:left;"><div id="red-text-header">1</div><font style="display:block;font-weight:bold;color:black;">Pay per install</font>Users must download and run a sponsored app</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">2</div><font style="display:block;font-weight:bold;color:black;">Cost per action</font>This required more commitment from the user such as a Netflix account sign-up</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">3</div><font style="display:block;font-weight:bold;color:black;">Pay per experience</font>This rewarded the user for in-app actions and performance such as level completion</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">4</div><font style="display:block;font-weight:bold;color:black;">Cost per click</font>A simple offer that requires users to visit a sponsored link</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">5</div><font style="display:block;font-weight:bold;color:black;">Video</font>Users are required to watch a video advertisement</div>
            </div>
            <div id="section-text" style="height:250px;clear:both;border-bottom:2px solid black;padding:30px 0px 0px 0px;font-size:14px;">
            	<div style="display:inline;width:150px;float:left;"><div id="red-text-header">6</div><font style="display:block;font-weight:bold;color:black;">Surveys</font>Users must complete a survey from an advertiser or publisher</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">7</div><font style="display:block;font-weight:bold;color:black;">Ecommerce</font>A user must complete an ecommerce transaction such as a gift card purchase</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">8</div><font style="display:block;font-weight:bold;color:black;">Calendar event</font>A user must add a sponsored event to their native mobile calendar such as a tv show time</div>
                <div style="margin:0px 0px 0px 32px;display:inline;width:150px;float:left;"><div id="red-text-header">9</div><font style="display:block;font-weight:bold;color:black;">SMS subscription</font>A user must opt in to subscribe through SMS news from an advertiser like Macy's</div>
            </div>
            <div style="clear:both;margin:0 auto;width:950px;height:509px;background:url(images/laptop.png) no-repeat 254px 100px;">
            	<div id="section-text" style="float:left;margin:0px 0px 0px 35px;width:240px;text-align:justify;">
                	<div id="section-subtitle-large" style="margin:0 auto;padding:100px 0px 15px 0px;width:880px;">Defining <br /> the system</div>
        			In addition to offer completions, we documented any other actions that may benefit from notifications including new app suggestions. After realizing all of the possible actions and the subsequent notifications they would receive, I proceeded to visualize everything through a diagram that mapped out the entire system.
                </div>
            </div>
            <div id="section-subtitle" style="margin:0 auto;padding:60px 0px 30px 0px;width:880px;text-align:center;">Mapping out all possible actions helped define where notifications made sense. Next we categorized them into one of the following delivery methods:</div>
        	<div id="section-text" style="width:880px;clear:both;padding:30px 0px 0px 0px;font-size:14px;text-align:justify;">
            	<div style="display:inline;width:240px;float:left;"><div class="circle-gray" style="background:url(images/channels.png) no-repeat 37px 33px;"></div><font style="display:block;margin:30px 0px 0px 0px;font-weight:bold;color:black;">Email</font>Its commonplace for people to check their emails first thing in the morning. That's why we reserved this channel as a tool to re-engage users who haven't been active by introducing them to new offers or personalized app discoveries.</div>
                <div style="margin:0px 0px 0px 80px;display:inline;width:240px;float:left;"><div class="circle-gray" style="background:url(images/channels.png) no-repeat -290px 30px;"></div><font style="display:block;margin:30px 0px 0px 0px;font-weight:bold;color:black;">Push</font>These notifications enable users to receive instant confirmation for offers they have completed. Since they tend to be more intrusive, we had to ensure users wouldn't become agitated by being mindful of the ouptput frequency. Power users who earn multiple rewards within a given time period would only receive one consolidated notification within that time frame.</div>
                <div style="margin:0px 0px 0px 80px;display:inline;width:240px;float:left;"><div class="circle-gray" style="background:url(images/channels.png) no-repeat -615px 33px;"></div><font style="display:block;margin:30px 0px 0px 0px;font-weight:bold;color:black;">Platform</font>This channel is built directly into a user's profile. It provides them with personalized offers and app news, daily app deals, and social updates or friend suggestions. It can even be used to instruct a user to finish completing an offer they might have left behind.</div>
        	</div>
            <div style="clear:both;height:100px;"></div>
            <div style="clear:both;margin:0 auto;width:880px;height:1700px;background:url(images/diagram-2.png) no-repeat 0px 275px;border-top:1px solid black;">
            	<div id="section-subtitle-large" style="margin:0 auto;padding-top:100px;width:500px;text-align:center;">Timing &amp; frequency</div>
                <div id="section-text-middle" style="text-align:justify;">
                	It was imperative to understand the nature of the action in order to provide a purposeful and relevant notification to the user. As you can see below, the type of notifications delivered are dependent upon a user’s actions.
                </div>
                <div id="section-text-middle" style="padding:1160px 0px 0px 0px;width:750px;text-align:center;">Lastly, users were also empowered to control what notifications they received through their settings panel.</div>
            </div>
            
        </div>
        
        <div style="clear:both;height:3752px;"></div>
            
        <div id="wireframe-section">
            <div id="section-icon" style="background:url(images/wireframe-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Quick iterative wireframes</div>
            <div id="section-text-middle" style="width:700px;text-align:center;">This step helped filter down to the models that best served the purpose. Copy was structured to be informative to the user and included a time stamp, action completed, reward earned, and action steps to re-engage the user.</div>
            <div style="margin:0 auto;width:880px;height:604px;background:url(images/wireframes.png) no-repeat 0px 0px;"></div>
        </div>
        
        <div style="clear:both;height:1049px;"></div>
        
        <div id="visuals-section">
        	<div id="section-icon" style="background:url(images/visual-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Visual design</div>
            <div id="section-text-middle" style="width:700px;text-align:center;">The language and visual design were delivered to match the Tapjoy brand and UI style guide.</div>
            <div style="margin:0 auto;width:880px;">
             	<div style="width:880px;height:595px;background:url(images/visuals-1.png) no-repeat 575px 0px;">
            		<div id="section-subtitle" style="padding:150px 0px 0px 0px;">Quick access</div>
                    <div id="section-subtitle-gray" style="float:left;width:440px;">A modal window enabled the user to quickly absorb new updates - giving them the option to take further action or proceed with their original intent.</div>
            	</div>
                <div style="margin:-100px 0px 0px 0px;width:880px;height:597px;background:url(images/visuals-2.png) no-repeat 0px 0px;">
            		<div id="section-subtitle" style="padding:200px 0px 0px 440px;width:440px;">Always available</div>
                    <div id="section-subtitle-gray" style="float:right;width:440px;">A dedicated page was designed to archive all notifications received. This enabled users to filter back through their history if they need to review any previous actions.</div>
            	</div>
                <div style="width:880px;height:597px;background:url(images/visuals-3.png) no-repeat 338px 0px;">
            		<div id="section-subtitle" style="padding:400px 0px 0px 0px;width:440px;">Brand recognition</div>
                    <div id="section-subtitle-gray" style="float:left;width:440px;">The discernible Tapjoy red, supporting gray tones, and flat design were integral to the overall look of the UI.</div>
            	</div>
            </div>
        </div>
        
        <div style="clear:both;height:2200px;width:500px;"></div>
        
        <div id="fin">Fin<br /><a class="red-btn" href="http://makilaban.com/work.php">VIEW ALL WORK</a></div>
        
        <div id="footer-spacer"></div>
        
    </div>
    <!--CONTENT-->
    
<?php include ('../../footer.php'); ?> 	