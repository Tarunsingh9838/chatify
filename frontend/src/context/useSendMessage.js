import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  const sendMessages = async (message) => {
    // ✅ safety checks
    if (!selectedConversation?._id) {
      console.error("No conversation selected");
      return;
    }

    if (!message || !message.trim()) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/message/send/${selectedConversation._id}`,
        { message },
        { withCredentials: true }
      );

      // ✅ append new message to existing messages
      setMessages((prevMessages) => [...prevMessages, res.data.newMessage]);

    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
