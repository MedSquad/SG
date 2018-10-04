"use strict";


(function() {
    function chunkSize( fsize ) {
	let KB = 153600; // 150 KB
	let MB = 1048576; // 1 MB
	if(fsize <= 1024) { return fsize; } // 1 KB
	else if(fsize > 1024 && fsize <= KB) { return 10486; } // 10 KB
	else if(fsize > KB && fsize <= MB) { return 104858; } // 100 KB
	else if(fsize > MB) { return 524588; } // slices of 500 KB
    }

    function asBlob(of, BS) {
	return function (x, d) {
	    let oreader = new FileReader();
	    let xhr = new XMLHttpRequest();
	    let blob = of.slice(x, x+BS);
	    xhr.open("POST", "upload.lua?part="+String(d).padStart(5, 0)+"&name="+encodeURIComponent(of.name));
	    xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
	    oreader.onload = e => xhr.send(e.target.result);
	    oreader.readAsBinaryString(blob);
	    return BS;
	}
    }

    function sendSlices( fe ) {
	let ofile = fe.files[0];
//	let md5 = CryptoJS.algo.md5.create();
	let SIZE = ofile.size; // in bytes
	let chunk = asBlob(ofile, chunkSize(SIZE) + 1);
	let offset = 0;
	let i = 1;

	while( offset < SIZE ) {
	    offset += chunk(offset, i++);
	}
    }

//    app.startUploading = sendSlices;
    app.fileSelected = sendSlices;
})();

