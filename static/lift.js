(function(){

    
    var parsePlugin = function(plugin){
	return {name: plugin.name,
		      description: plugin.description,
		      filename: plugin.filename,
		      version: plugin.version}
    },

    whorls = {},
    
    ec = new evercookie(),

    get_history = function(){
	visipisi.get(function(results){
	    whorls.history = results;
	    identify(whorls, function(response){
		console.log(whorls);
		console.log(response);
	    });
	});
    },

    get_fonts = function(cb){
	
	// Check Flash version
	if (!swfobject.hasFlashPlayerVersion("9.0.0")){
	    //just skip fonts.
	    cb();
	} else {
            var fontDetect = new FontDetect("fontdetectswf", "FontList.swf", function(fd) {        
		var fonts = fd.fonts();
		whorls.fonts = fonts;
		cb();
	    });

	}	
    },

    learn = function(whorls, callback){
	$.ajax({url: "/learn", 
		processData: false,
		type: "POST",
		data: JSON.stringify(whorls),
		success: callback})
    },
    
    identify = function(whorls, callback){
	$.ajax({
	    url: '/identify', 
	    processData: false,
	    type: "POST", 
	    data: JSON.stringify(whorls),
	    success: callback
	});
    };

    
    $(document).ready(function(){
	whorls.plugins = _.map(navigator.plugins, parsePlugin);
	whorls.timezone = (new Date()).getTimezoneOffset();
	whorls.screen = screen;
	whorls.cookiesenabled = navigator.cookieEnabled;
	whorls.localstorage = !!localStorage;
	whorls.sessionstorage = !!sessionStorage;
	
	if (navigator.userAgent === "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1"){
	    whorls.username = "firefox"
	} else {
	    whorls.username = "chrome"
	}
	
	ec.get("uid", function(best, all) {
	    whorls.evercookie = all;
	    whorls.username = "Sean";
	    whorls.password = "password";
	    get_fonts(get_history);
	});
    });

})();
