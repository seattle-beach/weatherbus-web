(function () {
  "use strict";

  Weatherbus.NotLoggedInController = function (userService, callback) {
    this._userService = userService;
    this._callback = callback;
  };

  Weatherbus.NotLoggedInController.prototype = new Weatherbus.Controller();

  Weatherbus.NotLoggedInController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_NotLoggedInController");
    this._childContainer = dom.querySelector(".child-container");
    var createLink = dom.querySelector(".create-link");

    createLink.addEventListener("click", function (event) {
      event.preventDefault();
      var callback = function(username) {
        if (username) {
          that._callback(username);
        } else {
          that._showLoginController();
        }
      };
      that._replaceChild(new Weatherbus.CreateAccountController(that._userService, callback));
      createLink.classList.add("hidden");
    });

    return dom;
  };

  Weatherbus.NotLoggedInController.prototype.shown = function () {
    this._showLoginController();
  };

  Weatherbus.NotLoggedInController.prototype._showLoginController = function () {
    var that = this;
    var loginController = new Weatherbus.LoginController(function (username) {
      that._callback(username);
    });
    this._replaceChild(loginController);
  };

  Weatherbus.NotLoggedInController.prototype._replaceChild = function (newChild) {
    if (this._child) {
      this._child.remove();
    }

    newChild.appendTo(this._childContainer);
    this._child = newChild;
  };
}());
