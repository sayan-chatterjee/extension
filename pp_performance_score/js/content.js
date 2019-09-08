$(document).ready(function(){
    var routeMapDiv = $("div#routeMap");
    var l2ManagerReviewStep =$(routeMapDiv).find("div[id='694:_step']");
    var l2ManagerReviewClass = $(l2ManagerReviewStep).attr("class");
    console.log("L2 Manager Review step class...", l2ManagerReviewClass.toLowerCase());
    if(l2ManagerReviewClass.toLowerCase().indexOf(CURRENT_STEP) != -1) {
        console.log("Form in L2 Manager Review step...");
        var goalSectionCustomElements = $("div#sect_2");
        calculateKpiScore(goalSectionCustomElements);
    } else {
        console.log("Form NOT in L2 Manager Review step...");
    }   
});