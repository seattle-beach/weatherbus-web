(function () {
  "use strict";

  WB.NotLoggedInController = class extends WB.Controller {
    constructor(userService) {
      super();
      this._userService = userService;
      this.loggedIn = new WB.Event();
    }
  
    createDom() {
      var dom = this.createDomFromTemplate("#template_NotLoggedInController");
      this._childContainer = dom.querySelector(".child-container");
      var createLink = dom.querySelector(".create-link");
  
      createLink.addEventListener("click", event => {
        event.preventDefault();
        var createAccountController = new WB.CreateAccountController(this._userService);
  
        createAccountController.completed.subscribe(username => {
          this.loggedIn.trigger(username);
        });
  
        createAccountController.canceled.subscribe(() => {
          this._showLoginController();
          createLink.classList.remove("hidden");
        });
  
        this._replaceChild(createAccountController);
        createLink.classList.add("hidden");
      });
  
      return dom;
    }
  
    shown() {
      this._showLoginController();
    }
  
    _showLoginController() {
      var loginController = new WB.LoginController();
      loginController.completed.subscribe(username => {
        this.loggedIn.trigger(username);
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
