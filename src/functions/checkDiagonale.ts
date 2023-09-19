import { SIZE } from "../config";
import { UpdateGameStateOptions } from "../types";

export function checkDiagonale(
  { gameState, currentPlayer, onSetIsRunning }: UpdateGameStateOptions,
  diagonale: number
) {
  let isWon = true;
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (
        diagonale === 1 &&
        x === y &&
        gameState[x][y].selected !== currentPlayer
      ) {
        isWon = false;
      } else if (
        diagonale === 2 &&
        x + y === SIZE - 1 &&
        gameState[x][y].selected !== currentPlayer
      ) {
        isWon = false;
      }
    }
  }
  if (isWon) {
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        if (diagonale === 1 && x === y) {
          gameState[x][y].won = true;
        } else if (diagonale === 2 && x + y === SIZE - 1) {
          gameState[x][y].won = true;
        }
      }
    }
    onSetIsRunning(false);
  }
}
