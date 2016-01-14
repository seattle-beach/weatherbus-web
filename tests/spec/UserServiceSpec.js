/*jshint jasmine: true */
describe("UserService", function () {
  "use strict";

  beforeEach( function () {
    var that = this;
    var xhrFactory = function () {
      that.xhr = {
        open: jasmine.createSpy("open"),
        send: jasmine.createSpy("send"),
      };
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
      expect(this.xhr.open).toHaveBeenCalledWith("get", "http://localhost:8080/users/stops?username=bob");
      expect(this.xhr.send).toHaveBeenCalled();
    });

    describe("When the AJAX call succeeds", function () {
      beforeEach( function () {
        this.xhr.response = "Stops for bob:<br/>Stop: 123456<br/>Stop: 12345<br/>";
        this.xhr.readyState = 4;
        this.xhr.onreadystatechange();
      });

      it("should call the callback with the list of stops", function () {
        expect(this.callback).toHaveBeenCalledWith(["123456", "12345"]);
      });
    });
  });
});
