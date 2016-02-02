describe("sortRouteNumbers", function () {
  "use strict";

  it("should sort non-numericals alphabetically", function () {
    expect(WB.sortRouteNumbers(["D", "C"])).toEqual(["C", "D"]);
    expect(WB.sortRouteNumbers(["C", "D"])).toEqual(["C", "D"]);
  });

  it("should sort things with number prefixes before things without", function () {
    expect(WB.sortRouteNumbers(["D", "28E"])).toEqual(["28E", "D"]);
    expect(WB.sortRouteNumbers(["28E", "D"])).toEqual(["28E", "D"]);
  });

  it("should sort smaller numbers before larger numbers", function () {
    expect(WB.sortRouteNumbers(["113", "28"])).toEqual(["28", "113"]);
    expect(WB.sortRouteNumbers(["28", "113"])).toEqual(["28", "113"]);
  });

  it("should sort numbers with suffixes after the same number without", function () {
    expect(WB.sortRouteNumbers(["28E", "28"])).toEqual(["28", "28E"]);
    expect(WB.sortRouteNumbers(["28", "28E"])).toEqual(["28", "28E"]);
  });
});
