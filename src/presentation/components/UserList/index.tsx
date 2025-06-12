import React from "react";
import { User } from "../../screens/Leaderboard";

type UserListProps = {
  users: User[];
  onUserClick: (user: User) => void;
  onDelete: (index: number, id?: string) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
  searchTerm: string;
  selectedUser: User | null;
  setSearchTerm: (value: string) => void;
};

function UserDetails({ selectedUser, user }: { selectedUser: User | null; user: User }): React.ReactElement {
  if (selectedUser !== user) return <div />;

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 text-left font-semibold">Name: {user?.name}</p>
      <p className="text-sm text-gray-600 text-left font-semibold">Age: {user?.age}</p>
      <p className="text-sm text-gray-600 text-left font-semibold">Points: {user?.points}</p>
      <p className="text-sm text-gray-600 text-left font-semibold">Address: {user?.address}</p>
    </div>
  );
}

function UserList({ users, searchTerm, selectedUser, onUserClick, onDelete, onIncrement, onDecrement }: UserListProps): React.ReactElement {
  const renderUserList = users
    ?.filter((user) => user?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ?.map((user) => (
      <div key={user?.name + user?.address}>
        <div className="flex items-center space-x-2 border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50 transition" onClick={() => onUserClick(user)}>
          <button
            className="sm:w-12 w-8 h-8 flex items-center justify-center border border-gray-400 rounded font-bold text-gray-700 hover:bg-red-100 hover:text-red-600 transition sm:text-base text-sm"
            onClick={() =>
              onDelete(
                users.findIndex((u) => u === user),
                user?._id
              )
            }
            aria-label="Delete user"
          >
            X
          </button>

          <div className="sm:w-36 w-28 flex items-center">
            <span className="sm:font-bold text-gray-800 text-left transition mr-4 cursor-pointer sm:text-sm text-[10px]">{user?.name}</span>
          </div>
          <button
            className="sm:w-12 w-8 flex items-center justify-center border border-gray-400 rounded font-bold text-xl text-gray-700 hover:bg-green-100 hover:text-green-600 transition sm:text-xl text-base"
            onClick={() => onIncrement(users.findIndex((u) => u === user))}
            aria-label="Increment points"
          >
            +
          </button>
          <button
            className="sm:w-12 w-8 flex items-center justify-center border border-gray-400 rounded font-bold text-xl text-gray-700 hover:bg-yellow-100 hover:text-yellow-600 transition sm:text-xl text-base"
            onClick={() => onDecrement(users.findIndex((u) => u === user))}
            aria-label="Decrement points"
          >
            -
          </button>
          <span className="ml-auto text-gray-700 w-20 sm:w-32 text-center cursor-pointer select-none font-bold sm:text-base text-[10px]">{user?.points} points</span>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden my-2 bg-gray-50 rounded-md w-full ${selectedUser === user ? "max-h-40 opacity-100 p-2" : "max-h-0 opacity-0 p-0 px-2"}`}
        >
          <UserDetails user={user} selectedUser={selectedUser} />
        </div>
      </div>
    ));

  return <div>{renderUserList}</div>;
}

export default UserList;
