chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var activeTab = tabs[0];
        const message = 'average calculator';
        var request = {
                        'message': message
                      };
        chrome.tabs.sendMessage(activeTab.id, request);
    });
});