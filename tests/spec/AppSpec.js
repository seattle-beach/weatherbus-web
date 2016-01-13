/* jshint jasmine: true */
describe("App", function () {
  "use strict";
  var simulateClick = function (element) {
    var event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    });
    element.dispatchEvent(event);
  };


  beforeEach(function () {
    this.root = document.createElement("div");
    this.subject = new Weatherbus.App(this.root);
    this.subject.start();
  });

  it("should show the login controller", function () {
    var loginController = this.subject._rootController;
    expect(loginController instanceof Weatherbus.LoginController).toEqual(true);
    expect(loginController._root.parentNode).toBe(this.root);
  });

  describe("When the user logs in", function () {
    beforeEach(function () {
      this.root.querySelector("input[type=text]").value = "theuser";
      simulateClick(this.root.querySelector("button"));
    });

    it("should show the stop list controller", function () {
      var stopListController = this.subject._rootController;
      expect(stopListController instanceof Weatherbus.StopListController).toEqual(true);
      expect(stopListController._root.parentNode).toBe(this.root);
    });
  });
});
