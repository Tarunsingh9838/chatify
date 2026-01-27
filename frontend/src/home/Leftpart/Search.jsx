import React from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";

const Search = () => {
  const { searchTerm, setSearchTerm } = useConversation();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-3 bg-[#17212b] border-b border-[#232e3c]">
      <div className="flex items-center gap-3 bg-[#242f3d] rounded-full px-4 py-2">
        <FaSearch className="text-[#6c7883]" />
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="grow bg-transparent outline-none text-gray-100 placeholder-[#6c7883]"
        />
      </div>
    </div>
  );
};

export default Search;



