"use strict";

    (function() {

	function createP( txt ) {
	    let a = document.createElement('p');
	    a.innerHTML = txt;
	    return a;
	}

	function createL( o ) {
	    let l = document.createElement('label');
	    let a = document.createElement('a');
	    a.href = "";
	    a.innerHTML = o.txt;
	    l.appendChild( a );
	    l.addEventListener('click', ()=>console.log("fer\n"));
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
//	    let cb = app.CB;
		console.log(e);
//console.log(	    cb.removeChild(e.parentNode));
//	    let d = document.createElement('div');
//	    d.classList.add('question');
//	    d.appendChild( e.cloneNode(true) );
//	    cb.appendChild( d );
//	    cb.appendChild( createMenu([{txt:"Monoc&aacute;mara"}, {txt:"Bic&aacute;mara"}]) );
	}

	app.inicio = function() {
	    let d = document.createElement('div');
	    d.classList.add('answer');
	    d.appendChild( createP('Hola!') );
	    d.appendChild( createP('Gracias por usar los SmartGoggles, el equipo de MED-AID esta comprometido con la creaci&oacute;n de soluciones tecnol&oacute;gicas integrales.') );
	    d.appendChild( createP('&#191;C&oacute;mo puedo ayudarte&#63;') );

	    app.CB.appendChild( d );
	    app.CB.appendChild( createMenu([{txt:"Gu&iacute;a de Uso", fn:guia}, {txt:"Reporte de Falla"}]) );
	}

	function getapps() {
	    let d = document.createElement('div');
	    return d;
	}

	function monocam(e) {
	}

	function bicam(e) {
	}

	app.addload( () => { app.CB = document.getElementById("chatbot"); app.inicio(); } );
    })();
