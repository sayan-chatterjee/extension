chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /* If the plugin is clicked */
        if('average calculator' === request.message){
            alert('hello world');
        }
    }
);