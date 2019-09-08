function mapFinalRating() {

    /* Getting the total kpi score */
    var totalKpiCustElem = $("div#sect_3 div.customelements");
    var totalKpiTable = $(totalKpiCustElem).find("table");
    var totalKpiScoreInput = $(totalKpiTable).find("tr:first-child")
                                             .find("td:nth-child(2) input");
    var totalKpiScore = $(totalKpiScoreInput).val();

    /* Getting the total company value score */
    var totalCVCustElem = $("div#sect_5 div.customelements");
    var totalCVTable = $(totalCVCustElem).find("table");
    var totalCVScoreInput = $(totalCVTable).find("tr:first-child")
                                           .find("td:nth-child(2) input"); 
    var totalCVScore = $(totalCVScoreInput).val();

    var kpi_cv_score = (0.7 * totalKpiScore) + (0.3 * totalCVScore);
    var kpi_cv_mapping = getScoreMapping(kpi_cv_score);

    /* Getting the total potential score */
    var totalPotentialCustElem = $("div#sect_7 div.customelements");
    var totalPotentialTable = $(totalPotentialCustElem).find("table");
    var totalPotentialScoreInput = $(totalPotentialTable).find("tr:first-child")
                                                         .find("td:nth-child(2) input");
    var totalPotentialScore = $(totalPotentialScoreInput).val();
    var potential_mapping = getScoreMapping(totalPotentialScore);

    var rowSelect = $("div#sect_9 select[name='formMatrix_rowRatingSelectionList']");
    $(rowSelect).find("option").removeAttr('selected');
    $(rowSelect).find("option[value='" + PAC_MAP[kpi_cv_mapping] + "']")
                .attr('selected', 'selected');

    var colSelect = $("div#sect_9 select[name='formMatrix_colRatingSelectionList']");
    $(colSelect).find("option").removeAttr('selected');
    $(colSelect).find("option[value='" + PAC_MAP[potential_mapping] + "']")
                .attr('selected', 'selected');

    updateEmployeePos();
}

function updateEmployeePos() {
    var rowSelect = document.getElementById('formMatrix_rowRatingSelectionList');
    var colSelect = document.getElementById('formMatrix_colRatingSelectionList');
    var changeEvent = new Event("onchange", {"bubbles":true, "cancelable":false});
    changeEvent.initEvent("onchange", true, true);
    rowSelect.dispatchEvent(changeEvent);
    colSelect.dispatchEvent(changeEvent);
}

function getScoreMapping(score) {
    var ratingLabel = "Select";
    if(score >= 34.01){
        ratingLabel = RATING_LABEL_HIGH;
    }else if(score >= 28.01 && score <= 34.00){
        ratingLabel = RATING_LABEL_MEDIUM_HIGH;
    }else if(score >= 22.01 && score <= 28.00){
        ratingLabel = RATING_LABEL_MEDIUM;
    }else if(score >= 16.01 && score <= 22.00){
        ratingLabel = RATING_LABEL_LOW_MEDIUM;
    }else if(score >= 10.00 && score <= 16.00){
        ratingLabel = RATING_LABEL_LOW;
    }
    console.log("Rating label ::",ratingLabel);
    return ratingLabel;
}