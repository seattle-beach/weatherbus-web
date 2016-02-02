(function () {
  "use strict";

  Weatherbus.AddStopController = function (userService, username) {
    this._userService = userService;
    this._username = username;
    this.completedEvent = new Weatherbus.Event();
  };

  Weatherbus.AddStopController.prototype = new Weatherbus.Controller();

  Weatherbus.AddStopController.prototype.createDom = function () {
    var dom = this.createDomFromTemplate("#template_AddStopController");
    var that = this;

    dom.querySelector("button").addEventListener("click", function () {
        that._submit();
    });

    this._stopIdField = dom.querySelector("input[type=text]");
    this._stopIdField.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        that._submit();
      }
    });

    return dom;
  };

  Weatherbus.AddStopController.prototype._submit = function () {
    var that = this;
    var errorNode = that._root.querySelector(".error");
    errorNode.classList.add("hidden");

    this._userService.addStop(this._username, this._stopIdField.value, function (error) {
      if (error) {
        errorNode.classList.remove("hidden");
        errorNode.textContent = error;
      } else {
        that.completedEvent.trigger();
      }
    });
  };
}());
