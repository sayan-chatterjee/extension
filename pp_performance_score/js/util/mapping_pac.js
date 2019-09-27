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
    var kpi_cv_mapping = getScoreMapping("KPI and CV", kpi_cv_score);

    /* Getting the total potential score */
    var totalPotentialCustElem = $("div#sect_7 div.customelements");
    var totalPotentialTable = $(totalPotentialCustElem).find("table");
    var totalPotentialScoreInput = $(totalPotentialTable).find("tr:first-child")
                                                         .find("td:nth-child(2) input");
    var totalPotentialScore = $(totalPotentialScoreInput).val();
    var potential_mapping = getScoreMapping("Potential", totalPotentialScore);

    var rowSelect = $("div#sect_8 select[name='formMatrix_rowRatingSelectionList']");
    $(rowSelect).find("option").removeAttr('selected');
    $(rowSelect).find("option[value='" + PAC_MAP_DORPDOWN[potential_mapping] + "']")
                .attr('selected', 'selected');

    var colSelect = $("div#sect_8 select[name='formMatrix_colRatingSelectionList']");
    $(colSelect).find("option").removeAttr('selected');
    $(colSelect).find("option[value='" + PAC_MAP_DORPDOWN[kpi_cv_mapping] + "']")
                .attr('selected', 'selected');
            
    /* Map the last overall rating */
    var totalRatingValue = $("div#sect_9 div.trrRatingDropdown select");
    console.log("overall rating :: ", totalRatingValue);

    updateEmployeePos(parseFloat(PAC_MAP_DORPDOWN[potential_mapping])-1, 
                      parseFloat(PAC_MAP_DORPDOWN[kpi_cv_mapping]-1));
}

function updateEmployeePos(row, col) {
    console.log(row + ", " + col);
    var perfPotentialTable = $("table#formMatrix_table");
    var tableGridRows = perfPotentialTable.find("tr");
    //console.log(tableGridRows);
    /* var empDetails = $(tableGridRows).find("td span[name='formMatrix_fullname_span']")
                              .parent().parent().html(); */
    var empDetails = EMPLOYEE_INFO_CARD;
    var employee_name = $("div[class='"+EMPLOYEE_NAME_CLASS+"']").text();
    var employee_id = $("div.pmUserInfo div.leftCol tr:nth-child(2) td.val").text();
    console.log("Emp name  and id ::", employee_name+"/"+employee_id);
    empDetails = empDetails.replace("EMP_NAME", employee_name);
    empDetails = empDetails.replace(/USER_ID/g, employee_id);
    /* console.log("Emp details ::", empDetails); */

    /* removing the emp info */
    $(tableGridRows).find("td span[name='formMatrix_fullname_span']")
                    .parent().remove();
    
    var limit = $(tableGridRows).length - 2;
    var rowIndex = 4, colIndex;
    $.each(tableGridRows, function(index, rows){
        if(index < limit){
            var cells = $(rows).find('td'); //Cells in each row
            if(rowIndex === row){
                for(colIndex = 0; colIndex < cells.length; colIndex++){
                    
                    if(colIndex === col){
                        console.log("=========Found=========");
                        console.log(rowIndex + ", " + colIndex);
                        $(cells[colIndex]).find("ul").append(empDetails);
                        $(cells[colIndex]).attr('visibility', 'visibility');
                        console.log($(cells[colIndex]).find("ul").html()); 
                    }      
                    
                }
            }
            rowIndex--;
        }
    });
}

function getScoreMapping(type, score) {
    var ratingLabel = "Select";
    if(score >= 34.01){
        ratingLabel = PAC_RATING_LABEL_HIGH;
    }else if(score >= 28.01 && score <= 34.00){
        ratingLabel = PAC_RATING_LABEL_MEDIUM_HIGH;
    }else if(score >= 22.01 && score <= 28.00){
        ratingLabel = PAC_RATING_LABEL_MEDIUM;
    }else if(score >= 16.01 && score <= 22.00){
        ratingLabel = PAC_RATING_LABEL_LOW_MEDIUM;
    }else if(score >= 10.00 && score <= 16.00){
        ratingLabel = PAC_RATING_LABEL_LOW;
    }
    console.log(type+" Rating label ::",ratingLabel);
    return ratingLabel;
}