(function($){	


	function Portfolio(customObject){
		//setup default attributes
		this.attr = {
			'$overlay': $('.loader-overlay'),
			'$carousel': $('.owl-carousel'),
			'$document': $(document),
			'$body': $('html,body'),
			'$navLinks': $('#portfolioMenu ul.menu a'),
			'$nav': $('nav.sticky')
		};

		this.init(customObject);
	}

	Portfolio.prototype.init = function(customObject){
		//overwriter default attributes with custom attributes
		this.attr = $.extend({}, this.attr, customObject);

		this.onRender();

		this.setupListeners();

		this.afterRender();
	}

	Portfolio.prototype.setupListeners = function(){
		this.setupScrollListener();

		// $(document).on('open.fndtn.reveal', '[data-reveal]', function(e){ 
		// 	console.log('open says a me: ', e);
		// 	var videoEl = $(e.target).find('#video'),
		// 		videoId;

		// 		console.log(videoEl);

		// 		debugger;

		// 	if(videoEl.length > 0){
		// 		videoId = videoEl.data('video-id');

		// 		console.log('videoId: ',videoId);
		// 	}
		// });
	}

	Portfolio.prototype.onRender = function(){

		this.attr.$document.foundation();

		this.heroModule();

		this.attr.$carousel.owlCarousel({
			'loop': true,
			'margin': 10,
			'nav': true
		});
	}

	//setup
	Portfolio.prototype.setupScrollListener = function(){
		var that = this;

		this.attr.$navLinks.click(function(e) { 
			// Prevent a page reload when a link is pressed
			e.preventDefault(); 
			// Call the scroll function
			that.smoothScroll(this.hash.substr(1));
		});
	}

	//scroll to id of nav item clicked
	Portfolio.prototype.smoothScroll = function(id){
		var that = this,
			navOffset = -1;
		// Remove "link" from the ID
		id = id.replace("link", "");
		// Scroll

		//custom write offset if sticky nav is fixed or not
		if(this.attr.$nav.hasClass('fixed')){
			if(id !== 'about'){
				navOffset = 75;
			}
		}
		else{
			if(id === 'about'){
				navOffset = 135;
			}
			else{
				navOffset = 150;
			}
		}

		this.attr.$body.animate({
			scrollTop: $("#"+id).offset().top - navOffset},
		500);
	}

	Portfolio.prototype.heroModule = function(){
		var percX, percY, tiltX, tiltY,
			oldMax = 100,
			oldMin = 0,
			newMax = 60,
			newMin = 40,
			ww = $( window ).width(),
			wh = $( window ).height(),
			$document = $(document);
			$hero = $('#portfolioHero'),
			heroHeight = $hero.outerHeight(),
			$title = $hero.find('.title')
			$heroBg = $hero.find('.heroBackground');


		if(window.mobilecheck()){
			if (window.DeviceOrientationEvent) {
				window.addEventListener('deviceorientation', function(eventData) {
					tiltX = eventData.gamma;
					tiltY = eventData.beta;

					if( tiltX && tiltY ){
						percX = ((tiltX + 90) / 180) * 100;
						percY = (Math.abs(tiltY) / 180) * 100;

						percX = (((percX - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
						percY = (((percY - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

						//$('#x').html(eventData.gamma);
						//$('#y').html(Math.floor(percY));

						$title.css({"background-position": percX + "%" + percY + "%"});
					}
					
				}, false);
			}
		}else{
			$document.mousemove(function(e){
				if(e.pageY <= heroHeight){
					//calculate background position based on mouse position
					percX = (e.pageX / ww) * 100;
					percY = (e.pageY / wh) * 100;

					percX = Math.round( ((((percX - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin) * 100 )/100;
					percY = Math.round( ((((percY - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin) * 100 )/100;
					$title.css({"background-position": percX + "% " + percY + "%"});

				}
			});
		}

		$(window).on('resize', function(){
			heroHeight = $hero.outerHeight();
		});

		// $document.scroll(function(){
		// 	var scrollDif = Math.round(($document.scrollTop() / heroHeight) * 100) / 100;
			
		// 	if(scrollDif < 1){
		// 		console.log($heroBg, 'grayscale('+scrollDif+')');
		// 		$heroBg.css({"-webkit-filter": 'grayscale('+scrollDif+')'});
		// 	}
		// });

	}

	Portfolio.prototype.afterRender = function(){
		//remove loader
		this.attr.$overlay.fadeOut();
	}

	var app = new Portfolio({});

}(jQuery));