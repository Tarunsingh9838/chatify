import React from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Route, Routes } from "react-router-dom";
import useConversation from "./zustand/useConversation";

const ChatApp = () => {
  const [authUser] = useAuth();
  const { selectedConversation } = useConversation();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen bg-[#0e1621]">
              {/* Left sidebar - full width on mobile, 30% on desktop */}
              <div className={`
                ${selectedConversation ? 'hidden' : 'flex'} 
                md:flex 
                w-full md:w-[30%] 
                flex-col
              `}>
                <Left />
              </div>

              {/* Right chat area - full width on mobile, 70% on desktop */}
              <div className={`
                ${selectedConversation ? 'flex' : 'hidden'} 
                md:flex 
                w-full md:w-[70%] 
                flex-col
              `}>
                <Right />
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      <Route path="/Login" element={authUser ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
};

export default ChatApp;

