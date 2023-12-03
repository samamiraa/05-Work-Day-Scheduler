// '.ready' makes sure the code isn't run until the browser has finished rendering all the elements
$(document).ready(function() { 
// created variable for class 'savebtn'
var saveDescription = $('.saveBtn');

$(function () {
  // listens for click at each save button
  saveDescription.on('click', function() {
    // created var for the value of 'saveBtn' sibling class 'description'
    var description = $(this).siblings('.description').val();
    // created var for 'saveBtn' parent, each attribute ID
    var hourID = $(this).parent().attr("id");

    // sets attribute IDs as key and description as value
    localStorage.setItem(hourID, description);
    });

    // iteration function for each class time block
    $('.time-block').each(function() {
      // created var for the div that has class timeblock to get same div's ID attribute
      var hourID = $(this).attr('id');

      //created var to get each ID value stored in local storage
     var showDescription = localStorage.getItem(hourID);
     //div that has class 'timeblock', child to this div is the textarea that has class 'description' plaves value in local storage in appropriate ID
     $(this).children('.description').val(showDescription);
    });

  // function to compare current time to time block hour  
  function checkTime() {
    //var that uses 'dayjs'
    var hour = dayjs();
    //var for current hour formatted in 24 hour time
    var currentHour = hour.format('HH');

    // iteration function for each class time block
    $('.time-block').each(function() {
      // var created to parse each ID attribute hour by splitting word 'hour' from integar
      var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
 
      //condition stmt if timeblock hour is less than current hour
      if (timeBlockHour < currentHour) {
        //div that has class time block, adds 'past' class, makes bg of time block gray
        $(this).addClass('past');
        //div that has class time block, removes 'present' class
        $(this).removeClass('present');
        //div that has class time block, removes 'future' class
        $(this).removeClass('future');
        //condition stmt if timeblock hour is equal to current hour
      } else if (timeBlockHour == currentHour) {
        //div that has class time block, adds 'present' class, makes bg of time block red
        $(this).addClass('present');
        //div that has class time block, removes 'past' class
        $(this).removeClass('past');
        //div that has class time block, removes 'future' class
        $(this).removeClass('future');
        //condtition for every other possiblity, ie. timeblock hour is greater than current
      } else {
        //div that has class time block, adds 'future' class, makes bg of time block green
        $(this).addClass('future');
        //div that has class time block, removes 'present' class
        $(this).removeClass('present');
        //div that has class time block, removes 'past' class
        $(this).removeClass('past');
      };

    });
  };
 // calls to run function
  checkTime();

  //reloads page every minute to keep time up to date
  setInterval(function() {
    //reloads page
    location.reload();
    //60000ms = 60s
  }, 60000);

  //creates var that uses 'dayjs'
  var currentDay = dayjs();
  //creates var for day and the format for day of week
  var dayWeek = currentDay.format('dddd');
  //creates var for time, format four hour and minutes
  var currentTime = currentDay.format('HH:mm');
  //concatenates text for ID to show day of wee, date and time
  $('#currentDay').text(dayWeek + ", " + currentDay.format('MMM D, YYYY') + " " + currentTime);
});
});