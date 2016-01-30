describe("AddStopController", function () {
  "use strict";

  beforeEach(function () {
    this.userService = {
      addStop: jasmine.createSpy("addStop")
    };

    this.subject = new Weatherbus.AddStopController(this.userService, "bob");
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should have a stopId field and submit button", function () {
    expect(this.root).toContainElement("input[type='text']");
    expect(this.root).toContainElement("button");
  });

  describe("When the submit button is clicked", function () {
    beforeEach(function () {
      this.root.querySelector("input[type=text]").value = "theStopId";
      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should make an ajax call to add a stop", function () {
      expect(this.userService.addStop).toHaveBeenCalledWith("bob", "theStopId", jasmine.any(Function));
    });

    describe("When the service call succeeds", function () {
      beforeEach(function () {
        this.completedEventHandler = jasmine.createSpy("completedEventHandler");
        this.subject.completedEvent.subscribe(this.completedEventHandler);
        this.userService.addStop.calls.mostRecent().args[2](null);
      });

      it("should trigger the completedEvent", function () {
        expect(this.completedEventHandler).toHaveBeenCalled();
      });
    });
  });
});
