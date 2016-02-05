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

  var processStopList = function (stopList) {
    return stopList.data;
  };

  var transformError = function () {
    return "There was an error getting stop info.";
  };

  WB.StopService = class {
    constructor (xhrFactory) {
      this.xhrFactory = xhrFactory;
    }
  
    getInfoForStop(stopId, callback) {
      var url = "api/v1/stops/" + stopId;
      WB.makeRestCall(this.xhrFactory(), url, transformError, processStopInfo, callback);
    }

    getStopsNearLocation(position, callback) {
      var url = "api/v1/stops/?lat=" + position.lat + "&lng=" + position.lng + "&latSpan=0.01&lngSpan=0.01";
      WB.makeRestCall(this.xhrFactory(), url, transformError, processStopList, callback);
    } 
  };
}());
