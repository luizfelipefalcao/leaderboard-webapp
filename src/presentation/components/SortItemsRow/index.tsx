import React, { JSX } from "react";

type SortItemsRowProps = {
  sortByName: () => void;
  sortByPoints: () => void;
};

function SortItemsRow({ sortByName, sortByPoints }: SortItemsRowProps): JSX.Element {
  return (
    <div className="flex items-center justify-between mb-4 sm:mx-12 mt-6 md:mx-12 lg:mx-12 mx-6">
      <div className="flex items-center">
        <button
          className="border border-gray-400 rounded-full px-4 py-[6px] text-gray-700 sm:text-sm text-xs hover:bg-blue-100 hover:text-blue-700 transition"
          onClick={sortByName}
          aria-label="Sort by name"
        >
          Sort By Name
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="border border-gray-400 rounded-full px-4 py-[6px] text-gray-700 sm:text-sm text-xs hover:bg-blue-100 hover:text-blue-700 transition"
          onClick={sortByPoints}
          aria-label="Sort by points"
        >
          Sort By Points
        </button>
      </div>
    </div>
  );
}

export default SortItemsRow;
