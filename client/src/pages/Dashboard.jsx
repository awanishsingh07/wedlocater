// Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);
  }, []);

  const handleViewBookings = () => {
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-blue-950 text-white sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome {name} (user)
      </h1>

      <div className="text-center">
        <p className="mb-4 text-lg">You can view your bookings below.</p>
        <button
          onClick={handleViewBookings}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
