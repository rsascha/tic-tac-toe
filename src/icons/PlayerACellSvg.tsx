import Svg, { Line } from "react-native-svg";
import { CellSvgProps } from "../types/CellSvgProps";
import { getGridLinesCoords } from "../functions/getGridLinesCoords";
import { CELL_HEIGHT, CELL_WIDTH } from "../config";

export function PlayerACellSvg({ position }: CellSvgProps) {
  return (
    <Svg width={CELL_WIDTH} height={CELL_HEIGHT} testID="player-a-cell">
      <Line
        x1="20%"
        y1="20%"
        x2="80%"
        y2="80%"
        stroke="black"
        strokeWidth="1"
      />
      <Line
        x1="80%"
        y1="20%"
        x2="20%"
        y2="80%"
        stroke="black"
        strokeWidth="1"
      />
      {getGridLinesCoords(position).map((lineCoords, index) => (
        <Line key={index} stroke="black" strokeWidth="1" {...lineCoords} />
      ))}
    </Svg>
  );
}
