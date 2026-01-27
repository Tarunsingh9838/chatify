import React from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../zustand/useConversation.js';
import { useEffect } from 'react';


const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            setMessages((messages) => [...messages, newMessage]);
        });
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setMessages]);
};



export default useGetSocketMessage