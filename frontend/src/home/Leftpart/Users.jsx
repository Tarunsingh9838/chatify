import React, { useMemo } from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";

const Users = () => {
  const [allUsers, loading] = useGetAllUsers();
  const { searchTerm } = useConversation();

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return allUsers;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return allUsers.filter((user) =>
      user.fullname?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch)
    );
  }, [allUsers, searchTerm]);

  return (
    <div className="flex flex-col px-2">
      <h1 className="px-4 py-2 text-white font-semibold rounded-md">Messages</h1>

      <div className="mt-2 space-y-1">
        {loading ? (
          <div className="text-center text-gray-400 py-4">Loading...</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <User key={user._id} user={user} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            {searchTerm ? "No users found" : "No users available"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

