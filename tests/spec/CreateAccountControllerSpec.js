describe("CreateAccountController", function () {
  "use strict";
  beforeEach(function () {
    this.doneCallback = jasmine.createSpy("doneCallback");
    this.userService = {
      createUser: jasmine.createSpy("createUser")
    };
    this.subject = new Weatherbus.CreateAccountController(this.userService, this.doneCallback);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  describe("When the user clicks Add without entering a username", function () {
    beforeEach(function () {
      Weatherbus.specHelper.simulateClick(this.root.querySelector(".add"));
    });

    it("should display an error", function () {
      expect(this.root.querySelector(".error")).not.toHaveClass("hidden");
      expect(this.root.querySelector(".error").textContent).toEqual("Please enter a valid username.");
    });
  });

  describe("When the user clicks Cancel", function () {
    beforeEach(function () {
      Weatherbus.specHelper.simulateClick(this.root.querySelector(".cancel"));
    });

    it("should call the callback", function () {
      expect(this.doneCallback).toHaveBeenCalledWith(null);
    });
  });

  describe("When the user clicks Add after entering a name", function() {
    beforeEach(function() {
      this.root.querySelector("input[type=text]").value = "theuser";
      Weatherbus.specHelper.simulateClick(this.root.querySelector(".add"));
    });

    it("should create the account", function () {
      expect(this.userService.createUser).toHaveBeenCalledWith("theuser", jasmine.any(Function));
    });

    describe("When the account creation succeeds", function () {
      beforeEach(function () {
        var cb = this.userService.createUser.calls.mostRecent().args[1];
        cb(null);
      });

      it("should call the callback with the new user's username", function () {
        expect(this.doneCallback).toHaveBeenCalledWith("theuser");
      });
    });

    describe("When the account creation fails", function () {
      beforeEach(function () {
        var cb = this.userService.createUser.calls.mostRecent().args[1];
        cb("some error!");
      });
      it("should display an error", function () {
        expect(this.root.querySelector(".error")).not.toHaveClass("hidden");
        expect(this.root.querySelector(".error").textContent).toEqual("some error!");
      });
    });
  });
});
