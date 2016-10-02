//Check to see if the enable variable is defined
//If it is not define it otherwise do nothing with it.
 chrome.storage.local.get("enable", function(obj){
    	if (typeof obj["enable"] === undefined){
    		console.log("setting not enabled!");
    		chrome.storage.local.set({"enable":"true"},function (){
    			console.log("Storage Succesful");
			});
    	}
    });


//Set some content from background page
//chrome.storage.local.set({"enable":"true"},function (){
    //console.log("Storage Succesful");
//});
//
//
//chrome.storage.local.set({"string":"this is a test"}, function(){
	//console.log("temp string");
//});
