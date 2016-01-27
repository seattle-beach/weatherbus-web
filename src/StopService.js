(function () {
  "use strict";
  Weatherbus.StopService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var convertDate = function (timestamp) {
    if (timestamp) {
      return new Date(timestamp);
    } else {
      return null;
    }
  };

  var processStopInfo = function (stopInfo) {
    stopInfo.departures.forEach(function (d) {
      d.predictedTime = convertDate(d.predictedTime);
      d.scheduledTime = convertDate(d.scheduledTime);
    });

    return stopInfo;
  };

  Weatherbus.StopService.prototype.getInfoForStop = function (stopId, callback) {
    var url = "wb?stopId=" + stopId;
    var transformError = function () {
      return "There was an error getting stop info.";
    };
    Weatherbus.makeRestCall(this.xhrFactory(), url, transformError, processStopInfo, callback);
  };
}());
