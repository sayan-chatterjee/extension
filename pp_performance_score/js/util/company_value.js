function calculateCompanyValue(companyValueSection){
    var companyValueCustElem = $(companyValueSection).find("div.customelements");
    companyValueCustElem.find("select").change(function(){
        var l2MgrRating = parseFloat(this.value);
        var l2MgrRatingValue = Number.isNaN(l2MgrRating) ? 0.0 : l2MgrRating;

        var parentTr = $(this).parentsUntil("tr");
        var l1MgrRating = $(parentTr[parentTr.length-1]).siblings().find("div:nth-child(2)").text();
        var l1MgrRatingValue = Number.isNaN(parseFloat(l1MgrRating)) ? 0.0 : parseFloat(l1MgrRating);

        var cvScore = l1MgrRatingValue + l2MgrRatingValue;
        var parentTable = $(this).parentsUntil("table");
        /* Populating individual comapny value score */
        $(parentTable[parentTable.length-1])
            .find("tr:nth-child(2) td:first-child")
            .find("div:nth-child(2) input")
            .val(cvScore);

        /* Updating total company value score */
        updateTotalCVScore(companyValueSection);
    });
}

function updateTotalCVScore(companyValueSection) {
    var totalCVScore = 0.0;
    var companyValueCustElem = $(companyValueSection).find("div.customelements");
    console.log("Individual Company Value scores ::");
    $.each(companyValueCustElem, function(index, individualCompanyValue){
        var cvScore = $(individualCompanyValue)
                                .find("table tr:nth-child(2) td:first-child")
                                .find("div:nth-child(2) input")
                                .val();
        cvScore = Number.isNaN(parseFloat(cvScore)) ? 0.0 : parseFloat(cvScore);
        console.log(cvScore);
        totalCVScore += cvScore;
    });
    console.log("Total :: ", totalCVScore);
    var totalCVCustElem = $("div#sect_5 div.customelements");
    var totalCVTable = $(totalCVCustElem).find("table");
    var totalCVScoreInput = $(totalCVTable).find("tr:first-child")
                                            .find("td:nth-child(2) input"); 
    /* Populating the total company value score */
    $(totalCVScoreInput).val(totalCVScore);

    /* Clearing pre-selected rating label */
    var mappingCVDropDown = $(totalCVTable).find("tr:nth-child(2)")
                                            .find("td:nth-child(2) select");
    $(mappingCVDropDown).find("option").removeAttr('selected');
    /* Calculating rating label based on new inputs and setting them in dropdown */
    var ratingLabel = getMapping(totalCVScore);
    $(mappingCVDropDown).find("option[value='" + ratingLabel + "']")
                         .attr('selected', 'selected');
    $(mappingCVDropDown).parent().siblings("input").val(ratingLabel);
}

function getMapping(totalCVScore){
    var ratingLabel = "Select";
    if(totalCVScore >= 34.01){
        ratingLabel = RATING_LABEL_HIGH;
    }else if(totalCVScore >= 28.01 && totalCVScore <= 34.00){
        ratingLabel = RATING_LABEL_MEDIUM_HIGH;
    }else if(totalCVScore >= 22.01 && totalCVScore <= 28.00){
        ratingLabel = RATING_LABEL_MEDIUM;
    }else if(totalCVScore >= 16.01 && totalCVScore <= 22.00){
        ratingLabel = RATING_LABEL_LOW_MEDIUM;
    }else if(totalCVScore >= 10.00 && totalCVScore <= 16.00){
        ratingLabel = RATING_LABEL_LOW;
    }
    console.log("Rating label ::",ratingLabel);
    return ratingLabel;
}