import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  if (!email || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}
