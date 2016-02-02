(function () {
  "use strict";
  // TODO: rename to makeRestGet
  WB.makeRestCall = function (xhr, url, transformError, jsonTransform, callback) {
    url = WB.config.serviceUrl + url;

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

  WB.makeRestPost = function (xhr, url, body, transformError, callback) {
    url = WB.config.serviceUrl + url;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null);
        } else {
          callback(transformError(xhr.status, xhr.response));
        }
      }
    };

    xhr.open("post", url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(body));
  };
}());
