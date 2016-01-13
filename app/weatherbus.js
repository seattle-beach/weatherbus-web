(function () {
  "use strict";
  window.Weatherbus = {};

  Weatherbus.LoginController = function () {};

  Weatherbus.LoginController.prototype.appendTo = function (container) {
    var template = 'Username: <input type="text" name="username"> <button>Go</button>';
    var root = document.createElement("div");
    root.innerHTML = template;
    container.appendChild(root);
  };

  Weatherbus.boot = function () {
    var controller = new Weatherbus.LoginController();
    controller.appendTo(document.body);
  };
}());
