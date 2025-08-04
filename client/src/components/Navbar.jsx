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
    <nav className="fixed top-0 left-0 w-full bg-[#fefdfb] text-[#5a4637] shadow-md z-50 font-serif border-b border-[#e6dccf]">
      <div className="flex justify-between items-center px-4 py-4 sm:px-10">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide text-[#b28a64]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          WedLocater
        </Link>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-[#b28a64]"
          >
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-8 items-center font-medium">
          <Link
            to="/venues"
            className="hover:text-[#b28a64] transition duration-200"
          >
            Venues
          </Link>
          {role === "admin" ? (
            <Link
              to="/admin"
              className="hover:text-[#b28a64] transition duration-200"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="hover:text-[#b28a64] transition duration-200"
            >
              Dashboard
            </Link>
          )}
          {role === "user" && (
            <Link
              to="/my-bookings"
              className="hover:text-[#b28a64] transition duration-200"
            >
              My Bookings
            </Link>
          )}
          {email ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-500 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-[#b28a64] transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-[#fefdfb] px-4 pb-4 space-y-2 font-medium text-[#5a4637] shadow-lg border-t border-[#e6dccf]">
          <Link to="/venues" className="block py-1 hover:text-[#b28a64]">
            Venues
          </Link>
          {role === "admin" ? (
            <Link to="/admin" className="block py-1 hover:text-[#b28a64]">
              Admin Dashboard
            </Link>
          ) : (
            <Link to="/dashboard" className="block py-1 hover:text-[#b28a64]">
              Dashboard
            </Link>
          )}
          {role === "user" && (
            <Link to="/my-bookings" className="block py-1 hover:text-[#b28a64]">
              My Bookings
            </Link>
          )}
          {email ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-1 hover:text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block py-1 hover:text-[#b28a64]">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
