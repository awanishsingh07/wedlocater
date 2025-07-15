import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add Authorization header
        },
      });

      const data = await res.json();
      if (data.status === "ok") {
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
      } else {
        alert("Error fetching bookings");
      }
    };
    fetchBookings();
  }, []);

  // Filter bookings when search input changes
  useEffect(() => {
    const query = search.toLowerCase();
    const results = bookings.filter(
      (b) =>
        b.userEmail.toLowerCase().includes(query) ||
        b.venueName.toLowerCase().includes(query)
    );
    setFilteredBookings(results);
  }, [search, bookings]);

  return (
    <div className="min-h-screen pt-24 px-4 bg-blue-950 text-white sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user email or venue name..."
          className="w-full sm:w-1/2 px-4 py-2 rounded bg-blue-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto bg-blue-800 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-3">User Email</th>
              <th className="p-3">Venue Name</th>
              <th className="p-3">Booking ID</th>
              <th className="p-3">Booked On</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, idx) => (
              <tr
                key={idx}
                className="border-t border-blue-600 hover:bg-blue-700"
              >
                <td className="p-3">{booking.userEmail}</td>
                <td className="p-3">{booking.venueName}</td>
                <td className="p-3">{booking._id}</td>
                <td className="p-3">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && (
          <p className="text-center text-blue-300 mt-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
