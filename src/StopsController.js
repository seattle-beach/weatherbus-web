(function () {
  "use strict";
  Weatherbus.StopsController = function (username, userService, stopService) {
    this.username = username;
    this.userService = userService;
    this.stopService = stopService;
  };

  Weatherbus.StopsController.prototype = new Weatherbus.Controller();

  Weatherbus.StopsController.prototype.createDom = function() {
    var template = document.querySelector("#template_StopsController").textContent;
    var dom = document.createElement("div");
    dom.innerHTML = template;
    return dom;
  };

  Weatherbus.StopsController.prototype.shown = function () {
    var that = this;
    this.userService.getStopsForUser(this.username, function (error, stops) {
      that._stopsLoaded(error, stops);
    });
  };

  Weatherbus.StopsController.prototype._stopsLoaded = function (error, stops) {
    var i, ol, errorNode;
    this._root.querySelector(".loading").classList.add("hidden");

    if (stops) {
      for (i = 0; i < stops.length; i++) {
        ol = this._root.querySelector("ol");
        ol.appendChild(this._createStopNode(stops[i]));
      }
    } else {
      errorNode = this._root.querySelector(".error");
      errorNode.classList.remove("hidden");
      errorNode.textContent = error;
    }
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
    });
    a.textContent = stop.name;
    li.appendChild(a);
    return li;
  };
}());

