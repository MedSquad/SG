
(function() {

    function validEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
    }

    function validateHuman(honeypot) {
	if (honeypot) {
	    return true;
	}
    }

    function getFormData() {
	var form = document.getElementById("gform");
	var elements = form.elements;

	var fields = Object.keys(elements)
		.filter(k => { return (elements[k].name !== "honeypot"); })
		.map(k => {
			if(elements[k].name !== undefined) {
			    return elements[k].name;
			} else if(elements[k].lenght > 0) {
			    return elements[k].item(0).name;
			}})
		.filter(function(item, pos, self) {return self.indexOf(item) == pos && item;});

	var formData = {};
	fields.forEach(name => {
	    var element = elements[name];
	    formData[name] = element.value;
	    if(element.length) {
		var data = [];
		for(var i = 0; i < element.length; i++) {
		    var item = element.item(i);
		    if (item.checked || item.selected) {
			data.push(item.value);
		    }
		}
		formData[name] = data.join(', ');
	    }
	});

	formData.formDataNameOrder = JSON.stringify(fields);
	formData.formGoggleSheetName = form.dataset.sheet || "responses";
	formData.formGoggleSendEmail = form.dataset.email || "";

	return formData;
    }

})();


