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
    this._departureTable = dom.querySelector(".departures");
    return dom;
  };

  var appendCellWithText = function (row, text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
  };

  var formatDepartureTime = function (rawTime) {
    if (rawTime === 0) {
      return "";
    }

    var date = new Date(rawTime);
    var minutes = date.getMinutes();
    return date.getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes);
  };

  Weatherbus.StopInfoController.prototype.shown = function () {
    var that = this;

    this._stopService.getInfoForStop(this._stopId, function (error, value) {
      var errorNode, tbody;
      var loading = that._root.querySelector(".loading");
      loading.classList.add("hidden");

      if (error) {
        errorNode = that._root.querySelector(".error");
        errorNode.classList.remove("hidden");
        errorNode.textContent = error;
      } else {
        that._root.querySelector(".lat").textContent = value.latitude;
        that._root.querySelector(".lng").textContent = value.longitude;
        tbody = that._departureTable.querySelector("tbody");
        value.departures.forEach(function (departure) {
          var row = tbody.insertRow(-1);
          appendCellWithText(row, departure.routeShortName + " "  + departure.headsign);
          appendCellWithText(row, formatDepartureTime(departure.scheduledTime));
          appendCellWithText(row, formatDepartureTime(departure.predictedTime));
        });
      }
    });
  };
}());
