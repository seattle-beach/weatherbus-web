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
      var dom = this.createDomFromTemplate("#template_CreateAccountController");
      this._errorField = dom.querySelector(".error");
  
      var addButton = dom.querySelector(".add");
      addButton.addEventListener("click", event => {
        event.preventDefault();
        var username = this._root.querySelector("input").value;
  
        if (username) {
          this._userService.createUser(username, error => {
            if (error) {
              this._showError(error);
            } else {
              this.completed.trigger(username);
            }
          });
        } else {
          this._showError("Please enter a valid username.");
        }
      });
  
      var cancelButton = dom.querySelector(".cancel");
      cancelButton.addEventListener("click", event => {
        event.preventDefault();
        this.canceled.trigger();
      });
  
      return dom;
    }
  
    _showError(error) {
      this._errorField.classList.remove("hidden");
      this._errorField.textContent = error;
    }
  };
}());
