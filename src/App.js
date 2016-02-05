(function () {
  "use strict";

  WB.App = class {
    constructor(root) {
      this._root = root;
      this.locationService = new WB.LocationService();
    }
  
    start() {
      var userService = new WB.UserService(this._xhrFactory);
      var stopService = new WB.StopService(this._xhrFactory);
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
        this._rootController.loginClicked.subscribe(() => {
          var nlic = new WB.NotLoggedInController(userService);
          this._rootController.remove();
          this._rootController = nlic;
          nlic.appendTo(this._root);
          nlic.loggedIn.subscribe(username => {
            this._rootController.remove();
            this._rootController = new WB.StopListController(username, userService, stopService, this.locationService);
            this._rootController.appendTo(this._root);
          });
        });
      }
      this._rootController.appendTo(this._root);
    }
  
    _xhrFactory() {
      return new XMLHttpRequest();
    }
  };
}());
