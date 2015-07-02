require.config({
	'baseUrl': '/scripts/lib',
	'paths': {
		'jquery' : 'jquery-1.11.0.min',
		'timelineMax': 'TimelineMax.min',
		'tweenMax': 'TweenMax.min',
		'gsap': 'jquery.gsap.min',
		'underscore': 'underscore-min',
		'underscoreTemplate': 'underscoreTemplateConfig',
		'portfolioApp' : '../portfolioApp'
	},
	'shim': {
		'underscore' : {},
		'underscoreTemplate': {},
		'gsap': {
			deps: ['jquery', 'timelineMax', 'tweenMax']
		}
	}
});

require(['underscore', 'jquery', 'portfolioApp', 'gsap', 'underscoreTemplate'], function(_, $, PortfolioApp) {
	'use strict';

	PortfolioApp.init({});
    
});