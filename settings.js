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
var defs = [];

document.getElementById('file').addEventListener('change', loadFile);
document.getElementById('view').addEventListener('click', showWords);
document.getElementById('back').addEventListener('click', hideWords);
document.getElementById('backTop').addEventListener('click', hideWords);
document.getElementById('clear').addEventListener('click', clear);



//When user clicks on the chrome icon it reloads the page hence we need to set up the elements corectly acording to the last
//settings from when the icon was clicked (enabled buttons or disabled buttons)
document.addEventListener("DOMContentLoaded",function (){
    //Set background
    document.getElementById('bod').className = "settingsBody";
    
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

    });

    chrome.storage.local.get("showWords", function(obj){
      show = obj["showWords"];
      if (show === "true"){


        chrome.storage.local.get("showString", function(obj){
          var showString = obj["showString"];
          document.getElementById('wordList').className = "wordList";
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
* Loads the file that was chosen by the user in the file chooser popup. 
*/
function loadFile(event) {



  var file = event.target.files[0];
  if (file != null){
  	var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      string = evt.target.result;

      //Determine if it is a dic file or a simple list
      var index = string.indexOf(":");
      if (index != -1){
        console.log("Dic file");

        chrome.storage.local.set({"dic":"true"}, function(){
			    //console.log("initialized dic");
		    });

        index = string.indexOf(":");
        var i = 0;
        while (index != -1){
          if (i % 2 == 0){
            words.push(string.substring(0, index));
            string = string.substring(index + 1, string.length);
            index = string.indexOf("\n");
          }
          else {
            var definition = string.substring(0, index);
            console.log("DEF: " + definition);
            defs.push(definition);
            string = string.substring(index + 1, string.length);
            index = string.indexOf(":");
          }
          i++;
        }
        defs.push(string);
      }
      else {
        console.log("Standard list file");

        chrome.storage.local.set({"dic":"false"}, function(){
			    //console.log("initialized dic");
	      });
        
        index = string.indexOf("\n");
  
        while (index != -1){
          words.push(string.substring(0, index));
          string = string.substring(index + 1, string.length);
          index = string.indexOf("\n");
        }
        words.push(string);
      }
  
      //autoSubmit
      submit();
      alert("Words loaded");
    }
  }
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
* Submits the contents of the text file choosen as a string into chromes storage API for use in the content.js script.
*/
function submit(){
	var showString = "";

  for (var i = 0; i < words.length; i++){
    console.log(words[i]);
    showString += words[i] + "<br>";
  }

  chrome.storage.local.set({"string":words},function (){
    console.log("Saved String");
  });

  chrome.storage.local.set({"showString":showString},function(){
    console.log("Saved showString");
  });

  chrome.storage.local.set({"defs":defs},function(){
    console.log("Saved Defs");
  });

  alert("Import Done!");
  console.log("Import Done");
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
  chrome.storage.local.set({"string":[]}, function(){
    console.log("hi");
  });
}


