(function () {
  "use strict";
  Weatherbus.StopService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStopInfo = function(response) {
    return {
      latitude: response.latitude,
      longitude: response.longitude
    };
  };

  Weatherbus.StopService.prototype.getInfoForStop = function (stopId, callback) {
    var url = "http://localhost:8080/wb?stopId=" + stopId;
    Weatherbus.makeRestCall(this.xhrFactory(), url, "There was an error getting stop info.", parseStopInfo, callback);
  };
}());
