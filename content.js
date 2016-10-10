//Global variable declarations

//Enable or disable (prevents user from running program when disabled)
var run = true;

//Search string as basic string
var string = "";

//Words to check for
var words = [];

//Definitions of words
//var defs = ["Political Party", "I really don't know", "State in New-England"];






chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.highlight === true) {
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});


//Function Declarations

function enable(){
	run = true;
	alert('enabled');
}

console.log("Done");


function highlightText(element) {
	getString(element, callback);
	
}	

//Parse string and get words/ phrases seperated by a comma
function parse(){
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
}

function getString(element, callback){
	//load all words from chome storage api
	console.log("Geting string");
	chrome.storage.local.get("string", function(obj){
   		string = obj["string"];
   		console.log("String (in getString): " + string);
   		parse();
   		callback(element);
	});
}

function callback(element){
	console.log("Just after getString function call.");

	//Print all words for debuging
	console.log("Printing out words in my callback!!!");
	for (var i = 0; i < words.length; i++){
		console.log(words[i]);
	}
	
	console.log("Searching Doc...");
	var allText = element.innerHTML;
	var splitText = allText.split(" ");
	
	var changes = 0;
	for (var i = 0; i < splitText.length; i++){
		var textIndex = words.indexOf(splitText[i]);
		if (textIndex > -1){
			console.log("!!!!!!!!!!!!!!!!!!!!!!!MATCH!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log(words[textIndex]);
			splitText[i] = "<span style='background-color: yellow'>" + splitText[i] + "</span>";
			changes++;
		}
	}
	
	console.log("Done Searching Doc!");

	if (changes > 0){
		console.log("Changes made!");
		allText = splitText.join(" ");
		element.innerHTML = allText;
	}
}