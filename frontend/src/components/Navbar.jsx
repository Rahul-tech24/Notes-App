import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/auth";

function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
      <div className="app-frame">
        <div className="surface-card flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="brand-mark">KS</span>

            <div className="min-w-0">
              <Link to="/dashboard" className="block font-semibold tracking-[-0.02em]">
                Knowledge System
              </Link>

              <p className="truncate text-sm text-[var(--muted)]">
                {user?.username
                  ? `Signed in as ${user.username}`
                  : "Private notes, searchable and calm"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="btn btn-ghost hidden sm:inline-flex">
              Workspace
            </Link>

            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
