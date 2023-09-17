import { Position } from "./Position";

export type CellState = {
  selected: "x" | "o" | undefined;
  won: boolean;
  position: Position;
};
