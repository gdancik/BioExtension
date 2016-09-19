
//Enable or disable 
var run = true;

//Words to check
var words = ["Democratic", "Jacksonians", "Massachusetts"];

//Definitions of words
var defs = ["Political Party", "I really don't know", "State in New-England"];



//Start of program
console.log("Start");
var body = document.getElementsByTagName("BODY")[0]
var tempText = body.innerText;
var tempSplit = tempText.split(" ");

for (var i = 0; tempSplit.length; i++){
	//var tIndex = words.indexOf(tempSplit[i]);
	if (tempSplit[i] === "Democratic"){
		tempSplit[i] = '<span title"' + 'Political' + '" style="background-color: #FFFF00">' + 'Democratic' + ' </span>';
	}
}
body.innerHTML = tempSplit.join(" ");

console.log("Done");

//var elementsOnPage = document.getElementsByTagName("*");
//	
//for (var i = 0; i < elementsOnPage.length; i++){
//	console.log("Searching....");
//	if (true || !elementsOnPage[i].hasChildNodes()){
//		console.log("No children!!!");
//		var text = elementsOnPage[i].innerHTML;
//		console.log(text);
//		var textSplit = text.split(" ");
//		var wordCount = 0;
//		
//		for (var j = 0; j < textSplit.length; j++){
//			
//			var indexTemp = words.indexOf(textSplit[j]);
//			if (indexTemp > - 1){
//				console.log("Word found!!!");
//				console.log(defs[indexTemp]);
//				textSplit[j] = '<span title"' + defs[indexTemp] + '" style="background-color: #FFFF00">' + words[indexTemp] + ' </span>';
//				wordCount++;
//			}
//		}
//		elementsOnPage[i].innerHTML = textSplit.join(" ");
//	}
//	
//}
//
//console.log("Done");
//	
//function enable(){
//	run = true;
//	alert('enabled');
//}
//
//function disable(){
//	run = false;
//	alert('disabled');
//}
//
//