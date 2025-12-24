import React from "react";

const Chatuser = () => {
  return (
    <div className="w-[1100px] h-[12vh] flex items-center space-x-3 justify-center bg-gray-800  hover:bg-gray-700 p-4 cursor-pointer">
      <div className="avatar avatar-online">
        <div className="w-17 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
       <div>
            <h1 className="text-xl">akhil</h1>
            <span className="text-sm">online</span>
        </div>
    </div>
  );
};

export default Chatuser;
