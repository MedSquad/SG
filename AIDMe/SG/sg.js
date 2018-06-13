"use strict";

var myapp = {};

window.onload = function() {

    const DIVS = document.querySelectorAll('div.myhead > div');

    myapp.displayMenu = function() {
	DIVS.forEach( div => { div.style.visibility = 'visible'; } );
    };
};


