import { SIZE } from "../config";
import { UpdateGameStateOptions } from "../types";

export function checkDiagonaleLowerLeftToUpperRight({
  gameState,
  currentPlayer,
  onSetIsRunning,
}: UpdateGameStateOptions) {
  let isWon = true;
  for (let i = 0; i < SIZE; i++) {
    if (gameState[i][SIZE - 1 - i].selected !== currentPlayer) {
      isWon = false;
    }
  }
  if (isWon) {
    for (let i = 0; i < SIZE; i++) {
      gameState[i][SIZE - 1 - i].won = true;
    }
    onSetIsRunning(false);
  }
}
