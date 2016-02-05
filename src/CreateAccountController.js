(function () {
  "use strict";

  WB.CreateAccountController = class extends WB.Controller {
    constructor(userService) {
      super();
      this._userService = userService;
      this.completed = new WB.Event();
      this.canceled = new WB.Event();
    }
  
    createDom() {
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
    }
  
    _showError(error) {
      this._errorField.classList.remove("hidden");
      this._errorField.textContent = error;
    }
  };
}());
