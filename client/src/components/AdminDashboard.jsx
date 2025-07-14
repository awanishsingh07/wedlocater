import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      if (data.status === "ok") {
        setBookings(data.bookings);
      } else {
        alert("Error fetching bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="overflow-x-auto bg-blue-800 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-3">User Email</th>
              <th className="p-3">Venue Name</th>
              <th className="p-3">Booked on</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr
                key={idx}
                className="border-t border-blue-600 hover:bg-blue-700"
              >
                <td className="p-3">{booking.userEmail}</td>
                <td className="p-3">{booking.venueName}</td>
                <td className="p-3">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center text-blue-300 mt-4">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
