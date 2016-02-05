(function () {
  "use strict";
  WB.StopListController = class extends WB.Controller {
    constructor(username, userService, stopService, locationService) {
      super();
      this.username = username;
      this.userService = userService;
      this.stopService = stopService;
      this.locationService = locationService;
    }

    createDom() {
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
    }
  
    shown() {
      this._loadStops();
    }
  
    _loadStops() {
      var that = this;
      this.userService.getStopsForUser(this.username, function (error, stops) {
        that._stopsLoaded(error, stops);
      });
    }
  
    _stopsLoaded(error, stops) {
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
    }
  
    _showError(msg) {
      this._errorNode.classList.remove("hidden");
      this._errorNode.textContent = msg;
    }
  
    _createStopNode(stop) {
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
    }
  };
}());

