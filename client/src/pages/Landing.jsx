import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#fefdfb] text-gray-800 flex flex-col justify-between font-serif">
      {/* Navigation */}
      <header className="p-6 flex justify-between items-center border-b border-[#e6dccf] shadow-sm bg-white">
        <h1 className="text-3xl font-bold text-[#b28a64] tracking-wide">
          WedLocater
        </h1>
        <nav className="space-x-6 text-[#5a4637] font-medium">
          <Link to="/login" className="hover:text-[#b28a64] transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-[#b28a64] transition">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight text-[#3b2f2f]">
          Find the Perfect Venue <br /> for Your Dream Wedding
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-[#5a4637]">
          Discover elegant wedding venues across India. Handpicked locations,
          verified listings, and a smooth booking experience — all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/login">
            <button className="bg-[#b28a64] hover:bg-[#9a7356] px-6 py-3 rounded-full text-white font-semibold transition shadow">
              Get Started
            </button>
          </Link>
          <Link to="/venues">
            <button className="border border-[#b28a64] hover:bg-[#b28a64] hover:text-white px-6 py-3 rounded-full text-[#b28a64] font-semibold transition shadow">
              Browse Venues
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-[#8c6849] bg-white border-t border-[#e6dccf]">
        © {new Date().getFullYear()} WedLocater. Crafted with elegance.
      </footer>
    </div>
  );
}
