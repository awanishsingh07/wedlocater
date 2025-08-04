// AdminDashboard.jsx
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    setName(storedName);

    const fetchAdminBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/bookings/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === "ok") {
          setBookings(data.bookings);
        } else {
          console.error("Admin booking fetch failed");
        }
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };

    fetchAdminBookings();
  }, [token]);

  const filteredBookings = bookings.filter(
    (b) =>
      b.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      b.venueName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-10 bg-[#fefdfb] text-[#5a4637] font-serif">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome {name} (admin)
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user email or venue name..."
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-[#b28a64] bg-white placeholder-[#b28a64] focus:outline-none focus:ring-2 focus:ring-[#b28a64]"
        />
      </div>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md border border-[#b28a64]">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#b28a64] text-white">
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
                className="border-t border-[#e0d1c3] hover:bg-[#f6eee6]"
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
          <p className="text-center text-[#b28a64] mt-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
