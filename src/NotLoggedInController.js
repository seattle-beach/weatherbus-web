(function () {
  "use strict";

  WB.NotLoggedInController = class extends WB.Controller {
    constructor(userService) {
      super();
      this._userService = userService;
      this.loggedIn = new WB.Event();
    }
  
    createDom() {
      var that = this;
      var dom = this.createDomFromTemplate("#template_NotLoggedInController");
      this._childContainer = dom.querySelector(".child-container");
      var createLink = dom.querySelector(".create-link");
  
      createLink.addEventListener("click", function (event) {
        event.preventDefault();
        var createAccountController = new WB.CreateAccountController(that._userService);
  
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
    }
  
    shown() {
      this._showLoginController();
    }
  
    _showLoginController() {
      var that = this;
      var loginController = new WB.LoginController();
      loginController.completed.subscribe(function (username) {
        that.loggedIn.trigger(username);
      });
      this._replaceChild(loginController);
    }
  
    _replaceChild(newChild) {
      if (this._child) {
        this._child.remove();
      }
  
      newChild.appendTo(this._childContainer);
      this._child = newChild;
    }
  };
}());
