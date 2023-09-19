import { fireEvent, render } from "@testing-library/react-native";
import { Cell } from "./Cell";
import { CellState } from "./types/CellState";

describe("Cell", () => {
  const onSelectMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders an empty cell when cellState.selected is undefined", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      selected: undefined,
      won: false,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const emptyCell = getByTestId("empty-cell");
    expect(emptyCell).toBeDefined();
  });

  it("renders PlayerACellSvg when cellState.selected is 'x'", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      selected: "x",
      won: false,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const playerACell = getByTestId("player-a-cell");
    expect(playerACell).toBeDefined();
  });

  it("renders PlayerBCellSvg when cellState.selected is 'o'", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      selected: "o",
      won: false,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const playerBCell = getByTestId("player-b-cell");
    expect(playerBCell).toBeDefined();
  });

  it("calls onSelect when the cell is pressed", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      selected: undefined,
      won: false,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const cell = getByTestId("cell-inner-component");
    fireEvent.press(cell);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it("sets the background color to lightgreen when cellState.won is true", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      won: true,
      selected: undefined,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const cell = getByTestId("cell-outer-component");
    expect(cell.props.style.backgroundColor).toEqual("lightgreen");
  });

  it("sets the background color to white when cellState.won is false", () => {
    const cellState: CellState = {
      position: { x: "left", y: "top" },
      won: false,
      selected: undefined,
    };
    const { getByTestId } = render(
      <Cell cellState={cellState} onSelect={onSelectMock} />
    );
    const cell = getByTestId("cell-outer-component");
    expect(cell.props.style.backgroundColor).toEqual("white");
  });
});
