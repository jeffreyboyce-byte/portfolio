<?php include ('header.php'); ?> 	
    
    <!--CONTENT-->
    <div id="content">
    	
        <div id="contact-hdr-large">Please leave a</div>
		
        <div id="section-title" style="margin:-170px 0px 0px -5px;float:left;font-size:100px;display:block;text-align:left;">Message</div>
        
        <div id="text">
        
		<!--HIDE ERRORS-->
		<?php
        ini_set('display_errors',0);
        ?>
        <!--HIDE ERRORS-->
    
    	<?php
/*session_start();
/*******************************************************************************
*  Title: Easy PHP Contact Form
*  Version: 1.3 @ October 23, 2009
*  Author: Vishal P. Rao
*  Website: http://www.easyphpcontactform.com
********************************************************************************
*  COPYRIGHT NOTICE
*  Copyright 2009 Vishal P. Rao. All Rights Reserved.
*
*  This script may be used and modified free of charge by anyone
*  AS LONG AS COPYRIGHT NOTICES AND ALL THE COMMENTS REMAIN INTACT.
*  By using this code you agree to indemnify Vishal P. Rao or 
*  www.easyphpcontactform.com from any liability that might arise from 
*  it's use.
*
*  Selling the code for this program, in part or full, without prior
*  written consent is expressly forbidden.
*
*  Obtain permission before redistributing this software over the Internet
*  or in any other medium. In all cases copyright and header must remain
*  intact. This Copyright is in full effect in any country that has
*  International Trade Agreements with the India
*
*  Removing any of the copyright notices without purchasing a license
*  is illegal! 
*******************************************************************************/

/*******************************************************************************
 *	Script configuration - Refer README.txt
*******************************************************************************/

/* Email address where the messages should be delivered */
$to = 'jeffrey@makilaban.com';

/* From email address, in case your server prohibits sending emails from addresses other than those of your 
own domain (e.g. email@yourdomain.com). If this is used then all email messages from your contact form will appear 
from this address instead of actual sender. */
$from = '';

/* This will be appended to the subject of contact form message */
$subject_prefix = 'Makilaban Website Contact';

/* Form header file */
/*$header_file = 'form-header.php';

/* Form footer file */
/*$footer_file = 'form-footer.php';

/* Form width in px or % value */
$form_width = '530px';

/* Form background color */
$form_background = '';

/* Form border color */
$form_border_color = '#CCCCCC';

/* Form border width */
$form_border_width = '0px';

/* Form border style. Examples - dotted, dashed, solid, double */
$form_border_style = 'solid';

/* Form cell padding */
$cell_padding = '5px';

/* Form left column width */
$left_col_width = '15%';

/* Form font size */
$font_size = '13px';

/* Empty/Invalid fields will be highlighted in this color */
$field_error_color = '#FF0000';

/* Thank you message to be displayed after the form is submitted. Can include HTML tags. Write your message 
between <!-- Start message --> and <!-- End message --> */
$thank_you_message = <<<EOD
<!-- Start message -->
<p>Thank you for your inquiry. We'll get back to you as soon as we can.</p><br /><br /><br /><br /><br /><br /><br /><br />
<!-- End message -->
EOD;

/* URL to be redirected to after the form is submitted. If this is specified, then the above message will 
not be shown and user will be redirected to this page after the form is submitted */
/* Example: $thank_you_url = 'http://www.yourwebsite.com/thank_you.html'; */

$thank_you_url = '';

/*******************************************************************************
 *	Do not change anything below, unless of course you know very well 
 *	what you are doing :)
*******************************************************************************/

$name = array('Name','name',NULL,NULL);
$email = array('Email','email',NULL,NULL,NULL);
$subject = array('Subject','subject',NULL,NULL);
$message = array('Message','message',NULL,NULL);
$code = array('Code','captcha_code',NULL,NULL,NULL);

$error_message = '';

