// ── Mock venue data ──────────────────────────────────────────────────────────
const VENUES = [
  {
    id: "v001",
    name: "The Grand Mahal Palace",
    slug: "grand-mahal-palace",
    tagline: "Where royalty meets romance",
    venueType: "Palace",
    city: "Udaipur",
    state: "Rajasthan",
    address: "Lake Pichola Road, Udaipur, Rajasthan 313001",
    location: { lat: 24.5754, lng: 73.6855 },
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 500000,
    priceUnit: "per day",
    pricePerPlate: 3500,
    capacity: { min: 200, max: 2000 },
    indoor: true,
    outdoor: true,
    rating: 4.9,
    reviewCount: 312,
    verified: true,
    featured: true,
    amenities: [
      "Bridal Suite", "Valet Parking", "In-house Catering", "AC Banquet",
      "Floral Decoration", "DJ Sound System", "Projector & Screen",
      "Backup Generator", "CCTV Security", "Guest Accommodation",
      "Swimming Pool", "Spa Services",
    ],
    spaces: [
      { name: "Royal Durbar Hall",   capacity: 2000, type: "Indoor",  area: "12,000 sq ft" },
      { name: "Lake View Lawn",       capacity: 1500, type: "Outdoor", area: "20,000 sq ft" },
      { name: "Crystal Ballroom",     capacity: 500,  type: "Indoor",  area: "5,000 sq ft"  },
      { name: "Terrace Garden",       capacity: 300,  type: "Outdoor", area: "4,000 sq ft"  },
    ],
    about: "Perched majestically on the banks of Lake Pichola, The Grand Mahal Palace is Udaipur's most iconic wedding destination. With its breathtaking lake views, ornate Rajput architecture, and world-class hospitality, every celebration here becomes an unforgettable royal affair. Our dedicated wedding team ensures every detail is perfected to create the wedding of your dreams.",
    policies: [
      "100% advance booking required",
      "Outside catering not permitted",
      "DJ music allowed until 11 PM",
      "Free cancellation up to 60 days before event",
    ],
    reviews: [
      {
        id: "r001", name: "Priya & Rahul Sharma", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "March 2024",
        title: "An absolute dream wedding!",
        body: "We couldn't have asked for a more magical venue. The Grand Mahal exceeded every expectation — the staff was impeccable, the food divine, and the views of Lake Pichola at sunset were simply breathtaking. Our 400 guests were absolutely stunned.",
      },
      {
        id: "r002", name: "Ananya & Vikram Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "January 2024",
        title: "Royal experience from start to finish",
        body: "From the initial site visit to the last dance of our reception, the team at Grand Mahal made us feel like royalty. The Royal Durbar Hall is enormous yet intimate. The bridal suite is a world unto itself. Absolutely worth every rupee.",
      },
      {
        id: "r003", name: "Meera & Arjun Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop",
        rating: 4, date: "November 2023",
        title: "Stunning venue, minor coordination gaps",
        body: "The venue itself is spectacular — no venue in Rajasthan comes close. We did face some minor coordination issues on the day, but the management resolved them swiftly. The food and décor were outstanding.",
      },
    ],
  },
  {
    id: "v002",
    name: "The ITC Mughal Agra",
    slug: "itc-mughal-agra",
    tagline: "A Mughal garden of eternal love",
    venueType: "Hotel",
    city: "Agra",
    state: "Uttar Pradesh",
    address: "Taj Ganj, Agra, Uttar Pradesh 282001",
    location: { lat: 27.1751, lng: 78.0421 },
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 350000,
    priceUnit: "per day",
    pricePerPlate: 2800,
    capacity: { min: 100, max: 1500 },
    indoor: true,
    outdoor: true,
    rating: 4.7,
    reviewCount: 228,
    verified: true,
    featured: true,
    amenities: [
      "Valet Parking", "In-house Catering", "AC Banquet",
      "Floral Decoration", "Backup Generator", "CCTV Security",
      "Guest Accommodation", "Spa Services", "Pool",
    ],
    spaces: [
      { name: "Mughal Ballroom",  capacity: 1500, type: "Indoor",  area: "10,000 sq ft" },
      { name: "Khas Bagh Garden", capacity: 1000, type: "Outdoor", area: "15,000 sq ft" },
    ],
    about: "Set amidst sprawling Mughal gardens in the shadow of the Taj Mahal, ITC Mughal Agra is a five-star destination that blends Mughal grandeur with modern luxury. The perfect backdrop for a regal wedding celebration.",
    policies: [
      "50% advance booking required",
      "Outside catering not permitted",
      "DJ music allowed until 10:30 PM",
    ],
    reviews: [
      {
        id: "r004", name: "Sunita & Dev Khanna", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "February 2024",
        title: "Getting married with the Taj as backdrop",
        body: "The view of the Taj Mahal from our wedding mandap was beyond anything we could have imagined. The ITC team was professional, warm and utterly dedicated to making our day perfect.",
      },
    ],
  },
  {
    id: "v003",
    name: "Falaknuma Palace",
    slug: "falaknuma-palace",
    tagline: "Mirror of the sky, palace of dreams",
    venueType: "Palace",
    city: "Hyderabad",
    state: "Telangana",
    address: "Engine Bowli, Falaknuma, Hyderabad 500053",
    location: { lat: 17.3333, lng: 78.4667 },
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 800000,
    priceUnit: "per day",
    pricePerPlate: 5500,
    capacity: { min: 50, max: 800 },
    indoor: true,
    outdoor: true,
    rating: 5.0,
    reviewCount: 89,
    verified: true,
    featured: true,
    amenities: [
      "Bridal Suite", "Valet Parking", "In-house Catering",
      "Floral Decoration", "Backup Generator", "Guest Accommodation",
      "Heritage Carriages", "Butler Service",
    ],
    spaces: [
      { name: "Durbar Hall",    capacity: 800, type: "Indoor",  area: "8,000 sq ft"  },
      { name: "Italian Garden", capacity: 500, type: "Outdoor", area: "12,000 sq ft" },
    ],
    about: "Perched atop a hill overlooking Hyderabad, Falaknuma Palace is India's most exclusive wedding venue. Once the private palace of the Nizam of Hyderabad, it now offers an unparalleled royal wedding experience under the Taj Hotels banner.",
    policies: [
      "Full payment required at booking",
      "Only in-house catering permitted",
      "No outside vendors without prior approval",
    ],
    reviews: [
      {
        id: "r005", name: "Zara & Imran Sheikh", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "December 2023",
        title: "Nothing compares to Falaknuma",
        body: "We looked at every top venue in India. Nothing came close. The experience of arriving by horse carriage, the butler service, the food — it was surreal. Our guests still talk about it.",
      },
    ],
  },
  {
    id: "v004",
    name: "Leela Palace Chennai",
    slug: "leela-palace-chennai",
    tagline: "South India's grandest celebration stage",
    venueType: "Hotel",
    city: "Chennai",
    state: "Tamil Nadu",
    address: "Old Mahabalipuram Road, Chennai 600119",
    location: { lat: 12.8446, lng: 80.2288 },
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 280000,
    priceUnit: "per day",
    pricePerPlate: 2200,
    capacity: { min: 100, max: 1200 },
    indoor: true,
    outdoor: false,
    rating: 4.6,
    reviewCount: 176,
    verified: true,
    featured: false,
    amenities: [
      "Valet Parking", "In-house Catering", "AC Banquet",
      "Floral Decoration", "Backup Generator", "Guest Accommodation",
    ],
    spaces: [
      { name: "Grand Ballroom", capacity: 1200, type: "Indoor", area: "9,000 sq ft" },
      { name: "Konark Hall",    capacity: 400,  type: "Indoor", area: "3,500 sq ft" },
    ],
    about: "The Leela Palace Chennai sets the gold standard for South Indian wedding celebrations. Its grand ballrooms, impeccable service, and world-class cuisine make it the preferred choice for discerning families.",
    policies: [
      "50% advance at booking",
      "Outside caterers at additional charge",
      "DJ until 11 PM",
    ],
    reviews: [
      {
        id: "r006", name: "Kavya & Siddharth Rajan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "April 2024",
        title: "Chennai's finest wedding venue",
        body: "Perfect in every way. The food was exceptional — both South Indian and North Indian menus were flawless. The décor team understood our vision immediately.",
      },
    ],
  },
  {
    id: "v005",
    name: "Aamby Valley Farmhouse",
    slug: "aamby-valley-farmhouse",
    tagline: "Rustic elegance under open skies",
    venueType: "Farmhouse",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Aamby Valley Road, Khopoli, Maharashtra 410203",
    location: { lat: 18.7573, lng: 73.3463 },
    images: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 180000,
    priceUnit: "per day",
    pricePerPlate: 1800,
    capacity: { min: 50, max: 600 },
    indoor: false,
    outdoor: true,
    rating: 4.4,
    reviewCount: 142,
    verified: true,
    featured: false,
    amenities: [
      "Valet Parking", "DJ Sound System", "Backup Generator",
      "Outdoor Lawn", "Bonfire Area", "Accommodation",
    ],
    spaces: [
      { name: "Grand Lawn",    capacity: 600, type: "Outdoor", area: "18,000 sq ft" },
      { name: "Pool Terrace",  capacity: 200, type: "Outdoor", area: "5,000 sq ft"  },
    ],
    about: "Escape the city at Aamby Valley Farmhouse — a lush, sprawling estate perfect for intimate garden weddings and grand outdoor celebrations alike. Rolling hills, manicured lawns, and a rustic-chic aesthetic make for stunning wedding photographs.",
    policies: [
      "30% advance at booking",
      "Outside caterers welcome",
      "DJ until midnight",
    ],
    reviews: [
      {
        id: "r007", name: "Pooja & Nikhil Mehta", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop",
        rating: 4, date: "January 2024",
        title: "Beautiful outdoor setting",
        body: "We had a 250-guest wedding here and it was magical. The greenery, the evening lighting, and the vibe were perfect. Would highly recommend for outdoor ceremony lovers.",
      },
    ],
  },
  {
    id: "v006",
    name: "Rambagh Palace Jaipur",
    slug: "rambagh-palace-jaipur",
    tagline: "The jewel of Jaipur weddings",
    venueType: "Palace",
    city: "Jaipur",
    state: "Rajasthan",
    address: "Bhawani Singh Road, Jaipur, Rajasthan 302005",
    location: { lat: 26.8893, lng: 75.8071 },
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop",
    ],
    price: 650000,
    priceUnit: "per day",
    pricePerPlate: 4500,
    capacity: { min: 100, max: 1800 },
    indoor: true,
    outdoor: true,
    rating: 4.8,
    reviewCount: 201,
    verified: true,
    featured: true,
    amenities: [
      "Bridal Suite", "Valet Parking", "In-house Catering", "AC Banquet",
      "Polo Ground", "Heritage Carriages", "Spa Services", "Backup Generator",
    ],
    spaces: [
      { name: "Rajmahal Lawn",  capacity: 1800, type: "Outdoor", area: "22,000 sq ft" },
      { name: "Maharani Mahal", capacity: 800,  type: "Indoor",  area: "7,000 sq ft"  },
    ],
    about: "Once the residence of the Maharaja of Jaipur, Rambagh Palace is synonymous with royal grandeur. Its manicured lawns, ornate interiors, and legendary service by Taj Hotels make it one of India's most sought-after wedding destinations.",
    policies: [
      "Full payment required",
      "Only in-house catering",
      "Prior approval for all vendors",
    ],
    reviews: [
      {
        id: "r008", name: "Riya & Sameer Gupta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop",
        rating: 5, date: "February 2024",
        title: "A fairy-tale wedding",
        body: "From the elephant welcome procession to the farewell fireworks, Rambagh Palace delivered a fairy-tale wedding that our families will treasure forever. Not a single detail was overlooked.",
      },
    ],
  },
];

