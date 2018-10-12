local sites = require'carlos.sites'

local function read_file(path)
    local f = assert(io.open(path))
    local s = f:read'a'
    f:close()
    return s
end

local function dump_str(str, path)
    local f = assert(io.open(path, 'w'))
    f:write(str)
    f:close()
    return true
end

--------------------------

local ret = sites.html()

local style = [==[
select {
    width: 300px;
    padding: 0.5rem;
    border-radius: 4px;
}

input#registro {
    width: 240px;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-image: url("user-circle.svg");
    background-repeat: no-repeat;
    background-position: 6px;
    margin-top: 10px;
    padding-left: 50px;
}

input#registro:invalid {
    border: 3px solid #f00;
}

a#uploadfiles { display: none; }

#mybox {
    margin-top: 95px;
    width: 95%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
}
]==]

local body = [==[
    <div id="mybox">
	<select id="nombre" name="nombre" required >
	</select>
	<input id="registro" name="registro" type="text" placeholder="No. Registro ###### / ####" pattern="[0-9]{6} / [0-9]{4}" required />
	<br />
	<div id="container"><div id="filelist"></div></div>
	<br />
	<a id="pickfiles" href="javascript:;">[Seleccionar]</a>
	<a id="uploadfiles" href="javascript:;">[Enviar]</a>
	<br />
	<pre id="console"></pre>
    </div>
]==]

local script = [==[
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
    XHR.getJSON("nombres.lua").then( a => a.forEach( p => { NOMBRES[p.id] = p.nombre; addName(p); } ) );

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
		    flist.innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
		});
	    },
	    BeforeUpload: function(up, files) {
		up.settings.multipart_params = {
		    registro : myreg.value,
		    nombre : myname.value
		};
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
]==]

ret.set_title(read_file'myhead.html')
   .add_css(read_file'mystyle.css')
   .add_body(read_file'mybody.html')
   .add_script(read_file'plupload.full.min.js')
   .add_script(read_file'xhr.js')
   .add_css(style)
   .add_body(body)
   .add_script(script, 'onloaded')

dump_str(ret.asstr(), 'upload.rhtml')

