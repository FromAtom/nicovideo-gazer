chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if( tab.url.indexOf("www.nicovideo.jp/watch/") != -1) {
        localStorage.clear();
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
        // Save original window info
        chrome.windows.get(tab.windowId, {
            populate: false
        },function (result) {
            if (!result) { return false; }

            var window_info = {
                top: result.top,
                left: result.left,
                width: result.width,
                height: result.height
            };

            localStorage.setItem(window_info_key, JSON.stringify(window_info));
        });

        // Resize window
        chrome.tabs.executeScript(null, { file: "window_resize.js"}, function(result) {
            if (!result) { return false; }
            var player_size = JSON.parse(result);
            var padding = 90; // Hard cording is evil

            chrome.windows.update(tab.windowId, {
                width: player_size.width,
                height: player_size.height + padding
            });
        });
    }
});
