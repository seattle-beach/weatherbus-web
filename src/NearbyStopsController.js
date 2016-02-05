(function () {
  "use strict";

  WB.NearbyStopsController = class extends WB.Controller {
    constructor(browserLocationService) {
      super();
      this._browserLocationService = browserLocationService;
    }

    createDom() {
      var dom = this.createDomFromTemplate("#template_NearbyStopsController");
      return dom;
    }
  
    shown() {
      this._browserLocationService.getLocation(position => {
        this._map = new google.maps.Map(this._root.querySelector(".map-container"), {
          center: position,
          zoom: 16
        });
      });
    }
  };
}());
