import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="flex justify-between items-center p-4 border-b">

      <h1 className="text-xl font-bold">Knowledge System</h1>

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