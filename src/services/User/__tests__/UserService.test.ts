import { UserService } from "../index";
import { HttpClient } from "../../index";

jest.mock("../../index", () => ({
  HttpClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("UserService", () => {
  const fakeUser = { name: "Alice", age: 30, points: 10, address: "123 St" };
  const fakeUsers = [fakeUser];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("retrieveUsers", () => {
    it("should return users on success", async () => {
      (HttpClient.get as jest.Mock).mockResolvedValue({ data: fakeUsers });
      const users = await UserService.retrieveUsers();
      expect(users).toEqual(fakeUsers);
      expect(HttpClient.get).toHaveBeenCalledWith("/users");
    });

    it("should reject on error", async () => {
      (HttpClient.get as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(UserService.retrieveUsers()).rejects.toThrow("fail");
    });
  });

  describe("addUser", () => {
    it("should return new user on success", async () => {
      (HttpClient.post as jest.Mock).mockResolvedValue(fakeUser);
      const user = await UserService.addUser(fakeUser);
      expect(user).toEqual(fakeUser);
      expect(HttpClient.post).toHaveBeenCalledWith("/users", fakeUser);
    });

    it("should reject on error", async () => {
      (HttpClient.post as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(UserService.addUser(fakeUser)).rejects.toThrow("fail");
    });
  });

  describe("deleteUser", () => {
    it("should return deleted user on success", async () => {
      (HttpClient.delete as jest.Mock).mockResolvedValue(fakeUser);
      const user = await UserService.deleteUser("id123");
      expect(user).toEqual(fakeUser);
      expect(HttpClient.delete).toHaveBeenCalledWith("/users/id123");
    });

    it("should reject on error", async () => {
      (HttpClient.delete as jest.Mock).mockRejectedValue(new Error("fail"));
      await expect(UserService.deleteUser("id123")).rejects.toThrow("fail");
    });
  });
});
