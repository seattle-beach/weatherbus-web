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
    this.loggedInHandler = jasmine.createSpy("loggedInHandler");
    this.subject = new WB.NotLoggedInController(userService);
    this.subject.loggedIn.subscribe(this.loggedInHandler);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a login controller", function () {
    verifyChild(this, WB.LoginController);
  });

  describe("When the user clicks Create Account", function () {
    beforeEach(function () {
      WB.specHelper.simulateClick(this.root.querySelector(".create-link"));
    });

    it("should hide the Create Account link", function () {
      expect(this.root.querySelector(".create-link")).toHaveClass("hidden");
    });

    it("should show a Create Account controller", function () {
      verifyChild(this, WB.CreateAccountController);
    });

    describe("When the user creates an account", function () {
      beforeEach(function () {
        this.root.querySelector("input[type=text]").value = "theuser";
        WB.specHelper.simulateClick(this.root.querySelector(".add"));
      });

      it("shnould trigger the loggedIn event with the created user's username", function () {
        expect(this.loggedInHandler).toHaveBeenCalledWith("theuser");
      });
    });

    describe("When the user cancels", function () {
      beforeEach(function () {
        WB.specHelper.simulateClick(this.root.querySelector(".cancel"));
      });
    
      it("should show a login controller", function () {
        verifyChild(this, WB.LoginController);
      });

      it("should show the Create Account link", function () {
        expect(this.root.querySelector(".create-link")).not.toHaveClass("hidden");
      });
    });
  });
});
