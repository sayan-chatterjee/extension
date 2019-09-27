const CURRENT_STEP = "sfcurrentstep"; 
const PERCENT_SIGN = "%";
const EMPTY_STRING = "";

const RATING_LABEL_HIGH = "High";
const RATING_LABEL_MEDIUM_HIGH = "Medium-High";
const RATING_LABEL_MEDIUM = "Medium";
const RATING_LABEL_LOW_MEDIUM = "Low-Medium";
const RATING_LABEL_LOW = "Low";

const PAC_RATING_LABEL_HIGH = "1.0 - High";
const PAC_RATING_LABEL_MEDIUM_HIGH = "2.0 - Medium High";
const PAC_RATING_LABEL_MEDIUM = "3.0 - Medium";
const PAC_RATING_LABEL_LOW_MEDIUM = "4.0 - Low Medium";
const PAC_RATING_LABEL_LOW = "5.0 - Low";

const PAC_MAP_DORPDOWN = { 
                            "1.0 - High" : "1.0",
                            "2.0 - Medium High" : "2.0",
                            "3.0 - Medium" : "3.0",
                            "4.0 - Low Medium" : "4.0",
                            "5.0 - Low" : "5.0"
                        };

const EMPLOYEE_NAME_CLASS = "userName globalPlacematAction sfPhotoInLine";
const EMPLOYEE_INFO_CARD = "<li class=\"movable\" id=\"formMatrix_cell_li_2016016\" userid=\"USER_ID\" style=\"cursor: move;\">"+
"<span id=\"formMatrix_fullname_span\" name=\"formMatrix_fullname_span\" style=\"visibility:visible;\">"+
"<span class=\"fullname\">EMP_NAME</span>&nbsp;<a href=\"#_1\" id=\"quickcard_matrix_grid_1\" aria-haspopup=\"true\" onkeydown=\"handleQuickCardKeyLaunch(this, event);\" onclick=\"handleQuickCardMouseLaunch(this, event, {autoFocus:false, trigger:'quickcard_matrix_grid_1', quickCardImgId:quickcard_matrix_grid_1, userId:'USER_ID'});\" title=\"View more information about this person\"><div class=\"qcIcon\"></div><span class=\"hiddenAriaContent\">View more information about this person</span>"+
"</a>&nbsp;</span></li>";