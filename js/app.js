function Model() {

  var self = this;

  //Hardcoded list of locations
  self.defLocations = [{
    name: "1900' Burger",
    lat: 42.9672693,
    lng: -72.8964758,
    icon: "<i class='fa fa-cutlery'>&nbsp</i><i class='fa fa-beer'></i>",
    venue_id: "4d31dc00ceb62d4367ece961",
    business_id: null,
  }, {
    name: "Cuzzins Bar and Grill",
    lat: 42.9675362,
    lng: -72.8966528,
    icon: "<i class='fa fa-cutlery'>&nbsp</i><i class='fa fa-beer'></i>",
    venue_id: "4ad4a2a8f964a52073e820e3",
    business_id: null,
  }, {
    name: "The Bull Wheel",
    lat: 42.9601797,
    lng: -72.9225016,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>",
    venue_id: "5298eab7498ea48249ee85cd",
    business_id: null,
  }, {
    name: "The Snow Barn",
    lat: 42.964592,
    lng: -72.892258,
    icon: "<i class='fa fa-beer'></i>&nbsp<i class='fa fa-music'></i>",
    venue_id: "41e46880f964a520d01e1fe3",
    business_id: null,
  }, {
    name: "World Class Ski and Sport",
    lat: 42.9448568,
    lng: -72.8651127,
    icon: "<i class='fa fa-shopping-bag'></i>",
    venue_id: "4f48f75ae4b0291e48e4d5ce",
    business_id: null,
  }, {
    name: "Dover Joe's",
    lat: 42.9501808,
    lng: -72.8779057,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>",
    venue_id: "4d445b4ae198721e3fd4ba8b",
    business_id: null,
  }, {
    name: "The Valley View Saloon",
    lat: 42.395519,
    lng: -72.856280,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>",
    venue_id: "4b6a4ab6f964a52000d12be3",
    business_id: null,
  }, {
    name: "The Lodge @ Mont Snow",
    lat: 42.9648109,
    lng: -72.8889477,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>&nbsp<i class='fa fa-bed'></i>",
    venue_id: "4bc0d88d4cdfc9b68d989321",
    business_id: null,
  }, {
    name: "Snow Lake Lodge",
    lat: 42.9644927,
    lng: -72.8901137,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>&nbsp<i class='fa fa-bed'></i>",
    venue_id: "4b5a3af9f964a5200ab628e3",
    business_id: null,
  }, {
    name: "The Matterhorn Inn",
    lat: 42.9496089,
    lng: -72.8745406,
    icon: "<i class='fa fa-cutlery'></i>&nbsp<i class='fa fa-beer'></i>&nbsp<i class='fa fa-bed'></i>",
    venue_id: "4b8c88e6f964a52087d532e3",
    business_id: null,
  }, {
    name: "Sports Odyssey",
    lat: 42.9484209,
    lng: -72.8725026,
    icon: "<i class='fa fa-shopping-bag'></i>",
    venue_id: "4cb0985fdb32f04dca06c14d",
    business_id: null,
  }];

  //Set the home location coordinates to initialize the map here
  self.defLoc = [42.9399955, -72.8661593, 13];

  //Create an empty array to store a list of map markers
  self.markers = [];
  self.infoWindows = [];
}

var model = new Model();


