import { HttpClient } from "..";
import { User } from "../../presentation/screens/Leaderboard";

export class UserService {
  static retrieveUsers = (): Promise<User[]> =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await HttpClient.get("/users");
        resolve(users?.data);
      } catch (error) {
        reject(error);
      }
    });

  static addUser = (user: User): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        const newUser = await HttpClient.post("/users", user);
        resolve(newUser?.data);
      } catch (error) {
        reject(error);
      }
    });

  static deleteUser = (id: string): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        const newUser = await HttpClient.delete(`/users/${id}`);
        resolve(newUser?.data);
      } catch (error) {
        reject(error);
      }
    });
}
