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
        { withCredentials: true }
      );
      localStorage.removeItem("ChatApp");
      window.location.href = "/login";
    } catch (err) {
      console.log("Logout error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border-t border-[#232e3c]">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e53935] hover:bg-[#d32f2f] rounded-lg text-white font-medium transition-colors duration-200"
      >
        <FaSignOutAlt />
        {loading ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
}

export default Logout;