function appVM() {
  var self = this;
  // Foursquare ID and Secret Token for the api.
  var FSCLIENT_ID = 'SCCAY03SWJPAHUTNJNEDCXXHHQC0MNPZFJGZCLIPXGRUVCLC';
  var FSCLIENT_SECRET = '020SLKZRVCSZK3BWLXUNHMB0DF5DA21XQQSHWH1DSN5D5QYQ';

  // Map Marker Variable.
  var markerBouncing = null;

  // InfoWindow Variable
  var openInfoWindow = null;

  // Marker and InfoWindow Content Variable and Array.
  var infoWindowHTML = '';
  self.infoWindowHTMLs = [];

  // Search term empty Variable.
  self.searchTerm= ko.observable('');

  // Error Message Observable.
  self.errorMessage = ko.observable("hidden");

  // Converts location data object's name's to an array then pushes to an
  // observable.

  self.dispResults = function(defLocations) {
    self.dispResultsList = [];
    self.searchList = [];
    for (i = 0; i < model.defLocations.length; i++) {
      var item = model.defLocations[i].name;
      self.dispResultsList.push(item);
      // We can Uncomment below for Case Insensitive search, we'll
      // test a little more before we do.
      // self.searchList.push(item.toLowerCase());
    }
    self.results = ko.observableArray(self.dispResultsList.slice(0));
  };
  // Invokes initResults function on our locations.
  self.dispResults(model.defLocations);

  // Various functions to Add, Remove Last and Clear the tag input list.
  self.tags = ko.observableArray();
  self.tagToAdd = ko.observable("");
  self.addTag = function() {
    if ((self.tagToAdd() !== "") && (self.tags.indexOf(self.tagToAdd()) < 0))
      self.tags.push(self.tagToAdd());
    self.tagToAdd("");
  };
  self.removeLastTag = function() {
    self.tags.pop();
  };
  self.clearTags = function() {
    self.tags.removeAll();
  };

  // Begining of our google map functions.
  function dispMap(latlng) {
    //var marker;
    var mapDisp = document.getElementById('map');
    var gLatLng = latlng;
    var mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      center: gLatLng,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(mapDisp, mapOptions);
    var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: gLatLng,
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    return map;
  }

  // Default Location Based off the data in the Model(appM).
  self.defLatLng = new google.maps.LatLng(model.defLoc[0], model.defLoc[1]);

  // Fires Up the Map.
  self.map = dispMap(self.defLatLng);

  // Api call to FourSquare, to start pulling Data.
  // If we wanted to get trick, maybe we could put this in a
  // service worker one day.

  self.fsApiCall = function(defLocations) {
    for (var i = 0; i < model.defLocations.length; i++) {
      var url = "https://api.foursquare.com/v2/venues/" +
        model.defLocations[i].venue_id +
        "?client_id=" + FSCLIENT_ID +
        "&client_secret=" + FSCLIENT_SECRET +
        "&v=20151220&callback=appVM.fsCallBack";
      var newFSscript = document.createElement("script");
      newFSscript.setAttribute('src', url);
      newFSscript.setAttribute('id', 'jsonp');
      // Looks for succesful loading of the resource. If onload fires, we Clear
      // the Message Timer (mesTimer).
      newFSscript.setAttribute('onload', 'clearTimeout(appVM.mesTimer)');
      var expiredFSscript = document.getElementById('jsonp');
      var head = document.getElementsByTagName('head')[0];
      if (expiredFSscript === null) {
        head.appendChild(newFSscript);
      } else {
        head.replaceChild(newFSscript, expiredFSscript);
        console.log('New Script Ran');
      }
    }
  };

  // Our Error Message timer... If fourSquare does not return any results
  // WE RIOT... J/K LOL... We'll just throw an error.
  self.mesTimer = setTimeout(function() {
    self.errorMessage('UH OH, We called 4S and they did not answer.');
  }, 6000);

  //Proccesses the json data from our default location and api call to
  // foursquare. Creates HTML to populate the infowindows.
  self.fsCallBack = function(data) {
    model.infoWindows.forEach(function(item, index, array) {
      if (item.content == data.response.venue.name) {
        infoWindowHTML = "<p><strong><a class='place-name' href='" +
          data.response.venue.canonicalUrl + "'>" +
          data.response.venue.name +
          "</a></strong></p>" +
          "<p>" + data.response.venue.location.address +
          "</p><p><span class='place-rating'><strong>" +
          data.response.venue.rating +
          "</strong><sup> / 10</sup></span>" +
          "<span class='place-category'>" +
          data.response.venue.categories[0].name +
          "</p><p>" + data.response.venue.hereNow.count +
          " people checked-in now</p>" +
          "<img src='" + data.response.venue.photos.groups[0].items[0].prefix +
          "80x80" +
          data.response.venue.photos.groups[0].items[0].suffix +
          "'</img>";
        item.setContent(infoWindowHTML);
        console.log('Info Window Content Good');
      } else {
        console.log('Name MisMatch');
      }
    });
  };

  function addMarker(map, latlng, title, content, icon) {
    var markerOptions = {
      position: latlng,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      clickable: true,
      //icon: icon
    };
    var marker = new google.maps.Marker(markerOptions);
    marker.addListener('click', toggleBounce);

    var infoWindowOptions = {
      content: content,
      position: latlng
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    model.infoWindows.push(infoWindow);

    google.maps.event.addListener(marker, 'click', function(){
      if (openInfoWindow) openInfoWindow.close();
      openInfoWindow = infoWindow;
      infoWindow.open(map, marker);
    });
    google.maps.event.addListener(infoWindow, 'closeclick', toggleBounce);

    function toggleBounce() {
      if (markerBouncing) {
        markerBouncing.setAnimation(null);
      }
      if (markerBouncing != marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        markerBouncing = marker;
      } else {
        markerBouncing = null;
      }
    }

    return marker;
  }

  // InfoWindow Toggle-er
  function toggleInfoWindow(id) {
    google.maps.event.trigger(model.markers[id], 'click');
  }

  // Function to interate through hardcoded Default Locations
  // and get them on the map.
  self.initMap =  function(data) {
    for (var i = 0; i < data.length; i++) {
      var location = data[i];
      var gMapLatLong = new google.maps.LatLng(model.defLocations.lat, model.defLocations.lng);
      var windowContent = model.defLocations.name;
      //creates Marker, Adds to map
      var marker = addMarker(self.map, gMapLatLong, model.defLocations.name, windowContent, model.defLocations.icon);
      // Makrers to Data Model
      model.markers.push(marker);
    }
  };

  // Calls the foursquare APi.
  self.fsApiCall(model.defLocations);

  // fires off the initmap function, passing in the data from the Model.
  self.initMap(model.defLocations);

}
// Gets some visuals ready when the app first loads.
var init = function() {
  $(document).ready(function() {
    $('.collapsible').collapsible({
      accordion: true
    });
    $('#showTags').click(function() {
      $('#tagInput').toggle('slow');
      clearTags();
    });
  });
};

var appVM = new appVM();
init();
ko.applyBindings(appVM);
