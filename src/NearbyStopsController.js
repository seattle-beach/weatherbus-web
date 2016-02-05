(function () {
  "use strict";

  WB.NearbyStopsController = function (locationService) {
    this._locationService = locationService;
  };

  WB.NearbyStopsController.prototype = new WB.Controller();

  WB.NearbyStopsController.prototype.createDom = function () {
    var dom = this.createDomFromTemplate("#template_NearbyStopsController");
    return dom;
  };

  WB.NearbyStopsController.prototype.shown = function () {
    var that = this;
    this._locationService.getLocation(function (position) {
      that._map = new google.maps.Map(that._root.querySelector(".map-container"), {
        center: position,
        zoom: 16
      });
    });
  };
}());
