import Svg, { Line } from "react-native-svg";
import { CellSvgProps } from "../types/CellSvgProps";
import { getGridLinesCoords } from "../functions/getGridLinesCoords";
import { CELL_HEIGHT, CELL_WIDTH } from "../config";

export function EmptyCellSvg({ position }: CellSvgProps) {
  return (
    <Svg width={CELL_WIDTH} height={CELL_HEIGHT} testID="empty-cell">
      {getGridLinesCoords(position).map((lineCoords, index) => (
        <Line key={index} stroke="black" strokeWidth="1" {...lineCoords} />
      ))}
    </Svg>
  );
}
