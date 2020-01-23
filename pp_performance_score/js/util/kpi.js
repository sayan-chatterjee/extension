function calculateKpiScore(goalSection){
    var kpiCustomElements = $(goalSection).find("div.customelements");
    kpiCustomElements.find("select").change(function(){
        var options = $(this).find("option");
        var rating_map = {};
        $.each(options, function(index){
            var rating_text = $(this).text();
            var rating_value = $(this).val();
            rating_map[rating_text] = rating_value;
        });
        console.log('Map : ', JSON.stringify(rating_map));
        console.log('l2 rating : ', this.value);
        
        var l2MgrRating = parseFloat(this.value);
        var l2MgrRatingValue = Number.isNaN(l2MgrRating) ? 0.0 : l2MgrRating;
        
        var parentTr = $(this).parentsUntil("tr");
        var l1MgrRating = $(parentTr[parentTr.length-1]).siblings().find("div:nth-child(2)").text();
        console.log('l1 rating : ', rating_map[l1MgrRating]);
        var l1MgrRatingValue = Number.isNaN(parseFloat(rating_map[l1MgrRating])) ? 0.0 
                               : parseFloat(rating_map[l1MgrRating]);

        var weightageValue = 0.0;
        var parentDiv = $(this).parentsUntil("div[class='pmPanelContent globalPortletBody']");
        var topParent = $(parentDiv[parentDiv.length-1]).parent();
        /* var goalDetailsTable = $(parentDiv[parentDiv.length-1]).find("div.goalDetailsTab"); */
        var goalDetailsTable = $(topParent).find("div.goalDetailsTab");
        var goalDetailsItem = $(goalDetailsTable).find("tr");
        $.each(goalDetailsItem, function(index, row){
            var label = $(row).children("td.lab").text();
            var value = $(row).children("td.val").text();

            if(label.indexOf(PERCENT_SIGN) != -1){
                console.log("l1MgrRatingValue / l2MgrRatingValue/ weightage :: " + l1MgrRatingValue +" / " + l2MgrRatingValue + " / " + value); 
                var weightage = parseFloat(value.replace(PERCENT_SIGN, EMPTY_STRING));
                weightageValue = Number.isNaN(weightage) ? 0.0 : weightage;
            }
        });

        var kpiScore = (weightageValue * (l1MgrRatingValue + l2MgrRatingValue))/(2 * 10);
        var parentTable = $(this).parentsUntil("table");
        /* Populating individual goal score */
        var indvKpiInput = $(parentTable[parentTable.length-1])
                                .find("tr:nth-child(2) td:first-child")
                                .find("div:nth-child(2) input");
        $(indvKpiInput).val(kpiScore.toFixed(2));
        $(indvKpiInput).attr("readonly", "readonly");
        
        /* Updating total kpi score */
        updateTotalKpiScore(goalSection);
    });
}

function updateTotalKpiScore(goalSection) {
    var totalKpiScore = 0.0;
    var kpiCustomElements = $(goalSection).find("div.customelements");
    console.log("Individual KPI scores ::");
    $.each(kpiCustomElements, function(index, individualGoal){
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
    /* Populating the total kpi score */
    $(totalKpiScoreInput).val(totalKpiScore.toFixed(2));
    $(totalKpiScoreInput).attr("readonly", "readonly");

    /* Clearing pre-selected rating label */
    var mappingKpiDropDown = $(totalKpiTable).find("tr:nth-child(2)")
                                             .find("td:nth-child(2) select");
    $(mappingKpiDropDown).find("option").removeAttr('selected');
    /* Calculating rating label based on new inputs and setting them in dropdown */
    var ratingLabel = getKpiMapping(totalKpiScore.toFixed(2));

    $.each($(mappingKpiDropDown).find("option"), function(index, optionElem){
        if(ratingLabel === $(optionElem).text()) {
            $(optionElem).attr('selected', 'selected');
        }
    });
    $(mappingKpiDropDown).attr("disabled", true);
    /*$(mappingKpiDropDown).find("option[value='" + ratingLabel + "']")
                         .attr('selected', 'selected');*/
    $(mappingKpiDropDown).parent().siblings("input").val(ratingLabel);

    mapFinalRating();
}

function getKpiMapping(totalKpiScore){
    var ratingLabel = "Select";
    if(totalKpiScore >= 34.01){
        ratingLabel = RATING_LABEL_HIGH;
    }else if(totalKpiScore >= 28.01 && totalKpiScore <= 34.00){
        ratingLabel = RATING_LABEL_MEDIUM_HIGH;
    }else if(totalKpiScore >= 22.01 && totalKpiScore <= 28.00){
        ratingLabel = RATING_LABEL_MEDIUM;
    }else if(totalKpiScore >= 16.01 && totalKpiScore <= 22.00){
        ratingLabel = RATING_LABEL_LOW_MEDIUM;
    }else if(totalKpiScore >= 10.00 && totalKpiScore <= 16.00){
        ratingLabel = RATING_LABEL_LOW;
    }
    console.log("Rating label ::",ratingLabel);
    return ratingLabel;
}