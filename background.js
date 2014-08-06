chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if( tab.url.indexOf("www.nicovideo.jp/watch/") != -1) {
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        file: "main.js"
    }, function(result) {
        if (chrome.runtime.lastError) {
            console.log('ERROR: ' + chrome.runtime.lastError.message);
            return;
        }
    });

    var window_info_key = 'window_info';
    if ( localStorage.getItem(window_info_key) ) {
        var window_info = JSON.parse(localStorage.getItem(window_info_key));
        chrome.windows.update(tab.windowId, {
            top: window_info['top'],
            left: window_info['left'],
            width: window_info['width'],
            height: window_info['height']
        });
        localStorage.removeItem(window_info_key);
    }
    else {
        chrome.tabs.executeScript(null, { file: "window_resize.js"}, function(result) {
            var player_size = JSON.parse(result);
            var padding = 90; // ハードコーディングしたくない
            chrome.windows.update(tab.windowId, {
                width: player_size.width,
                height: player_size.height + padding
            });
        });

    }
});
