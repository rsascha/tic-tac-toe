import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Cell } from "./src/Cell";
import { SIZE } from "./src/config";
import { checkForWinner } from "./src/functions/checkForWinner";
import { CellState } from "./src/types/CellState";

function getInitialGameState() {
  const result: Array<Array<CellState>> = [[]];
  for (let row = 0; row < SIZE; row++) {
    result[row] = [];
    for (let column = 0; column < SIZE; column++) {
      result[row][column] = {
        selected: undefined,
        won: false,
        position: {
          x: column === 0 ? "left" : column === SIZE - 1 ? "right" : "center",
          y: row === 0 ? "top" : row === SIZE - 1 ? "bottom" : "center",
        },
      };
    }
  }
  return result;
}

export default function App() {
  const [gameState, setGameState] = useState(getInitialGameState());
  const [currentPlayer, setCurrentPlayer] = useState<"x" | "o">("x");
  const [isRunning, setIsRunning] = useState(true);

  function handleOnSelect(x: number, y: number) {
    // cancel if cell is already selected
    if (gameState[y][x].selected) {
      return;
    }

    // prepare new game state
    const newGameState = [...gameState];
    newGameState[y][x].selected = currentPlayer;

    // check if game is won (rows, columns, diagonals)
    checkForWinner({
      gameState: newGameState,
      currentPlayer,
      onSetIsRunning: (value) => setIsRunning(value),
    });

    // update game state
    setGameState(newGameState);

    // toggle player
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
  }

  function handleOnReset() {
    setGameState(getInitialGameState());
    setIsRunning(true);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {gameState.map((row, rowIndex) => {
        return (
          <View style={{ flexDirection: "row" }} key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <Cell
                  key={columnIndex}
                  cellState={column}
                  onSelect={() =>
                    isRunning && handleOnSelect(columnIndex, rowIndex)
                  }
                  testID={`cell-${columnIndex}-${rowIndex}`}
                />
              );
            })}
          </View>
        );
      })}
      <View style={{ marginTop: 20 }}>
        <Pressable onPress={() => handleOnReset()}>
          <Text>Neues Spiel</Text>
        </Pressable>
      </View>
    </View>
  );
}
