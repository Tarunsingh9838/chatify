import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/users/logout",
          {},
        { withCredentials: true } // 👈 MUST
      );

      localStorage.removeItem("ChatApp");
      alert("Logout successful");
      window.location.href = "/login";
    } catch (err) {
      console.log("Logout error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t border-gray-800">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded text-white"
      >
        <FaSignOutAlt />
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Logout;
