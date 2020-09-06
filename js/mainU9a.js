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

var reservationData = {};

var tempDay;

$('.reservation-day li').on('click', function() {
  return tempDay = $(this).text();
});

console.log('tempDay', tempDay);

$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
  $('.reservation-name').val('');
  console.log('tempDayIn', tempDay);
  reservationData.day = tempDay;

console.log('aqui', reservationData);

// Here it goes the if statement

if (Object.keys(reservationData).length < 2 || reservationData.name === "" || reservationData.day === undefined) {
  if (reservationData.name == "") {
    console.log('no name!!!');
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
  // } else {
  //   console.log('nunca pasa¿?¿?');
  //   $('#dropdownMenu1').removeClass('noDay');
  //   $('.reservation-name').removeClass('noName');
  // }

  reservationData = {};
  console.log(reservationData);

  
  } else {
    console.log('todo bien');
    $('#makingReservationMessage').html("Dear " + reservationData.name + ". Thank you very much for your reservation. </br> We are looking forward to see you " + reservationData.day.toLowerCase() + ".");
    $('#dropdownMenu1').removeClass('noDay');
    $('.reservation-name').removeClass('noName');
    var reserationsReference = database.ref('reservations');
    reserationsReference.push(reservationData);
    console.log(reservationData, tempDay, "fin");
    reservationData = {};
    tempDay = undefined;
  }
});

// Here it finish the if statement

function getReservations(){
  database.ref('reservations').on('value',function(results) {
    var allReservations = results.val();
    $('.reservations').empty();
    //console.log(allReservations);
    //console.log(Object.keys(allReservations).length);
    var context = {};
    for (var i = 0; i < Object.keys(allReservations).length; i++){
      //console.log(Object.values(Object.values(allReservations)[i]));
      //console.log(Object.values(allReservations)[i].name);
      context['name'] = Object.values(allReservations)[i].name;
      context['day'] = Object.values(allReservations)[i].day;
      context['reservationId'] = Object.keys(allReservations)[i];

      //console.log(context.name);
      var source = $("#reservation-template").html();

      var template = Handlebars.compile(source);

      var reservationListItem = template(context);

      //console.log(reservationListItem);

      $('.reservations').append(reservationListItem);


    }
    //console.log(context);
  });
}

getReservations();

// Reservations finish here:

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
    //console.log(allComments);
    //console.log(Object.keys(allComments).length);
    var context = {};
    for (var i = 0; i < Object.keys(allComments).length; i++){
      //console.log(Object.values(Object.values(allComments)[i]));
      //console.log(Object.values(allComments)[i].text);
      context['text'] = Object.values(allComments)[i].text;
      context['commentId'] = Object.keys(allComments)[i];

      //console.log(context.text);
      var source = $("#comment-template").html();

      var template = Handlebars.compile(source);

      var commentListItem = template(context);

      //console.log(reservationListItem);

      $('.clientsComments').append(commentListItem);


    }
    //console.log(context);
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

// https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
// https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone

// const today = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
const today = new Date();
// console.log(today);
// console.log(today.getDay());
// console.log(today.getHours());

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

$('#date').append("Today is " + dayWord + ", the " + dayNumber + appendix() + " of " + monthWord + " of " + today.getFullYear() + " and this is the time now: ");
console.log(dayWord);
console.log(today.getHours());

if (today.getDay() === 2 || today.getDay() === 3 || today.getDay() === 4) {
  console.log("Tue, Wed, Thu");
  
  if (today.getHours() > 6 && today.getHours() <= 24) {
    // console.log("Open");
    $('#status').append("Come and join us, we are open!!!");
  } else if (today.getHours() === 0) {
    $('#status').append("Come and join us, we are open!!!"); 
  } else {
    // console.log("Closed");
    $('#status').append("Please, come back tomorrow, we are closed!!!");
  }

} else {
  console.log("It's not Tue, Wed or Thu");
  $('#status').append("Come and join us, today we are open 24h!!!");
}

// https://www.codesdope.com/blog/article/how-to-create-a-digital-clock-using-javascript/
//var openClosed = "open";

function currentTime() {
  var date = new Date(); //.toLocaleString("en-US", {timeZone: "America/New_York"}); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  //statusRes = updateTime(openClosed);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
  //$('#status1').html(openClosed);
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
