describe("StopService", function() {
  "use strict";

  beforeEach(function() {
    var that = this;
    var xhrFactory = function() {
      that.xhr = Weatherbus.specHelper.mockXhrFactory();
      return that.xhr;
    };
    this.subject = new Weatherbus.StopService(xhrFactory);
  });

  describe("getInfoForStop", function() {
    beforeEach(function() {
      this.callback = jasmine.createSpy("callback");
      this.subject.getInfoForStop("1_75403", this.callback);
    });

    it("should do an AJAX call to the stopInfo API", function() {
      expect(this.xhr).toBeTruthy();
      expect(this.xhr.open).toHaveBeenCalledWith("get", "http://localhost/wb?stopId=1_75403");
      expect(this.xhr.send).toHaveBeenCalled();
    });

    describe("When the AJAX call succeeds", function () {
      beforeEach( function () {
        this.xhr.response = "{\"longitude\":-122.305214,\"latitude\":47.654365,\"stopId\":\"1_75403\"}";
        this.xhr.readyState = 4;
        this.xhr.status = 200;
        this.xhr.onreadystatechange();
      });

      it("should call the callback with the stop information", function () {
        var response = {
          latitude: 47.654365,
          longitude: -122.305214
        };
        expect(this.callback).toHaveBeenCalledWith(null, response);
      });
    });

    describe("When the AJAX call does not succeed", function () {
      beforeEach( function () {
        this.xhr.readyState = 4;
        this.xhr.status = 400;
        this.xhr.onreadystatechange();
      });

      it("should call the callback with an error message", function () {
        var errorMsg = "There was an error getting stop info.";
        expect(this.callback).toHaveBeenCalledWith(errorMsg, null);
      });
    });
  });
});