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
	    '<div><a href="descripcion.html">Descripci&oacute;n</a></div>',
	    '<div><a href="manual.html">Manual</a></div>',
	    '<div><a href="">Literatura</a></div>',
	    '<div><a href="contacto.html">Contacto</a></div>',
	'</div>',
	'<img src="burger.svg" class="icon">',
    '</div>',
    '<div id="mylogo"><a href="index.html"><img src="logoSGI.svg" class="icon"><label id="brand">SmartGoggles</label></a></div>',
    '<div id="cart"><a href="comprar.html"><label id="qty"></label><img src="empty-cart.svg" class="icon"></a> </div>'
	].join('');

	document.body.insertAdjacentHTML('afterbegin', header);
	let PZ = document.getElementById('qty');

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

app.addload = function( f ) {
    let oldload = window.onload;
    window.onload = function() {
	oldload();
	f();
    }
};


