$(document).ready(function(){
	
	if (window.location.hash) {
		var hash = window.location.hash;
		if ($(hash).length) {
			$('html, body').animate({
				scrollTop: $(hash).offset().top-55
			}, 300, 'swing');
		}
	}
	
	var windowWidth = $( window ).width();
	
	// Same Page Anchor Scroll Navigation
	$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	  // On-page links
	  if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
		&&
		location.hostname == this.hostname
	  ) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

		if (target.length) {
		  // Only prevent default if animation is actually gonna happen
		  event.preventDefault();
		  $('html, body').animate({
			scrollTop: target.offset().top-50
		  }, 1000 );
		}
	  }
	});
	
	// Landingpage Animation
	if( $("body.landing").length != 0 ){
		var animationfile = $('#duckdbdanimationcircled').attr('data-animation');
		let duckDBcircled = document.getElementById('duckdbdanimationcircled');	
		let animationduckDBcircled = lottie.loadAnimation({
				container: duckDBcircled,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: animationfile
		});
		$('#duckdbdanimationcircled').mouseenter(function() {
			animationduckDBcircled.play();
			animationduckDBcircled.setDirection(1)
		})
		$('#duckdbdanimationcircled').mouseleave(function() {
			animationduckDBcircled.play();
			animationduckDBcircled.setDirection(-1)
		})
	}
	
	// Team foldable
	if ($(".teammembers").length != 0) {
		var $firstSix = $('.teammembers .member:lt(6)');
		var $remaining = $('.teammembers .member:gt(5)');
		$remaining.hide(); // Nur die restlichen Teammitglieder ausblenden
	
		var $showAllButton = $('<div>').addClass('button white showall').text('Show all');
		$('.teammembers').after($showAllButton);
	
		$showAllButton.on('click', function() {
			$(this).fadeOut();
			$remaining.slideDown(200);
		});
	}


	// Mobile Menu
	var hamburgers = document.querySelectorAll(".hamburger");
	if ($('.hamburger').length > 0) {
		$('.hamburger').click(function(){
			$(this).toggleClass('is-active');
			$('.headerline nav').toggleClass('slidein');
			$('body main').toggleClass('inactive');
		})
	}
	$('.headerline nav ul.menu li').click(function(){
		$('.hamburger').toggleClass('is-active');
		$('.headerline nav').toggleClass('slidein');
		$('body main').toggleClass('inactive');
	})
	
	// Contact Form AJAX 
	$("#ajaxForm").submit(function(e){
		e.preventDefault();
		var action = $(this).attr("action");
		
		$('#ajaxForm button[type="submit"]').hide();
		$('#ajaxForm .lds-ellipsis').fadeIn();
		
		$.ajax({
			type: "POST",
			url: action,
			crossDomain: true,
			data: new FormData(this),
			dataType: "json",
			processData: false,
			contentType: false,
			headers: {
				"Accept": "application/json"
			}
		}).done(function() {
			$('#ajaxForm').addClass('inactive');
			$('#ajaxForm .lds-ellipsis').hide();
			$('.success').addClass('is-active');
		}).fail(function() {
			alert('An error occurred! Please try again later.');
			$('#ajaxForm button[type="submit"]').show();
			$('#ajaxForm .lds-ellipsis').hide();
		});
		
	});
	
	
});