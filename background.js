//Background script is used for managing variables that get saved to chome's storage API

/**
* @file
* @author Daniel Shenkle <shenkled@my.easternct.edu
* @date 11/5/2016
* @breif the background.js file is used for managing variables that get saved to chrome's storage API. It sets up the "enable", and "string" variables in chromes storage. 
*/



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
		chrome.storage.local.set({"string":[]},function(){
			console.log("search var initialized");
		});
	}
});

chrome.storage.local.get("showWords", function(obj){
	if (typeof obj["string"] === undefined){
		chrome.storage.local.set({"showWords":"false"}, function(){
			console.log("Show words variable initialized");
		});
	}
});

chrome.storage.local.get("showString", function(obj){
	if (typeof obj["showString"] === undefined){
		chrome.storage.local.set({"showString":""}, function(){
			console.log("showString initialized");
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