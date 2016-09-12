
//Enable or disable 
var run = true;

//Words to check
var words = ["Democratic", "Jacksonians", "Massachusetts"];

//Definitions of words
var defs = ["Political Party", "I really don't know", "State in New-England"];



//Start of program

	var text = document.body.innerHTML;
	
	var textSplit = text.split(" ");
	var wordCount = 0;
	for (var i = 0; i < textSplit.length; i++){
		var indexTemp = words.indexOf(textSplit[i]);
		if (indexTemp > -1){
			console.log(defs[j]);
				textSplit[i] = '<span title="' + defs[i] + '" id="bioPlugIn' + wordCount + '" style="background-color: #FFFF00">' + words[j] + ' </span>';
				wordCount++;
		}
	document.body.innerHTML = textSplit.join(' ');
	}




function enable(){
	run = true;
	alert('enabled');
}

function disable(){
	run = false;
	alert('disabled');
}

