(function () {
  "use strict";
  window.Weatherbus = {};

  Weatherbus.App = function (root) {
    this._root = root;
  };

  Weatherbus.App.prototype.start = function () {
    var that = this;
    this._rootController = new Weatherbus.LoginController(function() {
      that._rootController.remove();

      that._rootController = new Weatherbus.StopListController();
      that._rootController.appendTo(that._root);
    });
    this._rootController.appendTo(this._root);
  };



  Weatherbus.LoginController = function (loginCallback) {
    if (!loginCallback) {
      throw new Error("LoginController requires a callback!");
    }

    this._loginCallback = loginCallback;
  };

  Weatherbus.LoginController.prototype.appendTo = function (container) {
    var template = 'Username: <input type="text" name="username"> <button>Go</button>';
    var that = this;
    this._root = document.createElement("div");
    this._root.innerHTML = template;
    this._submitButton = this._root.querySelector("button");
    this._usernameField = this._root.querySelector("input");
    container.appendChild(this._root);

    this._submitButton.addEventListener("click", function () {
      that._loginCallback(that._usernameField.value);
    });
  };

  Weatherbus.LoginController.prototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
  };


  Weatherbus.StopListController = function () {};

  Weatherbus.StopListController.prototype.appendTo = function (container) {
    this._root = document.createElement("div");
    this._root.innerHTML = "TODO";
    container.appendChild(this._root);
  };

  Weatherbus.boot = function () {
    new Weatherbus.App(document.body).start();
  };
}());
