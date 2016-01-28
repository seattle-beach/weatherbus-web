(function () {
  "use strict";
  Weatherbus.LocationService = function () {
  };

  Weatherbus.LocationService.prototype.hash = function () {
    return location.hash;
  };

  Weatherbus.LocationService.prototype.pushState = function (hash) {
    history.pushState(null, "Weatherbus", hash);
  };
}());
