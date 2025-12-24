import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

const Users = () => {
  const[allUsers,loading]=useGetAllUsers();
  console.log(allUsers);
  return (
    <div className="flex flex-col px-2">
      <h1 className="px-4 py-2 text-white font-semibold rounded-md " >Messages</h1>

      <div className="mt-2 space-y-1">
        {allUsers.map((user,) => (
          <User
            key={user._id}
            name={user.fullname}
            subtitle={user.email}
            avatar={`https://ui-avatars.com/api/?name=${user.fullname}&background=random&size=128`}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
