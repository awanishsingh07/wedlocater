import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white flex flex-col justify-between">
      {/* Navigation */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">WedLocater</h1>
        <nav className="space-x-4">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/Register" className="hover:underline">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Find the Perfect Venue <br /> for Your Dream Wedding
        </h2>
        <p className="text-lg md:text-xl mb-6 max-w-2xl">
          Explore and book wedding venues across India. Elegant locations,
          trusted listings, seamless booking experience — all in one place.
        </p>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-white font-semibold">
              Get Started
            </button>
          </Link>
          <Link to="/venues">
            <button className="bg-blue-700 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold">
              Browse Venues
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-blue-300">
        © {new Date().getFullYear()} WedLocater. All rights reserved.
      </footer>
    </div>
  );
}
