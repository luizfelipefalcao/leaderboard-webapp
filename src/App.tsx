import React, { useCallback, useState, useRef, useEffect } from "react";
import "./App.css";
import springLogo from "./assets/spring-logo.svg";

import usersData from "./config-file/mock.json";

type User = { name: string; age: number; points: number; address: string };

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData as User[]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({ name: "", age: 20, points: 0, address: "" });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (showAddForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showAddForm]);

  const handleDelete = useCallback((index: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleIncrement = useCallback(
    (index: number) => {
      const updatedUsers = [...users].map((user, i) => (i === index ? { ...user, points: user.points + 1 } : user));
      const sortedUsers = updatedUsers.sort((a, b) => b.points - a.points);
      setUsers(sortedUsers);
    },
    [users]
  );

  const handleDecrement = useCallback(
    (index: number) => {
      const updatedUsers = [...users].map((user, i) => (i === index ? { ...user, points: Math.max(0, user.points - 1) } : user));
      const sortedUsers = updatedUsers.sort((a, b) => b.points - a.points);
      setUsers(sortedUsers);
    },
    [users]
  );

  const handleUserClick = useCallback(
    (user: User) => {
      setSelectedUser(selectedUser === user ? null : user);
    },
    [selectedUser]
  );

  const handleSortByName = useCallback(() => {
    const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sorted);
  }, [users]);

  const handleSortByPoints = useCallback(() => {
    const sorted = [...users].sort((a, b) => b.points - a.points);
    setUsers(sorted);
  }, [users]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 sm:p-0 p-4">
      <div className="bg-white border border-gray-300 rounded-lg w-full max-w-lg shadow-md flex flex-col h-[750px]">
        <div className="w-full max-w-md">
          <div className="px-6 mt-2 -mb-3 flex items-center">
            <img src={springLogo} alt="Spring Logo" className="h-14 sm:h-20 w-14 sm:w-20 mr-2" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 sm:mx-12 mt-6 md:mx-12 lg:mx-12 mx-6">
          <div className="flex items-center">
            <button
              className="border border-gray-400 rounded-full px-4 py-[6px] text-gray-700 sm:text-sm text-xs hover:bg-blue-100 hover:text-blue-700 transition"
              onClick={() => handleSortByName()}
              aria-label="Sort by name"
            >
              Sort By Name
            </button>
          </div>
          <div className="flex items-center">
            <button
              className="border border-gray-400 rounded-full px-4 py-[6px] text-gray-700 sm:text-sm text-xs hover:bg-blue-100 hover:text-blue-700 transition"
              onClick={() => handleSortByPoints()}
              aria-label="Sort by points"
            >
              Sort By Points
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4 sm:mx-12 md:mx-12 lg:mx-12 mx-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search names..."
              className="w-full pl-10 pr-10 py-[6px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="h-2 w-full border-t -mb-2 border-gray-200 bg-white" />

        <div className="overflow-y-auto flex-1 p-6 h-90vh max-h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {users
              .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((user, idx) => (
                <div key={user.name + user.address}>
                  <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50 transition" onClick={() => handleUserClick(user)}>
                    <button
                      className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded font-bold text-gray-700 hover:bg-red-100 hover:text-red-600 transition sm:text-base text-sm"
                      onClick={() => handleDelete(users.findIndex((u) => u === user))}
                      aria-label="Delete user"
                    >
                      X
                    </button>
                    <span className="font-bold text-gray-800 w-20 text-left transition mr-4 cursor-pointer sm:text-base text-sm">{user.name}</span>
                    <button
                      className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded font-bold text-xl text-gray-700 hover:bg-green-100 hover:text-green-600 transition sm:text-xl text-base"
                      onClick={() => handleIncrement(users.findIndex((u) => u === user))}
                      aria-label="Increment points"
                    >
                      +
                    </button>
                    <button
                      className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded font-bold text-xl text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition sm:text-xl text-base"
                      onClick={() => handleDecrement(users.findIndex((u) => u === user))}
                      aria-label="Decrement points"
                    >
                      -
                    </button>
                    <span className="ml-auto text-gray-700 w-20 sm:w-32 text-right cursor-pointer select-none font-bold text-sm sm:text-base">{user.points} points</span>
                  </div>

                  {selectedUser === user && (
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden mt-2 bg-gray-50 rounded-md w-full ${
                        selectedUser === user ? "max-h-40 opacity-100 p-3" : "max-h-0 opacity-0 p-0"
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Name: {user.name}</p>
                        <p className="text-sm text-gray-600">Age: {user.age}</p>
                        <p className="text-sm text-gray-600">Points: {user.points}</p>
                        <p className="text-sm text-gray-600">Address: {user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            {showAddForm && (
              <form
                ref={formRef}
                className="mt-4 space-y-3 bg-gray-100 rounded-md p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setUsers((prev) => [...prev, newUser]);
                  setNewUser({ name: "", age: 20, points: 0, address: "" });
                  setShowAddForm(false);
                }}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a New User:</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newUser.age}
                    onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
                    min={0}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Points</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newUser.points}
                    onChange={(e) => setNewUser({ ...newUser, points: Number(e.target.value) })}
                    min={0}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={newUser.address}
                    onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="border border-gray-400 rounded px-4 py-2 text-gray-700 font-medium hover:bg-green-100 hover:text-green-700 transition">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="h-2 w-full border-t -mb-2 border-gray-200 bg-white" />

        <div className="m-2 p-4 px-6 bg-white">
          <div className="flex justify-end">
            <button
              className={`border border-gray-400 rounded px-4 py-2 text-gray-700 font-medium transition ${
                showAddForm ? "bg-red-100 hover:bg-red-200 hover:text-red-700" : "hover:bg-blue-100 hover:text-blue-700"
              }`}
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              {showAddForm ? "Cancel" : "+ Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
