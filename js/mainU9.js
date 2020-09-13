// FIREBASE

var firebaseConfig = {
  apiKey: "AIzaSyBXaDssCjvuyMRmxIuta_BddI2TUoaA4I4",
  authDomain: "reservation-site-846dd.firebaseapp.com",
  databaseURL: "https://reservation-site-846dd.firebaseio.com",
  projectId: "reservation-site-846dd",
  storageBucket: "reservation-site-846dd.appspot.com",
  messagingSenderId: "811937789533",
  appId: "1:811937789533:web:516ab3a4ce3e013c637fb4"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// From here it's all about reservations:

var reservationData = {}; // This object is where the name and the date of the reservation are going to be stored. 

var tempDay; // This variable will store the data from the "Select day" drop down menu 

$('.reservation-day li').on('click', function() {
  return tempDay = $(this).text();
});

$('.reservation-form').on('submit', function(e) { // Once the user submit the data
  e.preventDefault();
  reservationData.name = $('.reservation-name').val(); // here, the name is stored in reservationData
  $('.reservation-name').val(''); // And then the value is emptied in the textbox on the page
  reservationData.day = tempDay; // here, the day is stored in reservationData

// Here it goes the logic to avoid the user only enter the name or the day and then submit or even submit without filling the two fields

  if (reservationData.name === "" || reservationData.day === undefined) {
    if (reservationData.name == "") {
      $('.reservation-name').addClass('noName');
      $('#dropdownMenu1').removeClass('noDay');
      if (reservationData.day !== undefined) {
        $('#makingReservationMessage').html("You are booking a reservation for " + tempDay.toLowerCase() + ", but you didn't introduce any name. </br> Please, enter a name for your reservation." );
        reservationData = {};
      } else {
        $('#makingReservationMessage').html("Please, enter your name and a day for your reservation." );
        $('#dropdownMenu1').addClass('noDay');
      }
    } else if (reservationData.day === undefined) {
      console.log('no day!!!');
      $('#makingReservationMessage').html("Hi " + reservationData.name + "! Please, tell us when do you want your reservation for. </br> Please, enter a date for your reservation." );
      $('#dropdownMenu1').addClass('noDay');
      $('.reservation-name').val(reservationData.name);
      $('.reservation-name').removeClass('noName');
      reservationData = {};
    }
  } else {
    $('#makingReservationMessage').html("Dear " + reservationData.name + ". Thank you very much for your reservation. </br> We are looking forward to see you " + reservationData.day.toLowerCase() + ".");
    $('#dropdownMenu1').removeClass('noDay');
    $('.reservation-name').removeClass('noName');
    var reserationsReference = database.ref('reservations');
    reserationsReference.push(reservationData);
    reservationData = {};
    tempDay = undefined;
  }
});

// This function gets the data for the reservations from Firebase to be displayed on the page using Handlebars

function getReservations(){
  database.ref('reservations').on('value',function(results) {
    var allReservations = results.val();
    $('.reservations').empty();
    var context = {};
    for (var i = 0; i < Object.keys(allReservations).length; i++){
      context['name'] = Object.values(allReservations)[i].name;
      context['day'] = Object.values(allReservations)[i].day;
      context['reservationId'] = Object.keys(allReservations)[i];

      var source = $("#reservation-template").html();

      var template = Handlebars.compile(source);

      var reservationListItem = template(context);

      $('.reservations').append(reservationListItem);
    }
  });
}

getReservations();

// Reservations finishes here:

// Comment's starts here:

var commentData = {};

$('.comment-form').on('submit', function(e) {
  e.preventDefault();
  commentData.text = $('.comment-text').val();
  $('.comment-text').val('');

  var commentsReference = database.ref('clientsComments');

  commentsReference.push(commentData);
});

function getComments(){
  database.ref('clientsComments').on('value',function(results) {
    var allComments = results.val();
    $('.clientsComments').empty();
    var context = {};
    for (var i = 0; i < Object.keys(allComments).length; i++){
      context['text'] = Object.values(allComments)[i].text;
      context['commentId'] = Object.keys(allComments)[i];

      var source = $("#comment-template").html();

      var template = Handlebars.compile(source);

      var commentListItem = template(context);

      $('.clientsComments').append(commentListItem);
    }
  });
}

getComments();

// Cancelling the reservations:

$('.reservations').on('click', '.remove', function (e) {
  e.preventDefault()
  // Get the ID for the comment we want to update
  var id = $(e.target).parent().parent().data('id')
  // var id = $(this).parent().parent().data('id');

  // find comment whose objectId is equal to the id we're searching with
  var reservationReference = database.ref('reservations/' + id)

  // Use remove method to remove the comment from the database
  reservationReference.remove()

});

// OPENING HOURS

// https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone
// https://www.codesdope.com/blog/article/how-to-create-a-digital-clock-using-javascript/

// const timeNeyYork = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

function currentTime() {
  var today = new Date();
  var hour = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  var day = today.getDay();

  var dayWord = today.getDay();

  switch(dayWord) {
    case 0:
      dayWord = 'Sunday';
      break;
    case 1:
      dayWord = 'Monday';
      break;
    case 2:
      dayWord = 'Tuesday';
      break;
    case 3:
      dayWord = 'Wednesday';
      break;
    case 4:
      dayWord = 'Thursday';
      break;
    case 5:
      dayWord = 'Friday';
      break;
    case 6:
      dayWord = 'Saturday';
      break;
  }

  var monthWord = today.getMonth();

  switch(monthWord) {
    case 0:
      monthWord = 'January';
      break;
    case 1:
      monthWord = 'February';
      break;
    case 2:
      monthWord = 'March';
      break;
    case 3:
      monthWord = 'April';
      break;
    case 4:
      monthWord = 'May';
      break;
    case 5:
      monthWord = 'June';
      break;
    case 6:
      monthWord = 'July';
      break;
    case 7:
      monthWord = 'August';
      break;
    case 8:
      monthWord = 'September';
      break;
    case 9:
      monthWord = 'October';
      break;
    case 10:
      monthWord = 'November';
      break;
    case 11:
      monthWord = 'December';
      break;
  }

  var dayNumber = today.getDate()

  var appendix = function() {
    if (dayNumber === 1) {
      return "st";
    } else if (dayNumber === 2) {
      return "nd";
    } else {
      return "th";
    }
  }

  $('#date').html("Today is " + dayWord + ", the " + dayNumber + appendix() + " of " + monthWord + ", " + today.getFullYear() + " and this is the time now: ");

  if (day === 2 || day === 3 || day === 4) {
    if (hour > 6 && hour <= 23 || hour === 0) {
      $('#status').html("Come and join us! </br> We are open!!!");
    } else {
      $('#status').html("We are closed at the moment. Please, check the opening times table that you can see on the lext side of the screen and come back soon!!!");
    }
  } else {
    $('#status').html("Come and join us! </br> Today we are open 24h!!!");
  }

  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  day = updateTime(day);
  $("#clock").html(hour + " : " + min + " : " + sec); /* adding time to the div */
  var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime(); /* calling currentTime() function to initiate the process */

// The function that creates the map goes at the very end in case it gives an error. If that would happen it would stop the page loading.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 12,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}

initMap();