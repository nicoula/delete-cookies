/* Listen for messages */
var lol;
var lol2;
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.command && msg.command == "print_storage") {	
		localStorage.clear();
		sendResponse(document.domain);
	}
});