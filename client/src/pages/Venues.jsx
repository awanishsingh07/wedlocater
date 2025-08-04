import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Venues() {
  const [search, setSearch] = useState("");
  const [venues, setVenues] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  const userEmail = localStorage.getItem("email");

  // Fetch venues and user bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesRes = await fetch("http://localhost:5000/api/venues/all");
        const venuesData = await venuesRes.json();
        setVenues(venuesData.venues || []);

        if (userEmail) {
          const bookingsRes = await fetch(
            `http://localhost:5000/api/bookings/user/${userEmail}`
          );
          const bookingsData = await bookingsRes.json();
          setUserBookings(bookingsData.bookings || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [userEmail]);

  // Filter out already booked venues
  const bookedVenueIds = new Set(userBookings.map((b) => b.venueId));
  const availableVenues = venues.filter(
    (venue) => !bookedVenueIds.has(venue._id)
  );

  // Apply search filter
  const filteredVenues = availableVenues.filter((venue) =>
    (venue.name + venue.location).toLowerCase().includes(search.toLowerCase())
  );

  // Handle booking
  const handleBook = async (venue) => {
    if (!userEmail) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          venueId: venue._id,
          venueName: venue.name,
        }),
      });

      const data = await res.json();
      if (data.status === "ok") {
        alert("🎉 Booking successful!");
        setUserBookings([...userBookings, { venueId: venue._id }]);
      } else {
        alert("❌ Booking failed: " + data.error);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking.");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-br from-[#F5F1EB] to-[#EADBC8] text-[#3B2F2F] font-serif sm:px-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#A67B5B]">
        Wedding Venues
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search venue or location..."
          className="w-full sm:w-1/2 px-4 py-3 rounded-full bg-white text-[#5A4637] placeholder-[#A67B5B] border border-[#D6C3B4] focus:outline-none focus:ring-2 focus:ring-[#A67B5B]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <motion.div
              key={venue._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-[#E0D3C2]"
            >
              <img
                src={venue.image || "/placeholder.jpg"}
                alt={venue.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-[#3B2F2F]">
                  {venue.name}
                </h2>
                <p className="text-sm text-[#7A6452]">{venue.location}</p>
                <p className="mt-2 font-bold text-[#A67B5B]">
                  ₹{venue.price} / day
                </p>
                <button
                  onClick={() => handleBook(venue)}
                  className="mt-4 bg-[#A67B5B] hover:bg-[#8C6849] text-white px-5 py-2 rounded-full font-medium transition"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-[#7A6452]">
            No venues found or all already booked.
          </p>
        )}
      </div>
    </div>
  );
}
