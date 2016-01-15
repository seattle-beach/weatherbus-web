/* jshint jasmine: true */
describe("App", function () {
  "use strict";

  beforeEach(function () {
    this.root = document.createElement("div");
    this.subject = new Weatherbus.App(this.root);
    this.subject._xhrFactory = Weatherbus.specHelper.mockXhrFactory;
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
      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should show the stops controller", function () {
      var stopsController = this.subject._rootController;
      expect(stopsController instanceof Weatherbus.StopsController).toEqual(true);
      expect(stopsController._root.parentNode).toBe(this.root);
      expect(stopsController.username).toBe("theuser");
    });
  });
});
