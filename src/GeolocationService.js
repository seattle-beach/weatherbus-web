(function () {
  "use strict";
  WB.GeolocationService = function () {
  };

  WB.GeolocationService.prototype.getLocation = function (callback) {
    navigator.geolocation.getCurrentPosition(function (location) {
      callback({lat: location.coords.latitude, lng: location.coords.longitude});
    });
  };
}());
