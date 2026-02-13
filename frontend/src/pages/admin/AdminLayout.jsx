import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">

      {/* 🔹 TOP ADMIN NAVBAR */}
      <AdminNavbar />

      {/* 🔹 MAIN DASHBOARD CONTENT */}
      <main className="flex-1 px-8 py-6">
        <div className="max-w-7xl mx-auto">

          {/* CARD-LIKE CONTAINER FOR PAGES */}
          <div className="bg-white border border-[#E6E0D8] rounded-xl p-6 shadow-sm">
            <Outlet />
          </div>

        </div>
      </main>

      {/* 🔹 OPTIONAL FOOTER */}
      <footer className="text-center text-xs text-[#8A8178] py-4">
        © {new Date().getFullYear()} Cultural Archive · Admin Panel
      </footer>

    </div>
  );
};

export default AdminLayout;
