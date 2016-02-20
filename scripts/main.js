$(document).foundation();

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
		$title = $hero.find('.title');


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
			if(e.pageY <= $hero.outerHeight()){
				percX = (e.pageX / ww) * 100;
				percY = (e.pageY / wh) * 100;

				percX = (((percX - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
				percY = (((percY - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

				$title.css({"background-position": percX + "%" + percY + "%"});
			}
		});
	}
});
