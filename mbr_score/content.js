var dataArray = [];
var WEIGHTAGE_KEY = "Weightage";
var RATING_KEY = "Rating";
var SCORE_KEY = "Score";
var STATUS_KEY = "Status";

var STATUS_ACTIVE = "Active";
var STATUS_DROP = "Drop (Specify reason in 'Achievement so far' comment box)";
var STATUS_DROP_RTNG = "Drop but considered for rating";

function getData() {   
    var goals = $("div[class='tabDataBorder']");
    $.each(goals, function (index, goal) {
        var goalAttrList = $(goal).find("table[class='goalDetailsTable']");
        var data = { STATUS_KEY: '', WEIGHTAGE_KEY: 0.0, RATING_KEY: 0.0, SCORE_KEY: 0.0 };
        $.each(goalAttrList, function(index, goalDtls) {
            var body = $(goalDtls).find("tbody");
            $.each(body, function(index, bodyDtls) {
                var rows = $(bodyDtls).find("tr");
                $.each(rows, function(index, row) {
                    var label = $(row).find("td[class='lab']").html();
                    var value = $(row).find("td[class='val']").html();
                    switch(label) {
                        case STATUS_KEY:
                            data.STATUS_KEY = value;
                            break;
                        case WEIGHTAGE_KEY:
                            data.WEIGHTAGE_KEY = parseFloat(value.replace("%", ""));
                            break;
                        case RATING_KEY:
                            data.RATING_KEY = parseFloat(value);
                            break;
                        case SCORE_KEY:
                            data.SCORE_KEY = parseFloat(value);
                            break;
                    } 
                });
            });  
        });
        //console.log("Data : "+JSON.stringify(data));  
        dataArray.push(data);   
    });
    return dataArray;    
}

function calculateScore(dataArray){
    var adjustment = 0;
    var mbr_score = 0;
    dataArray.forEach(element => {
        console.log(element);
        //Calculation logic to be written
        adjustment += (STATUS_DROP_RTNG === element.STATUS_KEY ? element.WEIGHTAGE_KEY : 0);
        mbr_score += (STATUS_ACTIVE === element.STATUS_KEY) ? (element.RATING_KEY / element.WEIGHTAGE_KEY) : 0;
    });
    //console.log("adjustment : ", adjustment);
    var annual_mbr_score = mbr_score * (100 - adjustment);
    //console.log("annual_mbr_score : ", annual_mbr_score);
    var annual_mbr_element = $("div h2[title='MBR Annual Score']");
    var mbr_score_element = annual_mbr_element.parent().siblings("div").find("div[class='HRContentCell'] input");
    //console.log(mbr_score_element.html());
    mbr_score_element.val(annual_mbr_score.toFixed(2));
    mbr_score_element.prop("readonly", true);
};

$(document).ready(function(){
    calculateScore(getData());
});