import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const SIZE = 3;

type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";

type Position = {
  x: PositionX;
  y: PositionY;
};

type CellSvgProps = {
  position: Position;
};

export function getGridLinesCoords(position: Position) {
  const result = [];
  if (position.y === "bottom")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
    });
  if (position.x === "right")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
    });
  if (position.x === "center")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
    });
  if (position.y === "center")
    result.push({
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
    });
  return result;
}

const CELL_WIDTH = 42;
const CELL_HEIGHT = CELL_WIDTH;

export function EmptyCellSvg({ position }: CellSvgProps) {
  return (
    <Svg width={CELL_WIDTH} height={CELL_HEIGHT}>
      {getGridLinesCoords(position).map((lineCoords, index) => (
        <Line key={index} stroke="black" strokeWidth="1" {...lineCoords} />
      ))}
    </Svg>
  );
}

export function PlayerACellSvg({ position }: CellSvgProps) {
  return (
    <Svg width={CELL_WIDTH} height={CELL_HEIGHT}>
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

type CellState = {
  selected: "x" | "o" | undefined;
  won: boolean;
  position: Position;
};

type CellProps = {
  cellState: CellState;
  onSelect: () => void;
};

export function Cell({ cellState, onSelect }: CellProps) {
  console.debug("Cell", cellState);
  return (
    <View style={{ backgroundColor: cellState.won ? "lightgreen" : "white" }}>
      <Pressable onPress={onSelect}>
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
  console.debug("App");
  const [gameState, setGameState] = useState(getInitialGameState());
  const [currentPlayer, setCurrentPlayer] = useState<"x" | "o">("x");
  const [isRunning, setIsRunning] = useState(true);

  function handleOnSelect(x: number, y: number) {
    if (gameState[y][x].selected) {
      return;
    }
    const newGameState = [...gameState];
    newGameState[y][x].selected = currentPlayer;
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));

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
