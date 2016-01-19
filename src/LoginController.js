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
    var template = document.querySelector("#template_LoginController").innerText;
    var dom = document.createElement("div");
    dom.innerHTML = template;

    this._submitButton = dom.querySelector("button");
    this._usernameField = dom.querySelector("input");
    this._errorLabel = dom.querySelector(".error");

    var that = this;
    this._submitButton.addEventListener("click", function () {
      if (!that._usernameField.value) {
        that._errorLabel.classList.remove("hidden");
        return;
      }

      that._loginCallback(that._usernameField.value);
    });

    return dom;
  };
}());
