export default function Venues() {
  const sampleVenues = [
    {
      id: 1,
      name: "Royal Palace Banquet",
      location: "Bhopal, MP",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      price: "₹1,50,000",
    },
    {
      id: 2,
      name: "Elegant Garden View",
      location: "Indore, MP",
      image:
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=800&q=60",
      price: "₹2,00,000",
    },
    {
      id: 3,
      name: "Ocean View Resort",
      location: "Goa, India",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=60",
      price: "₹3,50,000",
    },
    {
      id: 4,
      name: "The Rajputana Heritage",
      location: "Jaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&w=800&q=60",
      price: "₹4,20,000",
    },
    {
      id: 5,
      name: "Palm Beach Lawn",
      location: "Kochi, Kerala",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      price: "₹2,80,000",
    },
    {
      id: 6,
      name: "Lake View Palace",
      location: "Udaipur, Rajasthan",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      price: "₹5,00,000",
    },
    {
      id: 10,
      name: "Golden Leaf Retreat",
      location: "Shimla, Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1578898886181-b44e35c27931?auto=format&fit=crop&w=800&q=60",
      price: "₹3,00,000",
    },
    {
      id: 11,
      name: "Amber Gardens",
      location: "Hyderabad, Telangana",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      price: "₹2,20,000",
    },
    {
      id: 12,
      name: "Pearl Lagoon Venue",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1549237515-1f0b9c879c4e?auto=format&fit=crop&w=800&q=60",
      price: "₹2,60,000",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Wedding Venues</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-blue-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={venue.image}
              alt={venue.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{venue.name}</h2>
              <p className="text-sm text-blue-200">{venue.location}</p>
              <p className="mt-2 font-bold">{venue.price}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
