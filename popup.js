document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);
document.getElementById('state').addEventListener('click', setState);
var enable = true;
var textHighlighted = false;

function sendHighlightMessage() {
	if (enable){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
			console.log(response);
			});
		});
		document.getElementById('highlight').innerHTML = "Remove Highlight";
	}  
}

function setState(){

	if (enable == true){
		enable = false;
		chrome.browserAction.setIcon({
			path : {
				"16": "/img/off.png",
				"19": "/img/off.png",
				"38": "/img/off.png",
				"48": "/img/off.png",
				"128": "/img/off.png"
			}
		});
		document.getElementById('state').innerHTML = "Enable";
		document.getElementById('highlight').disabled = true;
	}
	else {
		enable = true;
		//chrome.browserAction.setIcon({path: "img/on.png"});
		document.getElementById('state').innerHTML = "Disable";
		document.getElementById('highlight').disabled = false;
	}
}