import { Position } from "./Position";

export function getGridLinesCoords(position: Position) {
  const result = [];
  if (position.y === "bottom")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
    });
  if (position.x === "right")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
    });
  if (position.x === "center")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
    });
  if (position.y === "center")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
    });
  return result;
}
