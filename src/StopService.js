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

  var round = function (n) {
    return Math.round(n * 10000) / 10000;
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
      var center = position.getCenter();
      var latSpan = position.getNorthEast().lat() - position.getSouthWest().lat();
      var lngSpan = position.getNorthEast().lng() - position.getSouthWest().lng();
      var url = "api/v1/stops/?lat=" + round(center.lat()) + "&lng=" + round(center.lng()) +
        "&latSpan=" + round(latSpan) + "&lngSpan=" + round(lngSpan);
      WB.makeRestCall(this.xhrFactory(), url, transformError, processStopList, callback);
    } 
  };
}());
