describe("StopInfoController", function () {
  "use strict";

  beforeEach(function () {
    this.stopService = {
      getInfoForStop: jasmine.createSpy("getInfoForStop")
    };
    this.subject = new Weatherbus.StopInfoController("6789_0", this.stopService);
    this.root = document.createElement("div");
    this.subject.appendTo(this.root);
  });

  it("should show a loading indicator", function () {
    expect(this.root).toContainElement(".loading");
    var loadingIndicator = this.root.querySelector(".loading");
    expect(loadingIndicator).not.toHaveClass("hidden");
  });

  it("should load information for the stop", function () {
    expect(this.stopService.getInfoForStop).toHaveBeenCalledWith("6789_0", jasmine.any(Function));
  });

  describe("When the stop information loads", function () {
    var getCellsText = function (row) {
      var cells = row.querySelectorAll("td");
      return Array.prototype.map.call(cells, function (td) { return td.textContent; });
    };

    beforeEach(function () {
      var args = this.stopService.getInfoForStop.calls.mostRecent().args;
      var cb = args[1];
      var result = {
         latitude: 47.654365,
         longitude: -122.305214,
         departures: [
           {
             predictedTime: 1453316965000,
             routeShortName: "31",
             scheduledTime: 1453317145000,
             temp: 36.2,
             headsign: "CENTRAL MAGNOLIA FREMONT"
           },
           {
             predictedTime: 0,
             routeShortName: "855",
             scheduledTime: 1516561850000,
             temp: 14.4,
             headsign: "Lynnwood"
           }
         ]
      };
      cb(null, result);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should display latitude and longitude", function () {
      expect(this.root).toContainElement(".lat");
      expect(this.root).toContainElement(".lng");
      expect(this.root.querySelector(".lat").textContent).toEqual("47.654365");
      expect(this.root.querySelector(".lng").textContent).toEqual("-122.305214");
    });

    it("should display upcoming departures", function () {
      expect(this.root).toContainElement("table.departures");
      var rows = this.root.querySelectorAll("table.departures tbody tr");
      expect(rows.length).toEqual(2); // TODO: custom matcher for number of elements matching a selector?
      var cells0 = getCellsText(rows[0]);
      var cells1 = getCellsText(rows[1]);

      // WARNING: Time zone issues ahead!
      // If you change this, be sure to test with your local clock set to UTC (used by Concourse) and Pacific.
      var pstToLocal = function (pstTime) {
        // This is deliberately dumb -- rather than doing a bunch of complicated time zone math,
        // we just hardcode the possible results. That makes the tests easier to follow and more
        // likely to be right.
        var values = {
          /* UTC */ 0: {
            "11:09": "19:09",
            "11:10": "19:10"
          },
          /* PST */ 480: {
            "11:09": "11:09",
            "11:10": "11:10"
          },
          /* PDT */ 420: {
            "11:09": "12:09",
            "11:10": "12:10"
          }
        };

        return values[new Date().getTimezoneOffset()][pstTime];
      };

      expect(cells0).toEqual(["31 CENTRAL MAGNOLIA FREMONT", pstToLocal("11:09")]);
      expect(cells1).toEqual(["855 Lynnwood", pstToLocal("11:10") + " (scheduled)"]);
    });
  });

  describe("When the stop information fails to load", function () {
    beforeEach(function () {
      var args = this.stopService.getInfoForStop.calls.mostRecent().args;
      var callback = args[1];
      var error = "ERROR";
      callback(error, null);
    });

    it("should hide the loading indicator", function () {
      var loadingIndicator = this.root.querySelector(".loading");
      expect(loadingIndicator).toHaveClass("hidden");
    });

    it("should render an error message", function () {
      expect(this.root).toContainElement(".error");
      var msg = this.root.querySelector(".error");
      expect(msg).not.toHaveClass("hidden");
      expect(msg.textContent).toEqual("ERROR");
    });
  });

});
