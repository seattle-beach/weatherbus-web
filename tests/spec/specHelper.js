/* globals console: true */
(function () {
  "use strict";

  WB.specHelper = {
    simulateClick: function (element) {
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("click", true, true, window);
      element.dispatchEvent(event);
    },
    mockXhrFactory: function () {
      return {
        open: jasmine.createSpy("open"),
        send: jasmine.createSpy("send"),
        setRequestHeader: jasmine.createSpy("setRequestHeader")
      };
    }
  };

  beforeAll(function (done) {
    window.addEventListener("error", function (error) {
      // Fail the current spec
      expect(error.message).toBe({});
    });

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var template_html = xhr.response;
          var container = document.createElement("div");
          container.innerHTML = template_html;
          document.body.appendChild(container);
          done();
        } else {
          console.error("Couldn't load templates.html");
        }
      }
    };

    xhr.open("get", "/src/templates.html");
    xhr.send();
  });

  beforeEach(function () {
    jasmine.addMatchers({
      toContainElement: function () {
        return {
          compare: function (actual, expected) {
            var selector = expected;
            var root = actual;
            var matchingNode = root.querySelector(selector);
            return {
              pass: !!matchingNode,
              message: "Expected " + root + " to contain an element matching \"" + selector + "\""
            };
          }
        };
      },
      toHaveClass: function () {
        return {
          compare: function (actual, expected) {
            var element = actual;
            var className = expected;
            var pass = element.classList.contains(className);
            var message;

            if (pass) {
              message = "Expected " + element + " not to have class \"" + className + "\"";
            } else {
              message = "Expected " + element + " to have class \"" + className + "\"";
            }

            return {
              pass: pass,
              message: message
            };
          }
        };
      }
    });

    spyOn(WB.LocationService.prototype, "hash").and.throwError(
      "Caught an unmocked access to a location object's hash()");
    spyOn(WB.LocationService.prototype, "search").and.throwError(
      "Caught an unmocked access to a location object's search()");
    spyOn(WB.LocationService.prototype, "pushState");
    spyOn(WB.LocationService.prototype, "navigate").and.throwError(
      "Caught an unmocked access to a location object's navigate()");



    WB.config = {
      serviceUrl: "http://localhost/"
    };


    // Stubs
    window.google = {
      maps: {
        Map: function (container, config) {
          WB.latestMap = {
            _config: config,
            _container: container
          };
          return WB.latestMap;
        }
      }
    };
  });
}());
