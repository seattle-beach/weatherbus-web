describe("LoginController", function () {
  "use strict";

  beforeEach(function () {
    this.completedHandler = jasmine.createSpy("completedHandler");
    this.subject = new Weatherbus.LoginController(this.callback);
    this.subject.completed.subscribe(this.completedHandler);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should have a username field and submit button", function () {
    expect(this.root).toContainElement("input[type='text']");
    expect(this.root).toContainElement("button");
  });

  describe("When the submit button is clicked", function () {
    beforeEach(function () {
      this.root.querySelector("input[type=text]").value = "theuser";
      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should trigger the completed event", function () {
      expect(this.completedHandler).toHaveBeenCalledWith("theuser");
    });
  });

  describe("When the submit button is clicked without entering a username", function () {
    beforeEach(function () {
      Weatherbus.specHelper.simulateClick(this.root.querySelector("button"));
    });

    it("should not trigger the completed event", function () {
      expect(this.completedHandler).not.toHaveBeenCalled();
    });

    it("should display an error", function () {
      var error = this.root.querySelector(".error");
      expect(error).not.toHaveClass("hidden");
    });
  });
});
