(function () {
  "use strict";

  WB.CreateAccountController = function (userService) {
    this._userService = userService;
    this.completed = new WB.Event();
    this.canceled = new WB.Event();
  };

  WB.CreateAccountController.prototype = new WB.Controller();

  WB.CreateAccountController.prototype.createDom = function () {
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
            that.completed.trigger(username);
          }
        });
      } else {
        that._showError("Please enter a valid username.");
      }
    });

    var cancelButton = dom.querySelector(".cancel");
    cancelButton.addEventListener("click", function (event) {
      event.preventDefault();
      that.canceled.trigger();
    });

    return dom;
  };

  WB.CreateAccountController.prototype._showError = function (error) {
    this._errorField.classList.remove("hidden");
    this._errorField.textContent = error;
  };
}());
