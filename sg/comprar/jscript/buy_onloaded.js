    (function() {

	let asnum = function(s) {
	    let n = Number(s);
	    return (Number.isNaN(n) ? 0 : n);
	};

	// Sum all products already in the cart.
	let suma = function() {
	    if (sessionStorage.length == 0) { return 0; }
	    let s = 0;
	    for(let i = 0; i < sessionStorage.length; i++)
		s += asnum(sessionStorage.getItem(sessionStorage.key(i)));
	    return s;
	};

	let PZ = document.getElementById('qty');

	let add2cart = function(ev) {
	    let e = ev.target;
	    let v = asnum(e.value);
	    const n = e.name;
	    if (v > 0) {
		sessionStorage.setItem(n, v);
		v += asnum(e.parentElement.textContent);
		sessionStorage.setItem(n, v);
		PZ.textContent = suma();
	    } else {
		sessionStorage.removeItem(n);
		let s = suma();
		PZ.textContent = (s == 0)?'':s;
	    }
	};

	let myinputs = function(ie) {
	    ie.step = 1; ie.min = 0; ie.max = 10;
	    ie.addEventListener('change', add2cart);
	};

	// add change event to all input fields!
	document.querySelectorAll('input').forEach( myinputs );

	// If there's already something in the bag
	// show it in the fields!
	for(let i = 0; i < sessionStorage.length; i++) {
	    let k = sessionStorage.key(i);
	    document.querySelector('input[name="'+k+'"]').value = asnum(sessionStorage.getItem(k));
	}

    })();
