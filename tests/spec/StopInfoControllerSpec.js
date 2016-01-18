describe("StopInfoController", function () {
  "use strict";

  beforeEach(function () {
    this.stopService = {
      getInfoForStop: jasmine.createSpy("getInfoForStop")
    };
    this.subject = new Weatherbus.StopInfoController("6789_0", this.stopService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a loading indicator", function () {
    expect(this.root).toContainElement(".loading");
    var loadingIndicator = this.root.querySelector(".loading");
    expect(loadingIndicator).not.toHaveClass("hidden");
  });

  it("should load information for the stop", function () {
    expect(this.stopService.getInfoForStop).toHaveBeenCalled();
    var args = this.stopService.getInfoForStop.calls.mostRecent().args;
    expect(args[0]).toBe("6789_0");
  });

  describe("When the stop information loads", function () {
    beforeEach(function () {
      var args = this.stopService.getInfoForStop.calls.mostRecent().args;
      var cb = args[1];
      var result = {
         latitude: 47.654365,
         longitude: -122.305214
      };
      cb(null, result);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should display latitude and longitude", function () {
      expect(this.root).toContainElement(".lat");
      expect(this.root).toContainElement(".lng");
      expect(this.root.querySelector(".lat").innerText).toEqual("47.654365");
      expect(this.root.querySelector(".lng").innerText).toEqual("-122.305214");
    });
  });

  describe("When the stop information fails to load", function () {
    beforeEach(function () {
      var args = this.stopService.getInfoForStop.calls.mostRecent().args;
      var callback = args[1];
      var error = "ERROR";
      callback(error, null);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should render an error message", function () {
      expect(this.root).toContainElement(".error");
      var msg = this.root.querySelector(".error");
      expect(msg).not.toHaveClass("hidden");
      expect(msg.innerText).toEqual("ERROR");
    });
  });

});
