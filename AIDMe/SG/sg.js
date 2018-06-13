"use strict";

var app = {};

window.onload = function() {
	let asnum = function(s) {
	    let n = Number(s);
	    return (Number.isNaN(n) ? 0 : n);
	}

	let PZ = document.getElementById('cart').firstChild.firstChild;

	app.add2cart = function(e) {
	    const v = asnum(e.value);
	    const n = e.name;
	    if (v > 0) {
		sessionStorage.setItem(n, v);
		let v1 = v + asnum(e.parentElement.textContent);
		sessionStorage.setItem(n, v1);
		console.log(sessionStorage.getItem(n));
		PZ.textContent = v1;
	    } else
		PZ.textContent = '';
	};

};


