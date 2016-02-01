(function () {
  "use strict";

  Weatherbus.App = function (root) {
    this._root = root;
    this.locationService = new Weatherbus.LocationService();
  };

  Weatherbus.App.prototype.start = function () {
    var that = this;
    var userService = new Weatherbus.UserService(that._xhrFactory);
    var stopService = new Weatherbus.StopService(that._xhrFactory);
    var stopMatch = this.locationService.hash().match(/^#stop-(.*)$/);
    var stopWithRoutesMatch = this.locationService.search()
      .match(/^\?stop=([^&]*)&routes=(.*)$/);

    if (stopWithRoutesMatch) {
      this._rootController = new Weatherbus.StopInfoController(stopWithRoutesMatch[1],
        stopWithRoutesMatch[2].split(","),
        stopService, 
        this.locationService);
    } else if (stopMatch) {
      this._rootController = new Weatherbus.StopInfoController(stopMatch[1], 
        null,
        stopService, 
        this.locationService);
    } else {
	    this._rootController = new Weatherbus.NotLoggedInController(userService);
	    this._rootController.loggedIn.subscribe(function(username) {
	      that._rootController.remove();
	      that._rootController = new Weatherbus.StopListController(username, userService, stopService, that.locationService);
	      that._rootController.appendTo(that._root);
	    });
    }
    this._rootController.appendTo(this._root);
  };

  Weatherbus.App.prototype._xhrFactory = function () {
    return new XMLHttpRequest();
  };
}());
