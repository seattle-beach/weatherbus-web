(function () {
  "use strict";

  Weatherbus.specHelper = {
    simulateClick: function (element) {
      var event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      element.dispatchEvent(event);
    },
    mockXhrFactory: function () {
      return {
        open: jasmine.createSpy("open"),
        send: jasmine.createSpy("send"),
      };
    }
  };

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
            return {
              pass: element.classList.contains(className),
              message: "Expected " + element + " to have class \"" + className + "\""
            };
          }
        };
      }
    });

    Weatherbus.config = {
      serviceUrl: "http://localhost/"
    };
  });
}());
