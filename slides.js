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
	SLIDES[r].style.display = 'none';
	s = r;
	r = s == 0 ? N-1 : s-1;
	SLIDES[r].style.display = 'block';
    }

    nextSlide();

    document.getElementById("arrow-right").addEventListener("click", nextSlide);
    document.getElementById("arrow-left").addEventListener("click", prevSlide);
});

