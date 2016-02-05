(function () {
  "use strict";

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

  WB.StopService = class {
    constructor (xhrFactory) {
      this.xhrFactory = xhrFactory;
    }
  
    getInfoForStop(stopId, callback) {
      var url = "api/v1/stops/" + stopId;
      var transformError = function () {
        return "There was an error getting stop info.";
      };
      WB.makeRestCall(this.xhrFactory(), url, transformError, processStopInfo, callback);
    }
  };
}());
