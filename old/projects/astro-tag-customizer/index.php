<?php include ('../header.php'); ?> 	

<!--GLOBAL STYLESHEET-->
<link href="../../global.css" rel="stylesheet" type="text/css" />
    
    <div id="gray-hero" style="padding:0px;">
    		<div id="project-logo"><img src="images/astro-logo.png" class="project-logo" /></div>
    		<div id="project-header-title"><img src="images/header.png" class="project-header-title" /></div>
        	<div id="project-description" style="width:650px;">A proprietary product for one of gaming’s most reputable hardwear brands, Astro Gaming Speaker Tags are available for consumers to personalize through an online customizer.</div>
    		<div style="margin:auto;height:542px;width:959px;background:url(images/hero.png) no-repeat 0px 50px;"></div>
    </div>
    
    <!--CONTENT-->
    <div id="content">
    	
        <div id="research-section" style="border:0px solid red;">
        
        	<div id="section-icon" style="background:url(../images/research-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Research</div>
            <div id="section-text-middle" style="text-align:justify;">Speaker Tags are interchangeable plates that adorn Astro Gaming headsets from their magnetic attachments. These unique products can be personalized by Astro Gaming fans through an online customizer. Since there was already a customizer that existed, my job was to create an improved build and experience for those who wanted to create their own tag plates.</div>
            <div id="section-subtitle-large" style="margin:0 auto;padding:30px 0px 30px 0px;width:880px;border-top:1px solid black;border-bottom:0px solid black;text-align:center;">
            	<div style="display:block;padding:30px 0px 15px 0px;">Existing flaws</div>
                <div id="section-text-middle" style="padding:0px 0px 15px 0px;width:550px;font-weight:normal;">I started by analyzing the state of the current customizer. In addition to the findings below, I also evaluated existing customizers in the marketplace to leverage the design solutions and weaknesses that they presented.</div>
            </div>
        	
            <div style="clear:both;height:60px;"></div>
            
            <div style="margin:auto;height:2243px;width:880px;clear:both;background:url(images/diagram.png) no-repeat 0px 0px;">
                <div id="section-text">
                    <div id="section-text" style="float:right;margin:30px 90px 0px 0px;width:300px;text-align:justify;">
                        <div style="height:15px;"></div>
                        <font color="#ff2001"><b>Dated technology</b></font><br />
                        The initial customizer was built in Flash which is dated and flawed in a number of ways. With the responsive design and animation capabilities of HTML5 and CSS3, it was imperative to create this new build in a language that was easy to manage and communicated with the print vendor seamlessly.
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:left;margin:90px 0px 0px 15px;width:360px;font-size:12px;text-align:center;">
                        <font color="black"><b>The future is here but Flash didn't get the memo.</b></font><br />
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:left;margin:230px 0px 0px 0px;width:300px;text-align:justify;">
                        <div style="height:15px;"></div>
                        <font color="#ff2001"><b>Limited access points</b></font><br />
                        The existing architecture of the site restrained users from understanding the full spectrum of Astro Gaming’s product line and the Tag Customizer was no exception. The example above defaults A40 speaker tags over A30 or custom ones in the menu even though a user may not own an A40 headset. Optimizing and creating more access points to users would expose them to more relevant products.
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:right;margin:30px 15px 0px 0px;width:360px;font-size:12px;text-align:center;">
                        <font color="black"><b>Custom tags are buried behind the default tab which may not even be applicable to users if they don't own an A40 headset.</b></font><br />
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:right;margin:230px 90px 0px 0px;width:300px;text-align:justify;">
                        <div style="height:15px;"></div>
                        <font color="#ff2001"><b>Poor product education</b></font><br />
                        Not only were there limited ways to get to the Tag customizer but once users reached it, they were poorly informed on the product and the shopping process. There were several miscues from the start until completion.
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:left;margin:130px 0px 0px 15px;width:360px;font-size:12px;text-align:center;">
                        <font color="black"><b>Since we have 2 ears, it makes sense to want 3 tags right? The distinction is actually based on the headset type - one of which allows a detachable microphone. The 3rd tag enables the microphone attachment through an opening.</b></font><br />
                    </div>
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:left;margin:230px 0px 0px 0px;width:300px;text-align:justify;">
                        <div style="height:15px;"></div>
                        <font color="#ff2001"><b>Cumbersome interface</b></font><br />
                        The existing customizer exposed all of the available tools to the user up front at the expense of being simple and easy to use. Many users tended to be overwhelmed and frustrated.
                    </div>                    
                </div>
                <div style="clear:both;"></div>
                <div id="section-text">
                    <div id="section-text" style="float:right;margin:120px 15px 0px 0px;width:360px;font-size:12px;text-align:center;">
                        <font color="black"><b>Need instructions? Good luck customizing your tags...</b></font><br />
                    </div>
                </div>
                <div style="clear:both;height:270px;"></div>
                <div id="section-subtitle" style="margin:auto;width:800px;padding:0px 0px 60px 0px;text-align:center;">All of the information gathered made it easy to produce a tangible checklist for the project and helped lay the groundwork for the customizer architecture.</div>
            </div>
            
            <div style="clear:both;height:200px;"></div>
            
            <div id="section-subtitle" style="margin:0 auto;padding:15px 0px 15px 0px;width:880px;border-top:2px solid black;border-bottom:2px solid black;text-align:center;">Goals</div>
        	<div id="section-text" style="padding:30px 0px 0px 0px;color:#5c5c5c;border:0px solid red;">
            	<div style="width:250px;float:left;">
            	<ul class="red-squares">
                	<li style="height:40px;"><font color="black"><b>Improved system integration</b></font></li>
              		<li class="red-squares"><b>Integrate the customizer into the website to match the brand</b></li><br />
              		<li class="red-squares"><b>Establish more access points to the customizer throughout the website (ex: improved navigation, upsell opportunities)</b></li><br />
              	</ul>
                </div>
                <div style="width:250px;float:left;margin:0px 0px 0px 65px;">
                <ul class="red-squares">
                	<li style="height:40px;"><font color="black"><b>Form &amp; function enhancements</b></font></li>
              		<li class="red-squares"><b>Develop improved layout options, artwork, and usability</b></li><br />
              		<li class="red-squares"><b>Add ability to save designs and share via social media</b></li><br />
              		<li class="red-squares"><b>Design to accommodate localization for international countries</b></li><br />
              	</ul>
                </div>
                <div style="width:250px;float:right;">
                <ul class="red-squares">
                	<li style="height:40px;"><font color="black"><b>Solid engineering infrastructure</b></font></li>
              		<li class="red-squares"><b>Build in HTML 5 to enable responsive design and easier maintenance</b></li><br />
              		<li class="red-squares"><b>Speak with newly proposed print vendor to understand printing requirements</b></li><br />
              	</ul>
                </div>
            </div>
            
            
        </div>
        
        <div style="clear:both;height:3593px;"></div>
        
        <div id="brainstorm-section" style="height:3551px;">
        
        	<div id="section-icon" style="background:url(../images/brainstorm-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Brainstorm</div>
            <div id="section-text-middle" style="text-align:justify;">My initial step after performing an in-depth analysis on the existing customizer along with those in the marketplace was to outline the necessary features of the product which include those in the following list.</div>
        	<div id="section-subtitle-large" style="margin:0 auto;padding:15px 0px 15px 0px;width:880px;border-top:2px solid black;border-bottom:1px solid black;">Key elements</div>
        	<div id="section-text" style="height:250px;border-bottom:1px solid black;padding:30px 0px 30px 0px;font-size:14px;">
            	<div style="display:inline;width:250px;float:left;"><div id="red-text-header">1</div><font style="display:block;font-weight:bold;color:black;">A30's or A40's?</font>The first critical step for the user was to define their headset type in order to be matched with the properly sized speaker tags</div>
                <div style="margin:0px 0px 0px 65px;display:inline;width:250px;float:left;"><div id="red-text-header">2</div><font style="display:block;font-weight:bold;color:black;">Single base color or pattern</font>After our initial call with the printing vendor, their printing process required all tags to maintain the same base color or pattern for cost and print efficiency</div>
                <div style="margin:0px 0px 0px 65px;display:inline;width:250px;float:left;"><div id="red-text-header">3</div><font style="display:block;font-weight:bold;color:black;">Astro, featured, or custom</font>Beyond custom artwork, we also wanted to feature Astro or partner artwork like those from Ubisoft’s Assassin’s Creed franchise. It made it easier to categorize the options into these buckets so that the user could easily dictate what they wanted.</div>
            </div>
            <div id="section-text" style="height:250px;clear:both;border-bottom:2px solid black;padding:30px 0px 30px 0px;font-size:14px;">
            	<div style="display:inline;width:250px;float:left;"><div id="red-text-header">4</div><font style="display:block;font-weight:bold;color:black;">Text</font>In addition to artwork, we also wanted to provide the ability to add text. We ensured this was limited to strategic placements that would limit the obstruction of artwork - an important detail to our partner agreements.</div>
                <div style="margin:0px 0px 0px 65px;display:inline;width:250px;float:left;"><div id="red-text-header">5</div><font style="display:block;font-weight:bold;color:black;">Social</font>We wanted users to expose their artwork to their social spheres to not only display their work but also help promote the product.</div>
                <div style="margin:0px 0px 0px 65px;display:inline;width:250px;float:left;"><div id="red-text-header">6</div><font style="display:block;font-weight:bold;color:black;">Save</font>This enabled users to finish their designs at a later time. It would require users to create an account with Astro Gaming, increasing its number of registered and connected users.</div>
            </div>
            <div style="clear:both;margin:0 auto;width:950px;height:509px;background:url(images/laptop.png) no-repeat 254px 100px;">
            	<div id="section-text" style="float:left;margin:0px 0px 0px 35px;width:240px;text-align:justify;">
                	<div id="section-subtitle-large" style="margin:0 auto;padding:100px 0px 15px 0px;width:880px;">Connecting <br /> the pieces</div>
        			After understanding all of the critical elements involved in the customizer, I proceeded to diagram a flow that linked all of them together. This was developed in a way that seemed natural and intuitive for users to follow and efficiently deliver them the tags that they desired.
                </div>
            </div>
            
        </div>
        
        <div style="clear:both;height:1700px;"></div>
            
        <div id="wireframe-section">
            <div id="section-icon" style="background:url(../images/wireframe-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Quick iterative wireframes</div>
            <div id="section-text-middle" style="width:700px;text-align:center;">Since there are so many elements and steps involved in this extensive customizer, I went through several rounds of wireframes to help funnel it down to the concepts that made the most sense for users. Ideas slowly converged throughout this phase.</div>
            <div style="margin:0 auto;width:880px;height:604px;background:url(images/wireframes.png) no-repeat 0px 0px;"></div>
        </div>
        
        <div style="clear:both;height:930px;"></div>
        
        <div id="testing-section" style="height:3551px;">
        
        	<div id="section-icon" style="background:url(../images/testing-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">User testing</div>
            <div id="section-text-middle" style="width:700px;text-align:center;">When I felt that my wireframes had reached a point where they could deliver optimal results from our users, user testing always helped keep me modest.</div>
            <div style="height:30px;clear:both;"></div>
            <div id="section-text" style="width:884px;height:396px;background:url(images/testing-hero.png) no-repeat 0 0px;">
            	<div id="section-text-middle" style="float:right;margin:15px 0px 0px 0px;padding:30px 0px 30px 0px;border-top:0px solid black;border-bottom:0px solid black;width:450px;text-align:justify;">To gather feedback, I used a real-time mirroring software called LiveView. This program enabled me to stream my desktop onto any device. Users were provided a tablet for testing since this project was being designed for that device along with desktop web. Prior to testing, users were briefed to act "naturally" and to voice their actions and thought processes so that I could gather the appropriate feedback.</div>
        	</div>
            <div style="height:60px;clear:both;"></div>
            <table style="margin: 0 auto;width:880px;border-top:1px solid black;border-bottom:1px solid black;" cellpadding="0" cellspacing="0">
            	<tr>
                	<td colspan="2" style="border-bottom:1px solid black;">
                    <div id="section-subtitle-large" style="float:left;width:330px;padding:60px 0px 60px 0px;">Results</div>
                    <div id="section-text" style="float:right;width:517px;padding:60px 0px 60px 0px;">I went through a series of 8 tests to document all pain points that users were experiencing in my preliminary wireframes. The items below represent the notable feature requests and issues that were persistent amongst all users. After realizing this list, I implemented remedial design solutions into my wireframes.</div>
                    </td>
            	</tr>
                <tr>
                	<td style="border-bottom:1px solid black;"><div id="section-subtitle" style="float:left;width:150px;padding:15px 0px 15px 0px;">Issue</div></td>
                    <td style="border-left:1px solid black;border-bottom:1px solid black;">
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;color:#ff2001;border:0px solid red;font-weight:bold;">Duplicate artwork</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;color:#ff2001;border:0px solid red;font-weight:bold;">Mirror artwork</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;color:#ff2001;border:0px solid red;font-weight:bold;">Tag rotation</div>
                    <div id="section-text" style="float:left;width:153px;padding:15px 0px 15px 30px;color:#ff2001;border:0px solid red;font-weight:bold;">Contextual preview</div>
                    </td>
            	</tr>
                <tr>
                	<td style="height:185px;border-bottom:1px solid black;"><div id="section-subtitle" style="float:left;margin:-90px 0px 0px 0px;width:150px;padding:15px 0px 15px 0px;">Feedback</div></td>
                    <td style="height:185px;border-left:1px solid black;border-bottom:1px solid black;">
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">Since these tags were made to be worn on both ears, many users wanted to design them to match.</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">In addition to matching artwork on both tags, users also wanted the ability to flip the art so that the composition of both tags faced the same direction while they are worn.</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">Many users tended to have problems moving from one tag to the next during their design process.</div>
                    <div id="section-text" style="float:left;width:153px;padding:15px 0px 15px 30px;font-size:14px;">A lot of users expressed their desire to see how the tags actually looked on a headset.</div>
                    </td>
            	</tr>
                <tr>
                	<td><div id="section-subtitle" style="float:left;margin:-70px 0px 0px 0px;width:150px;padding:15px 0px 15px 0px;">Solution</div></td>
                    <td style="border-left:1px solid black;">
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">I enabled the option for users to copy and paste artwork from one of the other tags they had already designed.</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">I simply provided an abiilty to flip the artwork once a user is in edit mode.</div>
                    <div id="section-text" style="float:left;width:152px;padding:15px 0px 15px 30px;font-size:14px;">To help users move from one tag to the next, I provided extra tools including a slider bar and navigational arrows on the sides.</div>
                    <div id="section-text" style="float:left;width:153px;padding:15px 0px 15px 30px;font-size:14px;">I simply provided a preview feature which enabled users to see the tags on the headset from multiple angles.</div>
                    </td>
            	</tr>
            </table>
            
            <div style="height:60px;clear:both;"></div>
            <div id="section-text-middle" style="text-align:center;">
                Once the new wireframes were ready, I ran subsequent user tests to ensure that these issues were resolved. When I came to that realization, I then allowed myself onto the next step.
            </div>
            
        </div>
        
        <div style="clear:both;height:1660px;"></div>
        
        <div id="visuals-section">
        	<div id="section-icon" style="background:url(images/visual-icon.png) no-repeat 50% 0px;"></div>
            <div id="section-title">Visual design</div>
            <div id="section-text-middle" style="width:750px;text-align:center;">The language and visual design were delivered to match the Astro Gaming brand and UI style guide.</div>
            <div style="margin:0 auto;width:950px;">
             	<div style="width:950px;height:639px;background:url(images/visuals-1.png) no-repeat 0px 0px;">
            		<div id="section-subtitle" style="float:right;width:250px;margin:0px 35px 0px 0px;padding:150px 0px 0px 0px;">1st base</div>
                    <div id="section-subtitle-gray" style="clear:both;float:right;width:250px;margin:0px 35px 0px 0px;">Users start with a macro view of all tags and are prompted to apply a single base color pattern.</div>
            	</div>
                <div style="margin:0 auto;width:880px;height:597px;background:url(images/visuals-2.png) no-repeat 2px 0px;">
            		<div id="section-subtitle" style="float:left;padding:380px 0px 0px 0px;width:250px;">Extensive<br />editing tools</div>
                    <div id="section-subtitle-gray" style="clear:both;float:left;width:310px;">Users are exposed a variety of editing tools and guidelines to help them through their design. A tutorial is readily accessible if needed.</div>
            	</div>
                <div style="clear:both;height:60px;"></div>
                <div style="margin:0 auto;width:880px;height:639px;background:url(images/visuals-3.png) no-repeat 0px 0px;">
            		<div id="section-subtitle" style="float:right;width:250px;margin:0px 0px 0px 0px;padding:150px 0px 0px 0px;">Enhanced focus</div>
                    <div id="section-subtitle-gray" style="clear:both;float:right;width:250px;margin:0px 0px 0px 0px;">Users are now able to concentrate on designing one tag at a time.</div>
            	</div>
                <div style="margin:0 auto;width:880px;height:639px;background:url(images/visuals-4.png) no-repeat 263px 0px;">
            		<div id="section-subtitle" style="float:left;width:250px;margin:0px 0px 0px 0px;padding:150px 0px 0px 0px;">Guided options</div>
                    <div id="section-subtitle-gray" style="clear:both;float:left;width:250px;margin:0px 0px 0px 0px;">Users are provided an extensive freedom in designing their tags but also given guidelines to assist them in their design.</div>
            	</div>
                <div style="width:950px;height:728px;background:url(images/visuals-5.png) no-repeat 0px 0px;">
            		<div id="section-subtitle" style="float:right;width:250px;margin:0px 35px 0px 0px;padding:150px 0px 0px 0px;">Personalized</div>
                    <div id="section-subtitle-gray" style="clear:both;float:right;width:250px;margin:0px 35px 0px 0px;">The improved usability and feature options enable users to truly customize tags to match their personality.</div>
            	</div>
            </div>
        </div>
        
        <div style="clear:both;height:3700px;width:500px;"></div>
        
        <div id="fin">Fin<br /><a class="red-btn" href="http://makilaban.com/work.php">VIEW ALL WORK</a></div>
        
        <div id="footer-spacer"></div>
        
    </div>
    <!--CONTENT-->
    
<?php include ('../../footer.php'); ?> 	