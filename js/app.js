function Model() {

  var self = this;

  //Hardcoded list of locations
  self.locations = [{
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
  self.home = [42.9364111, -72.8888549];

  //Create an empty array to store a list of map markers
  self.markers = [];
  self.infoWindows = [];
}

var model = new Model();


function appVM() {
  var self = this;

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
