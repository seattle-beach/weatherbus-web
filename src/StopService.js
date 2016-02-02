(function () {
  "use strict";
  WB.StopService = function (xhrFactory) {
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
    stopInfo.data.departures.forEach(function (d) {
      d.predictedTime = convertDate(d.predictedTime);
      d.scheduledTime = convertDate(d.scheduledTime);
    });

    return stopInfo.data;
  };

  WB.StopService.prototype.getInfoForStop = function (stopId, callback) {
    var url = "api/v1/stops/" + stopId;
    var transformError = function () {
      return "There was an error getting stop info.";
    };
    WB.makeRestCall(this.xhrFactory(), url, transformError, processStopInfo, callback);
  };
}());
