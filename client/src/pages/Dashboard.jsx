import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState({ email: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    console.log("User role:", role);

    if (!token || !email) {
      navigate("/login");
      return;
    }

    setUser({ email, role });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-blue-950 text-white sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>
      <p className="text-lg text-center mb-4">
        Welcome, <span className="font-semibold">{user.email}</span>
      </p>
      <p className="text-center text-blue-300 mb-8">
        Role: {user.role || "user"}
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
