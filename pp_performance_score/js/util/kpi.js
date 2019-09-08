function calculateKpiScore(goalSection){
    var customElements = $(goalSection).find("div.customelements");
    customElements.find("select").change(function(){
        var l2MgrRating = parseFloat(this.value);
        var l2MgrRatingValue = Number.isNaN(l2MgrRating) ? 0.0 : l2MgrRating;

        var parentTr = $(this).parentsUntil("tr");
        var l1MgrRating = $(parentTr[parentTr.length-1]).siblings().find("div:nth-child(2)").text();
        var l1MgrRatingValue = Number.isNaN(parseFloat(l1MgrRating)) ? 0.0 : parseFloat(l1MgrRating);

        var weightageValue = 0.0;
        var parentDiv = $(this).parentsUntil("div[class='pmPanelContent globalPortletBody']");
        var goalDetailsTable = $(parentDiv[parentDiv.length-1]).find("div.goalDetailsTab");
        var goalDetailsItem = $(goalDetailsTable).find("tr");
        $.each(goalDetailsItem, function(index, row){
            var label = $(row).children("td.lab").text();
            var value = $(row).children("td.val").text();
            if(PERCENT_SIGN === label){
                console.log("l1MgrRatingValue / l2MgrRatingValue/ weightage :: " + 
                l1MgrRatingValue +" / " + l2MgrRatingValue + " / " + value); 
                var weightage = parseFloat(value.replace(PERCENT_SIGN, EMPTY_STRING));
                weightageValue = Number.isNaN(weightage) ? 0.0 : weightage;
            }
        });

        var kpiScore = (weightageValue * (l1MgrRatingValue + l2MgrRatingValue))/(2 * 10);
        var parentTable = $(this).parentsUntil("table");
        $(parentTable[parentTable.length-1])
            .find("tr:nth-child(2) td:first-child")
            .find("div:nth-child(2) input")
            .val(kpiScore);
        updateTotalKpiScore(goalSection);
    });
}

function updateTotalKpiScore(goalSection) {
    var totalKpiScore = 0.0;
    var customElements = $(goalSection).find("div.customelements");
    console.log("Individual KPI scores ::");
    $.each(customElements, function(index, individualGoal){
        var kpiScore = $(individualGoal).find("table tr:nth-child(2) td:first-child")
                                          .find("div:nth-child(2) input")
                                          .val();
        kpiScore = Number.isNaN(parseFloat(kpiScore)) ? 0.0 : parseFloat(kpiScore);
        console.log(kpiScore);
        totalKpiScore += kpiScore;
    });
    console.log("Total :: ", totalKpiScore);
    var totalKpiCustElem = $("div#sect_3 div.customelements");
    var totalKpiTable = $(totalKpiCustElem).find("table");
    var totalKpiScoreInput = $(totalKpiTable).find("tr:first-child")
                                                 .find("td:nth-child(2) input"); 
    $(totalKpiScoreInput).val(totalKpiScore);

    var mappingKpiDropDown = $(totalKpiTable).find("tr:nth-child(2)")
                                     .find("td:nth-child(2) select");
    $(mappingKpiDropDown).val(getMapping(totalKpiScore));
}

function getMapping(totalKpiScore){
    var ratingLabel = "Select";
    if(totalKpiScore >= 34.01){
        ratingLabel = KPI_RATING_LABEL_HIGH;
    }else if(totalKpiScore >= 28.01 && totalKpiScore <= 34.00){
        ratingLabel = KPI_RATING_LABEL_MEDIUM_HIGH;
    }else if(totalKpiScore >= 22.01 && totalKpiScore <= 28.00){
        ratingLabel = KPI_RATING_LABEL_MEDIUM;
    }else if(totalKpiScore >= 16.01 && totalKpiScore <= 22.00){
        ratingLabel = KPI_RATING_LABEL_LOW_MEDIUM;
    }else if(totalKpiScore >= 10.00 && totalKpiScore <= 16.00){
        ratingLabel = KPI_RATING_LABEL_LOW;
    }
    /* console.log("Rating label ::",ratingLabel); */
    return ratingLabel;
}