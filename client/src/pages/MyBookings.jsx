import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await fetch(
        `http://localhost:5000/api/my-bookings?email=${email}`
      );

      if (!res.ok) {
        const html = await res.text();
        console.error("❌ HTML Error Response:", html);
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      if (data.status === "ok") {
        setBookings(data.bookings);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
      toast.error("Could not fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // Handle unexpected HTML/error pages
        const html = await res.text();
        console.error("HTML Error response:", html);
        alert("Failed to cancel booking: Server error.");
        return;
      }

      const data = await res.json();
      if (data.status === "ok") {
        alert("Booking cancelled.");
        fetchBookings(); // Refresh list
      } else {
        alert("Failed to cancel booking: " + data.error);
      }
    } catch (err) {
      console.error("❌ Cancel error:", err.message);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-10 bg-blue-950 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-blue-200 text-lg">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-blue-800 rounded-xl p-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{b.venueName}</h3>
                <p className="text-sm text-blue-300">Booking ID: {b._id}</p>
                <p className="text-sm text-blue-300 mt-1">
                  Booked On: {new Date(b.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleCancel(b._id)}
                className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel Booking
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
