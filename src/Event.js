(function () {
  "use strict";
  WB.Event = function () {
    this._subscriberList = [];
  };

  WB.Event.prototype.subscribe = function (subscriber) {
    this._subscriberList.push(subscriber);
  };

  WB.Event.prototype.trigger = function () {
    var args = arguments;
    this._subscriberList.forEach(function (subscriber) {
      subscriber.apply(null, args);
    });
  };
}());
