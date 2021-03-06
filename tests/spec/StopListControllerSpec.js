describe("StopListController", function () {
  "use strict";

  beforeEach(function () {
    this.userService = {
      getStopsForUser: jasmine.createSpy("getStopsForUser")
    };
    this.stopService = {
      getInfoForStop: function () {}
    };
    this.navService = new WB.NavigationService();
    this.subject = new WB.StopListController("bob", this.userService, this.stopService, this.navService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a loading indicator", function () {
    expect(this.root).toContainElement(".loading");
    var loadingIndicator = this.root.querySelector(".loading");
    expect(loadingIndicator).not.toHaveClass("hidden");
  });

  it("should ask the user service for the user's stops", function () {
    expect(this.userService.getStopsForUser).toHaveBeenCalledWith("bob", jasmine.any(Function));
  });

  describe("When the list of stops loads", function () {
    beforeEach(function () {
      var args = this.userService.getStopsForUser.calls.mostRecent().args;
      var callback = args[1];
      callback(null, [{name: "Stop 1", id: "12345"}, {name: "Stop 2", id: "67890"}]);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should show the stops", function () {
      var stops = this.root.querySelectorAll("li a");
      expect(stops.length).toEqual(2);
      expect(stops[0].textContent).toEqual("Stop 1");
      expect(stops[1].textContent).toEqual("Stop 2");
    });

    it("should have an AddStopController", function () {
      var asc = this.subject._addStopController;
      expect(asc).toBeTruthy();
      expect(this.root.querySelector(".addStopContainer").firstChild).toBe(asc._root);
    });

    describe("When the user adds a stop", function () {
      beforeEach(function () {
        this.userService.getStopsForUser.calls.reset();
        this.subject._addStopController.completedEvent.trigger();
      });

      it("should reload", function () {
        var loadingIndicator = this.root.querySelector(".loading");
        expect(loadingIndicator).not.toHaveClass("hidden");
        var stops = this.root.querySelectorAll("li");
        expect(stops.length).toEqual(0);
        expect(this.userService.getStopsForUser).toHaveBeenCalled();
      });
    });

    describe("When the user clicks a stop link", function () {
      beforeEach(function () {
        WB.specHelper.simulateClick(this.root.querySelector("li a"));
      });

      it("should show a StopInfoController for that stop", function () {
        expect(this.subject._stopInfoController).toBeTruthy();
        expect(this.subject._stopInfoController._stopId).toEqual("12345");
        expect(this.subject._stopInfoController._root.parentNode).toBe(this.subject._root);
      });

      it("should remove previous stop info", function() {
        var firstChild = this.subject._stopInfoController;
        WB.specHelper.simulateClick(this.root.querySelectorAll("li a")[1]);
        var secondChild = this.subject._stopInfoController;
        expect(firstChild._root.parentNode).toBe(null);
        expect(secondChild._root.parentNode).toBe(this.subject._root);
      });
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
      expect(msg.textContent).toEqual("ERROR");
    });
  });

  describe("When the user has no stops", function () {
    beforeEach(function () {
      var args = this.userService.getStopsForUser.calls.mostRecent().args;
      var callback = args[1];
      callback(null, []);
    });

    it("should show a message", function () {
      expect(this.root).toContainElement(".error");
      var msg = this.root.querySelector(".error");
      expect(msg).not.toHaveClass("hidden");
      expect(msg.textContent).toEqual("You don't have any favorite stops.");
    });
  });
});
