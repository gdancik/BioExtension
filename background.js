//Set some content from background page
chrome.storage.local.set({"enable":"true"},function (){
    console.log("Storage Succesful");
});
