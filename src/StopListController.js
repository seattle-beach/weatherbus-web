(function () {
  "use strict";
  WB.StopListController = function (username, userService, stopService, locationService) {
    this.username = username;
    this.userService = userService;
    this.stopService = stopService;
    this.locationService = locationService;
  };

  WB.StopListController.prototype = new WB.Controller();

  WB.StopListController.prototype.createDom = function() {
    var dom = this.createDomFromTemplate("#template_StopListController");
    var that = this;
    this._errorNode = dom.querySelector(".error");
    this._loadingIndicator = dom.querySelector(".loading");
    this._stopList = dom.querySelector("ol");

    this._addStopController = new WB.AddStopController(this.userService, this.username);
    this._addStopController.appendTo(dom.querySelector(".addStopContainer"));
    this._addStopController.completedEvent.subscribe(function () {
      that._loadingIndicator.classList.remove("hidden");
      that._stopList.innerHTML = "";
      that._loadStops();
    });

    return dom;
  };

  WB.StopListController.prototype.shown = function () {
    this._loadStops();
  };

  WB.StopListController.prototype._loadStops = function () {
    var that = this;
    this.userService.getStopsForUser(this.username, function (error, stops) {
      that._stopsLoaded(error, stops);
    });
  };

  WB.StopListController.prototype._stopsLoaded = function (error, stops) {
    var i, ol;
    this._loadingIndicator.classList.add("hidden");

    if (stops) {
      if (stops.length === 0) {
        this._showError("You don't have any favorite stops.");
      } else {
        for (i = 0; i < stops.length; i++) {
          ol = this._stopList;
          ol.appendChild(this._createStopNode(stops[i]));
        }
      }
    } else {
      this._showError(error);
    }
  };

  WB.StopListController.prototype._showError = function (msg) {
    this._errorNode.classList.remove("hidden");
    this._errorNode.textContent = msg;
  };

  WB.StopListController.prototype._createStopNode = function (stop) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var that = this;

    a.href = "#";
    a.addEventListener("click", function (event) {
      event.preventDefault();

      if (that._stopInfoController) {
        that._stopInfoController.remove();
      }

      that._stopInfoController = new WB.StopInfoController(stop.id, null, that.stopService, that.locationService);
      that._stopInfoController.appendTo(that._root);
      that.locationService.pushState("#stop-" + stop.id);
    });
    a.textContent = stop.name;
    li.appendChild(a);
    return li;
  };
}());

