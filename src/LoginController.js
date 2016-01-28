(function() {
  "use strict";
  Weatherbus.LoginController = function (loginCallback) {
    if (!loginCallback) {
      throw new Error("LoginController requires a callback!");
    }

    this._loginCallback = loginCallback;
  };

  Weatherbus.LoginController.prototype = new Weatherbus.Controller();

  Weatherbus.LoginController.prototype.createDom = function () {
    var dom = this.createDomFromTemplate("#template_LoginController");

    this._submitButton = dom.querySelector("button");
    this._usernameField = dom.querySelector("input");
    this._errorLabel = dom.querySelector(".error");

    var that = this;
    this._submitButton.addEventListener("click", function () {
        that._submit();
    });

    this._usernameField.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        that._submit();
      }
    });

    return dom;
  };

  Weatherbus.LoginController.prototype._submit = function () {
    if (!this._usernameField.value) {
      this._errorLabel.classList.remove("hidden");
      return;
    }

    this._loginCallback(this._usernameField.value);
  };
}());
