import { Pressable, View } from "react-native";
import { EmptyCellSvg, PlayerACellSvg, PlayerBCellSvg } from "./icons";
import { CellState } from "./types/CellState";

type CellProps = {
  cellState: CellState;
  onSelect: () => void;
  testID?: string;
};

export function Cell({ cellState, onSelect, testID }: CellProps) {
  return (
    <View
      style={{ backgroundColor: cellState.won ? "lightgreen" : "white" }}
      testID={testID || "cell-outer-component"}
    >
      <Pressable onPress={onSelect} testID="cell-inner-component">
        {!cellState.selected && <EmptyCellSvg position={cellState.position} />}
        {cellState.selected === "x" && (
          <PlayerACellSvg position={cellState.position} />
        )}
        {cellState.selected === "o" && (
          <PlayerBCellSvg position={cellState.position} />
        )}
      </Pressable>
    </View>
  );
}
