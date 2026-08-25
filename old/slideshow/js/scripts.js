$(document).ready(function() {
	$("#slideshow").css("overflow", "hidden");
	
	$("ul#slides").cycle({
		fx: 'fade',
		pause: 1,
		prev: '#prev',
		next: '#next'
	});
	
	$("#slideshow").hover(function() {
    	$("ul#slideshow-nav").fadeIn();
  	},
  		function() {
    	$("ul#slideshow-nav").fadeOut();
  	});
	
});