// initialize the configuration of map
function initMap() {
  // use JS's built-in Navigator to get user's lat/lng coordinates
  navigator.geolocation.getCurrentPosition(function(position) {
    // create an object to store lat/lng data
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