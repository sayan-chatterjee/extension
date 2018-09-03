chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /* If the plugin is clicked */
        const EMPTY_STRING = '';
        var kraNameRowStrtTag = '<tr id="_kra_name_INDEX"><td colspan="6">';
        var kraNameRowEndTag = '</td></tr>';
        var kraDetailsTag = 
        '<tr id="_kra_PA_IDX_1">'+
            '<td rowspan="3"></td>'+
            '<td rowspan="3">WT</td>'+
            '<td>PA: PA_WTG</td> <td></td>'+
            '<td rowspan="3"></td>'+
            '<td rowspan="3">SCORING</td>'+
        '</tr>'+ 
        '<tr id="_kra_FA_IDX_2"> <td>FA: FA_WTG</td> <td></td> </tr>'+ 
        '<tr id="_kra_EA_IDX_3"> <td>EA: EA_WTG</td> <td></td> </tr>';
            
        if('print_layout' === request.message){
            /* Injecting CSS in the printpreview iframe */
            var printPreviewHead = $('iframe#printpreview').contents().find("head");
            $(printPreviewHead).append($('<link>').attr("rel","stylesheet")
                               .attr("type","text/css").attr("href", request.bootstrap));
            $(printPreviewHead).append($('<link>').attr("rel","stylesheet")
                                .attr("type","text/css").attr("href", request.kraStyle));

            var printPreviewBody = $('iframe#printpreview').contents().find("body");
            var printPreviewForm = $(printPreviewBody).find('form[name="ppform"]');
            var rightPaneContent = printPreviewForm.find("div#rightcont");
            
            var kraNonDaysSection= $(rightPaneContent).find("table#sect_2");
            var kraDaysSection= $(rightPaneContent).find("table#sect_3");
            
            /************** Non Days KRA **************/
            var sectionItem = $(kraNonDaysSection).find('table.sectionItem');           
            /* tr for list of KRAs */
            var kraName = EMPTY_STRING;

            /* collect KRA names */
            var kraCount = sectionItem.length;
            for(var i=0; i<kraCount; i++){
                var kra_name = $(sectionItem[i]).find("div.imName").html();
                kraName += (kraNameRowStrtTag.replace('INDEX', i+1) + kra_name + kraNameRowEndTag);
            }
            /* add KRS Details */
            var kraDetails = EMPTY_STRING;
            for(var i=0; i<kraCount; i++){ 
                var score = $(sectionItem[i]).find("div.imWeight").text();
                var tablePttb = $(sectionItem[i]).find("table.pttb");
                /* KRA Summary weightage */
                var wt = $(tablePttb[0]).find("div.pvValue");
                var kraDetailsTagTemp = kraDetailsTag.replace('SCORING', score);  
                kraDetailsTagTemp = kraDetailsTagTemp.replace('WT', wt[0].innerText);
                /* GET the PA FA EA target values */
                var pa_fa_ea = $(tablePttb[1]).find("tr .pv div");
                var label_pa_fa_ea = $(tablePttb[1]).find("tr .pl");
                var daysValues = [];
                for(var j=0; j<pa_fa_ea.length; j++){
                    var data = $(pa_fa_ea[j]).html();
                    var l = $(label_pa_fa_ea[j]).html();
                    if(l === "Target"){
                         console.log(data);
                         daysValues.push(data);
                    }
                        
                
                    
                }
                
                kraDetailsTagTemp = kraDetailsTagTemp.replace('PA_WTG', daysValues[0]);
                kraDetailsTagTemp = kraDetailsTagTemp.replace('FA_WTG', daysValues[1]);
                kraDetailsTagTemp = kraDetailsTagTemp.replace('EA_WTG', daysValues[2]);

                kraDetails = kraDetails + kraDetailsTagTemp.replace(/IDX/g, i+1);
                kraDetailsTagTemp = kraDetailsTag;
            }

            /* remove section items */
            sectionItem.remove();
            var headerRowSpan = 7 + (kraCount*4);
            /* append the table */
            kraNonDaysSection.find('div.sectDesc').after(table.replace('HEADER_ROWSPAN', headerRowSpan));
            /* add the KRA list after the _name_kra row */ 
            kraNonDaysSection.find('table#_kra_table').find('tr#_name_kra').after(kraName);
            kraNonDaysSection.find('table#_kra_table').find('tr#_kra_desc_header').after(kraDetails);
            
            /************** Days KRA **************/
            sectionItem = $(kraDaysSection).find('table.sectionItem');           
            /* tr for list of KRAs */
            kraName = EMPTY_STRING;

            /* collect KRA names */
            kraCount = sectionItem.length;
            for(var i=0; i<kraCount; i++){
                var kra_name = $(sectionItem[i]).find("div.imName").html();
                kraName += (kraNameRowStrtTag.replace('INDEX', i+1) + kra_name + kraNameRowEndTag);
            }
            /* add KRS Details */
            var kraDetails = EMPTY_STRING;
            for(var i=0; i<kraCount; i++){ 
                var score = $(sectionItem[i]).find("div.imWeight").text();
                var tablePttb = $(sectionItem[i]).find("table.pttb");
                /* KRA Summary weightage */
                var wt = $(tablePttb[0]).find("div.pvValue");
                var kraDetailsTagTemp = kraDetailsTag.replace('SCORING', score);  
                kraDetailsTagTemp = kraDetailsTagTemp.replace('WT', wt[0].innerText);
                /* GET the PA FA EA target values */
                var pa_fa_ea = $(tablePttb[1]).find("tr .pv div");
                var label_pa_fa_ea = $(tablePttb[1]).find("tr .pl");
                var daysValues = [];
                for(var j=0; j<pa_fa_ea.length; j++){
                    var data = $(pa_fa_ea[j]).html();
                    var l = $(label_pa_fa_ea[j]).html();
                    if(l === "Target"){
                         console.log(data);
                         daysValues.push(data);
                    }
                        
                
                    
                }
                kraDetailsTagTemp = kraDetailsTagTemp.replace('PA_WTG', daysValues[0]);
                kraDetailsTagTemp = kraDetailsTagTemp.replace('FA_WTG', daysValues[1]);
                kraDetailsTagTemp = kraDetailsTagTemp.replace('EA_WTG', daysValues[2]);

                kraDetails = kraDetails + kraDetailsTagTemp.replace(/IDX/g, i+1);
                kraDetailsTagTemp = kraDetailsTag;
            }

            /* remove section items */
            sectionItem.remove();
            headerRowSpan = 7 + (kraCount*4);
            /* append the table */
            kraDaysSection.find('div.sectDesc').after(table.replace('HEADER_ROWSPAN', headerRowSpan));
            /* add the KRA list after the _name_kra row */ 
            kraDaysSection.find('table#_kra_table').find('tr#_name_kra').after(kraName);
            kraDaysSection.find('table#_kra_table').find('tr#_kra_desc_header').after(kraDetails);
        }   
    }
);


var table = '<div class="container _my_container">' +
                '<div class="table-responsive">'+
                    '<table class="table table-bordered table-hover" id="_kra_table">'+
                        '<tr id="_header">'+
                            '<td rowspan="HEADER_ROWSPAN"></td>'+
                            '<td colspan="6"></td>'+
                        '</tr>'+
                        '<tr class="_kra_header" id="_name_kra">'+
                            '<td colspan="6">Name : <br/>KRAs</td>'+
                        '</tr>'+
                        /* kraNames will come here */
                        '<tr id="_kra_desc_header">'+
                            '<td class="_kra_header">KRA</td>'+
                            '<td class="_kra_header">WT</td>'+
                            '<td class="_kra_header">% of weightage</td>'+
                            '<td class="_kra_header">Description of milestones</td>'+
                            '<td class="_kra_header">Achievement in actual figs</td>'+
                            '<td class="_kra_header" >Scoring</td>'+
                        '</tr>'+
                        /* kraDesc will come here */
                        '<tr>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="6"></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="6"></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td colspan="6"></td>'+
                        '</tr>'+
                    '</table>'+
                '</div>'+
            '</div>' ; 