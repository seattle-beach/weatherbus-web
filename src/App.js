(function () {
  "use strict";

  Weatherbus.App = function (root) {
    this._root = root;
  };

  Weatherbus.App.prototype.start = function () {
    var that = this;
    var userService = new Weatherbus.UserService(that._xhrFactory);
    var stopService = new Weatherbus.StopService(that._xhrFactory);

    this._rootController = new Weatherbus.LoginController(function(username) {
      that._rootController.remove();
      that._rootController = new Weatherbus.StopsController(username, userService, stopService);
      that._rootController.appendTo(that._root);
    });
    this._rootController.appendTo(this._root);
  };

  Weatherbus.App.prototype._xhrFactory = function () {
    return new XMLHttpRequest();
  };
}());
