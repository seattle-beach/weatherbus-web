/* jshint jasmine: true */
describe("StopsController", function () {
  "use strict";

  beforeEach(function () {
    this.userService = {
      getStopsForUser: jasmine.createSpy("getStopsForUser")
    };
    this.subject = new Weatherbus.StopsController("bob", this.userService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a loading indicator", function () {
    expect(this.root).toContainElement(".loading");
    var loadingIndicator = this.root.querySelector(".loading");
    expect(loadingIndicator).not.toHaveClass("hidden");
  });

  it("should ask the user service for the user's stops", function () {
    expect(this.userService.getStopsForUser).toHaveBeenCalled();
    var args = this.userService.getStopsForUser.calls.mostRecent().args;
    expect(args[0]).toBe("bob");
  });

  describe("When the list of stops loads", function () {
    beforeEach(function () {
      var args = this.userService.getStopsForUser.calls.mostRecent().args;
      var callback = args[1];
      callback(null, ["12345", "67890"]);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should show the stops", function () {
      var stops = this.root.querySelectorAll("li");
      expect(stops.length).toEqual(2);
      expect(stops[0].innerText).toEqual("12345");
      expect(stops[1].innerText).toEqual("67890");
    });
  });

  describe("When the list of stops fails to load", function () {
    beforeEach(function () {
      var args = this.userService.getStopsForUser.calls.mostRecent().args;
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
