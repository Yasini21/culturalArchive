import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";


import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Login from "./pages/Login";
import AddStory from "./pages/AddStory";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApproval from "./pages/admin/AdminApproval";

function App() {
  const role = localStorage.getItem("role");

  return (
    <>
      {/* ✅ Show NORMAL navbar only for non-admin */}
         <Navbar/>

      <Routes>
        {/* 🌍 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        {/* 👤 USER */}
        <Route
          path="/addstory"
          element={
            <ProtectedRoute>
              <AddStory />
            </ProtectedRoute>
          }
        />

        {/* 🛡️ ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="approvals" element={<AdminApproval />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
