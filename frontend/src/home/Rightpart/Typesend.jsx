import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

const Typesend = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 px-4 py-3 bg-[#17212b] border-t border-[#232e3c]">
        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-full bg-[#242f3d] text-gray-100 placeholder-[#6c7883] outline-none"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="p-2.5 rounded-full bg-[#5288c1] hover:bg-[#6ab2f2] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <IoSend className="text-lg" />
          )}
        </button>
      </div>
    </form>
  );
};

export default Typesend;


