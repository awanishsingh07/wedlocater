import React from "react";

const VenueCard = ({ venue }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
      <img
        src={venue.imageUrl}
        alt={venue.name}
        className="w-full h-52 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h2 className="text-xl font-serif text-blue-900 font-semibold mb-1">
          {venue.name}
        </h2>
        <p className="text-gray-600 italic mb-2">{venue.location}</p>
        <p className="text-gray-700 text-sm mb-3">{venue.description}</p>
        <div className="text-lg text-gold-600 font-bold mb-2">
          ₹{venue.pricePerDay.toLocaleString()} / day
        </div>
        <button className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-800 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
