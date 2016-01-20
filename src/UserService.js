(function () {
  "use strict";
  Weatherbus.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStops = function (json) {
    return json;
  };

  Weatherbus.UserService.prototype.getStopsForUser = function (username, callback) {
    var url = "users/stops?username=" + username;
    Weatherbus.makeRestCall(this.xhrFactory(), url, "There was an error retrieving stops.", parseStops, callback);
  };
}());
