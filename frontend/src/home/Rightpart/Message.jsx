import React, { useState } from "react";
import axios from "axios";
import useConversation from "../../zustand/useConversation";
import { FaTrash } from "react-icons/fa";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const { setMessages } = useConversation();
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const itsMe = authUser && message.sender === authUser._id;
  const chatName = itsMe ? "chat-end" : "chat-start";

  const handleDelete = async () => {
    if (!window.confirm("Delete this message?")) return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:3000/message/delete/${message._id}`,
        { withCredentials: true }
      );
      setMessages((prev) => prev.filter((m) => m._id !== message._id));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className="px-4 py-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`chat ${chatName}`}>
        <div
          className={`chat-bubble relative ${itsMe
              ? 'bg-[#2b5278] text-white'
              : 'bg-[#182533] text-white'
            }`}
        >
          {message.message}

          {itsMe && isHovered && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute -left-8 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-red-500/20 text-[#6c7883] hover:text-red-400 transition-all duration-200"
              title="Delete message"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaTrash className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {message.createdAt && (
          <div className="chat-footer text-[#6c7883] text-xs mt-0.5">
            {formatTime(message.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;



