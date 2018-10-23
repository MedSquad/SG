"use strict";

    (function() {

	let suma = app.suma;

	let add2cart = function(ev) {
	    let e = ev.target;
	    let v = app.asnum(e.value);
	    let PZ = app.PZ;
	    const n = e.name;
	    if (v > 0) {
		sessionStorage.setItem(n, v);
		v += app.asnum(e.parentElement.textContent);
		sessionStorage.setItem(n, v);
		PZ.textContent = suma();
	    } else {
		sessionStorage.removeItem(n);
		let s = suma();
		PZ.textContent = (s == 0)?'':s;
	    }
	};

	let ordenes = function() {
	    for(let i = 0; i < sessionStorage.length; i++) {
		let k = sessionStorage.key(i);
		document.querySelector('input[name="'+k+'"]').value = app.asnum(sessionStorage.getItem(k));
	    }
	};

	let myinputs = function(ie) {
	    ie.step = 1; ie.min = 0; ie.max = 10;
	    ie.addEventListener('change', add2cart);
	};

	app.addload( () => document.querySelectorAll('input').forEach( myinputs ) );
	app.addload( ordenes );

    })();
