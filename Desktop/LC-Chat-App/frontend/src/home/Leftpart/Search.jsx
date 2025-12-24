import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div>
        <div className="p-4 border-b border-gray-700">
      <form>
        <div className="flex items-center gap-2 ">
          <label className="input">
            <input type="search" required placeholder="Search" />
          </label>
          <button>
            <FaSearch className="text-5xl p-3 hover:bg-gray-600"/>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Search;
