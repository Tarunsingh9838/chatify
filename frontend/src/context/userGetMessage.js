import { useEffect, useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 🔥 MOST IMPORTANT GUARD
    if (!selectedConversation || !selectedConversation._id) {
      setMessages([]);
      return;
    }

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/message/get/${selectedConversation._id}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessages;

