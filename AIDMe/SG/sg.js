"use strict";

var app = {};

window.onload = function() {
	let asnum = function(s) {
	    let n = Number(s);
	    return (Number.isNaN(n) ? 0 : n);
	}

	let header = ['',
    '<div id="head"></div>',
    '<div id="menu">',
	'<div class="header">',
	    '<div><a href="manual.html">Manual</a></div>',
	    '<div><a href="">Literatura</a></div>',
	    '<div><a href="contacto.html">Contacto</a></div>',
	'</div>',
	'<img src="burger.svg">',
    '</div>',
    '<div id="mylogo"><a href="index.html"><img src="logoSGI.svg"></a></div>',
    '<div id="cart" class="center"><a href="comprar.html"><label></label><img src="empty-cart.svg"></a> </div>'
	].join('');

	document.body.insertAdjacentHTML('afterbegin', header);
	let PZ = document.getElementById('cart').firstChild.firstChild;

	if (sessionStorage.length > 0) {
	    let count = 0;
	    for(let i = 0; i < sessionStorage.length; i++) {
		let k = sessionStorage.key(i);
		count += asnum(sessionStorage.getItem(k));
	    }
	    PZ.textContent = count;
	}

	app.asnum = asnum;
	app.PZ = PZ;
};

