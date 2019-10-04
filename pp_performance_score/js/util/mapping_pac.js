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
    var kpi_cv_mapping = getScoreMapping("objective", kpi_cv_score);

    /* Getting the total potential score */
    var totalPotentialCustElem = $("div#sect_7 div.customelements");
    var totalPotentialTable = $(totalPotentialCustElem).find("table");
    var totalPotentialScoreInput = $(totalPotentialTable).find("tr:first-child")
                                                         .find("td:nth-child(2) input");
    var totalPotentialScore = $(totalPotentialScoreInput).val();
    var potential_mapping = getScoreMapping("potential", totalPotentialScore);

    var rowSelect = $("div#sect_8 select[name='wf_sect_8_orating']");
    
    $(rowSelect).find("option").removeAttr('disabled');
    $(rowSelect).find("option[value='" + PAC_MAP_DORPDOWN[kpi_cv_mapping] + "']")
              .attr('selected', true);
    $(rowSelect).val(PAC_MAP_DORPDOWN[kpi_cv_mapping]);

    var colSelect = $("div#sect_8 select[name='wf_sect_8_crating']");
    
    $(colSelect).find("option").removeAttr('disabled');
    $(colSelect).find("option[value='" + PAC_MAP_DORPDOWN[potential_mapping] + "']")
                .attr('selected', true);    
    $(colSelect).val(PAC_MAP_DORPDOWN[potential_mapping]);

    console.log("obj ::",$("div#sect_8 select[name='wf_sect_8_orating'] :selected").val());
    console.log("pot ::",$("div#sect_8 select[name='wf_sect_8_crating'] :selected").val());

    $("div#sect_8 select option:not(:selected)").attr('disabled', true);
    updateEmpPos(kpi_cv_mapping, potential_mapping); 
}

function updateEmpPos(kpi_cv_mapping, potential_mapping) {
    var row = parseFloat(PAC_MAP_DORPDOWN[kpi_cv_mapping]);
    var col = parseFloat(PAC_MAP_DORPDOWN[potential_mapping]);
    //console.log("row, col :: ", row + ", " + col);
    var gridTable = $("table[title='Mapping PA-[C]'");
    var empPos = EMPLOYEE_POS_MARKER;
    //console.log("ball :: ", empPos);

    $(gridTable).find("tr td div img").remove();
    var rowIndex = 5, trIndex = 2;
    for(; rowIndex >=1 ; rowIndex--){
        if(rowIndex == row){
            //console.log("row ::: ", row);
            var trSelect = "tr:nth-child(" + trIndex + ")";
            //console.log("trSeclect ::: ", trSelect);
            var foundRow = $(gridTable).find(trSelect);
            $(foundRow).find("td:nth-child(" + col + ") div").append(empPos);

        }
        trIndex += 2;
    }
};

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
    //console.log(type+" Rating label ::",ratingLabel);
    return ratingLabel;
}


/*
function updateEmployeePos(row, col) {
    console.log(row + ", " + col);
    //var perfPotentialTable = $("table#formMatrix_table");
    var tableGridRows = perfPotentialTable.find("tr");
    //console.log(tableGridRows);
    // var empDetails = $(tableGridRows).find("td span[name='formMatrix_fullname_span']")
     //                         .parent().parent().html(); 
    var empDetails = EMPLOYEE_INFO_CARD;
    var employee_name = $("div[class='"+EMPLOYEE_NAME_CLASS+"']").text();
    var employee_id = $("div.pmUserInfo div.leftCol tr:nth-child(2) td.val").text();
    console.log("Emp name  and id ::", employee_name+"/"+employee_id);
    empDetails = empDetails.replace("EMP_NAME", employee_name);
    empDetails = empDetails.replace(/USER_ID/g, employee_id);
    // console.log("Emp details ::", empDetails); 
    // removing the emp info 
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
} */