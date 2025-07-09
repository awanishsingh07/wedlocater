import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // redirect to login if no token
      return;
    }

    // Optional: Decode or fetch user info here (we'll improve later)
    setUser({ email: "user@example.com" }); // placeholder
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard</h1>
      <p className="text-lg mb-6">
        {user ? `Logged in as ${user.email}` : "Loading..."}
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
