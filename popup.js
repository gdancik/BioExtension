/**
* @file
* @author Daniel Shenkle <shenkled@my.easternct.edu
* @date 11/5/2016
* @breif the popup.js file is used for all actions completed by the popup
*/


//Global variables for this class
var enable;
var string;

document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);
document.getElementById('state').addEventListener('click', setState);
document.getElementById('submit').addEventListener('click', submit);
document.getElementById('file').addEventListener('change', loadFile);
document.getElementById('view').addEventListener('click', showWords);
document.getElementById('back').addEventListener('click', hideWords);
document.getElementById('clear').addEventListener('click', clear);

//When user clicks on the chrome icon it reloads the page hence we need to set up the elements corectly acording to the last
//settings from when the icon was clicked (enabled buttons or disabled buttons)
document.addEventListener("DOMContentLoaded",function (){
    //Fetch all contents
    chrome.storage.local.get("enable", function(obj){
    	
    	if (obj["enable"] === "true"){
    		enable = true;
    	}else if (obj["enable"] === "false") {
    		enable = false;
    	}
    	else{
        enable = true; //We will asume plugin is alway enabled unless otherwise noted
    		console.log("ERROR: Doc Load: failed to compare storage");
    		chrome.storage.local.set({"enable":"true"},function (){
          console.log("Storage Succesful");
        });
    	}
    	console.log("Is enabled: " + obj["enable"]);

    	//Now that we have inported the state we must set up the page corectely
    	setupPage();
    });

    chrome.storage.local.get("string", function(obj){
    	string = obj["string"];
      words = [];

      var index = string.indexOf("\n");
      while (index != -1){
        console.log("in loop");
        words.push(string.substring(0, index));
        string = string.substring(index + 1, string.length);
        index = string.indexOf("\n");
        console.log("Length of words: " + words.length);
      }
      words.push(string);
      var showString = "";
      for (var i = 0; i < words.length; i++){
        showString += words[i] + "<br>";
      }
    });

    chrome.storage.local.get("showWords", function(obj){
      show = obj["showWords"];

      if (show === "true"){
          document.getElementById('wordList').innerHTML = showString;
          document.getElementById('form2').style.display = 'block';
          document.getElementById('form1').style.display = 'none';
      } else {
          document.getElementById('form2').style.display = 'none';
          document.getElementById('form1').style.display = 'block';
          document.getElementById('wordCount').innerHTML = "Word Count: " + words.length;
      }
    })
});

/**
* Loads the file that was chosen by the user in the file chooser popup. 
*/
function loadFile(event) {
  var file = event.target.files[0];
  if (file != null){
  	var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      string = evt.target.result;
      chrome.storage.local.set({"string":string},function (){
       	console.log("Saved String");
      });
    }
    reader.onerror = function (evt) {
    	console.log("error reading file");
      //document.getElementById("fileContents").innerHTML = "error reading file";
    }
  }
} 

/**
* Sends a message to the content.js script to begin the process of highlighting key words on the webpage.
*/
function sendHighlightMessage() {
	if (enable){
    console.log("Sending highlight message");
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
			console.log(response);
			});
		});
		document.getElementById('highlight').innerHTML = "Remove Highlight";
	} else if (!enable){
		console.log("Can't highlight, not enabled");
	} else {
		console.log("Error: sendHighlightMessage: enable not defined correctely");
	}
}


/**
* Sets the state of the extension (either enabled or disabled)
*/
function setState(){

	if (enable == true){
		enable = false;
	}
	else {
		enable = true;
	}

	setupPage();
	saveState();
}

/**
* Saves the current value of enable into chromes storage API. 
* This saves the current state of the popup for the next time a user clicks on it. 
*/
function saveState(){
	if (enable == true){
    	chrome.storage.local.set({"enable":"true"},function (){
        	console.log("Storage Succesful");
    	});
	}else if (enable == false){
	    chrome.storage.local.set({"enable":"false"},function (){
    	    console.log("Storage Succesful");
    	});
	}else {
		console.log("Error: func saveState: enable variable not set up correctely");
	}

	chrome.storage.local.get("enable", function(obj){
    	console.log("Is enabled (post save): " + obj["enable"]);
    });
}


/**
* Sets up the page correctely bassed on the current state (enabled or disabled).
*/
function setupPage(){
	if (enable == true){
		document.getElementById('state').innerHTML = "Disable";
		document.getElementById('highlight').disabled = false;
		document.getElementById('highlight').className = "buttonEnable";
	}else if (enable == false){
		document.getElementById('state').innerHTML = "Enable";
		document.getElementById('highlight').disabled = true;
		document.getElementById('highlight').className = "buttonDisable";
	}else {
		console.log("Error: func setupPage: enable variable not set up correctely");
	}
}

/**
* Submits the contents of the text file choosen as a string into chromes storage API for use in the content.js script.
*/
function submit(){
	string += "\n" + document.getElementById('text').value;

	chrome.storage.local.set({"string": string}, function(){
		console.log("Saved string variable");
	});
}

/**
* I am honestly unsure about this one (hence the documentation frenzy)
*/

function syncString(){
	chrome.storage.local.set({"string":string},function (){
        	console.log("Saved String");
    	});
}

/**
* Hides standard form and shows current list of words
*/
function showWords(){
  chrome.storage.local.set({"showWords":"true"},function (){
    console.log("Showing words");
  });
  
}

function hideWords(){
  chrome.storage.local.set({"showWords":"false"}, function(){
    console.log("Hidding words");
  });
}

function clear(){
  chrome.storage.local.set({"string": ""});
}