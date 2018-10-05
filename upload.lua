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
#container {
    margin-top: 95px;
    width: 95%;
}
]==]

local body = [==[
    <div id="container">
	<div id="filelist"></div>
	<br />
	<a id="pickfiles" href="javascript:;">[Seleccionar]</a>
	<a id="uploadfiles" href="javascript:;">[Enviar]</a>
	<br />
	<pre id="console"></pre>
    </div>
]==]

local script = [==[
    let flist = document.getElementById("filelist");
    let uploader = new plupload.Uploader({ 
	runtimes: "html5, html4",
	browse_button: "pickfiles",

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
		document.getElementById('filelist').onclick = function() {
		    uploader.start();
		    return false;
		};
	    },
	    FilesAdded: function(up, files) {
		plupload.each(files, function(file) {
		    flist.innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
		});
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
   .add_css(style)
   .add_body(body)
   .add_script(script, 'onloaded')

dump_str(ret.asstr(), 'upload.rhtml')

