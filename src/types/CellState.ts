import { Position } from "./Position";
import { Player } from "./Player";

export type CellState = {
  selected: Player;
  won: boolean;
  position: Position;
};
