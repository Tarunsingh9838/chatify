import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { IoArrowBack } from "react-icons/io5";

const Chatuser = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation._id);

  const handleBack = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="w-full h-[12vh] flex items-center justify-between bg-[#17212b] px-4 md:px-6 py-4 border-b border-[#232e3c]">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Back button - only visible on mobile */}
        <button
          onClick={handleBack}
          className="md:hidden p-2 rounded-full hover:bg-[#242f3d] text-[#6ab2f2] transition-colors"
        >
          <IoArrowBack className="text-xl" />
        </button>

        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${selectedConversation.fullname}&background=5288c1&color=fff&size=128`}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#4dcd5e] rounded-full border-2 border-[#17212b]"></span>
          )}
        </div>
        <div>
          <h1 className="text-base md:text-lg text-white font-normal">{selectedConversation.fullname}</h1>
          <span className={`text-xs md:text-sm ${isOnline ? 'text-[#4dcd5e]' : 'text-[#6c7883]'}`}>
            {isOnline ? "online" : "last seen recently"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;



