
//Enable or disable 
var run = true;

//Words to check
var words = ["Democratic", "Jacksonians", "Massachusetts"];

//Definitions of words
var defs = ["Political Party", "I really don't know", "State in New-England"];



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.highlight === true) {
	console.log("hi");
    highlightText(document.body);
    sendResponse({messageStatus: "received"});
  }
});

function enable(){
	run = true;
	alert('enabled');
}

function disable(){
	run = false;
	alert('disabled');
}

function highlightText(element) {
	console.log("Searching Doc...");
	var allText = element.innerHTML;
	var splitText = allText.split(" ");
	
	var changes = 0;
	for (var i = 0; i < splitText.length; i++){
		var textIndex = words.indexOf(splitText[i]);
		if (textIndex > -1){
			splitText[i] = "<span style='background-color: yellow'; title='" + defs[textIndex] + "'>" + splitText[i] + "</span>";
			changes++;
		}
	}
	
	if (changes > 0){
		console.log("Changes made!");
		element.innerHTML = splitText.join(" ");
	}
}	
