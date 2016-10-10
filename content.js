//Global variable declarations

//Enable or disable (prevents user from running program when disabled)
var run = true;

//Search string as basic string
var string = "";

//Words to check for
var words = [];

//Definitions of words
//var defs = ["Political Party", "I really don't know", "State in New-England"];

//load all words from chome storage api
chrome.storage.local.get("string", function(obj){
   	string = obj["string"];
   	console.log(string);
});




chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.highlight === true) {
	console.log("hi");
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
	if (words.length <= 0){
		console.log("words isn't initialized");
		//call parser
		parse();
		for (var i = 0; i < words.length; i++){
			console.log("Item: " + i);
			console.log(words[i]);
		}
	}
	console.log("Searching Doc...");
	var allText = element.innerHTML;
	var splitText = allText.split(" ");
	
	var changes = 0;
	for (var i = 0; i < splitText.length; i++){
		var textIndex = words.indexOf(splitText[i]);
		if (textIndex > -1){
			splitText[i] = "<span onclick='test()' id='myGeneSpans" + changes + "' style='background-color: yellow'; title='" + defs[textIndex] + "'>" + splitText[i] + "</span>";
			changes++;
		}
	}
	
	if (changes > 0){
		console.log("Changes made!");
		allText = splitText.join(" ");
		allText += "<script>function test(){console.log('testfire!!!');}</script>"
		element.innerHTML = allText;
	}
}	

//Parse string and get words/ phrases seperated by a comma
function parse(){
	console.log("in parser");
	var index = string.indexOf("\n");
	while (index != -1){
		words.push(string.substring(0, index));
		string = string.substring(index + 1, string.length);
		index = string.indexOf("\n");
	}
	console.log("leaving parser");
}