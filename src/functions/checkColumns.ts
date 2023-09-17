import { SIZE } from "../config";
import { UpdateGameStateOptions } from "../types";

export function checkColumns({
  gameState,
  currentPlayer,
  onSetIsRunning,
}: UpdateGameStateOptions) {
  for (let y = 0; y < SIZE; y++) {
    if (
      gameState.reduce(
        (acc, curr) => acc && curr[y].selected === currentPlayer,
        true
      )
    ) {
      gameState.forEach((row) => {
        row[y].won = true;
      });
      onSetIsRunning(false);
    }
  }
}
