import { CellState, Player } from "./CellState";

export type UpdateGameStateOptions = {
  gameState: CellState[][];
  currentPlayer: Player;
  onSetIsRunning: (isRunning: boolean) => void;
};
