/* jshint jasmine: true */
describe("LoginController", function () {
  "use strict";

  beforeEach(function () {
    this.subject = new Weatherbus.LoginController();
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should have a username field and submit button", function () {
    expect(this.root.querySelector("input[type='text']")).toBeTruthy();
    expect(this.root.querySelector("button")).toBeTruthy();
  });
});
