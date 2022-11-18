$(function() {
    $(function() {
        $("#event-name").focus();
        if ($('#all-day-event-checkbox')[0].checked) {
            showAllDayEventOptions();
        }
    });
    var lastkey = 0;
    checkRequired()
    $(document).on( 'keydown', function( e ){
        if ( ! $( e.target ).is( ':input' ) ) {
        // console.log(e.which);
            if ( 67 == e.which && e.shiftKey ) {
            // "Dispath event 'create event'"
                $('#create-event-button').click();
                $(document).trigger('log', ['keyBoardCreate', {key1: "val1", key2: "val2"}])
            }
        }
        });

    // Event to see if a checkbox is being checked through the keyboard
    $(document).on('keydown', function(e){
        if(lastkey==9 && e.keyCode == 32){
            $(document).trigger('log', ['checkBoxKeyBoard', {target: e.target.value}]);
        }
        lastkey = e.keyCode;
    });
    $( "#event-start-date" ).datetimepicker();
    $( "#event-end-date" ).datetimepicker();
    $("#all-day-event-date").datetimepicker({
        timepicker: false,
        onChangeDateTime: function(dp, $input) {
            var datetime = $input.val();
            var date = datetime.split(" ")[0];
            $input.val(date);
        }
    });
    
    $( "#recurrent-event-end-date" ).datetimepicker();

    $('#all-day-event-checkbox, #all-day-event-checkbox1').change(function() {
        console.log("here");
        if ($('#all-day-event-checkbox')[0].checked) {
            showAllDayEventOptions();
        } else {
            hideAllDayEventOptions();
        }
    });

    $('#recurrent-event-type-selector').change(function() {
        var val = $("#recurrent-event-type-selector option:selected").val();
        hideRecurrentEventOptions();
        hideRecurrentEventDetails();
        
        if (val == "custom") {
            showRecurrentEventOptions();
        } else {
            resetAllRecurrentEventDetails();
        }

        if (val == ("none")) {
            hideRecurrentEventEndDetails();
        } else {
            showRecurrentEventEndDetails();
        }
    });

    $('#recurrent-event-time-selector').change(function() {
        var val = $("#recurrent-event-time-selector option:selected").val();
        hideRecurrentEventDetails();

        if (val == "daily") {
            $('#daily-recurrent-details').show();
        } else if (val == "weekly") {
            $('#weekly-recurrent-details').show();
        } else if (val == "monthly") {
            $('#monthly-recurrent-details').show();
        } else if (val == "yearly") {
            $('#yearly-recurrent-details').show();
        }
    });
    $('#event-end-date, #event-start-date ').on('change', function(){
        console.log('Changing');
        time_b = $('#event-end-date').val();
        time_a = $('#event-start-date').val();
        // console.log("Time a is" + time_a);
        if(time_a && time_b){
            time_a= time_a.split(" ")[0].split("/");
            time_b= time_b.split(" ")[0].split("/");
            timea = new Date(time_a[0], time_a[1], time_a[2])
            timeb = new Date(time_b[0], time_b[1], time_b[2])
            // diff = Math.abs(time_a - time_b);
            diff = Math.abs(timeb.getTime()- timea.getTime());
            diff = diff/3600000;
            diff = diff/24;
        }
        else{
            return ;
        }
        if(diff>0){
            $(".ct option[value='daily']").remove();
            $(".ct option[value='day']").remove();
        }else{

        }
        if(diff > 7){
            $(".ct option[value='weekly']").remove();
            $(".ct option[value='week']").remove();
        }else{

        }
        if(diff>28){
            $(".ct option[value='monthly']").remove();
            $(".ct option[value='month']").remove();
        }
    });
    $('input[type=text]').focus(function() { 
        $(this).select(); 
    });
    $('input[data-required]').on('change', function(){
        checkRequired();
    });
    var date = new Date();
    var day = String(date.getDate());
    var month = String(date.getMonth()+1);
    var year = String(date.getFullYear());
    var hours = String(date.getHours());
    var minutes = String(date.getMinutes());
    var date_value = year+"/"+month+"/"+day+" "+hours+":"+minutes;
    var all_day = year+"/"+month+"/"+day;
    $('#event-start-date').val(date_value);
    $('#all-day-event-date').val(all_day);
});

// Functions to reset recurrent event interface
function hideRecurrentEventDetails() {
    $('#daily-recurrent-details').hide();
    $('#weekly-recurrent-details').hide();
    $('#monthly-recurrent-details').hide();
    $('#yearly-recurrent-details').hide();
}
function hideRecurrentEventOptions() {
    $('#recurrent-event-details-line').hide();
    $('#recurrent-event-details').hide();
}
function showRecurrentEventOptions() {
    $('#recurrent-event-details-line').show();
    $('#recurrent-event-details').show();
    $('#daily-recurrent-details').show();
}
function resetAllRecurrentEventDetails() {
    $('#recurrent-event-time-selector').val('daily');
    $('.weekday-checkbox').prop('checked', false);
    $('.day-checkbox').prop('checked', false);
    $('.month-checkbox').prop('checked', false);
}
function showAllDayEventOptions() {
    $('#start-time-row').hide();
    $('#end-time-row').hide();
    $('#all-day-event-row').show();
}
function hideAllDayEventOptions() {
    $('#all-day-event-row').hide();
    $('#start-time-row').show();
    $('#end-time-row').show();
    // $('#all-day-event-date').val('');
}
function showRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').show();
}
function hideRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').hide();
    $('#recurrent-event-end-date').val('');
}

// hacky way to get the button to accommodate size of hidden divs in Safari
function hideAndShowCreateEventButtom() {
    $('#create-event-button').hide();
    $('#create-event-button').show();
}

function checkRequired(){
    var state = true;
    $('input[data-required]').each(function(index, item){
        if($(item).val().length == 0){
            state=false;
        }
    })
    if(state){
        $('#create-event-button').removeClass('disabled');
    }else{
        $('#create-event-button').addClass('disabled');
    }
}