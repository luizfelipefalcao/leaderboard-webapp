import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortItemsRow from "./index";

describe("SortItemsRow", () => {
  const sortByName = jest.fn();
  const sortByPoints = jest.fn();

  it("renders sort buttons", () => {
    render(<SortItemsRow sortByName={sortByName} sortByPoints={sortByPoints} />);
    expect(screen.getByRole("button", { name: /Sort by Name/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sort by Points/i })).toBeInTheDocument();
  });

  it("calls sortByName when Sort by Name is clicked", () => {
    render(<SortItemsRow sortByName={sortByName} sortByPoints={sortByPoints} />);
    fireEvent.click(screen.getByRole("button", { name: /Sort by Name/i }));
    expect(sortByName).toHaveBeenCalled();
  });

  it("calls sortByPoints when Sort by Points is clicked", () => {
    render(<SortItemsRow sortByName={sortByName} sortByPoints={sortByPoints} />);
    fireEvent.click(screen.getByRole("button", { name: /Sort by Points/i }));
    expect(sortByPoints).toHaveBeenCalled();
  });
});
