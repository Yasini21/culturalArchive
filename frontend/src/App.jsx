import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import MyStories from "./pages/MyStories";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Login from "./pages/Login";
import AddStory from "./pages/AddStory";
import Profile from "./pages/Profile";
import EditStory from "./pages/EditStory";




import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApproval from "./pages/admin/AdminApproval";

function App() {
  const location = useLocation(); 

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<EditStory />} />
        <Route path="/mystories" element={<MyStories />} />

        <Route
          path="/addstory"
          element={
            <ProtectedRoute>
              <AddStory />
            </ProtectedRoute>
          }
        />

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
