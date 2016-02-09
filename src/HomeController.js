(function () {
  "use strict";
  WB.HomeController = class extends WB.Controller {
    constructor(browserLocationService, stopService, navService) {
      if (!navService) {
        throw "Wrong number of arguments to HomeController ctor";
      }

      super();
      this.loginClicked = new WB.Event();
      this._browserLocationService = browserLocationService;
      this._stopService = stopService;
      this._navService = navService;
    }
  
    createDom() {
      var dom = this.createDomFromTemplate("#template_HomeController");
  
      dom.querySelector(".log-in").addEventListener("click", event => {
        event.preventDefault();
        this.loginClicked.trigger();
      });
  
      dom.querySelector(".nearby-stops").addEventListener("click", event => {
        event.preventDefault();
        if (!(this._child instanceof WB.NearbyStopsController)) {
          this._showNearbyStops();
        }
      });
  
      return dom;
    }
  
    _showNearbyStops() {
      this._child = new WB.NearbyStopsController(this._browserLocationService, this._stopService);
      this._child.appendTo(this._root.querySelector(".child"));
      this._child.shouldShowStop.subscribe(stopId => {
        this._child.remove();
        this._child = new WB.StopInfoController(stopId, null, this._stopService, this._navService);
        this._child.appendTo(this._root.querySelector(".child"));
      });
    }
  };
}());
