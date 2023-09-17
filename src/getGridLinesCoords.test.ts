import { getGridLinesCoords } from "./getGridLinesCoords";
import { Position } from "./Position";

describe("getGridLinesCoords", () => {
  it("returns the correct grid lines for bottom position", () => {
    const position: Position = { x: "left", y: "bottom" };
    const expected = [
      {
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%",
      },
    ];
    expect(getGridLinesCoords(position)).toEqual(expected);
  });

  it("returns the correct grid lines for right position", () => {
    const position: Position = { x: "right", y: "top" };
    const expected = [
      {
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%",
      },
    ];
    expect(getGridLinesCoords(position)).toEqual(expected);
  });

  it("returns the correct grid lines for center position", () => {
    const position: Position = { x: "center", y: "center" };
    const expected = [
      {
        x1: "0%",
        y1: "0%",
        x2: "0%",
        y2: "100%",
      },
      {
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%",
      },
    ];
    expect(getGridLinesCoords(position)).toEqual(expected);
  });
});
