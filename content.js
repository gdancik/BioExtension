
//Enable or disable 
var run = true;

//Words to check
var words = ["Democratic", "Jacksonians", "Massachusetts"];

//Definitions of words
var defs = ["Political Party", "I really don't know", "State in New-England"];


//Start of program
console.log("Start");

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
body.innerHTML = tempSplit.join(" ");

console.log("Done");


function highlightText(element) {
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
		//element.innerHTML = splitText.join(" ");
		//addListener(changes);
	}
}	


function addListener(changeCount){
	console.log("Waiting for page to finish loading");
	sleep(10000);
	console.log("Page loaded adding listers!");
	for (var i = 0; i < changeCount; i++){
		console.log("Current index: " + i);
		document.getElementById('myGeneSpans' + i).addEventListener("click", test);
	}
	
}

function test(){
	console.log("Test fire!");
}

function sleep(dur) {
 var d = new Date().getTime() + dur;
  while(new Date().getTime() <= d ) {
    //Do nothing
  }

}