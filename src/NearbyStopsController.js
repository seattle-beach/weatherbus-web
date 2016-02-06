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
      this._markers = {};
      this._infoWindows = {};
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
                if (!this._markers[stop.id]) {
                  this._makeMarker(stop);
                }
              });
            }
          });
         }));
      });
    }

    _makeMarker(stop) {
      var marker = this._markers[stop.id] = new google.maps.Marker({
        position: {lat: stop.latitude, lng: stop.longitude},
        map: this._map,
        title: stop.name
      });
      marker.addListener("click", () => {
        var w;
        if (!this._infoWindows[stop.id]) {
          w = this._makeInfoWindow(stop);
          this._infoWindows[stop.id] = w;
          w.open(this._map, marker);
          w.addListener("closeclick", () => {
            delete this._infoWindows[stop.id];
          });
        }
      });
    }

    _makeInfoWindow(stop) {
      return new google.maps.InfoWindow({ content: stop.name });
    }
  };
}());
