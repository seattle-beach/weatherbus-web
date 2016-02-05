(function () {
  "use strict";

  WB.NearbyStopsController = class extends WB.Controller {
    constructor(browserLocationService, stopService) {
      super();
      this._browserLocationService = browserLocationService;
      this._stopService = stopService;
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

        this._stopService.getStopsNearLocation(position, (error, stops) => {
          if (!error) {
	          stops.forEach(stop => {
	            new google.maps.Marker({
	              position: {lat: stop.latitude, lng: stop.longitude},
	              map: this._map,
	              title: stop.name
	            });
	          });
          }
        });
      });
    }
  };
}());
