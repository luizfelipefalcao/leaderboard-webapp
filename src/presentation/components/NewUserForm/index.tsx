import React from "react";
import { User } from "../../screens/Leaderboard";

type NewUserFormProps = {
  ref: any;
  newUser: User;
  setNewUser: (value: User) => void;
  onSubmitForm: (event: any) => void;
};

function NewUserForm({ ref, newUser, onSubmitForm, setNewUser }: NewUserFormProps): React.ReactElement {
  return (
    <form ref={ref} className="mt-4 space-y-3 bg-gray-100 rounded-md p-4" onSubmit={onSubmitForm}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a New User:</h2>

      <div>
        <label className="block text-sm text-left ml-2 font-medium text-gray-700">Name</label>
        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={newUser?.name} onChange={(e) => setNewUser({ ...newUser, name: e.target?.value })} required />
      </div>

      <div>
        <label className="block text-sm text-left ml-2 font-medium text-gray-700">Age</label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={newUser?.age}
          onChange={(e) => setNewUser({ ...newUser, age: Number(e.target?.value) })}
          min={0}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-left ml-2 font-medium text-gray-700">Points</label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={newUser?.points}
          onChange={(e) => setNewUser({ ...newUser, points: Number(e.target?.value) })}
          min={0}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-left ml-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={newUser?.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target?.value })}
          required
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="border border-gray-400 rounded px-4 py-2 text-gray-700 font-medium hover:bg-green-100 hover:text-green-700 transition">
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewUserForm;
