import { createContext, useEffect, useState, useContext } from "react";

import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";


const SocketContext = createContext(null);


export const useSocketContext = () => {
    return useContext(SocketContext);
 
}


export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {

    const socket = io("http://localhost:3000", {
      query: { userId: authUser._id },
      withCredentials: true,
    });

    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
    });
    return () => socket.close();
    }else {
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }   


    // return () => {
    //   socketInstance.close();
    //   setSocket(null);
    // };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
