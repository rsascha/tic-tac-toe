import Svg, { Circle, Line } from "react-native-svg";
import { CellSvgProps } from "./CellSvgProps";
import { getGridLinesCoords } from "./getGridLinesCoords";
import { CELL_HEIGHT, CELL_WIDTH } from "./config";

export function PlayerBCellSvg({ position }: CellSvgProps) {
  return (
    <Svg width={CELL_WIDTH} height={CELL_HEIGHT}>
      <Circle
        cx="50%"
        cy="50%"
        r="35%"
        fill="white"
        stroke="black"
        strokeWidth="1"
      />
      {getGridLinesCoords(position).map((lineCoords, index) => (
        <Line key={index} stroke="black" strokeWidth="1" {...lineCoords} />
      ))}
    </Svg>
  );
}
