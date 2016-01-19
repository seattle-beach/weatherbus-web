(function () {
  "use strict";
  Weatherbus.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStops = function (json) {
    return json.map(function (stop) {
      return stop.id;
    });
  };

  Weatherbus.UserService.prototype.getStopsForUser = function (username, callback) {
    var url = "http://localhost:8080/users/stops?username=" + username;
    Weatherbus.makeRestCall(this.xhrFactory(), url, "There was an error retrieving stops.", parseStops, callback);
  };
}());
