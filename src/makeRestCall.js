(function () {
  "use strict";
  Weatherbus.makeRestCall = function (xhr, url, errorMsg, jsonTransform, callback) {
    url = Weatherbus.config.serviceUrl + url;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, jsonTransform(JSON.parse(xhr.response)));
        } else {
          callback(errorMsg, null);
        }
      }
    };

    xhr.open("get", url);
    xhr.send();
  };
}());
