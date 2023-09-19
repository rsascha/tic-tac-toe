import { checkColumns } from "./checkColumns";
import { checkRows } from "./checkRows";
import { UpdateGameStateOptions } from "../types";
import { checkDiagonaleUpperLeftToLowerRight } from "./checkDiagonaleUpperLeftToLowerRight";

export function checkForWinner({
  gameState,
  currentPlayer,
  onSetIsRunning,
}: UpdateGameStateOptions) {
  checkRows({
    gameState,
    currentPlayer,
    onSetIsRunning: (value) => onSetIsRunning(value),
  });
  checkColumns({
    gameState,
    currentPlayer,
    onSetIsRunning: (value) => onSetIsRunning(value),
  });
  checkDiagonaleUpperLeftToLowerRight({
    gameState,
    currentPlayer,
    onSetIsRunning: (value) => onSetIsRunning(value),
  });
  checkDiagonaleUpperLeftToLowerRight({
    gameState,
    currentPlayer,
    onSetIsRunning: (value) => onSetIsRunning(value),
  });
}
