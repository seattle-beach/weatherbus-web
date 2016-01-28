(function () {
  "use strict";
  // TODO: rename to makeRestGet
  Weatherbus.makeRestCall = function (xhr, url, transformError, jsonTransform, callback) {
    url = Weatherbus.config.serviceUrl + url;

    xhr.onreadystatechange = function () {
      var response;

      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          response = JSON.parse(xhr.response);

          if (jsonTransform) {
            response = jsonTransform(response);
          }

          callback(null, response);
        } else {
          callback(transformError(xhr.status, xhr.response), null);
        }
      }
    };

    xhr.open("get", url);
    xhr.send();
  };
}());
