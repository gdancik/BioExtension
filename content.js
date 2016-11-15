/**
* @file
* @author Daniel Shenkle <shenkled@my.easternct.edu
* @date 11/5/2016
* @breif the content.js file is where the actual working code of the plugin resides.
*/

//Global variable declarations

//Enable or disable (prevents user from running program when disabled)
var run = true;

//Search string as basic string
var string = "";

//Words to check for
var words = [];

var nodeCount = document.body.children.length;

console.log(nodeCount);

//Definitions of words
//var defs = ["Political Party", "I really don't know", "State in New-England"];


chrome.storage.local.get("enable", function(obj){
   		string = obj["enable"];
   		console.log("Enable: " + string);
   		if (string === "true"){
   			highlightText(document.body);
   		}
	});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.highlight === true) {
    highlightText(document.body);
    console.log("Got highlight message!!!");
    sendResponse({messageStatus: "received"});
  }
});


//Function Declarations

function enable(){
	run = true;
	alert('enabled');
}

console.log("Done");


/**
* Calls all functions required to highlight text on a page (getString()).
*/

function highlightText(element) {
	getString(element, callback);
}	



/** 
* Retrives the string that is stored in the chrome storage API by the plugin popup.
*/

function getString(element, callback){
	//load all words from chome storage api
	console.log("Geting string");
	chrome.storage.local.get("string", function(obj){
   		words = obj["string"];
   		callback(element);
	});
}

/**
* Takes the documents HTML and searches it for words, or phrases that have been seet by the getString()/ parse() functions.
* Uppon finding a match the function adds a span to the HTML that will highlight the word/ phrase.
*/

function callback(element){

	alert("Highlighting Page this may take a moment...");

	var allText = element.innerHTML;

	//Pre-Process page
	var regex = new RegExp(">", "gi");
	allText = allText.replace(regex, "> ");

	regex = new RegExp("<", "gi");
	allText = allText.replace(regex, " <");

	for (var i = 0; i < words.length; i++){

		var word = words[i].trim();

		if (word !== ""){
  			
  			regex = new RegExp("(\\b" + word + "\\b)(?![^<]*>|[^<>]*<\\\\)", "img");

  			allText = allText.replace(regex, "<div class='popup'><span style='background-color: yellow'>" + word + "</span><span class='popuptext'>Hi there please work</span></div>");
		}		
	}
	element.innerHTML = allText;
	console.log("Done highlighting!");
	alert("Done highlighting");

}

