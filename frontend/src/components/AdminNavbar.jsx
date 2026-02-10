import { useNavigate, NavLink } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "bg-[#EDE7DF] text-[#3A2F2A]"
        : "text-[#6E6259] hover:text-[#3A2F2A]"
    }`;

  return (
    <nav className="bg-white border-b border-[#E6DDD2]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT: BRAND */}
        <div className="font-semibold text-[#3A2F2A]">
          Admin Panel
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="flex gap-4">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/approvals" className={linkClass}>
            Pending Stories
          </NavLink>
        </div>

        {/* RIGHT: ADMIN INFO */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#6E6259]">
            {adminEmail}
          </span>

          <button
            onClick={handleLogout}
            className="
              px-3 py-1.5
              text-sm
              rounded-md
              bg-red-600
              text-white
              hover:bg-red-700
              transition
            "
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default AdminNavbar;
