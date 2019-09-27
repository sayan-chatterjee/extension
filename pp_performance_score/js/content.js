$(document).ready(function(){
    var routeMapDiv = $("div#routeMap");
    var l2ManagerReviewStep =$(routeMapDiv).find("div[class='globalPortletBodyBackground sfStepsChartContainer']");
    var l2ManagerReviewClass = $(l2ManagerReviewStep).find("li:nth-child(7)")
                                                     .find("div").attr("class");
    console.log("L2 Manager Review step class...", l2ManagerReviewClass.toLowerCase());
    if(l2ManagerReviewClass.toLowerCase().indexOf(CURRENT_STEP) != -1) {
        console.log("Form in L2 Manager Review step...");
        var goalSection = $("div#sect_2");
        calculateKpiScore(goalSection);

        var companyValueSection = $("div#sect_4");
        calculateCompanyValue(companyValueSection);

        var potentialSection = $("div#sect_6");
        calculatePotential(potentialSection);

    } else {
        console.log("Form NOT in L2 Manager Review step...");
    }   
});