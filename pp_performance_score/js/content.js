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

        /************************/
        $(goalSection).find("div.customelements table tr:last-child input")
                          .attr("readonly", true);
        $(companyValueSection).find("div.customelements table tr:last-child input")
                          .attr("readonly", true);
        $(potentialSection).find("div.customelements table tr:last-child input")
                          .attr("readonly", true);

        var totKpiCustElem = $("div#sect_3 div.customelements");
        var totKpiTable = $(totKpiCustElem).find("table");
        var totKpiScoreInput = $(totKpiTable).find("tr:first-child")
                                             .find("td:nth-child(2) input");
        $(totKpiScoreInput).attr("readonly", "readonly");

        var totCVElem = $("div#sect_3 div.customelements");
        var totCVTable = $(totCVElem).find("table");
        var totCVInput = $(totCVTable).find("tr:first-child")
                                             .find("td:nth-child(2) input");
        $(totCVInput).attr("readonly", "readonly");

        var totalPotCustElem = $("div#sect_7 div.customelements");
        var totalPotTable = $(totalPotCustElem).find("table");
        var totalPotScoreInput = $(totalPotTable).find("tr:first-child")
                                                         .find("td:nth-child(2) input");
        $(totalPotScoreInput).attr("readonly", "readonly");
        /************************/
        
        //var or = $("div#sect_8 select[name='wf_sect_8_orating'] :selected");
        console.log("obj ::",$("div#sect_8 select[name='wf_sect_8_orating'] :selected").val());
        console.log("pot ::",$("div#sect_8 select[name='wf_sect_8_crating'] :selected").val());

        setInterval(function(){
            //console.log("keeping dropdown readonly...");
            $("div#sect_8 select option:not(:selected)").attr('disabled', true);
        }, 3000);
        
    } else {
        console.log("Form NOT in L2 Manager Review step...");
    }   
});