if (!isset($_POST['submit'])) {

  showForm();

} else { //form submitted

  $error = 0;
  
  if(!empty($_POST['name'])) {
  	$name[2] = clean_var($_POST['name']);
  	if (function_exists('htmlspecialchars')) $name[2] = htmlspecialchars($name[2], ENT_QUOTES);
  }
  else {
    $error = 1;
    $name[3] = 'color:#FF0000;';
  }
  
  if(!empty($_POST['email'])) {
  	$email[2] = clean_var($_POST['email']);
  	if (!validEmail($email[2])) {
  	  $error = 1;
  	  $email[3] = 'color:#FF0000;';
  	  $email[4] = '<strong><span style="color:#FF0000;">Invalid email</span></strong>';
	  }
  }
  else {
    $error = 1;
    $email[3] = 'color:#FF0000;';
  }
  
  if(!empty($_POST['subject'])) {
  	$subject[2] = clean_var($_POST['subject']);
  	if (function_exists('htmlspecialchars')) $subject[2] = htmlspecialchars($subject[2], ENT_QUOTES);  	
  }
  else {
  	$error = 1;
    $subject[3] = 'color:#FF0000;';
  }  

  if(!empty($_POST['message'])) {
  	$message[2] = clean_var($_POST['message']);
  	if (function_exists('htmlspecialchars')) $message[2] = htmlspecialchars($message[2], ENT_QUOTES);
  }
  else {
    $error = 1;
    $message[3] = 'color:#FF0000;';
  }    

  if(empty($_POST['captcha_code'])) {
    $error = 1;
    $code[3] = 'color:#FF0000;';
  } else {
  	include_once "securimage.php";
		$securimage = new Securimage();
    $valid = $securimage->check($_POST['captcha_code']);

    if(!$valid) {
      $error = 1;
      $code[3] = 'color:#FF0000;';   
      $code[4] = '<strong><span style="color:#FF0000;">Incorrect code</span></strong>';
    }
  }

  if ($error == 1) {
    $error_message = '<span style="font-weight:bold;font-size:90%;color:#ff2001;">Please correct / enter field(s) in red.</span>';

    showForm();

  } else {
  	
  	if (function_exists('htmlspecialchars_decode')) $name[2] = htmlspecialchars_decode($name[2], ENT_QUOTES);
  	if (function_exists('htmlspecialchars_decode')) $subject[2] = htmlspecialchars_decode($subject[2], ENT_QUOTES);
  	if (function_exists('htmlspecialchars_decode')) $message[2] = htmlspecialchars_decode($message[2], ENT_QUOTES);  	
  	
    $message = "$name[0]: $name[2]\r\n$email[0]: $email[2]\r\n\r\n$message[0]:\r\n$message[2]\r\n";
    
    if (!$from) $from_value = $email[2];
    else $from_value = $from;
    
    $headers = "From: $from_value" . "\r\n" . "Reply-To: $email[2]";
    
    mail($to,"$subject_prefix - $subject[2]", $message, $headers);
    
    if (!$thank_you_url) {
    
      include $header_file;
      echo $GLOBALS['thank_you_message'];
      echo "\n";
      include $footer_file;
	  }
	  else {
	  	header("Location: $thank_you_url");
	  }
       	
  }

} //else submitted



function showForm()

{
global $name, $email, $subject, $message, $code, $header_file, $footer_file, $form_width, $form_background, $form_border_color, $form_border_width, $form_border_style, $cell_padding, $left_col_width, $font_size; 	
include $header_file;
echo $GLOBALS['error_message'];  
echo <<<EOD

<form method="post" class="cForm" style="margin:0px 0px 0px -3px;">
<table style="width:{$form_width}; background-color:{$form_background}; border:{$form_border_width} {$form_border_style} {$form_border_color}; padding:0px 10px 10px 0px; font-size:{$font_size};" class="contactForm">
<tr>
<td colspan="2">For any inquiries please enter the following fields and then click the send button.  I do my best to reply within 24 hours.</td>
</tr>
<tr>
<td style="height:20px;"></td>
</tr>
<tr>
<td colspan="2" style="text-align:left; vertical-align:middle; padding:{$cell_padding}; font-size:90%; font-weight:bold;color:#ff2001;font-style:italic;">*All fields are required.</td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding}; font-weight:normal; color:black; {$name[3]}">{$name[0]}</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><input type="text" name="{$name[1]}" value="{$name[2]}" /></td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding}; font-weight:normal; color:black; {$email[3]}">{$email[0]}</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><input type="text" name="{$email[1]}" value="{$email[2]}" /> {$email[4]}</td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding}; font-weight:normal; color:black; {$subject[3]}">{$subject[0]}</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><input type="text" name="{$subject[1]}" value="{$subject[2]}" size="40" /></td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding}; font-weight:normal; color:black; {$message[3]}">{$message[0]}</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><textarea name="{$message[1]}" cols="40" rows="6">{$message[2]}</textarea></td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding};">&nbsp;</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><img id="captcha" src="securimage_show.php" alt="CAPTCHA Image" /></td>
</tr>
<tr>
<td style="width:{$left_col_width}; text-align:left; vertical-align:top; padding:{$cell_padding}; font-weight:normal; color:black; {$code[3]}">{$code[0]}</td>
<td style="text-align:left; vertical-align:top; padding:{$cell_padding};"><input type="text" name="{$code[1]}" size="10" maxlength="5" /> {$code[4]}
<br /><br />(Please enter the text in the image above. Text is not case sensitive.)<br />
<a class="link" href="#" onclick="document.getElementById('captcha').src = 'securimage_show.php?' + Math.random(); return false">Click here if you cannot recognize the code.</a>
</td>
</tr>
<tr>
<td colspan="2" style="text-align:left; vertical-align:middle; padding:{$cell_padding};"><input class="submit" type="submit" name="submit" value="SEND"  /></td>
</tr>
</table>
</form>
EOD;

include $footer_file;
}

function clean_var($variable) {
    $variable = strip_tags(stripslashes(trim(rtrim($variable))));
  return $variable;
}

/**
Email validation function. Thanks to http://www.linuxjournal.com/article/9585
*/
function validEmail($email)
{
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex)
   {
      $isValid = false;
   }
   else
   {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
         // local part length exceeded
         $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
         // domain part length exceeded
         $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
         // local part starts or ends with '.'
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
         // local part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
         // character not valid in domain part
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
         // domain part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/', str_replace("\\\\","",$local)))
      {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local)))
         {
            $isValid = false;
         }
      }
      if ($isValid && function_exists('checkdnsrr'))
      {
      	if (!(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A"))) {
         // domain not found in DNS
         $isValid = false;
       }
      }
   }
   return $isValid;
}


?>
            
        </div>
        <!--ABOUT-->
        
        <div id="footer-spacer"></div>
        
    </div>
    <!--CONTENT-->
    
<?php include ('footer.php'); ?> 	