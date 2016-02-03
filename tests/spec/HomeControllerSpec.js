describe("HomeController", function () {
  "use strict";
  beforeEach(function () {
    this.subject = new WB.HomeController();
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  describe("When the user clicks 'Nearby stops'", function () {
    beforeEach(function () {
      WB.specHelper.simulateClick(this.root.querySelector(".nearby-stops"));
    });

    it("should show a NearbyStopsController", function () {
      expect(this.subject._child instanceof WB.NearbyStopsController).toBe(true);
      expect(this.root.querySelector(".child").firstChild).toBe(this.subject._child._root);
    });
  });
});
