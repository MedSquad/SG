"use strict";

    (function() {

	function createP( txt ) {
	    let a = document.createElement('p');
	    a.innerHTML = txt;
	    return a;
	}

	function createL( txt ) {
	    let l = document.createElement('label');
	    let a = document.createElement('a');
	    a.href = "";
	    a.innerHTML = txt;
	    l.appendChild( a );
	    return l;
	}

	function createAnswer() {
	    let d = document.createElement('div');
	    d.classList.add('answer');
	}

	function createMenu(ops) {
	    let d = document.createElement('div');
	    d.classList.add('menuu');
	    d.appendChild( createP('Elige una opci&oacute;n') );
	    ops.forEach( o => d.appendChild(createL( o )) );
	    return d;
	}

	function guia(e) {
	    let cb = app.CB;
	    cb.removeChild(e.parentNode);
	    let d = document.createElement('div');
	    d.classList.add('question');
	    d.appendChild( e.cloneNode(true) );
	    cb.appendChild( d );
	    cb.appendChild( createMenu(["Monoc&aacute;mara", "Bic&aacute;mara"]) );
	}

	function getapps() {
	    let d = document.createElement('div');
	    f
	    return d;
	}

	function monocam(e) {
	}

	function bicam(e) {
	}

	app.guia = guia;

	app.addload( () => { app.CB = document.getElementById("chatbot"); } );
    })();
