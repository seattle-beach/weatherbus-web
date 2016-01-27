(function () {
  "use strict";
  Weatherbus.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStops = function (json) {
    return json;
  };

  var transformError = function (status, response) {
    if (status === 404) {
      try {
        if (JSON.parse(response).message === "User not found") {
          return "No such user.";
        }
      } catch (e) {
        // Probably the response didn't parse as JSON.
        // In any case, ignore it & return the generic error message below.
      }
    }

    return "There was an error retrieving stops.";
  };

  Weatherbus.UserService.prototype.getStopsForUser = function (username, callback) {
    var url = "users/stops?username=" + username;
    Weatherbus.makeRestCall(this.xhrFactory(), url, transformError, parseStops, callback);
  };
}());

