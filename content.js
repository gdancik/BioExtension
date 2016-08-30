var html = document.getElementsByTagName('body')[0];
var text = html.innerHTML;

var textSplit = text.split(" ");
var wordCount = 0;
for (var i = 0; i < textSplit.length; i++){
	if (textSplit[i] === 'Democratic'){
		var string = '<span id="bioPlugIn' + wordCount + '" style="background-color: #FFFF00">Democratic </span>';
		console.log(string);
		textSplit[i] = '<span id="bioPlugIn' + wordCount + '" style="background-color: #FFFF00">Democratic </span>';
		wordCount++;
	}
}
html.innerHTML = textSplit.join(" ");

for (var i = 0; i < wordCount; i++){
	var idVal = "bioPlugIn" + i;
	console.log(idVal);
	document.getElementById(idVal).addEventListener("mouseover", mouseOver);
	document.getElementById(idVal).addEventListener("mouseout", mouseOut);
}



function mouseOver(){
	document.getElementById("bioPlugIn0").style.color = "red";
}

function mouseOut(){
	document.getElementById("bioPlugIn0").style.color = "black";
}