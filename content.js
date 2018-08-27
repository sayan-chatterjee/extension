const DAYS = 'Date';

var start_date_input = $('#fbo5_edit0_xstart');
var end_date_input = $('#fbo5_edit0_xdue');
var fa_date_input = $('#fbo5_edit0_xfa');
var pa_date_input = $('#fbo5_edit0_xpa');
var ea_date_input = $('#fbo5_edit0_xea');
var target_element = $('#fbo5_edit0_xtarget-baseline');

var kraType = $("#fbo5_edit0_xUOM option:selected").text();

var saveButton = $('button[id="wizNextButtonedit"');
var disableClass = 'tgm-v12-wizard-btn globalPlacematText globalHumanistText tgm-v12-wizard-btn-no-bg globalSecondaryButton';
var enableClass='globalPrimaryButton tgm-v12-wizard-btn globalHumanistText';

/* Adding the Refresh Target button only when there will be Target present */
if(null!=target_element.val()){
    $('#wizCancelButtonedit').after(
        '<button id="_refresh_target" title="Refresh"'+ 
        'accesskey="" data-isprimary="true" '+
        'class="'+enableClass+'" '+
        'aria-live="polite" type="button">Refresh</button>');
    
    /* Disabling Target Days*/
    target_element.prop('readonly', true);
    /* Disabling the Save button */
    saveButton.removeClass(enableClass);
    saveButton.prop('disabled', true);
    saveButton.addClass(disableClass);
}

/* checking if this is Days or non-days KRA selection on load */
if(DAYS === kraType){
    /* Disabling the look up table */
    $('#fbo5_edit0_xmetric-lookup-table input[type="text"]').prop('readonly', true);
    end_date_input.prop('disabled', true);
    fa_date_input.prop('readonly', false);
    pa_date_input.prop('readonly', false);
    ea_date_input.prop('readonly', false);
} else {
    /* Enabling the look up table */
    $('input[id="fbo5_edit0_xmetric-lookup-table_achievement"]').prop('readonly', false);
    $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#1"]').prop('readonly', false);
    $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#2"]').prop('readonly', false);

    end_date_input.prop('disabled', false);
    fa_date_input.val('DD/MM/YYYY');
    fa_date_input.prop('disabled', true);
    pa_date_input.val('DD/MM/YYYY');
    pa_date_input.prop('disabled', true);
    ea_date_input.val('DD/MM/YYYY');
    ea_date_input.prop('disabled', true);
}

/* Change of dropdown */
$('#fbo5_edit0_xUOM').change(function() {
    var prevState = kraType;
    kraType = $("#fbo5_edit0_xUOM option:selected" ).text();
    if(DAYS === kraType){
        /* clearing the values */
        target_element.val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement"]').val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#1"]').val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#2"]').val(0);
        /* Disabling the look up table */
        $('#fbo5_edit0_xmetric-lookup-table input[type="text"]').prop('readonly', true);
        end_date_input.val('DD/MM/YYYY');
        end_date_input.prop('disabled', true);
        fa_date_input.prop('disabled', false);
        pa_date_input.prop('disabled', false);
        ea_date_input.prop('disabled', false);
    } else if(DAYS === prevState){
        /* clearing the values */
        target_element.val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement"]').val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#1"]').val(0);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#2"]').val(0);
        /* Enabling the look up table */
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement"]').prop('readonly', false);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#1"]').prop('readonly', false);
        $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#2"]').prop('readonly', false);
        
        end_date_input.prop('disabled', false);
        fa_date_input.val('DD/MM/YYYY');
        fa_date_input.prop('disabled', true);
        pa_date_input.val('DD/MM/YYYY');
        pa_date_input.prop('disabled', true);
        ea_date_input.val('DD/MM/YYYY');
        ea_date_input.prop('disabled', true);

    }
});

/* Adding click event to the Refresh Target button */
$('#_refresh_target').click(function(){   
    if(DAYS === kraType){
        /* Get the date value as string */
        var start_date_str = $('#fbo5_edit0_xstart').val();
        var fa_date_str = $('#fbo5_edit0_xfa').val();
        var pa_date_str = $('#fbo5_edit0_xpa').val();
        var ea_date_str = $('#fbo5_edit0_xea').val();

        /* convert the string values to date object */
        var date_component = start_date_str.split("/");   
        var start_date = new Date(date_component[2], date_component[1] - 1, date_component[0]);
        date_component = fa_date_str.split("/");
        var fa_date = new Date(date_component[2], date_component[1] - 1, date_component[0]);
        date_component = pa_date_str.split("/");
        var pa_date = new Date(date_component[2], date_component[1] - 1, date_component[0]);
        date_component = ea_date_str.split("/");
        var ea_date = new Date(date_component[2], date_component[1] - 1, date_component[0]);

        /* calculate the difference as no. of days and rounding off using toFixed */
        var fa_value = ((new Date(fa_date - start_date))/(1000 * 3600 * 24)).toFixed();
        var pa_value = ((new Date(pa_date - start_date))/(1000 * 3600 * 24)).toFixed();
        var ea_value = ((new Date(ea_date - start_date))/(1000 * 3600 * 24)).toFixed();

        /* populate the values in achievement look up table */
        var valsArr = [pa_value, fa_value, ea_value];
        var lookUpTable = $('#fbo5_edit0_xmetric-lookup-table input[type="text"]');    
        for(var i=0; i<lookUpTable.length ; i++) {
            valsArr[i] = (isNaN(valsArr[i])) ? 0 : valsArr[i];
            $(lookUpTable[i]).val(valsArr[i]);
        }

        /* populate the target days with FA value */
        target_element.val(valsArr[1]);
    } else {
        /* Get the fa days value as string */
        var fa_days = $('input[id="fbo5_edit0_xmetric-lookup-table_achievement_#1"]').val();
        target_element.val(fa_days);
    }

    /* Disabling the Refresh button */
    $('button[id="_refresh_target"').removeClass(enableClass);
    $('button[id="_refresh_target"').prop('disabled', true);
    $('button[id="_refresh_target"').addClass(disableClass);
    /* Disabling the look up table */
    $('#fbo5_edit0_xmetric-lookup-table input[type="text"]').prop('readonly', true);
    /* Disabling the Date fields */
    start_date_input.prop('disabled', true);
    end_date_input.prop('disabled', true);
    fa_date_input.prop('disabled', true);
    pa_date_input.prop('disabled', true);
    ea_date_input.prop('disabled', true);
    /* Disabling the Unit of Measure dropdown */
    $('#fbo5_edit0_xUOM').prop('disabled', true);
    /* Enabling the Save button */
    saveButton.removeClass(disableClass);
    saveButton.prop('disabled', false);
    saveButton.addClass(enableClass);
});