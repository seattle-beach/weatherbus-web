(function () {
  "use strict";
  WB.LocationService = function () {
  };

  WB.LocationService.prototype.hash = function () {
    return location.hash;
  };

  WB.LocationService.prototype.search = function () {
    return location.search;
  };

  WB.LocationService.prototype.pushState = function (hash) {
    history.pushState(null, "WB", hash);
  };

  WB.LocationService.prototype.navigate = function (url) {
    window.location = url;
  };
}());
