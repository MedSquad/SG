"use strict";

window.onload = function() {
    function() {
	var link = document.querySelector('link[rel="import"]');;
	var content = link.import;

	// HEAD
	document.body.appendChild(content.querySelector('#head').cloneNode(true));
    }();
};


