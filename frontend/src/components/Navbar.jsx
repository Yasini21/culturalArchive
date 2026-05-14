import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-[#7A4A2E] font-semibold"
      : "text-[#3A2F2A] hover:text-[#7A4A2E]";

  return (
    <nav className="bg-[#FBF8F4] border-b border-[#E6DDD2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* BRAND */}
        <NavLink to="/" className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="Cultural Archive" className="h-8 w-auto" />
          <span className="text-base sm:text-lg font-semibold text-[#3A2F2A]">
            Cultural Archive
          </span>
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          {!token && (
            <>
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/explore" className={navLinkStyle}>Explore</NavLink>
              <NavLink to="/about" className={navLinkStyle}>About</NavLink>
            </>
          )}

          {token && role === "user" && (
            <>
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/explore" className={navLinkStyle}>Explore</NavLink>
              <NavLink to="/mystories" className={navLinkStyle}>
                My Stories
              </NavLink>
              <NavLink
                to="/addstory"
                className="px-4 py-1.5 bg-[#7A4A2E] text-white rounded-lg text-xs font-medium hover:bg-[#5f3923]"
              >
                Add Story
              </NavLink>
            </>
          )}

          {token && role === "admin" && (
            <>
              <NavLink to="/admin" className={navLinkStyle}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/approvals" className={navLinkStyle}>
                Pending
              </NavLink>
            </>
          )}

          {/* PROFILE */}
          {token && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 bg-[#7A4A2E] text-white rounded-full flex items-center justify-center font-semibold"
              >
                {userName?.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 text-sm text-[#6B5B52] border-b">
                    {userName}
                  </div>

                  {role === "user" && (
                    <NavLink
                      to="/mystories"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-[#F5F3EF]"
                    >
                      My Stories
                    </NavLink>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F3EF] text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl text-[#3A2F2A]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-6 flex flex-col gap-4 text-sm bg-[#FBF8F4] border-t">

          {!token && (
            <>
              <NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Home</NavLink>
              <NavLink to="/explore" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Explore</NavLink>
              <NavLink to="/about" onClick={() => setMobileOpen(false)} className={navLinkStyle}>About</NavLink>
            </>
          )}

          {token && role === "user" && (
            <>
              <NavLink to="/" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Home</NavLink>
              <NavLink to="/explore" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Explore</NavLink>
              <NavLink to="/mystories" onClick={() => setMobileOpen(false)} className={navLinkStyle}>My Stories</NavLink>
              <NavLink to="/addstory" onClick={() => setMobileOpen(false)}>Add Story</NavLink>
            </>
          )}

          {token && role === "admin" && (
            <>
              <NavLink to="/admin" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Dashboard</NavLink>
              <NavLink to="/admin/approvals" onClick={() => setMobileOpen(false)} className={navLinkStyle}>Pending</NavLink>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="text-left text-red-600 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
