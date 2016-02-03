describe("NearbyStopsController", function () {
  "use strict";
  beforeEach(function () {
    this.geolocationService = {
      getLocation: jasmine.createSpy("getLocation")
    };
    this.subject = new WB.NearbyStopsController(this.geolocationService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should request the user's location", function () {
    expect(this.geolocationService.getLocation).toHaveBeenCalledWith(jasmine.any(Function));
  });

  describe("When the location request succeeds", function () {
    beforeEach(function () {
      var cb = this.geolocationService.getLocation.calls.mostRecent().args[0];
      cb({lat: 47.5959576, lng: -122.33709630000001});
    });

    it("should show a map centered on the user's location", function () {
      expect(WB.latestMap).toBeTruthy();
      expect(WB.latestMap._container).toBe(this.root.querySelector(".map-container"));
      expect(WB.latestMap._config.center).toEqual({
        lat: 47.5959576,
        lng: -122.33709630000001
      });
    });
  });
});
