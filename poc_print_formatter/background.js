chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var activeTab = tabs[0];
        const bootstrapCssPath = chrome.extension.getURL("css/bootstrap.min.css");
        const kraStyleCssPath = chrome.extension.getURL("css/kra_style.css");
        const message = 'print_layout';
        var request = {
                        'message': message,
                        'bootstrap' : bootstrapCssPath,
                        'kraStyle' : kraStyleCssPath
                      };
        chrome.tabs.sendMessage(activeTab.id, request);
    });
});