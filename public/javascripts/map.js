var map;
var coords;
$(document).ready(function() {

  
  var layer = new L.StamenTileLayer("toner");
  
  var map = new L.Map("map", {
      center: new L.LatLng(37.8052612, -122.2719463),
      zoom: 12
  });
  map.addLayer(layer);


  // add geolocation

  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.locate({setView: true, maxZoom: 12});

  function onLocationFound(e) {
      var radius = e.accuracy / 2;
      var curLocation = e.latlng;
      coords = curLocation;
      var curLatitude = curLocation.lat;
      var curLongitude = curLocation.lng;
      
      // Add marker for current location
      
      var curLocationMarker = new L.Marker(curLocation);
      map.addLayer(curLocationMarker);
      curLocationMarker.bindPopup("Current Location").openPopup();
      
      // Add accuracy radius around current location
      
      var curLocationRadius = new L.Circle(curLocation, radius);
      map.addLayer(curLocationRadius);
      curLocationRadius.bindPopup("You are within " + radius + " meters from this point")

      // POST current location to get records within N miles
 
      $.post("/geo", {coords: {long: curLongitude, lat: curLatitude  }}, function(result) {
          for (var key in result) {
            if (result.hasOwnProperty(key)) {
              var LAT = result[key].coords.lat;
              var LONG = result[key].coords.long;
              L.marker(new L.LatLng(LAT, LONG)).bindPopup(result[key].comment).openPopup().addTo(map);
            };
          };
        });
  };
    

  function onLocationError(e) {
      alert(e.message);
  };
  
});


//        $.each(data, function(key, values) {
//          console.log("key: " + key + " values: " + values);


// var map;

// $("#mappage").live('pageinit', function() {

//   resizeMap();

//   var resizeTimer;
//   $(window).resize(function() {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(resizeMap, 100);
//   });

//   setTimeout(function() {

//     var toner = new L.StamenTileLayer("toner");

//     var map = new L.Map("map", {
//         center: new L.LatLng(37.7, -122.4),
//         zoom: 12
//     });
    
//     map.addLayer(toner);
//     map.redraw(true);



//   }, 400);


// });

// function resizeMap() {

//   var mapheight = $(window).height();
//   var mapwidth = $(window).width();
//   $("#map").height(mapheight);
//   $("#map").width(mapwidth);

// }



