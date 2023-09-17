import { SIZE } from "../config";
import { UpdateGameStateOptions } from "../types";

export function checkRows({
  gameState,
  currentPlayer,
  onSetIsRunning,
}: UpdateGameStateOptions) {
  for (let x = 0; x < SIZE; x++) {
    if (
      gameState[x].reduce(
        (acc, curr) => acc && curr.selected === currentPlayer,
        true
      )
    ) {
      gameState[x].forEach((cell) => {
        cell.won = true;
      });
      onSetIsRunning(false);
    }
  }
}
