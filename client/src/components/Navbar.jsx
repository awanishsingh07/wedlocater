import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white z-50 shadow-md">
      <div className="flex justify-between items-center px-4 py-3 sm:px-8">
        <Link to="/" className="text-xl font-bold">
          WedLocater
        </Link>

        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>

        {/* 🌐 Desktop Links */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link to="/venues">Venues</Link>
          <Link to="/dashboard">Dashboard</Link>
          {/* ✅ Show only for users */}
          {role === "user" && <Link to="/my-bookings">My Bookings</Link>}
          {email ? (
            <button onClick={handleLogout} className="hover:text-red-300">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-blue-800 px-4 pb-4 space-y-2">
          <Link to="/venues" className="block py-1">
            Venues
          </Link>
          <Link to="/dashboard" className="block py-1">
            Dashboard
          </Link>
          {/* ✅ Show only for users */}
          {role === "user" && (
            <Link to="/my-bookings" className="block py-1">
              My Bookings
            </Link>
          )}
          {email ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-1 hover:text-red-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block py-1">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
