(function () {
  "use strict";
  WB.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStops = function (json) {
    return json;
  };

  var transformGetStopsError = function (status, response) {
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

  WB.UserService.prototype.getStopsForUser = function (username, callback) {
    var url = "users/stops?username=" + username;
    WB.makeRestCall(this.xhrFactory(), url, transformGetStopsError, parseStops, callback);
  };

  var transformAddUserError = function (status, response) {
    console.log("Error adding user. Server returned", status, response);
    return "Could not create user.";
  };

  var transformAddStopError = function (status, response) {
     if (status === 404) {
      try {
        if (JSON.parse(response).message === "Stop Id not found") {
          return "Stop ID not found";
        }
      } catch (e) {
        // Probably the response didn't parse as JSON.
        // In any case, ignore it & return the generic error message below.
      }
    }
    return "Could not add stop.";
  };


  WB.UserService.prototype.createUser = function (username, callback) {
    var body = {username: username };
    WB.makeRestPost(this.xhrFactory(), "users", body, transformAddUserError, callback);
  };

  WB.UserService.prototype.addStop = function (username, stopId, callback) {
    var url = "users/" + encodeURIComponent(username) + "/stops";
    var body = {stopId: stopId};
    WB.makeRestPost(this.xhrFactory(), url, body, transformAddStopError, callback);
  };
}());

