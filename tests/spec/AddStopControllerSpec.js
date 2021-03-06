describe("AddStopController", function () {
  "use strict";

  beforeEach(function () {
    this.userService = {
      addStop: jasmine.createSpy("addStop")
    };

    this.subject = new WB.AddStopController(this.userService, "bob");
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
      WB.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should make an ajax call to add a stop", function () {
      expect(this.userService.addStop).toHaveBeenCalledWith("bob", "theStopId", jasmine.any(Function));
    });

    describe("When the service call succeeds", function () {
      beforeEach(function () {
        this.completedEventHandler = jasmine.createSpy("completedEventHandler");
        this.subject.completedEvent.subscribe(this.completedEventHandler);
        var callback = this.userService.addStop.calls.mostRecent().args[2];
        callback(null);
      });

      it("should trigger the completedEvent", function () {
        expect(this.completedEventHandler).toHaveBeenCalled();
      });
    });

    describe("When the service call fails", function () {
      beforeEach(function () {
        this.completedEventHandler = jasmine.createSpy("completedEventHandler");
        this.subject.completedEvent.subscribe(this.completedEventHandler);
        var callback = this.userService.addStop.calls.mostRecent().args[2];
        callback("nope!");
      });

      it("should not trigger the completedEvent", function () {
        expect(this.completedEventHandler).not.toHaveBeenCalled();
      });

      it("should show an error", function () {
        var errorNode = this.root.querySelector(".error");
        expect(errorNode).not.toHaveClass("hidden");
        expect(errorNode.textContent).toEqual("nope!");
      });

      describe("When the user tries to add another stop", function () {
        beforeEach(function () {
          WB.specHelper.simulateClick(this.root.querySelector("button"));
        });

        it("should hide the error", function () {
          var errorNode = this.root.querySelector(".error");
          expect(errorNode).toHaveClass("hidden");
        });
      });
    });
  });
});
