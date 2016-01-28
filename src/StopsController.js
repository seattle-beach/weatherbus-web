(function () {
  "use strict";
  Weatherbus.StopsController = function (username, userService, stopService, locationService) {
    this.username = username;
    this.userService = userService;
    this.stopService = stopService;
    this.locationService = locationService;
  };

  Weatherbus.StopsController.prototype = new Weatherbus.Controller();

  Weatherbus.StopsController.prototype.createDom = function() {
    var dom = this.createDomFromTemplate("#template_StopsController");
    this._errorNode = dom.querySelector(".error");
    return dom;
  };

  Weatherbus.StopsController.prototype.shown = function () {
    var that = this;
    this.userService.getStopsForUser(this.username, function (error, stops) {
      that._stopsLoaded(error, stops);
    });
  };

  Weatherbus.StopsController.prototype._stopsLoaded = function (error, stops) {
    var i, ol;
    this._root.querySelector(".loading").classList.add("hidden");

    if (stops) {
      if (stops.length === 0) {
        this._showError("You don't have any favorite stops.");
      } else {
        for (i = 0; i < stops.length; i++) {
          ol = this._root.querySelector("ol");
          ol.appendChild(this._createStopNode(stops[i]));
        }
      }
    } else {
      this._showError(error);
    }
  };

  Weatherbus.StopsController.prototype._showError = function (msg) {
    this._errorNode.classList.remove("hidden");
    this._errorNode.textContent = msg;
  };

  Weatherbus.StopsController.prototype._createStopNode = function (stop) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var that = this;

    a.href = "#";
    a.addEventListener("click", function (event) {
      event.preventDefault();

      if (that._stopInfoController) {
        that._stopInfoController.remove();
      }

      that._stopInfoController = new Weatherbus.StopInfoController(stop.id, that.stopService);
      that._stopInfoController.appendTo(that._root);
      that.locationService.pushState("#stop-" + stop.id);
    });
    a.textContent = stop.name;
    li.appendChild(a);
    return li;
  };
}());

