/* jshint jasmine: true */
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
      }
    });
  });
}());
