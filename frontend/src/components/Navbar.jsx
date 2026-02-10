import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  const userName = localStorage.getItem("userName");

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-[#FBF8F4] border-b border-[#E6DDD2]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="text-lg font-semibold text-[#3A2F2A]">
          Cultural Archive
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8 text-sm text-[#3A2F2A]">

          {/* 🌍 PUBLIC */}
          {!token && (
            <>
              <Link to="/">Home</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/about">About</Link>
            </>
          )}

          {/* 👤 NORMAL USER */}
          {token && role === "user" && (
            <>
              <Link to="/">Home</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/about">About</Link>

              {/* ✅ ONLY USER SEES THIS */}
              <Link
                to="/addstory"
                className="font-medium hover:text-[#8B5E3C]"
              >
                Add Story
              </Link>
            </>
          )}

          {/* 🛡️ ADMIN */}
          {token && role === "admin" && (
            <>
              <Link
                to="/admin"
                className="font-medium hover:text-[#8B5E3C]"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/approvals"
                className="hover:text-[#8B5E3C]"
              >
                Pending Stories
              </Link>
            </>
          )}

          {/* PROFILE */}
          {token && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="font-medium text-[#6F4E37]"
              >
                {userName || "Profile"}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#F5F3EF]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
