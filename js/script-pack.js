(function($){
	'use strict';

	var $win = $(window), $doc = $(document), $body_m = $('body'), $navbar = $('.navbar'), $num = $navbar.height();
	
	$body_m.attr('data-offset', $num);

	// Preloader
	var $preload = $('#preloader'), $loader = $('#loader');
	if ($preload.length > 0) {
		$win.on('load', function() {
			$loader.fadeOut(300);
			$body_m.addClass("loaded");
			$preload.delay(700).fadeOut(300);
		});
	}

	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () { 
		wwCurrent = winwidth(); 
	});

	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			
			if($scroll > $navm.top ){
				if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
			
		});
	}
	
	// OnePage Scrolling
	$('.navbar a[href*="#"]:not([href="#"]), .scroll[href*="#"]:not([href="#"])').on("click", function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var toHash = $(this.hash), toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false, nbar = (wwCurrent >= 992) ? $navbar.height() - 1 : 0;

			toHash = toHash.length ? toHash : toHashN;
			if (toHash.length) {
				$('html, body').animate({
					scrollTop: (toHash.offset().top - nbar)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $(".navbar-nav > li a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}
	$nav_link.addClass('nav-link');
	
	// Bootstrap Dropdown 
	var $dropdown_menu = $('.menu-item-has-children');
	$dropdown_menu.append('<span><i class="fa fa-angle-down"></i></span>');
	if ($dropdown_menu.length > 0 ) {
		$dropdown_menu.on("mouseover",function(){
			if ($win.width() > 991) {
				$('.sub-menu', this).not('.in .sub-menu').stop().fadeIn("400");
				$(this).addClass('open'); 
			}
		});
		$dropdown_menu.on("mouseleave",function(){
			if ($win.width() > 991) {
				$('.sub-menu', this).not('.in .sub-menu').stop().fadeOut("400");
				$(this).removeClass('open'); 
			}
		});
		$dropdown_menu.children('span').on("click",function(){
			if ($win.width() < 991) {
				$(this).prev().fadeToggle(400);
				$(this).toggleClass('open'); 
				return false;
			}
		});
		
	}
	// Nav collapse
	$('li:not(.menu-item-has-children) a').on("click",function() {
		if ($win.width() < 991) {
			$('.navbar-collapse').fadeOut('400');
			$('.navbar.enable').removeClass('enable');
		}
	});
	$win.on('resize', function() {
		
		$('.navbar-collapse').removeClass('in');
		$dropdown_menu.children('.sub-menu').fadeOut("400");

		// Nav collapse
		$('li:not(.menu-item-has-children) a').on("click",function() {
			if ($win.width() < 991) {
				$('.navbar-collapse').fadeOut('400');
				$('.navbar.enable').removeClass('enable');
			}
		});
		
	});
	

	// Select
	var $selectbox = $('select');
	if ($selectbox.length > 0) {
		$selectbox.select2();
	}
	
	// Count Down

	var $count_token = $('.token-countdown');
	if ($count_token.length > 0) {
		$count_token.each(function() {
			var $self = $(this), datetime = $self.attr("data-date"), tzone = $self.attr("data-zone"); 
			var $days = $self.attr("data-days"), $hours = $self.attr("data-hours"), $mins = $self.attr("data-mins"), $secs = $self.attr("data-secs");
			var $day = $self.attr("data-day"), $hour = $self.attr("data-hour"), $min = $self.attr("data-min"), $sec = $self.attr("data-sec");
			if(datetime){
				$self.countdown({
					date: datetime, // TODO Date format: 07/27/2017 17:00:00
					offset: tzone, // TODO Your Timezone Offset
					day: $day,
					days: $days,
					hour: $hour,
					hours: $hours,
					minute: $min,
					minutes: $mins,
					second: $sec,
					seconds: $secs
				});
			}
		});
		
	}

	var $count_s2 = $('.countdown-s2');
	if ($count_s2.length > 0) {
		$count_s2.each(function() {
			var $self = $(this), datetime = $self.attr("data-date"), tzone = $self.attr("data-zone"); 
			var $days = $self.attr("data-days"), $hours = $self.attr("data-hours"), $mins = $self.attr("data-mins"), $secs = $self.attr("data-secs");
			var $day = $self.attr("data-day"), $hour = $self.attr("data-hour"), $min = $self.attr("data-min"), $sec = $self.attr("data-sec");
			if(datetime){
				$self.countdown({
					date: datetime, // TODO Date format: 07/27/2017 17:00:00
					offset: tzone, // TODO Your Timezone Offset
					day: $day,
					days: $days,
					hour: $hour,
					hours: $hours,
					minute: $min,
					minutes: $mins,
					second: $sec,
					seconds: $secs
				});
			}
		});
		
	}
	
	//POPUP - Content
    $('.content-popup').magnificPopup({
        type: 'ajax',
        preloader: true,
		removalDelay: 400,
		fixedContentPos: true,
		mainClass: 'mfp-fade bg-team-exp',
		callbacks: {
			beforeOpen: function() { $('html').addClass('mfp-helper'); },
			close: function() { $('html').removeClass('mfp-helper'); }
		}
    });
	
	//POPUP - Video
	var $video_play = $('.video-play');
	if ($video_play.length > 0 ) {
		$video_play.magnificPopup({
			type: 'iframe',
			removalDelay: 160,
			preloader: true,
			fixedContentPos: false,
			callbacks: {
			beforeOpen: function() {
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
		});
	}
	
	//ImageBG
	var $imageBG = $('.imagebg');
	if ($imageBG.length > 0) {
		$imageBG.each(function(){
			var $this = $(this), 
				$that = $this.parent(),
				overlay = $this.data('overlay'),
				image = $this.children('img').attr('src');
			var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;
			
			// If image found
			if (typeof image!=='undefined' && image !==''){
				if (!$that.hasClass('has-bg-image')) {
					$that.addClass('has-bg-image');
				}
				if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
					if (!$that.hasClass('light')) {
						$that.addClass('light');
					}
				}
				$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
			}
		});
	}
	
	// Input Animation
	var $inputline = $('.input-line');
	if ($inputline.length > 0) {
		$inputline.each(function(){
			var $this = $(this);
			var $thisval = $(this).val();
			if($thisval.length > 0) {
				$this.parents('.input-field').addClass('input-focused');
			}
			$this.on('focus', function(){
				$this.parents('.input-field').addClass('input-focused');
			});
			$this.on('blur', function(){
				$this.parents('.input-field').removeClass('input-focused');
				var $afterblur = $(this).val();		
					if($afterblur.length > 0) {
					$this.parents('.input-field').addClass('input-focused');
				}
			});
			
		});
	}
	
	// On Scroll Animation
	var $aniKey = $('.animated');
	if($().waypoint && $aniKey.length > 0){
		$win.on('load', function() {
			$aniKey.each(function(){
			var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
			aniWay.waypoint(function(){
				aniWay.addClass("animated "+typ).css("visibility", "visible");
				if(dur){ 
					aniWay.css('animation-duration', dur+'s'); 
				}
				if(dly){ 
					aniWay.css('animation-delay', dly+'s'); 
				}
				}, { offset: '93%' });
			});
		});
	}
	
	// remove ani
	var $navtoggler = $('.navbar-toggler');
	if ($navtoggler.length > 0) {
		$navtoggler.on("click",function(){
			$('.remove-animation').removeClass('animated');
			$(this).next().stop().toggle('fade');
			$(this).parents('.navbar').stop().toggleClass('enable');
		});
	}

	//Process Slider
	var slider_p = '.slider-pane', slider_n = '.slider-nav,.slider-dot';
	if ($(slider_p).length > 0 ) {
		var c_rtl_s = ($body_m.hasClass('is-rtl')) ? true : false;
		$(slider_p).addClass('owl-carousel').owlCarousel({
		 	items:1,
			nav:false,
			dotsContainer:slider_n,
			margin:30,
			loop:true,
			autoplayTimeout:6000,
			rtl: c_rtl_s,
			autoplay:true,
			animateOut:'fadeOut',
			autoplayHoverPause:true
		});
	}

	//Carousel Roadmap
	var $roadmap_carousel = $('.roadmap-carousel');
	if ($roadmap_carousel.length > 0 ) {
		var c_rtl_r = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel.addClass('owl-carousel').owlCarousel({
			items:6,
			nav:false,
			dost:true,
			margin:30,
			rtl: c_rtl_r,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	
	
	//Carousel Roadmap
	var $roadmap_carousel_withnav = $('.roadmap-carousel-withnav');
	if ($roadmap_carousel_withnav.length > 0 ) {
		var c_rtl_rn = ($body_m.hasClass('is-rtl')) ? true : false;
		$roadmap_carousel_withnav.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:5,
			nav:true,
			dost:false,
			margin:30,
			rtl: c_rtl_rn,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:4,
				},
				1170 : {
					items:5,
				}
			}
		});
	}	

	//Carousel Prblm Sltn
	var $prblmsltn_list = $('.prblmsltn-list');
	if ($prblmsltn_list.length > 0 ) {
		var c_rtl_pl = ($body_m.hasClass('is-rtl')) ? true : false;
		$prblmsltn_list.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"],
			items:1,
            margin:30,
			nav:true,
			dost:false,
            autoplay:true,
            loop:true,
            animateOut: 'fadeOut',
            autoHeight: true,
			rtl: c_rtl_pl
		});
	}	

	//Carousel
	var $has_carousel = $('.has-carousel');
	if ($has_carousel.length > 0 ) {
		var c_rtl_c = ($body_m.hasClass('is-rtl')) ? true : false;
		$has_carousel.each(function(){
			var $self = $(this);
			var c_item = ($self.data('items')) ? $self.data('items') : 4;
			var c_item_t = (c_item >= 3) ? 2 : c_item;
			var c_item_m = (c_item_t >= 2) ? 1 : c_item_t;
			var c_delay =($self.data('delay')) ? $self.data('delay') : 6000;
			var c_auto =($self.data('auto')) ? true : false;
			var c_loop =($self.data('loop')) ? true : false;
			var c_dots = ($self.data('dots')) ? true : false;
			var c_navs = ($self.data('navs')) ? true : false;
			var c_ctr = ($self.data('center')) ? true : false;
			var c_mgn = ($self.data('margin')) ? $self.data('margin') : 30;
			$self.addClass('owl-carousel').owlCarousel({
				navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn, center: c_ctr,
				autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 300, rtl: c_rtl_c,
				responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
			});
		});
	}

	//Carousel
	var $timeline_carousel = $('.timeline-carousel');
	if ($timeline_carousel.length > 0 ) {
		var c_rtl = ($body_m.hasClass('is-rtl')) ? true : false;
		$timeline_carousel.addClass('owl-carousel').owlCarousel({
			navText: ["<i class='ti ti-angle-left'></i>","<i class='ti ti-angle-right'></i>"],
			items:6,
			nav:true,
			margin:30,
			rtl: c_rtl,
			responsive:{
				0 : {
					items:1,
				},
				400 : {
					items:2,
					center:false,
				},
				599 : {
					items:3,
				},
				1024 : {
					items:5,
				},
				1170 : {
					items:6,
				}
			}
		});
	}
	
	// particlesJS
	var $particles_js = $('#particles-js'), $particles_color = "#FFD700", $particles_color_alt = "#FFD700" ;
    if ($body_m.hasClass('io-zinnia')) { $particles_color = "#FFD700", $particles_color_alt = "#FFD700"; }
	if ($particles_js.length > 0 ) {
		particlesJS('particles-js',
		// Update your personal code.
		{
			"particles": {
			  "number": {
				"value": 160,
				"density": {
				  "enable": true,
				  "value_area": 800
				}
			  },
			  "color": {
				"value": $particles_color
			  },
			  "shape": {
				"type": "star",
				"stroke": {
				  "width": 0,
				  "color": "#000000"
				},
				"polygon": {
				  "nb_sides": 5
				},
				"image": {
				  "src": "img/github.svg",
				  "width": 100,
				  "height": 100
				}
			  },
			  "opacity": {
				"value": 1,
				"random": true,
				"anim": {
				  "enable": true,
				  "speed": 1,
				  "opacity_min": 0,
				  "sync": false
				}
			  },
			  "size": {
				"value": 3,
				"random": true,
				"anim": {
				  "enable": false,
				  "speed": 4,
				  "size_min": 0.3,
				  "sync": false
				}
			  },
			  "line_linked": {
				"enable": false,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			  },
			  "move": {
				"enable": true,
				"speed": 1,
				"direction": "none",
				"random": true,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
				  "enable": false,
				  "rotateX": 600,
				  "rotateY": 600
				}
			  }
			},
			"interactivity": {
			  "detect_on": "canvas",
			  "events": {
				"onhover": {
				  "enable": true,
				  "mode": "bubble"
				},
				"onclick": {
				  "enable": true,
				  "mode": "repulse"
				},
				"resize": true
			  },
			  "modes": {
				"grab": {
				  "distance": 400,
				  "line_linked": {
					"opacity": 1
				  }
				},
				"bubble": {
				  "distance": 250,
				  "size": 0,
				  "duration": 2,
				  "opacity": 0,
				  "speed": 3
				},
				"repulse": {
				  "distance": 400,
				  "duration": 0.4
				},
				"push": {
				  "particles_nb": 4
				},
				"remove": {
				  "particles_nb": 2
				}
			  }
			},
			"retina_detect": true
		  }
		// Stop here.
      );
	}

	//Back to top
	$(window).on("scroll", function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 500) {
			$('#back-to-top').addClass('show');
		}else{

			$('#back-to-top').removeClass('show');
		}
		
		$('#back-to-top').on('click', function(e) {
			e.preventDefault();
			$('html,body').stop(true).animate({
				scrollTop: 0
			}, 700);
		});
	});

	//Custom Tabs
	$( '.ot-tabs .vc_tta-tab' ).on( 'click', 'a', function( e ) {

        $( '.ot-tabs .vc_tta-tabs-list' ).find( '.vc_tta-tab' ).removeClass( 'vc_active' );
        $( this ).parent().addClass( 'vc_active' );
        var id = $( this ).attr( 'href' ).replace( '#', '' );
        $( '.ot-tabs .vc_tta-panels' ).find( '.vc_tta-panel' ).removeClass( 'vc_active').hide();
        $( '.ot-tabs .vc_tta-panels' ).find( '#' + id ).addClass( 'vc_active' ).show();

        return false;
    } );

	//Blog Carousel
    $(".blog-slide").owlCarousel({
		items: 1,
		singleItem: true,
		navigation: false,
		pagination: false,
		autoPlay: 5000
	});

	//Mask Section
	$('.io-azure .intro-section').append('<div class="mask-ov-left mask-ov-s1"></div>');
	$('.io-azure .why-choose').append('<div class="mask-ov-right mask-ov-s2"></div>');
	$('.io-azure .token-section').append('<div class="mask-ov-left mask-ov-s3"></div>');
	$('.io-azure .app-section').append('<div class="mask-ov-right mask-ov-s7"></div>');
	$('.io-azure .team-section').append('<div class="mask-ov-right mask-ov-s4"></div>');
	$('.io-azure .faq-section').append('<div class="mask-ov-left mask-ov-s5"></div>');
	$('.io-azure .contact-section').append('<div class="mask-ov-right mask-ov-s6"></div>');

	$('.icos-overlay').append('<div class="overlay-bars"><div class="overlay-bar-1"></div><div class="overlay-bar-2"></div><div class="overlay-bar-3"></div><div class="overlay-bar-4"></div><div class="overlay-bar-5"></div><div class="overlay-bar-6"></div><div class="overlay-bar-7"></div></div>');
	$('.banner-jasmine').prepend('<div class="background-shape"></div>');
	$('.banner-lungwort').prepend('<div class="background-shape bs-right"></div>');
	$('.bg-shape').append('<div class="background-shape bs-reverse"></div>');

	$('.overflow-s').append('<div class="overflow"></div>');
	$('.overflow-alt-s').append('<div class="overflow-alt"></div>');

	$('.io-zinnia .banner-rounded-bg').html('');
	$('.io-zinnia .banner .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-light ui-shape-header');
	$('.io-zinnia .shape-s1 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s1');
	$('.io-zinnia .shape-s2 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s2');
	$('.io-zinnia .shape-s3 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s3');
	$('.io-zinnia .shape-s4 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s4');
	$('.io-zinnia .shape-s5 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s5');
	$('.io-zinnia .shape-s6 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s6');
	$('.io-zinnia .shape-s7 .banner-rounded-bg').removeClass('banner-rounded-bg').addClass('ui-shape ui-shape-s7');
	
	if ($win.width() < 991) {
		$('.wpml-ls-item-toggle').on('click', function(){
			$(this).next().toggle();
			return false;
		});
	}
	
})(jQuery);
