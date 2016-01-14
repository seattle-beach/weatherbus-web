(function () {
  "use strict";
  var hasErrors = false;

  var errorHandler = function () {
    hasErrors = true;
  };

  window.addEventListener("error", errorHandler);

  window.jasmineErrorCheck = function () {
    window.removeEventListener("error", errorHandler);

    if (hasErrors) {
      document.getElementById("jasmine-load-error").style.display = "block";
    } else {
      window.bootJasmine();
    }
  };
}());
