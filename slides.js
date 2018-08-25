"use strict";

app.addload( function() {

    let SLIDES = document.body.querySelectorAll("section.slides");
    let N = SLIDES.length;

    let r = N-1;
    let s = 0;

    function nextSlide() {
	SLIDES[r].style.display = 'none';
	SLIDES[s].style.display = 'block';
	r = s;
	s = (s+1)%N;
    }

    function prevSlide() {
	SLIDES[s].style.display = 'none';
	SLIDES[r].style.display = 'block';
	s = r;
	r = s == 0 ? N-1 : s-1;
    }

    nextSlide();
    app.nextS = nextSlide;
    app.prevS = prevSlide;
});

