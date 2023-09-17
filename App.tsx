import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { CellState } from "./src/CellState";
import { Cell } from "./src/Cell";
import { SIZE } from "./src/config";

function getInitialGameState() {
  const result: Array<Array<CellState>> = [[]];
  for (let row = 0; row < SIZE; row++) {
    result[row] = [];
    for (let column = 0; column < SIZE; column++) {
      result[row][column] = {
        selected: null,
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

    // toggle player
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));

    //
    // check if game is won (rows, columns, diagonals)
    // - mark cells as won
    // - stop game
    //

    // check rows
    for (let x = 0; x < SIZE; x++) {
      if (
        newGameState[x].reduce(
          (acc, curr) => acc && curr.selected === currentPlayer,
          true
        )
      ) {
        newGameState[x].forEach((cell) => {
          cell.won = true;
          setIsRunning(false);
        });
      }
    }

    // check columns
    for (let y = 0; y < SIZE; y++) {
      if (
        newGameState.reduce(
          (acc, curr) => acc && curr[y].selected === currentPlayer,
          true
        )
      ) {
        newGameState.forEach((row) => {
          row[y].won = true;
          setIsRunning(false);
        });
      }
    }

    // check diagonal - top left to bottom right
    let isDiagonal1Won = true;
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        if (x === y && newGameState[x][y].selected !== currentPlayer) {
          isDiagonal1Won = false;
        }
      }
    }
    if (isDiagonal1Won) {
      for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
          if (x === y) {
            newGameState[x][y].won = true;
          }
        }
      }
      setIsRunning(false);
    }

    // check diagonal - bottom left to top right
    let isDiagonal2Won = true;
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        if (
          x + y === SIZE - 1 &&
          newGameState[x][y].selected !== currentPlayer
        ) {
          isDiagonal2Won = false;
        }
      }
    }
    if (isDiagonal2Won) {
      for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
          if (x + y === SIZE - 1) {
            newGameState[x][y].won = true;
          }
        }
        setIsRunning(false);
      }
    }

    // update game state
    setGameState(newGameState);
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
                  cellState={gameState[rowIndex][columnIndex]}
                  onSelect={() =>
                    isRunning && handleOnSelect(columnIndex, rowIndex)
                  }
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
