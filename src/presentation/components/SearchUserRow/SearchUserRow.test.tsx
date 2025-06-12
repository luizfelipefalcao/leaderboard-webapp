import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchUserRow from "./index";

describe("SearchUserRow", () => {
  const setSearchTerm = jest.fn();

  it("renders the search input", () => {
    render(<SearchUserRow searchTerm="" setSearchTerm={setSearchTerm} />);
    expect(screen.getByPlaceholderText(/Search names/i)).toBeInTheDocument();
  });

  it("shows the correct value in the input", () => {
    render(<SearchUserRow searchTerm="bob" setSearchTerm={setSearchTerm} />);
    expect((screen.getByPlaceholderText(/Search names/i) as HTMLInputElement).value).toBe("bob");
  });

  it("calls setSearchTerm on input change", () => {
    render(<SearchUserRow searchTerm="" setSearchTerm={setSearchTerm} />);
    fireEvent.change(screen.getByPlaceholderText(/Search names/i), { target: { value: "alice" } });
    expect(setSearchTerm).toHaveBeenCalledWith("alice");
  });

  it("clears the input when clear button is clicked", () => {
    render(<SearchUserRow searchTerm="bob" setSearchTerm={setSearchTerm} />);
    fireEvent.click(screen.getByRole("button", { name: /Clear search/i }));
    expect(setSearchTerm).toHaveBeenCalledWith("");
  });
});
