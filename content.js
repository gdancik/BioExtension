
//Enable or disable 
var run = true;

//Words to check
var words = ["Democratic", "Jacksonians", "Massachusetts"];

//Definitions of words
var defs = ["Political Party", "I really don't know", "State in New-England"];



//Start of program
if (run){
	var text = document.body.innerHTML;
	
	var textSplit = text.split(" ");
	var wordCount = 0;
	for (var i = 0; i < textSplit.length; i++){
		for (var j = 0; j < words.length; j++){
			if (textSplit[i] === words[j]){
				console.log(defs[j]);
				textSplit[i] = '<span title="' + defs[j] + '" id="bioPlugIn' + wordCount + '" style="background-color: #FFFF00">' + words[j] + ' </span>';
				wordCount++;
			}
		}
	document.body.innerHTML = textSplit.join(' ');
	}
}



function enable(){
	run = true;
	alert('enabled');
}

function disable(){
	run = false;
	alert('disabled');
}

