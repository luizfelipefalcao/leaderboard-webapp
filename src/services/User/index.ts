import { HttpClient } from "..";
import { User } from "../../presentation/screens/Leaderboard";

export class UserService {
  static retrieveUsers = (): Promise<User[]> =>
    new Promise(async (resolve, reject) => {
      try {
        const users = await HttpClient.get("/users");
        resolve(users.data);
      } catch (error) {
        reject(error);
      }
    });

  static addUser = (user: User): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        const newUser: User = await HttpClient.post("/users", user);
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });

  static deleteUser = (id: string): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        const newUser: User = await HttpClient.delete(`/users/${id}`);
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    });
}
