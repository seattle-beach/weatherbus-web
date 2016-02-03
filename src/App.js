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
    var geolocationService = new WB.GeolocationService();
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
      this._rootController = new WB.HomeController(geolocationService);
      this._rootController.loginClicked.subscribe(function () {
        var nlic = new WB.NotLoggedInController(userService);
        that._rootController.remove();
        that._rootController = nlic;
        nlic.appendTo(that._root);
        nlic.loggedIn.subscribe(function(username) {
          that._rootController.remove();
          that._rootController = new WB.StopListController(username, userService, stopService, that.locationService);
          that._rootController.appendTo(that._root);
        });
      });
    }
    this._rootController.appendTo(this._root);
  };

  WB.App.prototype._xhrFactory = function () {
    return new XMLHttpRequest();
  };
}());
