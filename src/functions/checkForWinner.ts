import { checkColumns } from "./checkColumns";
import { checkDiagonale } from "./checkDiagonale";
import { checkRows } from "./checkRows";
import { UpdateGameStateOptions } from "../types";

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

  for (let i = 1; i <= 2; i++) {
    checkDiagonale(
      {
        gameState,
        currentPlayer,
        onSetIsRunning: (value) => onSetIsRunning(value),
      },
      i
    );
  }
}
