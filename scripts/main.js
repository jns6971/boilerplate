// activate foundation js
$(document).foundation();


// Hero background js
$(document).ready(function(){
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

	// $document.scroll(function(){
	// 	var scrollDif = Math.round(($document.scrollTop() / heroHeight) * 100) / 100;
		
	// 	if(scrollDif < 1){
	// 		console.log($heroBg, 'grayscale('+scrollDif+')');
	// 		$heroBg.css({"-webkit-filter": 'grayscale('+scrollDif+')'});
	// 	}
	// });





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

	// $(".owl-carousel").owlCarousel({
	// 	'loop': true,
	// 	'margin': 10,
	// 	'nav': true,
	// 	responsive:{
	// 		0:{
	// 			'items':1
	// 		},
	// 		425:{
	// 			'items':2
	// 		},
	// 		768:{
	// 			'items':4
	// 		}
	// 	}
	// });


});

//add scroll jacker
$(function(){
	$('.scroll').click(function(){
		$('html,body').animate({
			'scrollTop': $('#target').offset().top
		},'500');
		return false;
	});
});


