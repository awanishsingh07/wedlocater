import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;

  const fetchBookings = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await fetch(
        `http://localhost:5000/api/bookings/my-bookings?email=${email}`
      );

      if (!res.ok) {
        const html = await res.text();
        console.error("HTML Error Response:", html);
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

  // Pagination logic
  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-10 bg-blue-950 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-blue-200 text-lg">No bookings yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBookings.map((b) => (
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

          {/* Pagination controls */}
          {bookings.length > bookingsPerPage && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span className="text-blue-200 text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
