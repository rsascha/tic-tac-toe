import { SIZE } from "../config";
import { CellState } from "../types/CellState";

export function getInitialGameState() {
  const result: Array<Array<CellState>> = [[]];
  for (let row = 0; row < SIZE; row++) {
    result[row] = [];
    for (let column = 0; column < SIZE; column++) {
      result[row][column] = {
        selected: undefined,
        won: false,
        position: {
          x: column === 0 ? "left" : column === SIZE - 1 ? "right" : "center",
          y: row === 0 ? "top" : row === SIZE - 1 ? "bottom" : "center",
        },
      };
    }
  }
  return result;
}
