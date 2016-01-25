(function () {
  "use strict";
  Weatherbus.StopService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  Weatherbus.StopService.prototype.getInfoForStop = function (stopId, callback) {
    var url = "wb?stopId=" + stopId;
    Weatherbus.makeRestCall(this.xhrFactory(), url, "There was an error getting stop info.", null, callback);
  };
}());
