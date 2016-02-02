describe("sortRouteNumbers", function () {
  "use strict";

  it("should sort non-numericals alphabetically", function () {
    expect(Weatherbus.sortRouteNumbers(["D", "C"])).toEqual(["C", "D"]);
    expect(Weatherbus.sortRouteNumbers(["C", "D"])).toEqual(["C", "D"]);
  });

  it("should sort things with number prefixes before things without", function () {
    expect(Weatherbus.sortRouteNumbers(["D", "28E"])).toEqual(["28E", "D"]);
    expect(Weatherbus.sortRouteNumbers(["28E", "D"])).toEqual(["28E", "D"]);
  });

  it("should sort smaller numbers before larger numbers", function () {
    expect(Weatherbus.sortRouteNumbers(["113", "28"])).toEqual(["28", "113"]);
    expect(Weatherbus.sortRouteNumbers(["28", "113"])).toEqual(["28", "113"]);
  });

  it("should sort numbers with suffixes after the same number without", function () {
    expect(Weatherbus.sortRouteNumbers(["28E", "28"])).toEqual(["28", "28E"]);
    expect(Weatherbus.sortRouteNumbers(["28", "28E"])).toEqual(["28", "28E"]);
  });
});
