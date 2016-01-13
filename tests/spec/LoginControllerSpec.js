/* jshint jasmine: true */
describe("LoginController", function () {
  "use strict";

  beforeEach(function () {
    this.callback = jasmine.createSpy("callback");
    this.subject = new Weatherbus.LoginController(this.callback);
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

    it("should call the callback", function () {
      expect(this.callback).toHaveBeenCalledWith("theuser");
    });
  });
});
