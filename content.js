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

//Parse string and get words/ phrases seperated by a comma

/** 
* Parsees a string and gets words/ phrases seperated by a newline and stores them in an array.
* This string will come from the file loaded into the chrome storage API by the plugin popup.
*/
function parse(element, callback){
	console.log("in parser");
	console.log("Before loop");
	console.log("String (in parser): " + string);
	var index = string.indexOf("\n");
	while (index != -1){
		console.log("in loop");
		words.push(string.substring(0, index));
		string = string.substring(index + 1, string.length);
		index = string.indexOf("\n");
		console.log("Length of words: " + words.length);
	}
	words.push(string);
	console.log("leaving parser");
	callback(element);
}

/** 
* Retrives the string that is stored in the chrome storage API by the plugin popup.
*/

function getString(element, callback){
	//load all words from chome storage api
	console.log("Geting string");
	chrome.storage.local.get("string", function(obj){
   		string = obj["string"];
   		console.log("String (in getString): " + string);
   		parse(element, callback);
	});
}

/**
* Takes the documents HTML and searches it for words, or phrases that have been seet by the getString()/ parse() functions.
* Uppon finding a match the function adds a span to the HTML that will highlight the word/ phrase.
*/

function callback(element){
	console.log("Just after getString function call.");

	for (var i = 0; i < words.length; i++){
		var word = words[i].trim();
		console.log("Currently Highlighting: " + word);
	
		var allText = element.innerHTML;
  		var regex1 = new RegExp("\\b"+word+"\\b", "ig");
  		console.log(regex1);
  		allText = allText.replace(regex1, "<span style='background-color: yellow'>" + word + "</span>");
		element.innerHTML = allText;
		
	}

}