var counter = 0;
var myTab = tab.id;
chrome.browserAction.setIcon({path: "img/on.png", myTab});


chrome.browserAction.onClicked.addListener(function (tab) {
	counter++;
	chrome.extension.getBackgroundPage().console.log('foo');
	chrome.browserAction.setIcon({path:"off.png"});
	console.log(counter);
	if (counter == 5){
		alert("5 clicks!!!");
	}
});