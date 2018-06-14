"use strict";

    (function() {
	let asnum = app.asnum;
	let PZ = app.PZ;

	app.add2cart = function(e) {
	    let v = asnum(e.value);
	    const n = e.name;
	    if (v > 0) {
		sessionStorage.setItem(n, v);
		v += asnum(e.parentElement.textContent);
		sessionStorage.setItem(n, v);
		PZ.textContent = v;
	    } else {
		PZ.textContent = '';
		sessionStorage.removeItem(n);
	    }
	};

	app.ordenes = function() {
	    for(let i = 0; i < sessionStorage.length; i++) {
		let k = sessionStorage.key(i);
		document.querySelector('input[name="'+k+'"]').value = asnum(sessionStorage.getItem(k));
	    }
	}


    })();
