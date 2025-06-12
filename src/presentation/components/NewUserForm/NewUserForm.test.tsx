import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewUserForm from "./index";
import { User } from "../../screens/Leaderboard";

describe("NewUserForm", () => {
  const defaultUser: User = { name: "", age: 0, points: 0, address: "" };
  const setNewUser = jest.fn();
  const onSubmitForm = jest.fn((e) => e.preventDefault());
  const ref = React.createRef<HTMLFormElement>();

  it("calls onSubmitForm when the form is submitted", () => {
    render(<NewUserForm ref={ref} newUser={defaultUser} setNewUser={setNewUser} onSubmitForm={onSubmitForm} />);
    fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));
    expect(onSubmitForm).toHaveBeenCalled();
  });
});
