(function () {
  "use strict";
  Weatherbus.StopInfoController = function (stopId, routeFilter, stopService, locationService) {
    this._stopId = stopId;
    this._stopService = stopService;
    this._locationService = locationService;
    this._routeFilter = routeFilter;
  };

  Weatherbus.StopInfoController.prototype = new Weatherbus.Controller();

  Weatherbus.StopInfoController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_StopInfoController");
    var filterLink = dom.querySelector(".filter-link");
    this._departureTable = dom.querySelector(".departures");

    filterLink.addEventListener("click", function (event) {
      event.preventDefault();
      that._showFilter();
      filterLink.classList.add("hidden");
    });

    return dom;
  };

  Weatherbus.StopInfoController.prototype._showFilter = function () {
    var that = this;
    this._filterController = new Weatherbus.RouteFilterController(that._routes());
    this._filterController.appendTo(this._root.querySelector(".filter-container"));
    this._filterController.completed.subscribe(function (routes) {
      that._locationService.navigate("?stop=" + that._stopId + "&routes=" + routes.join(","));
    });
  };

  var appendCellWithText = function (row, text) {
    var cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
  };

  var formatTime = function (date) {
    if (!date) {
      return "";
    }

    var minutes = date.getMinutes();
    return date.getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes);
  };

  var formatDepartureTime = function (departure) {
    if (departure.predictedTime) {
      return formatTime(departure.predictedTime);
    } else {
      return formatTime(departure.scheduledTime) + " (scheduled)";
    }
  };

  Weatherbus.StopInfoController.prototype._routes = function () {
    var routes = [];
    var i;
    for (i = 0; i < this._departures.length; i++) {
      if (routes.indexOf(this._departures[i].routeShortName) === -1) {
        routes.push(this._departures[i].routeShortName);
      }
    }
    return routes;
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

        that._departures = value.departures;
        value.departures.forEach(function (d) {
          if (that._shouldShowDeparture(d)) {
            var row = tbody.insertRow(-1);
            appendCellWithText(row, d.routeShortName + " "  + d.headsign);
            appendCellWithText(row, formatDepartureTime(d));
          }
        });
      }
    });
  };

  Weatherbus.StopInfoController.prototype._shouldShowDeparture = function (departure) {
    if (this._routeFilter === null) {
      return true;
    }
    
    return this._routeFilter.indexOf(departure.routeShortName) !== -1;
  };
}());
