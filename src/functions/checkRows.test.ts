import { checkRows } from "./checkRows";
import { CellState } from "../types/CellState";

describe("checkRows", () => {
  it("update gameState with won, calls onSetIsRunning with false", () => {
    const gameState: CellState[][] = [
      [
        { selected: "x", won: false, position: { x: "left", y: "top" } },
        { selected: "x", won: false, position: { x: "center", y: "top" } },
        { selected: "x", won: false, position: { x: "right", y: "top" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "center" } },
        { selected: "o", won: false, position: { x: "center", y: "center" } },
        { selected: null, won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: "o", won: false, position: { x: "left", y: "bottom" } },
        { selected: null, won: false, position: { x: "center", y: "bottom" } },
        { selected: null, won: false, position: { x: "right", y: "bottom" } },
      ],
    ];
    const setIsRunning = jest.fn();
    checkRows({
      gameState,
      currentPlayer: "x",
      onSetIsRunning: (value) => setIsRunning(value),
    });
    expect(gameState).toStrictEqual([
      [
        { selected: "x", won: true, position: { x: "left", y: "top" } },
        { selected: "x", won: true, position: { x: "center", y: "top" } },
        { selected: "x", won: true, position: { x: "right", y: "top" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "center" } },
        { selected: "o", won: false, position: { x: "center", y: "center" } },
        { selected: null, won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: "o", won: false, position: { x: "left", y: "bottom" } },
        { selected: null, won: false, position: { x: "center", y: "bottom" } },
        { selected: null, won: false, position: { x: "right", y: "bottom" } },
      ],
    ]);
    expect(setIsRunning).toHaveBeenCalledTimes(1);
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });
});
