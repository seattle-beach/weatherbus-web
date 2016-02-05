(function () {
  "use strict";
  WB.StopListController = class extends WB.Controller {
    constructor(username, userService, stopService, navService) {
      super();
      this.username = username;
      this.userService = userService;
      this.stopService = stopService;
      this.navService = navService;
    }

    createDom() {
      var dom = this.createDomFromTemplate("#template_StopListController");
      this._errorNode = dom.querySelector(".error");
      this._loadingIndicator = dom.querySelector(".loading");
      this._stopList = dom.querySelector("ol");
  
      this._addStopController = new WB.AddStopController(this.userService, this.username);
      this._addStopController.appendTo(dom.querySelector(".addStopContainer"));
      this._addStopController.completedEvent.subscribe(() => {
        this._loadingIndicator.classList.remove("hidden");
        this._stopList.innerHTML = "";
        this._loadStops();
      });
  
      return dom;
    }
  
    shown() {
      this._loadStops();
    }
  
    _loadStops() {
      this.userService.getStopsForUser(this.username, (error, stops) => {
        this._stopsLoaded(error, stops);
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
      a.href = "#";
      a.addEventListener("click", event => {
        event.preventDefault();
  
        if (this._stopInfoController) {
          this._stopInfoController.remove();
        }
  
        this._stopInfoController = new WB.StopInfoController(stop.id, null, this.stopService, this.navService);
        this._stopInfoController.appendTo(this._root);
        this.navService.pushState("#stop-" + stop.id);
      });
      a.textContent = stop.name;
      li.appendChild(a);
      return li;
    }
  };
}());

