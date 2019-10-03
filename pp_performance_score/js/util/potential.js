function calculatePotential(potentialSection){
    var potentialCustElem = $(potentialSection).find("div.customelements");
    var competencyCount = potentialCustElem.length;
    console.log("Competency count :: ", competencyCount);
    
    potentialCustElem.find("select").change(function(){
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

        var potentialScore = 0.0;
        if(competencyCount >= 1){
            potentialScore = ((l1MgrRatingValue + l2MgrRatingValue)/(competencyCount*2)) * 10;
        }
        
        var parentTable = $(this).parentsUntil("table");
        /* Populating individual potentialScore score */
        var indvPotential = $(parentTable[parentTable.length-1])
                                    .find("tr:nth-child(2) td:first-child")
                                    .find("div:nth-child(2) input");
        $(indvPotential).val(potentialScore.toFixed(2));
        $(indvPotential).attr("readonly", "readonly");

        /* Updating total potential score */
        updateTotalPotentialScore(potentialSection);
    });
}

function updateTotalPotentialScore(potentialSection) {
    var totalPotentialScore = 0.0;
    var potentialCustElem = $(potentialSection).find("div.customelements");
    console.log("Individual Potential scores ::");
    $.each(potentialCustElem, function(index, individualPotential){
        var potentialScore = $(individualPotential)
                                .find("table tr:nth-child(2) td:first-child")
                                .find("div:nth-child(2) input")
                                .val();
        potentialScore = Number.isNaN(parseFloat(potentialScore)) ? 0.0 : parseFloat(potentialScore);
        console.log(potentialScore);
        totalPotentialScore += potentialScore;
    });
    console.log("Total :: ", totalPotentialScore);
    var totalPotentialCustElem = $("div#sect_7 div.customelements");
    var totalPotentialTable = $(totalPotentialCustElem).find("table");
    var totalPotentialScoreInput = $(totalPotentialTable).find("tr:first-child")
                                                         .find("td:nth-child(2) input"); 
    /* Populating the total potential score */
    $(totalPotentialScoreInput).val(totalPotentialScore.toFixed(2));
    $(totalPotentialScoreInput).attr("readonly", "readonly");

    /* Clearing pre-selected rating label */
    var mappingPotentialDropDown = $(totalPotentialTable).find("tr:nth-child(2)")
                                                         .find("td:nth-child(2) select");
    $(mappingPotentialDropDown).find("option").removeAttr('selected');
    /* Calculating rating label based on new inputs and setting them in dropdown */
    var ratingLabel = getPotentialMapping(totalPotentialScore);
    $.each($(mappingPotentialDropDown).find("option"), function(index, optionElem){
        if(ratingLabel === $(optionElem).text()) {
            $(optionElem).attr('selected', 'selected');
        }
    });
    $(mappingPotentialDropDown).attr("disabled", true);
    /* $(mappingPotentialDropDown).find("option[value='" + ratingLabel + "']")
                               .attr('selected', 'selected'); */
    $(mappingPotentialDropDown).parent().siblings("input").val(ratingLabel);

    mapFinalRating();
}

function getPotentialMapping(totalPotentialScore){
    var ratingLabel = "Select";
    if(totalPotentialScore >= 34.01){
        ratingLabel = RATING_LABEL_HIGH;
    }else if(totalPotentialScore >= 28.01 && totalPotentialScore <= 34.00){
        ratingLabel = RATING_LABEL_MEDIUM_HIGH;
    }else if(totalPotentialScore >= 22.01 && totalPotentialScore <= 28.00){
        ratingLabel = RATING_LABEL_MEDIUM;
    }else if(totalPotentialScore >= 16.01 && totalPotentialScore <= 22.00){
        ratingLabel = RATING_LABEL_LOW_MEDIUM;
    }else if(totalPotentialScore >= 10.00 && totalPotentialScore <= 16.00){
        ratingLabel = RATING_LABEL_LOW;
    }
    console.log("Rating label ::",ratingLabel);
    return ratingLabel;
}
