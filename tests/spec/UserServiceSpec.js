describe("UserService", function () {
  "use strict";

  beforeEach( function () {
    var that = this;
    var xhrFactory = function () {
      that.xhr = WB.specHelper.mockXhrFactory();
      return that.xhr;
    };
    this.subject = new WB.UserService(xhrFactory);
  });

  describe("getStopsForUser", function () {
    beforeEach(function () {
      this.callback = jasmine.createSpy("callback");
      this.subject.getStopsForUser("bob", this.callback);
    });

    it("should do an AJAX call to the user API", function () {
      expect(this.xhr).toBeTruthy();
      expect(this.xhr.open).toHaveBeenCalledWith("get", "http://localhost/users/stops?username=bob");
      expect(this.xhr.send).toHaveBeenCalled();
    });

    describe("When the AJAX call succeeds", function () {
      beforeEach( function () {
        this.xhr.response = "[{\"id\": \"12345_6\", \"name\": \"Underscore six\"}, {\"id\": \"12345\", \"name\": \"Luggage\"}]";
        this.xhr.readyState = 4;
        this.xhr.status = 200;
        this.xhr.onreadystatechange();
      });

      it("should call the callback with the list of stops", function () {
        expect(this.callback).toHaveBeenCalledWith(null, [{id: "12345_6", name: "Underscore six"}, { id : "12345", name : "Luggage"}]);
      });
    });

    describe("When the AJAX call fails", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 400;
        this.xhr.onreadystatechange();
      });

      it("should call the callback with an error message", function () {
        var errorMsg = "There was an error retrieving stops.";
        expect(this.callback).toHaveBeenCalledWith(errorMsg, null);
      });
    });

    describe("When the AJAX call fails because the user doesn't exist", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 404;
        this.xhr.response = JSON.stringify({message: "User not found"});
        this.xhr.onreadystatechange();
      });

      it("should call the callback with the error message", function () {
        var errorMsg = "No such user.";
        expect(this.callback).toHaveBeenCalledWith(errorMsg, null);
      });
    });
  });

  describe("createUser", function () {
    beforeEach(function () {
      this.callback = jasmine.createSpy("callback");
      this.subject.createUser("bob", this.callback);
    });

    it("should do an AJAX call to the user API", function () {
      expect(this.xhr).toBeTruthy();
      expect(this.xhr.open).toHaveBeenCalledWith("post", "http://localhost/users");
      expect(this.xhr.setRequestHeader).toHaveBeenCalledWith("Content-type", "application/json");
      expect(this.xhr.send).toHaveBeenCalledWith("{\"username\":\"bob\"}");
    });

    describe("When the AJAX call succeeds", function () {
      var registerSuccessTests = function (status) {
        beforeEach(function () {
          this.xhr.readyState = 4;
          this.xhr.status = status;
          this.xhr.onreadystatechange();
        });

        it("should call the callback", function () {
          expect(this.callback).toHaveBeenCalledWith(null);
        });
      };

      describe("With a 200 status", function () {
        registerSuccessTests(200);
      });

      describe("With a 201 status", function () {
        registerSuccessTests(201);
      });
    });

    describe("When the AJAX call fails", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 404;
        this.xhr.response = "Nope!";
        this.xhr.onreadystatechange();
      });

      it("should call the callback with a generic error message", function () {
        expect(this.callback).toHaveBeenCalledWith("Could not create user.");
      });
    });
  });

  describe("addStop", function () {
    beforeEach(function () {
      this.callback = jasmine.createSpy("callback");
      this.subject.addStop("bob", "1_2345", this.callback);
    });

    it("should do an AJAX call to the user add stops API", function () {
      expect(this.xhr).toBeTruthy();
      expect(this.xhr.open).toHaveBeenCalledWith("post", "http://localhost/users/bob/stops");
      expect(this.xhr.setRequestHeader).toHaveBeenCalledWith("Content-type", "application/json");
      expect(this.xhr.send).toHaveBeenCalledWith("{\"stopId\":\"1_2345\"}");
    });

    describe("When the AJAX call succeeds", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 200;
        this.xhr.onreadystatechange();
      });

      it("should call the callback", function () {
        expect(this.callback).toHaveBeenCalledWith(null);
      });
    });

    describe("When the AJAX call fails", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 404;
        this.xhr.response = "Nope!";
        this.xhr.onreadystatechange();
      });

      it("should call the callback with a generic error message", function () {
        expect(this.callback).toHaveBeenCalledWith("Could not add stop.");
      });
    });

    describe("When the AJAX call fails because the stop wasn't found", function () {
      beforeEach(function () {
        this.xhr.readyState = 4;
        this.xhr.status = 404;
        this.xhr.response = JSON.stringify({message: "Stop Id not found"});
        this.xhr.onreadystatechange();
      });

      it("should call the callback with a generic error message", function () {
        expect(this.callback).toHaveBeenCalledWith("Stop ID not found");
      });
    });
  });
});
