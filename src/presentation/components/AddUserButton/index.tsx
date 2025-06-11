import React, { JSX } from "react";

type AddUserButtonProps = { showAddForm: boolean; setShowAddForm: (show: any) => void };

function AddUserButton({ showAddForm, setShowAddForm }: AddUserButtonProps): JSX.Element {
  return (
    <div className="m-2 p-4 px-6 bg-white">
      <div className="flex justify-end">
        <button
          className={`border border-gray-400 rounded px-4 py-2 text-gray-700 font-medium transition ${
            showAddForm ? "bg-red-100 hover:bg-red-200 hover:text-red-700" : "hover:bg-blue-100 hover:text-blue-700"
          }`}
          onClick={setShowAddForm}
        >
          {showAddForm ? "Cancel" : "+ Add User"}
        </button>
      </div>
    </div>
  );
}

export default AddUserButton;
