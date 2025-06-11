import { HttpClient } from "../../infrastructure/HttpClientProvider";
import { User } from "../../screens/Leaderboard";

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

  static updateUser = (user: User): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        const newUser: User = await HttpClient.put(`/users/${user?.id}`, user);
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
