/**
* @file
* @author Daniel Shenkle <shenkled@my.easternct.edu
* @date 11/5/2016
* @breif the popup.js file is used for all actions completed by the popup
*/


//Emergencies
/*
 chrome.storage.local.set({"string":""},function (){
  console.log("Saved String");
});
*/

//Global variables for this class
var enable;
var string;

var words = [];


document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);
document.getElementById('state').addEventListener('click', setState);
document.getElementById('view').addEventListener('click', showWords);
document.getElementById('back').addEventListener('click', hideWords);
document.getElementById('backTop').addEventListener('click', hideWords);
document.getElementById('showSettings').addEventListener('click',settings);


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

    chrome.storage.local.get("showWords", function(obj){
      show = obj["showWords"];
      if (show === "true"){


        chrome.storage.local.get("showString", function(obj){
          var showString = obj["showString"];
          document.getElementById('wordList').innerHTML = showString;
        });   

         
          document.getElementById('form2').style.display = 'block';
          document.getElementById('form1').style.display = 'none';
          chrome.storage.local.get("string", function(obj){
            var temp = obj["string"];
            var wordCount = temp.length;
            if (wordCount > 30){
              document.getElementById('backTop').style.display = 'block';
            }
            else {
              document.getElementById('backTop').style.display = 'none';
            }
          });
      } else {
          document.getElementById('form2').style.display = 'none';
          document.getElementById('form1').style.display = 'block';
          chrome.storage.local.get("string", function(obj){
            var temp = obj["string"];
            wordCount = temp.length;
            document.getElementById('wordCount').innerHTML = "Word Count: " + wordCount;
          });
      }
    });
});

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


function settings(){
    //Launch new window to prevent loss of focus bug
  var popup_url = chrome.extension.getURL("settings.html");
  
  /*
  chrome.windows.create({"url":popup_url, focused:true,type:'panel', width:600, height:250},function(win){
     alert("Popup win created!");
  });
  */ 

  chrome.tabs.create({"url":popup_url}, function(tab){
    alert("Tab with id: "+tab.id+" created!");
  });
}

function makePopText(){
  var spans = document.getElementsByClassName("innerSpan");
  spans.innerHTML = "Hi there";
  console.log("Hi");
}