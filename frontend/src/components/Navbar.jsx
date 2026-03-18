import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/auth";

function Navbar() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false
  });

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="flex justify-between items-center p-4 border-b">

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-xl font-bold">
          Knowledge System
        </Link>

        {user?.username ? (
          <span className="text-sm text-gray-600">Hi, {user.username}</span>
        ) : null}
      </div>
      
      <button
        onClick={handleLogout}
        className="text-red-500"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;