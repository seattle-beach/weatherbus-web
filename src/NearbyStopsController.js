(function () {
  "use strict";

  WB.NearbyStopsController = function (geolocationService) {
    this._geolocationService = geolocationService;
  };

  WB.NearbyStopsController.prototype = new WB.Controller();

  WB.NearbyStopsController.prototype.createDom = function () {
    var dom = this.createDomFromTemplate("#template_NearbyStopsController");
    return dom;
  };

  WB.NearbyStopsController.prototype.shown = function () {
    var that = this;
    this._geolocationService.getLocation(function (position) {
      that._map = new google.maps.Map(that._root.querySelector(".map-container"), {
        center: position,
        zoom: 16
      });
    });
  };
}());
