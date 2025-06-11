import React from "react";

type SearchUserRowProps = { searchTerm: string; setSearchTerm: (value: string) => void };

function SearchUserRow({ searchTerm, setSearchTerm }: SearchUserRowProps): React.ReactElement {
  return (
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
  );
}

export default SearchUserRow;
