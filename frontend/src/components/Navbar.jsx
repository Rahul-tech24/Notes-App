import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="flex justify-between items-center p-4 border-b">

      <Link to="/dashboard" className="text-xl font-bold">
 Knowledge System
      </Link>
      
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