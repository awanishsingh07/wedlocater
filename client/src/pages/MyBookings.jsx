import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-[#fefdfb] text-gray-800 px-4">
      <h2 className="text-3xl font-semibold text-center mb-10 text-[#b28a64]">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl border border-[#e6dccf] shadow-sm p-6 hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#b28a64]">
                {booking.venueName}
              </h3>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span> {booking.time}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {booking.location}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="text-green-600 font-semibold">Confirmed</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
