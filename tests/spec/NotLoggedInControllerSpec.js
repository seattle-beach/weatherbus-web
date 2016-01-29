describe("NotLoggedInController", function () {
  "use strict";
  var verifyChild = function (scope, type) {
    expect(scope.subject._child).toEqual(jasmine.any(type));
    expect(scope.subject._child._root).toBeTruthy();
    expect(scope.root.querySelector(".child-container").firstChild).toBe(scope.subject._child._root);
  };

  beforeEach(function () {
    var userService = {
      createUser: function (username, callback) {
        callback();
      }
    };
    this.loggedInCallback = jasmine.createSpy("loggedInCallback");
    this.subject = new Weatherbus.NotLoggedInController(userService, this.loggedInCallback);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a login controller", function () {
    verifyChild(this, Weatherbus.LoginController);
  });

  describe("When the user clicks Create Account", function () {
    beforeEach(function () {
      Weatherbus.specHelper.simulateClick(this.root.querySelector(".create-link"));
    });

    it("should hide the Create Account link", function () {
      expect(this.root.querySelector(".create-link")).toHaveClass("hidden");
    });

    it("should show a Create Account controller", function () {
      verifyChild(this, Weatherbus.CreateAccountController);
    });

    describe("When the user creates an account", function () {
      beforeEach(function () {
        this.root.querySelector("input[type=text]").value = "theuser";
        Weatherbus.specHelper.simulateClick(this.root.querySelector(".add"));
      });

      it("shnould call the callback with the created user's username", function () {
        expect(this.loggedInCallback).toHaveBeenCalledWith("theuser");
      });
    });

    describe("When the user cancels", function () {
      beforeEach(function () {
        Weatherbus.specHelper.simulateClick(this.root.querySelector(".cancel"));
      });
    
      it("should show a login controller", function () {
        verifyChild(this, Weatherbus.LoginController);
      });
    });
  });
});
