(function () {
  "use strict";
  Weatherbus.StopInfoController = function (stopId, stopService) {
    this._stopId = stopId;
    this._stopService = stopService;
  };

  Weatherbus.StopInfoController.prototype = new Weatherbus.Controller();

  Weatherbus.StopInfoController.prototype.createDom = function () {
    var template = document.querySelector("#template_StopInfoController").textContent;
    var dom = document.createElement("div");
    dom.innerHTML = template;
    return dom;
  };

  Weatherbus.StopInfoController.prototype.shown = function () {
    var that = this;

    this._stopService.getInfoForStop(this._stopId, function (error, value) {
      var errorNode;
      var loading = that._root.querySelector(".loading");
      loading.classList.add("hidden");

      if (error) {
        errorNode = that._root.querySelector(".error");
        errorNode.classList.remove("hidden");
        errorNode.textContent = error;
      } else {
        that._root.querySelector(".lat").textContent = value.latitude;
        that._root.querySelector(".lng").textContent = value.longitude;
      }
    });
  };
}());
