chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /* If the plugin is clicked */
        if('average calculator' === request.message){
            var quarter = $("div[id='381:_stepsChartStepName']").html().toLowerCase();
            //console.log('quarter : ', quarter);
            if(-1 != quarter.indexOf('q1')) {
                var quarter1 = $('#sect_3');
                var leftTabs = quarter1.find("div[class='leftTabs']");
                //console.log('leftTabs :',leftTabs.length);
                var rightTabs = quarter1.find("div[class='rightTabs']");
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
                //console.log('propLeftTables :',propLeftTables);
                for(var i = 0; i < rightTabs.length; i++) {
                    
                    var propRightTable = $(rightTabs[i]).find("tr[class='propTable']");
                    //console.log('propRightTable : ',propRightTable);
                    for(var j=0; j<propRightTable.length; j++){
                        propRightTablesList.push(propRightTable[j]);
                    }
                }
                //console.log('propLeftTables propRightTables :'+propLeftTablesList.length+' '+propRightTablesList.length);
                var kraList = createKraList(propLeftTablesList, propRightTablesList);
                var result = calculateAchievement(kraList);

                $('#wf_sect_7_e_0').val(result.empActual+' %');
                $('#wf_sect_8_e_ele_10').val(result.raActual+' %');
            }
        }
    }
);

function createKraList(propLeftTables, propRightTables) {
    var kraList = [];   
    for(var i = 0; i < propLeftTables.length; i+=4) {
        var kra = {'goalWeightage':0, 'raInput':0, 'empInput':0};
        for(var j=0; j<4; j++){
            var leftLabel = $(propLeftTables[i+j]).find("td[class='lab']").html();
            var leftValue = $(propLeftTables[i+j]).find("td[class='val']").html();
            //console.log('lLabel :', leftLabel);
            //console.log('lvalue :', leftValue);
            if("Goal Weightage" === leftLabel) {
                leftValue = (null == leftValue)? 0: leftValue;
                kra.goalWeightage = parseFloat(leftValue.replace('%',''));
            }
            else if("% Q1 Achievement (RA)" === leftLabel) {
                leftValue = (null == leftValue)? 0: leftValue;
                kra.raInput = parseFloat(leftValue.replace('%',''));
            }
        }
        //console.log('kra :', kra);
        kraList.push(kra);
    }
    //console.log('kraList :', kraList);
    for(var i = 0; i < propRightTables.length; i+=4) {
        for(var j=0; j<4; j++){
            var rightLabel = $(propRightTables[i+j]).find("td[class='lab']").html();
            var rightValue = $(propRightTables[i+j]).find("td[class='val']").html();
            //console.log('rLabel :', rightLabel);
            //console.log('rValue :', rightValue);
            if("% Q1 Achievement (Employee)" === rightLabel) {
                rightValue = (null == rightValue)? 0: rightValue;
                //console.log('kra :',kraList[(i+4)/4-1]);
                kraList[(i+4)/4-1].empInput = parseFloat(rightValue.replace('%',''));
            }
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
    console.log('result :',result);
    return result;
}