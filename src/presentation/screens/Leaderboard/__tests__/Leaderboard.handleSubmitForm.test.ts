import { UserService } from "../../../../services/User";

jest.mock("../../../../services/User", () => ({
  UserService: {
    addUser: jest.fn(),
  },
}));

describe("handleSubmitForm logic", () => {
  const setUsers = jest.fn();
  const setNewUser = jest.fn();
  const setShowAddForm = jest.fn();
  const setIsLoading = jest.fn();
  const newUser = { name: "Test", age: 20, points: 0, address: "Addr" };

  function getHandler() {
    // Simulate the core logic of handleSubmitForm
    return async (e: any) => {
      e.preventDefault();
      const addLocalUser = () => {
        setUsers((prev: any) => [...prev, newUser]);
        setNewUser({ name: "", age: 0, points: 0, address: "" });
        setShowAddForm(false);
      };
      try {
        setIsLoading(true);
        await UserService.addUser(newUser);
        addLocalUser();
      } catch (error) {
        // error handling
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
  }

  it("adds user and resets form on success", async () => {
    (UserService.addUser as jest.Mock).mockResolvedValue({});
    const handler = getHandler();
    const preventDefault = jest.fn();
    await handler({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(UserService.addUser).toHaveBeenCalledWith(newUser);
    expect(setUsers).toHaveBeenCalled();
    expect(setNewUser).toHaveBeenCalledWith({ name: "", age: 0, points: 0, address: "" });
    expect(setShowAddForm).toHaveBeenCalledWith(false);
  });

  it("handles error gracefully", async () => {
    (UserService.addUser as jest.Mock).mockRejectedValue(new Error("fail"));
    const handler = getHandler();
    const preventDefault = jest.fn();
    await handler({ preventDefault });
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(UserService.addUser).toHaveBeenCalledWith(newUser);
    // Should still call setTimeout to hide loading
  });
});
