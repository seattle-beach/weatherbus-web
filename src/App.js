(function () {
  "use strict";

  WB.App = function (root) {
    this._root = root;
    this.locationService = new WB.LocationService();
  };

  WB.App.prototype.start = function () {
    var that = this;
    var userService = new WB.UserService(that._xhrFactory);
    var stopService = new WB.StopService(that._xhrFactory);
    var stopMatch = this.locationService.hash().match(/^#stop-(.*)$/);
    var stopWithRoutesMatch = this.locationService.search()
      .match(/^\?stop=([^&]*)&routes=(.*)$/);

    if (stopWithRoutesMatch) {
      this._rootController = new WB.StopInfoController(stopWithRoutesMatch[1],
        stopWithRoutesMatch[2].split(","),
        stopService, 
        this.locationService);
    } else if (stopMatch) {
      this._rootController = new WB.StopInfoController(stopMatch[1], 
        null,
        stopService, 
        this.locationService);
    } else {
	    this._rootController = new WB.NotLoggedInController(userService);
	    this._rootController.loggedIn.subscribe(function(username) {
	      that._rootController.remove();
	      that._rootController = new WB.StopListController(username, userService, stopService, that.locationService);
	      that._rootController.appendTo(that._root);
	    });
    }
    this._rootController.appendTo(this._root);
  };

  WB.App.prototype._xhrFactory = function () {
    return new XMLHttpRequest();
  };
}());
