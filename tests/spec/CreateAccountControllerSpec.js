describe("CreateAccountController", function () {
  "use strict";
  beforeEach(function () {
    this.completedHandler = jasmine.createSpy("completedHandler");
    this.canceledHandler = jasmine.createSpy("canceledHandler");
    this.userService = {
      createUser: jasmine.createSpy("createUser")
    };
    this.subject = new Weatherbus.CreateAccountController(this.userService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
    this.subject.completed.subscribe(this.completedHandler);
    this.subject.canceled.subscribe(this.canceledHandler);
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

    it("should trigger the canceled event", function () {
      expect(this.canceledHandler).toHaveBeenCalled();
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

      it("should trigger the completed event with the new user's username", function () {
        expect(this.completedHandler).toHaveBeenCalledWith("theuser");
      });
    });

    describe("When the account creation fails", function () {
      beforeEach(function () {
        var cb = this.userService.createUser.calls.mostRecent().args[1];
        cb("Could not create user.");
      });

      it("should display an error", function () {
        expect(this.root.querySelector(".error")).not.toHaveClass("hidden");
        expect(this.root.querySelector(".error").textContent).toEqual("Could not create user.");
      });
    });
  });
});
