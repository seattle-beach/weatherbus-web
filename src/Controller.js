(function () {
  "use strict";
  // Base class for controllers. Should always be subclassed.
  WB.Controller = function () {};

  WB.Controller.prototype.createDom = function () {
    throw new Error("Must override createDom()");
  };

  WB.Controller.prototype.createDomFromTemplate = function (selector) {
    var template = document.querySelector(selector).textContent;
    var dom = document.createElement("div");
    dom.innerHTML = template;
    return dom;
  };

  WB.Controller.prototype.shown = function () {
    // For overriding.
  };

  WB.Controller.prototype.appendTo = function (container) {
    this._root = this.createDom();
    container.appendChild(this._root);
    this.shown();
  };

  WB.Controller.prototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
  };
}());
