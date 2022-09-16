!(function(t,e) {
	if( "object" == typeof exports && "undefined" != typeof module) {
		e(exports);
	} else {
		if("function" == typeof define && define.amd) {
			define(["exports"], e);
		} else {
			e(((t = "undefined" != typeof globalThis ? globalThis : t || self).window = t.window || {}));
		}
	}
})(this, function(t) {
	const MaskInputStart = function (selectionString, pattern) {
		document.querySelectorAll(selectionString).forEach(function(item) {
			return new MaskInput(item, pattern);	 
		});   
	}

	function MaskInput (input, pattern) {
		this.pattern = pattern ? partials : "+7 (___) ___ ____";
		this.input = input;
	    var keyCode;

	    this.input.addEventListener("input", this.mask.bind(this), false);
	    this.input.addEventListener("focus", this.mask.bind(this), false);
	    this.input.addEventListener("blur", this.mask.bind(this), false);
	    this.input.addEventListener("keydown", this.mask.bind(this), false);
	}

    MaskInput.prototype.mask = function(event) {
	    event.keyCode && (keyCode = event.keyCode);
	    var $this = event.target;
	    var pos = $this.selectionStart;
	    if (pos < 3) event.preventDefault();
	    var matrix = this.pattern,
	        i = 0,
	        def = matrix.replace(/\D/g, ""),
	        val = $this.value.replace(/\D/g, ""),
	        new_value = matrix.replace(/[_\d]/g, function(a) {
	            return i < val.length ? val.charAt(i++) || def.charAt(i) : a
	        });
	    i = new_value.indexOf("_");
	    if (i != -1) {
	        i < 5 && (i = 3);
	        new_value = new_value.slice(0, i)
	    }
	    var reg = matrix.substr(0, $this.value.length).replace(/_+/g,
	        function(a) {
	            return "\\d{1," + a.length + "}"
	        }).replace(/[+()]/g, "\\$&");
	    reg = new RegExp("^" + reg + "$");
	    if (!reg.test($this.value) || $this.value.length < 5 || keyCode > 47 && keyCode < 58) $this.value = new_value;
	    if (event.type == "blur" && $this.value.length < 5)  $this.value = ""
	}



	t.maskInput = MaskInputStart;
})