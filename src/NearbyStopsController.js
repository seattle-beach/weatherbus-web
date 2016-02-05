(function () {
  "use strict";

  WB.NearbyStopsController = class extends WB.Controller {
    constructor(geolocationService) {
      super();
      this._geolocationService = geolocationService;
    }

    createDom() {
      var dom = this.createDomFromTemplate("#template_NearbyStopsController");
      return dom;
    }
  
    shown() {
      var that = this;
      this._geolocationService.getLocation(function (position) {
        that._map = new google.maps.Map(that._root.querySelector(".map-container"), {
          center: position,
          zoom: 16
        });
      });
    }
  };
}());
