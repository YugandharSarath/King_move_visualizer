// King.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import King from "./King";
import "@testing-library/jest-dom";

describe("King Move Visualizer", () => {
  beforeEach(() => {
    render(<King />);
  });

  it("renders 8x8 grid", () => {
    const cells = screen.getAllByTestId(/cell-/);
    expect(cells).toHaveLength(64);
  });

  it("highlights correct king moves for center (d4)", () => {
    const centerCell = screen.getByTestId("cell-3-3");
    fireEvent.mouseEnter(centerCell);

    expect(centerCell).toHaveClass("hovered");

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = 3 + dr;
        const c = 3 + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && !(dr === 0 && dc === 0)) {
          const moveCell = screen.getByTestId(`cell-${r}-${c}`);
          expect(moveCell).toHaveClass("king-move");
        }
      }
    }
  });

  it("highlights correct king moves for corner (a1)", () => {
    const a1 = screen.getByTestId("cell-7-0");
    fireEvent.mouseEnter(a1);

    expect(a1).toHaveClass("hovered");

    const expectedMoves = [
      [6, 0],
      [6, 1],
      [7, 1],
    ];

    for (const [r, c] of expectedMoves) {
      const moveCell = screen.getByTestId(`cell-${r}-${c}`);
      expect(moveCell).toHaveClass("king-move");
    }
  });

  it("clears highlights on unhover", () => {
    const cell = screen.getByTestId("cell-4-4");

    fireEvent.mouseEnter(cell);
    fireEvent.mouseLeave(cell);

    expect(cell).not.toHaveClass("hovered");

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = 4 + dr;
        const c = 4 + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && !(dr === 0 && dc === 0)) {
          const moveCell = screen.getByTestId(`cell-${r}-${c}`);
          expect(moveCell).not.toHaveClass("king-move");
        }
      }
    }
  });
});
