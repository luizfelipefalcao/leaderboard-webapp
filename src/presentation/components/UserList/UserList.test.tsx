import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "./index";
import { User } from "../../screens/Leaderboard";

describe("UserList", () => {
  const users: User[] = [
    { name: "Alice", age: 30, points: 10, address: "123 St" },
    { name: "Bob", age: 25, points: 5, address: "456 Ave" },
  ];
  const onUserClick = jest.fn();
  const onDelete = jest.fn();
  const onIncrement = jest.fn();
  const onDecrement = jest.fn();
  const setSearchTerm = jest.fn();

  it("renders user names and points", () => {
    render(
      <UserList users={users} searchTerm="" setSearchTerm={setSearchTerm} selectedUser={null} onUserClick={onUserClick} onDelete={onDelete} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText(/10 points/)).toBeInTheDocument();
    expect(screen.getByText(/5 points/)).toBeInTheDocument();
  });

  it("calls onUserClick when a user row is clicked", () => {
    render(
      <UserList users={users} searchTerm="" setSearchTerm={setSearchTerm} selectedUser={null} onUserClick={onUserClick} onDelete={onDelete} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
    fireEvent.click(screen.getByText("Alice"));
    expect(onUserClick).toHaveBeenCalledWith(users[0]);
  });

  it("calls onIncrement and onDecrement when + and - are clicked", () => {
    render(
      <UserList users={users} searchTerm="" setSearchTerm={setSearchTerm} selectedUser={null} onUserClick={onUserClick} onDelete={onDelete} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
    fireEvent.click(screen.getAllByRole("button", { name: /Increment points/i })[0]);
    expect(onIncrement).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole("button", { name: /Decrement points/i })[0]);
    expect(onDecrement).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <UserList users={users} searchTerm="" setSearchTerm={setSearchTerm} selectedUser={null} onUserClick={onUserClick} onDelete={onDelete} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
    fireEvent.click(screen.getAllByRole("button", { name: /Delete user/i })[0]);
    expect(onDelete).toHaveBeenCalled();
  });

  it("filters users by searchTerm", () => {
    render(
      <UserList users={users} searchTerm="bob" setSearchTerm={setSearchTerm} selectedUser={null} onUserClick={onUserClick} onDelete={onDelete} onIncrement={onIncrement} onDecrement={onDecrement} />
    );
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
