import { User } from "../index";

describe("Leaderboard logic functions", () => {
  const users: User[] = [
    { name: "Alice", age: 30, points: 10, address: "123 St" },
    { name: "Bob", age: 25, points: 5, address: "456 Ave" },
    { name: "Carol", age: 28, points: 15, address: "789 Blvd" },
  ];

  function increment(users: User[], index: number): User[] {
    const updated = users.map((user, i) => (i === index ? { ...user, points: user.points + 1 } : user));
    return updated.sort((a, b) => b.points - a.points);
  }

  function decrement(users: User[], index: number): User[] {
    const updated = users.map((user, i) => (i === index ? { ...user, points: Math.max(0, user.points - 1) } : user));
    return updated.sort((a, b) => b.points - a.points);
  }

  function sortByName(users: User[]): User[] {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
  }

  function sortByPoints(users: User[]): User[] {
    return [...users].sort((a, b) => b.points - a.points);
  }

  it("increments points and sorts users", () => {
    const result = increment(users, 1); // Bob gets +1
    expect(result[0].name).toBe("Carol");
    expect(result[1].name).toBe("Alice");
    expect(result[2].name).toBe("Bob");
    expect(result[2].points).toBe(6);
  });

  it("decrements points and sorts users", () => {
    const result = decrement(users, 2); // Carol gets -1
    expect(result[0].name).toBe("Carol");
    expect(result[1].name).toBe("Alice");
    expect(result[2].name).toBe("Bob");
    expect(result[1].points).toBe(10);
  });

  it("sorts users by name", () => {
    const result = sortByName(users);
    expect(result.map((u) => u.name)).toEqual(["Alice", "Bob", "Carol"]);
  });

  it("sorts users by points", () => {
    const result = sortByPoints(users);
    expect(result.map((u) => u.name)).toEqual(["Carol", "Alice", "Bob"]);
  });
});
