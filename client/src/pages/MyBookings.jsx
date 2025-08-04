import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found in localStorage");

    try {
      const res = await fetch("http://localhost:5000/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setBookings(data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 bg-[#fdf8f5]">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#b28a64]">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-[#e6dcd3]"
            >
              <h3 className="text-xl font-bold text-[#b28a64]">
                {booking.venueName}
              </h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Time: {booking.timeSlot}</p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-semibold">{booking.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
