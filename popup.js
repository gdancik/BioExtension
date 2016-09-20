//Global variables for this class
var enable;

document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);
document.getElementById('state').addEventListener('click', setState);


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
    		console.log("ERROR: Doc Load: failed to compare storage");
    		enable = true; //default enable state
    	}
    	console.log("Is enabled: " + obj["enable"]);

    	//Now that we have inported the state we must set up the page corectely
    	setupPage();
    });
});



//Sends a message to the content.js script to begin the process of highlighting key words on the 
//webpage
function sendHighlightMessage() {
	if (enable){
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


//This funciton will set the sate of the extension (either enabled or disabled)
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


//This function will save the curent value of enable into chromes storage 
//This saves the current state of the popup for the next time a user clicks on it.
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

//function sets up the page correctely bassed on the current state (enabled or
//disabled)
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

//My sleep function
function sleep(dur) {
 var d = new Date().getTime() + dur;
  while(new Date().getTime() <= d ) {
    //Do nothing
  }

}