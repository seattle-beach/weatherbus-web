describe("RouteFilterController", function () {
  "use strict";

  beforeEach(function () {
    this.subject = new Weatherbus.RouteFilterController(["31", "855"]);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a checkbox for each route", function () {
    var labels = this.root.querySelectorAll("label");
    var text = Array.prototype.map.call(labels, function (label) {
      return label.textContent;
    });
    expect(text).toEqual([" 31", " 855"]);
  });

  describe("When the user clicks Apply", function () {
    beforeEach(function () {
      this.subscriber = jasmine.createSpy("subscriber");
      this.subject.completed.subscribe(this.subscriber);
      this.root.querySelector("input[type=checkbox]").checked = false;
      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should trigger the completed event with the list of selected stops", function () {
      expect(this.subscriber).toHaveBeenCalledWith(["855"]);
    });
  });
});