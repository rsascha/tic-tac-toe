import { render, fireEvent } from "@testing-library/react-native";
import App from "./App";
import { SIZE } from "./src/config";

describe("App", () => {
  it("renders the correct number of cells", () => {
    const { getAllByTestId } = render(<App />);
    const cells = getAllByTestId("empty-cell");
    expect(cells.length).toEqual(SIZE * SIZE);
  });
});
