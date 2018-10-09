chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /* If the plugin is clicked */
        if('average calculator' === request.message){
            alert($("div[id='381:_stepsChartStepName']").html());
        }
    }
);