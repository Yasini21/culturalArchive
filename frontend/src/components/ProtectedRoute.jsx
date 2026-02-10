import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but not admin trying to access admin route
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
