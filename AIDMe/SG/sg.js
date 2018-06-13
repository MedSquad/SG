"use strict";

window.onload = function() {
    function() {
	var link = document.querySelector('link[rel="import"]');;
	var content = link.import;

	// HEAD
	content.querySelectorAll('div').forEach( e => e.cloneNode(true));
    }();
};


