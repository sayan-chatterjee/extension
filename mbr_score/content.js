var dataArray = [];
var WEIGHTAGE_KEY = "Weightage";
var RATING_KEY = "Rating";
var SCORE_KEY = "Score";
var STATUS_KEY = "Status";

var STATUS_ACTIVE = "Active";
var STATUS_DROP = "Drop";
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
    dataArray.forEach(element => {
        console.log(element);
        //Calculation logic to be written
    });
};

$(document).ready(function(){
    calculateScore(getData());
});