// initialize the configuration of map
function initMap() {
  // use JS's built-in Navigator to get user's lat/lng coordinates
  navigator.geolocation.getCurrentPosition(function(position) {
  //   // create an object to store lat/lng data
    var userLocation = {
      lat: 40.8054491,
      lng: -73.9654415
    };

    // create a new instance of a map
    // configure map with options object
    var map = new google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 17,
      scrollwheel: false
    });

    // use Marker constructor to add a marker to map
    var marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      title: 'User Location'
    });

  });
}

initMap();

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

$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
  $('.reservation-name').val('');

  var reserationsReference = database.ref('reservations');

  reserationsReference.push(reservationData);
});

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
      context['day'] = Object.values(allReservations)[i].day.toLowerCase();
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

