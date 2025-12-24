import React from "react";
import { IoSend } from "react-icons/io5";

const Typesend = ({ onSend }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-800 bg-gray-900">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 input input-bordered w-full bg-gray-800 text-gray-100"
      />

      <button
        onClick={onSend}
        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        aria-label="Send message"
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default Typesend;
