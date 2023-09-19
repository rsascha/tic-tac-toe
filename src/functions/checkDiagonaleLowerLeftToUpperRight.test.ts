import { CellState } from "../types/CellState";
import { checkDiagonaleLowerLeftToUpperRight } from "./checkDiagonaleLowerLeftToUpperRight";

describe("checkDiagonaleLowerLeftToUpperRight", () => {
  it("update gameState with won, calls onSetIsRunning with false", () => {
    const gameState: CellState[][] = [
      [
        { selected: null, won: false, position: null },
        { selected: null, won: false, position: null },
        { selected: "x", won: false, position: null },
      ],
      [
        { selected: null, won: false, position: null },
        { selected: "x", won: false, position: null },
        { selected: null, won: false, position: null },
      ],
      [
        { selected: "x", won: false, position: null },
        { selected: null, won: false, position: null },
        { selected: null, won: false, position: null },
      ],
    ];
    const setIsRunning = jest.fn();
    checkDiagonaleLowerLeftToUpperRight({
      gameState,
      currentPlayer: "x",
      onSetIsRunning: (value) => setIsRunning(value),
    });
    expect(gameState).toStrictEqual([
      [
        { selected: null, won: false, position: null },
        { selected: null, won: false, position: null },
        { selected: "x", won: true, position: null },
      ],
      [
        { selected: null, won: false, position: null },
        { selected: "x", won: true, position: null },
        { selected: null, won: false, position: null },
      ],
      [
        { selected: "x", won: true, position: null },
        { selected: null, won: false, position: null },
        { selected: null, won: false, position: null },
      ],
    ]);
    expect(setIsRunning).toHaveBeenCalledTimes(1);
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });
});
