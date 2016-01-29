(function () {
  "use strict";

  Weatherbus.NotLoggedInController = function (userService) {
    this._userService = userService;
    this.loggedIn = new Weatherbus.Event();
  };

  Weatherbus.NotLoggedInController.prototype = new Weatherbus.Controller();

  Weatherbus.NotLoggedInController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_NotLoggedInController");
    this._childContainer = dom.querySelector(".child-container");
    var createLink = dom.querySelector(".create-link");

    createLink.addEventListener("click", function (event) {
      event.preventDefault();
      var createAccountController = new Weatherbus.CreateAccountController(that._userService);

      createAccountController.completed.subscribe(function (username) {
        that.loggedIn.trigger(username);
      });

      createAccountController.canceled.subscribe(function () {
        that._showLoginController();
        createLink.classList.remove("hidden");
      });

      that._replaceChild(createAccountController);
      createLink.classList.add("hidden");
    });

    return dom;
  };

  Weatherbus.NotLoggedInController.prototype.shown = function () {
    this._showLoginController();
  };

  Weatherbus.NotLoggedInController.prototype._showLoginController = function () {
    var that = this;
    var loginController = new Weatherbus.LoginController();
    loginController.completed.subscribe(function (username) {
      that.loggedIn.trigger(username);
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
