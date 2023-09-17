import { CellState } from "../types/CellState";
import { checkDiagonale } from "./checkDiagonale";

describe("checkDiagonal", () => {
  it("diagonale 1: update gameState with won, calls onSetIsRunning with false", () => {
    const gameState: CellState[][] = [
      [
        { selected: "o", won: false, position: { x: "left", y: "top" } },
        { selected: null, won: false, position: { x: "center", y: "top" } },
        { selected: "x", won: false, position: { x: "right", y: "top" } },
      ],
      [
        { selected: "x", won: false, position: { x: "left", y: "center" } },
        { selected: "o", won: false, position: { x: "center", y: "center" } },
        { selected: null, won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "bottom" } },
        { selected: "x", won: false, position: { x: "center", y: "bottom" } },
        { selected: "o", won: false, position: { x: "right", y: "bottom" } },
      ],
    ];
    const setIsRunning = jest.fn();
    checkDiagonale(
      {
        gameState,
        currentPlayer: "o",
        onSetIsRunning: (value) => setIsRunning(value),
      },
      1
    );
    expect(gameState).toStrictEqual([
      [
        { selected: "o", won: true, position: { x: "left", y: "top" } },
        { selected: null, won: false, position: { x: "center", y: "top" } },
        { selected: "x", won: false, position: { x: "right", y: "top" } },
      ],
      [
        { selected: "x", won: false, position: { x: "left", y: "center" } },
        { selected: "o", won: true, position: { x: "center", y: "center" } },
        { selected: null, won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "bottom" } },
        { selected: "x", won: false, position: { x: "center", y: "bottom" } },
        { selected: "o", won: true, position: { x: "right", y: "bottom" } },
      ],
    ]);
    expect(setIsRunning).toHaveBeenCalledTimes(1);
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });

  it("diagonale 2: update gameState with won, calls onSetIsRunning with false", () => {
    const gameState: CellState[][] = [
      [
        { selected: "o", won: false, position: { x: "left", y: "top" } },
        { selected: null, won: false, position: { x: "center", y: "top" } },
        { selected: "x", won: false, position: { x: "right", y: "top" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "center" } },
        { selected: "x", won: false, position: { x: "center", y: "center" } },
        { selected: "o", won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: "x", won: false, position: { x: "left", y: "bottom" } },
        { selected: null, won: false, position: { x: "center", y: "bottom" } },
        { selected: null, won: false, position: { x: "right", y: "bottom" } },
      ],
    ];
    const setIsRunning = jest.fn();
    checkDiagonale(
      {
        gameState,
        currentPlayer: "x",
        onSetIsRunning: (value) => setIsRunning(value),
      },
      2
    );
    expect(gameState).toStrictEqual([
      [
        { selected: "o", won: false, position: { x: "left", y: "top" } },
        { selected: null, won: false, position: { x: "center", y: "top" } },
        { selected: "x", won: true, position: { x: "right", y: "top" } },
      ],
      [
        { selected: null, won: false, position: { x: "left", y: "center" } },
        { selected: "x", won: true, position: { x: "center", y: "center" } },
        { selected: "o", won: false, position: { x: "right", y: "center" } },
      ],
      [
        { selected: "x", won: true, position: { x: "left", y: "bottom" } },
        { selected: null, won: false, position: { x: "center", y: "bottom" } },
        { selected: null, won: false, position: { x: "right", y: "bottom" } },
      ],
    ]);
    expect(setIsRunning).toHaveBeenCalledTimes(1);
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });
});
