(function () {
  "use strict";
  WB.HomeController = function (geolocationService) {
    this.loginClicked = new WB.Event();
    this._geolocationService = geolocationService;
  };

  WB.HomeController.prototype = new WB.Controller();

  WB.HomeController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_HomeController");

    dom.querySelector(".log-in").addEventListener("click", function (event) {
      event.preventDefault();
      that.loginClicked.trigger();
    });

    dom.querySelector(".nearby-stops").addEventListener("click", function (event) {
      event.preventDefault();
      that._showNearbyStops();
    });

    return dom;
  };

  WB.HomeController.prototype._showNearbyStops = function () {
    this._child = new WB.NearbyStopsController(this._geolocationService);
    this._child.appendTo(this._root.querySelector(".child"));
  };
}());
