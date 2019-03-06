var EMPTY_STRING = "";
/*
var calculateButton = '<div class=" pmFooterButtonSpacing">'+
'<span id="_calculate_span" class="buttonset sfDialogBoxButtonWrapper"><span>'+
'<button style="background-color: azure;" class="globalRoundedCornersXSmall globalSecondaryButton buttonDefault" id="_calculate_button" type="button" accesskey="2">Calculate</button>'+
'</span></span></div>';
var footerButtons = $("#footer_buttons_rev").html();
*/
var empWghtdAvgTextInput;
var raWghtdAvgTextInput;
//$("#footer_buttons_rev").html(calculateButton + footerButtons);

function getQuarterId() {
    var quarter = $("div[class='sfStepsChartNameContainer'] div[class='sfStepsChartStepName sfStepsChartStepNamePosition']")
                   .html().toLowerCase();
    //console.log("Quarter :",quarter);
    empWghtdAvgTextInput = $("#sect_7 div[class='HRContentCell'] input");
    raWghtdAvgTextInput = $("#sect_8 div[class='HRContentCell'] input");
    if(-1 != quarter.indexOf('q1')) {   
        return '#sect_3';
    } else if(-1 != quarter.indexOf('q2')) {   
        return '#sect_4';
    } else if(-1 != quarter.indexOf('q3')) {   
        return '#sect_5';
    } else if(-1 != quarter.indexOf('q4')) { 
        empWghtdAvgTextInput = $("#sect_4 div[class='HRContentCell'] input");
        raWghtdAvgTextInput = $("#sect_5 div[class='HRContentCell'] input");  
        return '#sect_3';
    }  
}

function createKraList(propLeftTables, propRightTables) {
    var kraList = [];   
    var ra_achievement_label = "Achievement (RA)".toLowerCase();
    var emp_achievement_label = "Achievement (Employee)".toLowerCase();
    var goalWeightageFound = false;
    for(var i = 0; i < propLeftTables.length; i++) {
        var dataFound = false;
        var kra = {'goalWeightage':NaN, 'raInput':NaN, 'empInput':NaN};
        var leftLabel = $(propLeftTables[i]).find("td[class='lab']").html().toLowerCase();
        var leftValue = $(propLeftTables[i]).find("td[class='val']").html();
        //console.log('lLabel :', leftLabel);
        //console.log('lvalue :', leftValue);
        if("goal weightage" === leftLabel) {
            leftValue = (null == leftValue || EMPTY_STRING === leftValue) ? NaN : leftValue;
            kra.goalWeightage = Number.isNaN(leftValue) ? NaN : parseFloat(leftValue.replace('%',''));
            dataFound = true;
            goalWeightageFound = true;
        }
        if(-1 != leftLabel.indexOf(ra_achievement_label)) {
            if(goalWeightageFound){
                leftValue = (null == leftValue || EMPTY_STRING === leftValue) ? NaN : leftValue;
                kra = kraList.pop();
                //console.log('last item', kra);
                kra.raInput = Number.isNaN(leftValue) ? NaN : parseFloat(leftValue.replace('%',''));
                dataFound = true;
                goalWeightageFound = false;
            }
        }
        //console.log('kra :', kra);
        if(dataFound) {
            kraList.push(kra);
        }
    }
    //console.log('kraList :', kraList);
    var count = 0;
    for(var i = 0; i < propRightTables.length; i++) { 
        var rightLabel = $(propRightTables[i]).find("td[class='lab']").html().toLowerCase();
        var rightValue = $(propRightTables[i]).find("td[class='val']").html();
        //console.log('rLabel :', rightLabel);
        //console.log('rValue :', rightValue);
        if(-1 != rightLabel.indexOf(emp_achievement_label)) {
            rightValue = (null == rightValue || EMPTY_STRING === rightValue) ? NaN : rightValue;
            //console.log('kra :',kraList[(i+4)/4-1]);
            kraList[count++].empInput = Number.isNaN(rightValue) ? NaN : parseFloat(rightValue.replace('%',''));
        }
    }
    //console.log('kraList :',kraList);
    return kraList;
};

function calculateAchievement(kraList){
    var empActualAchievement = 0.0;
    var raActualAchievement = 0.0;

    for(var i=0; i<kraList.length; i++){
        var gw = kraList[i].goalWeightage;
        var empInput = kraList[i].empInput;
        var raInput = kraList[i].raInput;

        empActualAchievement += gw*empInput;
        raActualAchievement += gw*raInput;
    }

    var result = {
        'empActual' : (empActualAchievement/100).toFixed(2),
        'raActual' : (raActualAchievement/100).toFixed(2)
    }
    //console.log('Result :',result);
    return result;
}

function calculate(){
    //console.log('called calculate()');
    var quarterId = getQuarterId();
    var quarter = $(quarterId);
    //console.log('quarterId :',quarterId);
    //console.log('quarter :',quarter);
    var leftTabs = quarter.find("div[class='leftTabs']");
    //console.log('leftTabs :',leftTabs.length);
    var rightTabs = quarter.find("div[class='rightTabs']");
    //console.log('rightTabs :',rightTabs.length);
    var propLeftTablesList=[]; 
    var propRightTablesList=[];
    for(var i = 0; i < leftTabs.length; i++) {    
        var propLeftTable = $(leftTabs[i]).find("tr[class='propTable']");
        //console.log('propLeftTable : ',propLeftTable);
        for(var j=0; j<propLeftTable.length; j++){
            propLeftTablesList.push(propLeftTable[j]);
        }
    }
    //console.log('propLeftTablesList :',propLeftTablesList);
    for(var i = 0; i < rightTabs.length; i++) {    
        var propRightTable = $(rightTabs[i]).find("tr[class='propTable']");
        //console.log('propRightTable : ',propRightTable);
        for(var j=0; j<propRightTable.length; j++){
            propRightTablesList.push(propRightTable[j]);
        }
    }
    //console.log('propRightTablesList :',propRightTablesList);
    //console.log('propLeftTables propRightTables :'+propLeftTablesList.length+' '+propRightTablesList.length);
    var kraList = createKraList(propLeftTablesList, propRightTablesList);
    var result = calculateAchievement(kraList);

    empWghtdAvgTextInput.val(isNaN(result.empActual)?'NA':(result.empActual+' %'));
    raWghtdAvgTextInput.val(isNaN(result.raActual)?'NA':(result.raActual+' %'));  

    //Making the input text boxes readonly
    empWghtdAvgTextInput.prop('readonly', true);
    raWghtdAvgTextInput.prop('readonly', true);
}

$(document).ready(function(){
    calculate();
});