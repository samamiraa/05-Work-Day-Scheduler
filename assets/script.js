// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() { 
  console.log("isready");
var saveDescription = $('.saveBtn');


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  saveDescription.on('click', function() {
    var description = $(this).siblings('.description').val();
    var hourID = $(this).parent().attr("id");

    localStorage.setItem(hourID, description);
    });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  //
  // TODO: Add code to display the current date in the header of the page.
  var currentDay = dayjs();
  var dayWeek = currentDay.format('dddd');
  var currentTime = currentDay.format('HH:mm');
  $('#currentDay').text(dayWeek + ", " + currentDay.format('MMM D, YYYY') + " " + currentTime);
});
});