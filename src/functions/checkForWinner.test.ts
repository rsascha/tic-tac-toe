import { checkForWinner } from "./checkForWinner";
import { getInitialGameState } from "./getInitialGameState";
import { checkColumns } from "./checkColumns";
import { checkRows } from "./checkRows";
import { UpdateGameStateOptions } from "../types";
import { checkDiagonaleUpperLeftToLowerRight } from "./checkDiagonaleUpperLeftToLowerRight";
import { checkDiagonaleLowerLeftToUpperRight } from "./checkDiagonaleLowerLeftToUpperRight";

jest
  .mock("./checkRows")
  .mock("./checkColumns")
  .mock("./checkDiagonaleUpperLeftToLowerRight")
  .mock("./checkDiagonaleLowerLeftToUpperRight");

describe("checkForWinner", () => {
  const gameState = getInitialGameState();
  const currentPlayer = "x";
  const onSetIsRunning = () => {};
  const updateGameStateOptions = {
    gameState,
    currentPlayer,
    onSetIsRunning,
  };

  it("should check if checkRows has been called", () => {
    checkForWinner({ gameState, currentPlayer, onSetIsRunning });
    expect(checkRows).toBeCalledWith(updateGameStateOptions);
  });

  it("should check if checkColumns has been called", () => {
    checkForWinner({ gameState, currentPlayer, onSetIsRunning });
    expect(checkColumns).toBeCalledWith(updateGameStateOptions);
  });

  it("should check if checkDiagonaleUpperLeftToLowerRight has been called", () => {
    checkForWinner({ gameState, currentPlayer, onSetIsRunning });
    expect(checkDiagonaleUpperLeftToLowerRight).toBeCalledWith(
      updateGameStateOptions
    );
  });

  it("should check if checkDiagonaleLowerLeftToUpperRight has been called", () => {
    checkForWinner({ gameState, currentPlayer, onSetIsRunning });
    expect(checkDiagonaleLowerLeftToUpperRight).toBeCalledWith(
      updateGameStateOptions
    );
  });
});
