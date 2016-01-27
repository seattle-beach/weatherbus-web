describe("UserService", function () {
  "use strict";

  beforeEach( function () {
    var that = this;
    var xhrFactory = function () {
      that.xhr = Weatherbus.specHelper.mockXhrFactory();
      return that.xhr;
    };
    this.subject = new Weatherbus.UserService(xhrFactory);
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
});
