(function () {
  "use strict";
  Weatherbus.Event = function () {
    this._subscriberList = [];
  };

  Weatherbus.Event.prototype.subscribe = function (subscriber) {
    this._subscriberList.push(subscriber);
  };

  Weatherbus.Event.prototype.trigger = function () {
    var args = arguments;
    this._subscriberList.forEach(function (subscriber) {
      subscriber.apply(null, args);
    });
  };
}());