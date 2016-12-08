
/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function(tab) {
	console.log("going to send a message bg.js");
	// 1) delete localStorage. Send to content.js
	chrome.tabs.sendMessage(tab.id, {command: "print_storage"}, function(domain) {
		if (domain) {
			// 2) delete cookies
			console.log(domain);
			lol = domain;
			if (domain.startsWith("www.")) {
				// remove "www." from domain
				domain = domain.substring(4);
			}

			// transform url like abc.xyz.domain.com into domain.com
			var splitDomain = domain.split("."); 
			var splitCount = splitDomain.length;
			if (splitCount != 2) {
				domain = splitDomain[splitCount - 2]+ "." + splitDomain[splitCount - 1];
			}
			
			if (domain) {
				chrome.cookies.getAll({domain: domain}, function(cookies) {
					if (cookies) {
						for(var i=0; i<cookies.length;i++) {
							var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
							
							chrome.cookies.remove({"url": url + cookies[i].path, "name": cookies[i].name});
						}
					}				
				});
			}
		}		
    });
	
	
});
