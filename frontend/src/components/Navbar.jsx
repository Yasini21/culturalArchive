import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-[#FBF8F4] border-b border-[#E6DDD2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* BRAND */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 group"
        >
          <img
            src={logo}
            alt="Cultural Archive"
            className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="hidden md:block text-lg font-semibold tracking-wide text-[#3A2F2A]">
            Cultural Archive
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#3A2F2A]">

          {/* Guest */}
          {!token && (
            <>
              <Link to="/" className="hover:text-[#7A4A2E] transition">Home</Link>
              <Link to="/explore" className="hover:text-[#7A4A2E] transition">Explore</Link>
              <Link to="/about" className="hover:text-[#7A4A2E] transition">About</Link>
            </>
          )}

          {/* User */}
          {token && role === "user" && (
            <>
              <Link to="/" className="hover:text-[#7A4A2E] transition">Home</Link>
              <Link to="/explore" className="hover:text-[#7A4A2E] transition">Explore</Link>
              <Link to="/about" className="hover:text-[#7A4A2E] transition">About</Link>
              <Link to="/mystories" className="hover:text-[#7A4A2E] transition">
                My Stories
              </Link>
              <Link
                to="/addstory"
                className="font-medium text-[#7A4A2E] hover:opacity-80 transition"
              >
                Add Story
              </Link>
            </>
          )}

          {/* Admin */}
          {token && role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-[#7A4A2E] transition">
                Dashboard
              </Link>
              <Link to="/admin/approvals" className="hover:text-[#7A4A2E] transition">
                Pending
              </Link>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {token && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 bg-[#7A4A2E] text-white rounded-full flex items-center justify-center font-semibold hover:opacity-90 transition"
              >
                {userName?.charAt(0).toUpperCase()}
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-[#E6DDD2] rounded-xl shadow-lg overflow-hidden">

                  <div className="px-4 py-3 border-b text-sm text-[#6B5B52]">
                    {userName}
                  </div>

                  {/* My Stories inside dropdown (nice UX touch) */}
                  {role === "user" && (
                    <Link
                      to="/mystories"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-[#F5F3EF] transition"
                    >
                      My Stories
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5F3EF] transition text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl text-[#3A2F2A]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm text-[#3A2F2A] bg-[#FBF8F4] border-t border-[#E6DDD2]">

          {!token && (
            <>
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/explore" onClick={() => setMobileOpen(false)}>Explore</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/explore" onClick={() => setMobileOpen(false)}>Explore</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/mystories" onClick={() => setMobileOpen(false)}>My Stories</Link>
              <Link to="/addstory" onClick={() => setMobileOpen(false)}>Add Story</Link>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/admin/approvals" onClick={() => setMobileOpen(false)}>Pending</Link>
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
