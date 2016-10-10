//Background script is used for managing variables that get saved to chome's storage API


//Check to see if the enable variable is defined
//If it is not define it otherwise do nothing with it.
chrome.storage.local.get("enable", function(obj){
   	if (typeof obj["enable"] === undefined){
   		chrome.storage.local.set({"enable":"true"},function (){
   			console.log("enable var initialized");
		});
   	}
});

chrome.storage.local.get("string", function(obj){
	if (typeof obj["string"] === undefined){
		chrome.storage.local.set({"string":""},function(){
			console.log("search var initialized")
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