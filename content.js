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
var defs = [];

makePop();
document.getElementById("hide").addEventListener('click', hidePop);
window.onclick = hidePop;

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
   		getType(element, callback);
	});
}

/**
 * Determines if we are currently working with a dictionary list or a standard word list
 */

function getType(element, callback){
	chrome.storage.local.get("dic", function(obj){
   		var dic = obj["dic"];
		console.log("############");
		console.log("# dic: " + dic);
		console.log("############");
		if (dic === "true"){

			chrome.storage.local.get("defs", function(obj){
   				defs = obj["defs"];
				dicHigh(element);
			});

		}else {
			callback(element);
		}
   		
	});
}

/**
* Takes the documents HTML and searches it for words, or phrases that have been seet by the getString()/ parse() functions.
* Uppon finding a match the function adds a span to the HTML that will highlight the word/ phrase.
*/

function callback(element){

	showPop();
	
	console.log("standard highlight");

	var allText = element.innerHTML;
	var cache = element.innerHTML;
	var foundList = [];

	for (var i = 0; i < words.length; i++){

		var word = words[i].trim();

		if (word !== ""){
  	
	  		regex = new RegExp("(\\b" + word + "\\b)(?![^<]*>|[^<>]*<\\\\)", "img");

  			allText = allText.replace(regex, "<span style='background-color: yellow'>" + word + "</span>");
	
			if (allText !== cache){
				foundList.push(word);
				cache = allText;
			}
		}		
	}
	element.innerHTML = allText;
	//hidePop();
	modPop(foundList);
}





function dicHigh(element){

	showPop();

	console.log("Dic highlight");

	var allText = element.innerHTML;
	var cache = element.innerHTML;
	var foundList = [];

	for (var i = 0; i < words.length; i++){

		var word = words[i].trim();

		if (word !== ""){
  			
  			regex = new RegExp("(\\b" + word + "\\b)(?![^<]*>|[^<>]*<\\\\)", "img");

  			allText = allText.replace(regex, "<div class='popup'><span style='background-color: yellow'>" + word + "</span><span class='popuptext'>" + word + ": " + defs[i] + "</span></div>");

			if (allText !== cache){
				foundList.push(word);
				cache = allText;
			}
		}		
	}
	element.innerHTML = allText;
	//hidePop();
	modPop(foundList);
}

function makePop(){
	//Popup code

	var popup = `<div id="myModal" class="modal"><div class="modal-content"> 
				<div class="modal-header"><span id="hide" class="close">&times</span> 
				<h2 id="popHead">Highlighting please wait...</h2><div id="popCont"></div></div></div></div>`;

	var body = document.getElementsByTagName('body')[0].innerHTML;
	body += popup;

	document.getElementsByTagName('body')[0].innerHTML = body;

}

function showPop(){
	var modal = document.getElementById('myModal')
	modal.style.display = "block";
}

function hidePop(){
	console.log("Hide Event");
	var modal = document.getElementById('myModal')
	modal.style.display = "none";
}

function modPop(wordsFound){
	if (wordsFound.length === 0){
		document.getElementById('popHead').innerHTML = "No matches";
	}
	else {
		document.getElementById('popHead').innerHTML = "Matches Found";
		var content = document.getElementById('popCont');
		
		//build inner structure
		var items = "";
		for (var i = 0; i < 10 && i < wordsFound.length; i++){
			items += "<li>" + wordsFound[i] + "</li>";
		}

		if (wordsFound.length >= 10){
			items += "<li>...</li>" 
		}
		
		var newHTML = "Number of Words found<br><ul>" + items + "</ul";

		content.innerHTML = newHTML;
	}

}