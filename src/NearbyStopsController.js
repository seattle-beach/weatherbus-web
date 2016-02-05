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
      this._geolocationService.getLocation(position => {
        this._map = new google.maps.Map(this._root.querySelector(".map-container"), {
          center: position,
          zoom: 16
        });
      });
    }
  };
}());
