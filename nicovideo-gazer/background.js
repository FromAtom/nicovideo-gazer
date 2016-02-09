var WindowResizeManager = function (tab) {
    this.tab = tab;
    this.window_info = null;
};

WindowResizeManager.prototype.adjust = function () {
    var self = this;
    chrome.windows.get(this.tab.windowId, {
        populate: false
    },function (result) {
        if (!result) { return false; }

        self.window_info = {
            top: result.top,
            left: result.left,
            width: result.width,
            height: result.height
        };
    });

    chrome.tabs.executeScript(null, {
        file: "window_resize.js"
    }, function(result) {
        if (!result) { return false; }
        var player_size = JSON.parse(result);

        chrome.windows.update(self.tab.windowId, {
            width: player_size.width,
            height: player_size.height
        });
    });
};

WindowResizeManager.prototype.restore = function () {
    chrome.windows.update(this.tab.windowId, {
        top: this.window_info['top'],
        left: this.window_info['left'],
        width: this.window_info['width'],
        height: this.window_info['height']
    });

    this.window_info = null;
};

WindowResizeManager.prototype.isAdjusted = function () {
    if (this.window_info === null) {
        return false;
    }
    else {
        return true;
    }
};

var self = this;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if( tab.url.indexOf("www.nicovideo.jp/watch/") != -1) {
        chrome.tabs.executeScript(null, {
            file: "main.js"
        }, function(result) {
            if (chrome.runtime.lastError) {
                console.log('ERROR: ' + chrome.runtime.lastError.message);
                return;
            }
        });

        self.windowResizeManager = new WindowResizeManager(tab);
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(function(tab) {
    var code = '';

    if ( self.windowResizeManager.isAdjusted() ) {
        code = 'nicovideoGazer.appear();';
        self.windowResizeManager.restore();
    }
    else {
        code = 'nicovideoGazer.disappear();';
        self.windowResizeManager.adjust();
    }

    chrome.tabs.executeScript(null, {
        code: code
    }, function(result) {
        if (chrome.runtime.lastError) {
            console.log('ERROR: ' + chrome.runtime.lastError.message);
            return;
        }
    });
});
