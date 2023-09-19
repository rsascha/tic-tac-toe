import { checkColumns } from "./checkColumns";
import { checkRows } from "./checkRows";
import { UpdateGameStateOptions } from "../types";
import { checkDiagonaleUpperLeftToLowerRight } from "./checkDiagonaleUpperLeftToLowerRight";
import { checkDiagonaleLowerLeftToUpperRight } from "./checkDiagonaleLowerLeftToUpperRight";

export function checkForWinner(updateGameStateOptions: UpdateGameStateOptions) {
  checkRows(updateGameStateOptions);
  checkColumns(updateGameStateOptions);
  checkDiagonaleUpperLeftToLowerRight(updateGameStateOptions);
  checkDiagonaleLowerLeftToUpperRight(updateGameStateOptions);
}
