chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if( tab.url.indexOf("www.nicovideo.jp/watch/") != -1) {
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {
        file: "main.js"
    }, function(result) {
        if (chrome.runtime.lastError) { // or if (!result)
            // console.log('ERROR: ' + chrome.runtime.lastError.message);
            return;
        }
    });
});
