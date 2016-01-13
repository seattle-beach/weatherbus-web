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


  // Base class for controllers. Should always be subclassed.
  Weatherbus.Controller = function () {};

  Weatherbus.Controller.prototype.createDom = function () {
    throw new Error("Must override createDom()");
  };

  Weatherbus.Controller.prototype.appendTo = function (container) {
    this._root = this.createDom();
    container.appendChild(this._root);
  };

  Weatherbus.Controller.prototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
  };



  Weatherbus.LoginController = function (loginCallback) {
    if (!loginCallback) {
      throw new Error("LoginController requires a callback!");
    }

    this._loginCallback = loginCallback;
  };

  Weatherbus.LoginController.prototype = new Weatherbus.Controller();

  Weatherbus.LoginController.prototype.createDom = function () {
    var template = 'Username: <input type="text" name="username"> <button>Go</button>';
    var dom = document.createElement("div");
    dom.innerHTML = template;

    this._submitButton = dom.querySelector("button");
    this._usernameField = dom.querySelector("input");

    var that = this;
    this._submitButton.addEventListener("click", function () {
      that._loginCallback(that._usernameField.value);
    });

    return dom;
  };



  Weatherbus.StopListController = function () {};

  Weatherbus.StopListController.prototype = new Weatherbus.Controller();

  Weatherbus.StopListController.prototype.createDom = function() {
    var dom = document.createElement("div");
    dom.innerHTML = "TODO";
    return dom;
  };



  Weatherbus.boot = function () {
    new Weatherbus.App(document.body).start();
  };
}());
