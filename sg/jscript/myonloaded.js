    (function() {
	// If there's already something in the bag, let's show it!
	if (sessionStorage.length > 0) {
	    let s = 0;
	    for(let i = 0; i < sessionStorage.length; i++)
		s += Number(sessionStorage.getItem(sessionStorage.key(i)));
	    document.getElementById('qty').textContent = s;
	}
    })();
