(function () {
  "use strict";

  Weatherbus.CreateAccountController = function (userService, callback) {
    this._userService = userService;
    this._callback = callback;
  };

  Weatherbus.CreateAccountController.prototype = new Weatherbus.Controller();

  Weatherbus.CreateAccountController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_CreateAccountController");
    this._errorField = dom.querySelector(".error");

    var addButton = dom.querySelector(".add");
    addButton.addEventListener("click", function (event) {
      event.preventDefault();
      var username = that._root.querySelector("input").value;

      if (username) {
        that._userService.createUser(username, function (error) {
          if (error) {
            that._showError(error);
          } else {
            that._callback(username);
          }
        });
      } else {
        that._showError("Please enter a valid username.");
      }
    });

    var cancelButton = dom.querySelector(".cancel");
    cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      that._callback(null);
    });

    return dom;
  };

  Weatherbus.CreateAccountController.prototype._showError = function (error) {
    this._errorField.classList.remove("hidden");
    this._errorField.textContent = error;
  };
}());
