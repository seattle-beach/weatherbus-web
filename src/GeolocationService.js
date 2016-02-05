(function () {
  "use strict";
  WB.GeolocationService = class {
    getLocation(callback) {
      navigator.geolocation.getCurrentPosition(function (location) {
        callback({lat: location.coords.latitude, lng: location.coords.longitude});
      });
    }
  };
}());
