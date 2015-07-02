/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:true, browser:true, maxerr:50 */
/*global jQuery, WorkPage, console, define, window, document, _gaq*/

define([
	'underscore',
	'jquery'
], function (
	_,
	$
){
    'use strict';

    //defaults for use throughout the footer
    var _defaults = {
        
    };

    var PortfolioApp = function(){};

    /**
     * init
     * @return {[type]} [description]
     */
    PortfolioApp.prototype.init = function(customOptions){
        // deep extend defaults
        this.options = $.extend(true, {}, _defaults, customOptions);

        this.cacheElements();
        this.render();
        this.addListeners();
	};

    //cache variable that are used often through this js
    PortfolioApp.prototype.cacheElements = function() {
       
        this.$window = $(window);
        this.$document = $(document);
    };

    PortfolioApp.prototype.render = function() {
        
    };



    PortfolioApp.prototype.addListeners = function() {
        
    };

    //remove scroll listeners
    PortfolioApp.prototype.removeListeners = function() {
        
    };



	return new PortfolioApp();
});