// ── Service API ──────────────────────────────────────────────────────────────
export const venueService = {
  getAll: ({ city, priceMax, capacityMin, indoor, outdoor, sort } = {}) => {
    let results = [...VENUES];

    if (city && city !== "all")
      results = results.filter(v => v.city.toLowerCase() === city.toLowerCase());

    if (priceMax)
      results = results.filter(v => v.price <= Number(priceMax));

    if (capacityMin)
      results = results.filter(v => v.capacity.max >= Number(capacityMin));

    if (indoor && !outdoor)
      results = results.filter(v => v.indoor);

    if (outdoor && !indoor)
      results = results.filter(v => v.outdoor);

    switch (sort) {
      case "price_asc":   results.sort((a, b) => a.price - b.price);         break;
      case "price_desc":  results.sort((a, b) => b.price - a.price);         break;
      case "rating":      results.sort((a, b) => b.rating - a.rating);       break;
      case "reviews":     results.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default:            results.sort((a, b) => b.featured - a.featured);   break;
    }

    return results;
  },

  getById:   (id)   => VENUES.find(v => v.id === id || v.slug === id) || null,
  getFeatured: ()   => VENUES.filter(v => v.featured).slice(0, 3),
  getSimilar: (id)  => VENUES.filter(v => v.id !== id).slice(0, 3),

  getCities: () => [...new Set(VENUES.map(v => v.city))],
};