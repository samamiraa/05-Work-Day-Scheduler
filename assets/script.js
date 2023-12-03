// '.ready' makes sure the code isn't run until the browser has finished rendering all the elements
$(document).ready(function() { 
  console.log("isready");
var saveDescription = $('.saveBtn');


$(function () {
  saveDescription.on('click', function() {
    var description = $(this).siblings('.description').val();
    var hourID = $(this).parent().attr("id");

    localStorage.setItem(hourID, description);
    });

    $('.time-block').each(function() {
      var hourID = $(this).attr('id');

     var showDescription = localStorage.getItem(hourID);
     $(this).children('.description').val(showDescription);
    });

  function checkTime() {
    var hour = dayjs();
    var currentHour = hour.format('HH');

    $('.time-block').each(function() {
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

      if (timeBlockHour < currentHour) {
        $(this).addClass('past');
        $(this).removeClass('present');
        $(this).removeClass('future');
      } else if (timeBlockHour == currentHour) {
        $(this).addClass('present');
        $(this).removeClass('past');
        $(this).removeClass('future');
      } else {
        $(this).addClass('future');
        $(this).removeClass('present');
        $(this).removeClass('past');
      };

    });
  };

  checkTime();

  setInterval(function() {
    location.reload();
  }, 60000);

  var currentDay = dayjs();
  var dayWeek = currentDay.format('dddd');
  var currentTime = currentDay.format('HH:mm');
  $('#currentDay').text(dayWeek + ", " + currentDay.format('MMM D, YYYY') + " " + currentTime);
});
});