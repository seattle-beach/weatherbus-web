(function () {
  "use strict";
  // Base class for controllers. Should always be subclassed.
  Weatherbus.Controller = function () {};

  Weatherbus.Controller.prototype.createDom = function () {
    throw new Error("Must override createDom()");
  };

  Weatherbus.Controller.prototype.shown = function () {
    // For overriding.
  };

  Weatherbus.Controller.prototype.appendTo = function (container) {
    this._root = this.createDom();
    container.appendChild(this._root);
    this.shown();
  };

  Weatherbus.Controller.prototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
  };
}());
