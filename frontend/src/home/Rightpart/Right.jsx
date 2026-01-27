import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation";
import { useAuth } from "../../context/AuthProvider.jsx";
import { IoChatbubblesOutline } from "react-icons/io5";

const Right = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full h-screen">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="h-full flex flex-col bg-[#0e1621] text-gray-100">
          <Chatuser />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <div className="sticky bottom-0">
            <Typesend />
          </div>
        </div>
      )}
    </div>
  );
};

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="hidden md:flex h-screen items-center justify-center bg-[#0e1621]">
      <div className="text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-[#2b5278]">
            <IoChatbubblesOutline className="text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-2xl text-white font-light mb-2">
          Welcome,{" "}
          <span className="font-semibold text-[#6ab2f2]">
            {authUser?.fullname}
          </span>
        </h1>
        <p className="text-[#6c7883] text-lg">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};

