    let flist = document.getElementById("filelist");
    let myname = document.getElementById("nombre");
    let myreg = document.getElementById("registro");
    let pick = document.getElementById("pickfiles");
    let enviar = document.getElementById("uploadfiles");

    function addName( p ) {
	let opt = document.createElement("option");
	opt.value = p.id;
	opt.appendChild(document.createTextNode(p.nombre)); myname.appendChild(opt);
    }

    let KEYS = new Set(["Backspace", "Delete", "Clear"]);
    function registre( e ) {
	let txt = e.target.value;
	if(txt.length == 6) {
	    txt += ' / ';
	    e.target.value = txt;
	}
	if( KEYS.has(e.key) && txt.length == 9 ) {
	    txt = txt.substring(0, 6);
	    e.target.value = txt;
	}
    }

    myreg.addEventListener('keydown', registre);

    var NOMBRES = ['', ];
    XHR.getJSON("json/nombres.json").then( a => a.forEach( p => { NOMBRES[p.id] = p.nombre; addName(p); } ) );

    let uploader = new plupload.Uploader({ 
	runtimes: "html5, html4",
	browse_button: "pickfiles",
	container: "container",
	url: "uploadVideo.lua",
	multipart: true,
	multipart_params: {},

	filters : {
	    max_file_size : "50mb",
	    mime_types: [
		{title: "MPGE-4 files", extensions: "mp4"},
		{title : "QuickTime files", extensions: "mov"},
		{title: "AVI files", extensions: "avi"}
	    ]
	},

	init: {
	    PostInit: function() {
		flist.innerHTML = "";
		enviar.onclick = function() {
		    uploader.start();
		    return false;
		};
	    },
	    FilesAdded: function(up, files) {
		plupload.each(files, function(file) {
		    flist.innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
		});
	    },
	    BeforeUpload: function(up, files) {
		up.settings.multipart_params.registro = myreg.value;
		up.settings.multipart_params.nombre = myname.value;
	    },
	    UploadProgress: function(up, file) {
		document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + '%</span>';
	    },
	    Error: function(up, err) {
		document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
	    }
	}
    });
    uploader.init();

