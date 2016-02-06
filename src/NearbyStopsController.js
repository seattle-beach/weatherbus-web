(function () {
  "use strict";

  var throttle = function (maxFrequency, func) {
    var once = false;
    var waiting = false;

    return function () {
      if (!once) {
        func();
        once = true;
      } else if (!waiting) {
        window.setTimeout(function () {
          func();
          waiting = false;
        }, maxFrequency);
        waiting = true;
      }
    };
  };

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
        this._map.addListener("bounds_changed", throttle(500, () => {
          this._stopService.getStopsNearLocation(this._map.getBounds(), (error, stops) => {
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
         }));
      });
    }
  };
}());
