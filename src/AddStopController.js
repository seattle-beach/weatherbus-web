(function () {
  "use strict";

  WB.AddStopController = class extends WB.Controller {
    constructor(userService, username) {
      super();
      this._userService = userService;
      this._username = username;
      this.completedEvent = new WB.Event();
    }
    
    createDom() {
      var dom = this.createDomFromTemplate("#template_AddStopController");

      dom.querySelector("button").addEventListener("click", () => this._submit());
      this._stopIdField = dom.querySelector("input[type=text]");

      this._stopIdField.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
          this._submit();
        }
      });
  
      return dom;
    }
  
    _submit() {
      var errorNode = this._root.querySelector(".error");
      errorNode.classList.add("hidden");
  
      this._userService.addStop(this._username, this._stopIdField.value, error => {
        if (error) {
          errorNode.classList.remove("hidden");
          errorNode.textContent = error;
        } else {
          this.completedEvent.trigger();
        }
      });
    }
  };
}());
