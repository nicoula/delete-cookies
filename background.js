// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Thanks to https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/cookies/

/* chrome.browserAction.onClicked.addListener(function(tab) {
	var NbCookiesDeleted = 0;
	var totalCookies = 0;
	var savedCookies = [];
	chrome.storage.sync.get('myCookies', function(result) {
		if (!chrome.runtime.error && !chrome.runtime.lastError && typeof result.myCookies != "undefined") {
			savedCookies = result.myCookies;
			
			savedCookies.forEach(function (myDomain) {
				chrome.cookies.getAll({domain: myDomain}, function(cookies) {
					for(var i=0; i<cookies.length;i++) {
						totalCookies++;
						var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
						chrome.cookies.remove({"url": url + cookies[i].path, "name": cookies[i].name}, function(deleteCookies) {
							NbCookiesDeleted++;
							if (NbCookiesDeleted == totalCookies) {
								chrome.runtime.sendMessage({todo: "deleteCookies"}, function(response) {
									console.log("message received:");
								});
							}
						});
					}
				});					
			});
		}
	});
}); */

		
var lol = 0;
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