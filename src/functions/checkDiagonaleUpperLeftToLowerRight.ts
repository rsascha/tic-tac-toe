import { SIZE } from "../config";
import { UpdateGameStateOptions } from "../types";

export function checkDiagonaleUpperLeftToLowerRight({
  gameState,
  currentPlayer,
  onSetIsRunning,
}: UpdateGameStateOptions) {
  let isWon = true;
  for (let i = 0; i < SIZE; i++) {
    if (gameState[i][i].selected !== currentPlayer) {
      isWon = false;
    }
  }
  if (isWon) {
    for (let i = 0; i < SIZE; i++) {
      gameState[i][i].won = true;
    }
    onSetIsRunning(false);
  }
}
