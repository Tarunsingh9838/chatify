import React from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthProvider";
import { Route, Routes } from "react-router-dom";

const chatapp = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log("Auth User in App.jsx:", authUser);
  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex  h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      ,
      <Route path="/signup" element={authUser ? < Navigate to={"/"}/>:<Signup/>} />
      <Route path="/Login" element={authUser ? < Navigate to={"/"}/>:<Login/>} />
    </Routes>
  );
};

export default chatapp;
