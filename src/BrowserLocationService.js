(function () {
  "use strict";
  WB.BrowserLocationService = class {
    getLocation(callback) {
      navigator.geolocation.getCurrentPosition(function (location) {
        callback({lat: location.coords.latitude, lng: location.coords.longitude});
      });
    }
  };
}());
