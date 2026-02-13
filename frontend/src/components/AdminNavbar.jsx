import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("userName");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "text-[#3A2F2A]"
        : "text-[#6E6259] hover:text-[#3A2F2A]"
    }`;

  return (
    <nav className="bg-white border-b border-[#E6DDD2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="font-semibold text-[#3A2F2A]">
          Admin Panel
        </div>

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/approvals" className={linkClass}>
            Pending
          </NavLink>

          <NavLink to="/explore" className={linkClass}>
            Explore Site
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 bg-[#7A4A2E] text-white rounded-full flex items-center justify-center font-semibold hover:opacity-90 transition"
            >
              {adminName?.charAt(0).toUpperCase()}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white border border-[#E6DDD2] rounded-xl shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b text-sm text-[#6B5B52]">
                  {adminName}
                  <div className="text-xs text-[#7A4A2E] mt-1">
                    Administrator
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F3EF] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="md:hidden text-2xl text-[#3A2F2A]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>
      
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm text-[#3A2F2A] bg-white">

          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/approvals" className={linkClass}>
            Pending
          </NavLink>

          <NavLink to="/explore" className={linkClass}>
            Explore Site
          </NavLink>

          <div className="flex items-center gap-3 mt-4">
            <div className="w-9 h-9 bg-[#7A4A2E] text-white rounded-full flex items-center justify-center font-semibold">
              {adminName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium">{adminName}</div>
              <div className="text-xs text-[#7A4A2E]">Administrator</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 text-left text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
