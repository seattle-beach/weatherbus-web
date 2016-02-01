describe("App", function () {
  "use strict";

  beforeEach(function () {
    this.root = document.createElement("div");
    this.subject = new Weatherbus.App(this.root);
    this.subject._xhrFactory = Weatherbus.specHelper.mockXhrFactory;
    this.subject.locationService.hash.and.stub().and.returnValue("");
    this.subject.locationService.search.and.stub().and.returnValue("");
  });

  describe("When the app launches", function () {
    beforeEach(function () {
      this.subject.start();
    });

	  it("should show the not logged in controller", function () {
	    var rootController = this.subject._rootController;
      expect(rootController).toEqual(jasmine.any(Weatherbus.NotLoggedInController));
	    expect(rootController._root.parentNode).toBe(this.root);
	  });
	
	  describe("When the user logs in", function () {
	    beforeEach(function () {
	      this.root.querySelector("input[type=text]").value = "theuser";
	      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
	    });
	
	    it("should show the stops controller", function () {
	      var stopListController = this.subject._rootController;
	      expect(stopListController instanceof Weatherbus.StopListController).toEqual(true);
	      expect(stopListController._root.parentNode).toBe(this.root);
	      expect(stopListController.username).toBe("theuser");
	    });
	  });
  });

  describe("When the app launches at a url that has a stopid", function () {
    beforeEach(function () {
      this.subject.locationService.hash.and.stub().and.returnValue("#stop-1_2345");
      this.subject.start();
    });

    it("should show a stop info controller for the specified stop", function () {
      expect(this.subject._rootController).toEqual(jasmine.any(Weatherbus.StopInfoController));
      expect(this.subject._rootController._stopId).toEqual("1_2345");
    });
  });

  describe("When the app launches at a url that has routes specified", function () {
    beforeEach(function () {
      this.subject.locationService.search.and.stub().and.returnValue("?stop=1_619&routes=40,28");
      this.subject.start();
    });

    it("should show a stop info controller with the specified route filter", function() {
      expect(this.subject._rootController).toEqual(jasmine.any(Weatherbus.StopInfoController));
      expect(this.subject._rootController._stopId).toEqual("1_619");
      expect(this.subject._rootController._routeFilter).toEqual(["40", "28"]);
    });
  });
});
