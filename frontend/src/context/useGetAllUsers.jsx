import { useEffect, useState } from "react";
import axios from "axios";

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/users/allusers",
          {
            withCredentials: true, // 👈 MUST
          }
        );

        setAllUsers(response.data);
      } catch (err) {
        console.log("error in useGetAllUsers:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default useGetAllUsers;
