const VENDORS = [
  // ── Decorators ──────────────────────────────────────────────────────────
  {
    id: "vd001", category: "Decorator", slug: "blooms-bows",
    name: "Blooms & Bows Decor", tagline: "Floral fantasies brought to life",
    city: "Mumbai", state: "Maharashtra",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=100&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.8, reviewCount: 196, verified: true, featured: true,
    yearsActive: 9, responseTime: "< 2 hours",
    basePrice: 120000, priceUnit: "per event",
    tags: ["Floral Mandap", "Table Décor", "Entrance Décor", "Lighting"],
    highlights: ["500+ events decorated", "In-house florals team", "3D mood board provided"],
    insured: true, available: true,
    about: "Blooms & Bows is Mumbai's most celebrated floral design studio. Led by award-winning designer Nisha Kapoor, we transform venues into ethereal floral wonderlands — from intimate 50-guest ceremonies to grand 2,000-guest receptions.",
    packages: [
      { id: "dpkg001", name: "Bloom", price: 120000, popular: false, features: ["Mandap decoration", "Stage backdrop", "Basic entrance arch", "Table centrepieces x 10"] },
      { id: "dpkg002", name: "Blossom", price: 220000, popular: true, features: ["Premium floral mandap", "Grand entrance arch", "Full venue draping", "Table centrepieces x 25", "Aisle décor", "Mood lighting"] },
      { id: "dpkg003", name: "Royal Garden", price: 380000, popular: false, features: ["Complete venue transformation", "Custom floral installations", "Ceiling décor", "Pool/water floral décor", "Photo booth setup", "All of above premium"] },
    ],
    reviews: [
      { id: "dvr001", name: "Priya & Rahul Sharma", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop", rating: 5, date: "March 2024", title: "Absolute floral perfection", body: "The mandap Nisha created was like something out of a fairy tale. Every guest stopped to photograph it. The team worked overnight and the result was magical." },
    ],
  },
  {
    id: "vd002", category: "Decorator", slug: "royal-decor-jaipur",
    name: "Royal Decor Jaipur", tagline: "Rajput grandeur, reimagined",
    city: "Jaipur", state: "Rajasthan",
    coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.9, reviewCount: 143, verified: true, featured: true,
    yearsActive: 14, responseTime: "< 1 hour",
    basePrice: 200000, priceUnit: "per event",
    tags: ["Heritage Décor", "Rajasthani Theme", "Floral", "Fabric Draping"],
    highlights: ["Specialises in palace weddings", "Heritage prop collection", "Royal theme experts"],
    insured: true, available: true,
    about: "Royal Decor Jaipur specialises in grand Rajasthani and palace-style wedding decorations. With 14 years of expertise and an unparalleled collection of heritage props, we create celebrations fit for maharajas.",
    packages: [
      { id: "dpkg004", name: "Heritage", price: 200000, popular: false, features: ["Rajasthani mandap", "Heritage prop styling", "Entrance arch", "Basic table décor"] },
      { id: "dpkg005", name: "Maharaja", price: 420000, popular: true, features: ["Full royal transformation", "Heritage carriage décor", "Elephant motif installations", "Luxury fabric draping", "Heritage lighting", "All ceremonies"] },
    ],
    reviews: [
      { id: "dvr002", name: "Riya & Sameer Gupta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop", rating: 5, date: "January 2024", title: "Made Rambagh even more beautiful", body: "We didn't think Rambagh Palace could get more beautiful. Royal Decor proved us wrong." },
    ],
  },
  // ── Caterers ─────────────────────────────────────────────────────────────
  {
    id: "vd003", category: "Caterer", slug: "royal-feast-caterers",
    name: "Royal Feast Caterers", tagline: "A feast worthy of your celebration",
    city: "Delhi", state: "Delhi",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.8, reviewCount: 284, verified: true, featured: true,
    yearsActive: 16, responseTime: "< 2 hours",
    basePrice: 1400, priceUnit: "per plate",
    tags: ["Multi-cuisine", "Live Counters", "Royal Thali", "Hygienic"],
    highlights: ["500+ weddings catered", "Personal chef assigned", "Free tasting session"],
    insured: true, available: true,
    about: "Royal Feast Caterers is Delhi's most trusted wedding caterer with 16 years of experience. Specialising in lavish multi-cuisine spreads — from traditional Rajasthani thalis to contemporary continental buffets — every plate is crafted with love.",
    packages: [
      { id: "cpkg001", name: "Silver Thali", price: 1400, popular: false, features: ["North Indian veg menu", "6 live counters", "200+ items", "Service staff included", "Crockery provided"] },
      { id: "cpkg002", name: "Gold Feast", price: 2200, popular: true, features: ["Multi-cuisine veg + non-veg", "10 live counters", "300+ items", "Senior service staff", "Premium crockery & linens", "Dedicated event manager", "Free tasting session"] },
      { id: "cpkg003", name: "Royal Banquet", price: 3500, popular: false, features: ["Unlimited cuisine stations", "Celebrity chef on request", "International menu options", "Full butler service", "Premium décor elements", "Post-event cleanup"] },
    ],
    reviews: [
      { id: "cvr001", name: "Sneha & Vikram Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop", rating: 5, date: "February 2024", title: "Food was the highlight of our wedding", body: "Guests are still talking about the food. The live chaat counter was a massive hit and the biryani was extraordinary. Royal Feast delivered perfection." },
    ],
  },
  {
    id: "vd004", category: "Caterer", slug: "spice-symphony",
    name: "Spice Symphony", tagline: "Where every bite tells a story",
    city: "Mumbai", state: "Maharashtra",
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.7, reviewCount: 178, verified: true, featured: false,
    yearsActive: 11, responseTime: "Same day",
    basePrice: 1800, priceUnit: "per plate",
    tags: ["Fusion Cuisine", "Vegan Options", "Live Counters", "Certified"],
    highlights: ["Allergen-aware menus", "Vegan & Jain options", "Michelin-trained chefs"],
    insured: true, available: true,
    about: "Spice Symphony brings Michelin-trained expertise to Indian wedding catering. Known for innovative fusion menus that honour traditional flavours while incorporating global techniques.",
    packages: [
      { id: "cpkg004", name: "Harmony", price: 1800, popular: false, features: ["Fusion veg menu", "8 live counters", "250+ items"] },
      { id: "cpkg005", name: "Symphony", price: 2800, popular: true, features: ["Full fusion + traditional", "12 stations", "350+ items", "Chef interaction station", "Craft cocktails (mock)"] },
    ],
    reviews: [
      { id: "cvr002", name: "Aisha & Rohan Kapoor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop", rating: 5, date: "April 2024", title: "Exceptional fusion catering", body: "The pani puri shots and sushi-inspired appetisers were a revelation. A perfect blend of Indian tradition and global sophistication." },
    ],
  },
  // ── DJs ──────────────────────────────────────────────────────────────────
  {
    id: "vd005", category: "DJ", slug: "dj-rhythm-nation",
    name: "DJ Rhythm Nation", tagline: "The beat of your forever",
    city: "Mumbai", state: "Maharashtra",
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.9, reviewCount: 221, verified: true, featured: true,
    yearsActive: 8, responseTime: "< 1 hour",
    basePrice: 45000, priceUnit: "per event",
    tags: ["Bollywood", "EDM", "Retro", "Live Sound"],
    highlights: ["JBL professional sound", "Custom playlist per couple", "LED dance floor setup"],
    insured: false, available: true,
    about: "DJ Rhythm Nation is India's most sought-after wedding DJ collective, known for reading crowds and curating journeys that keep dance floors alive from the first dhol beat to the last slow dance.",
    packages: [
      { id: "djpkg001", name: "Grooves", price: 45000, popular: false, features: ["6 hrs DJ performance", "JBL sound system", "Basic lighting", "Custom playlist consultation"] },
      { id: "djpkg002", name: "Party Starter", price: 75000, popular: true, features: ["8 hrs performance", "Premium JBL sound", "LED uplighting", "Fog machine", "Custom playlist", "MC services", "LED dance floor"] },
      { id: "djpkg003", name: "Festival", price: 120000, popular: false, features: ["All-night DJ", "Concert-grade sound", "Full LED production", "Laser show", "Live dhol integration", "2 DJs tag-team"] },
    ],
    reviews: [
      { id: "djvr001", name: "Pooja & Nikhil Mehta", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop", rating: 5, date: "January 2024", title: "The party never stopped!", body: "DJ Ravi read our crowd perfectly. He mixed everything from Kishore Kumar to current EDM seamlessly. Everyone was on the floor till midnight." },
    ],
  },
  // ── Makeup Artists ───────────────────────────────────────────────────────
  {
    id: "vd006", category: "Makeup Artist", slug: "glam-by-prerna",
    name: "Glam by Prerna", tagline: "Your most beautiful self, on your most beautiful day",
    city: "Delhi", state: "Delhi",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 5.0, reviewCount: 312, verified: true, featured: true,
    yearsActive: 10, responseTime: "< 1 hour",
    basePrice: 35000, priceUnit: "bridal package",
    tags: ["Airbrush", "HD Makeup", "Traditional", "Skin Care"],
    highlights: ["100% skin-safe products", "Trial session included", "Celebrity clientele"],
    insured: false, available: true,
    about: "Prerna Sharma is one of India's most celebrated bridal makeup artists, with a decade of experience transforming brides using international techniques and luxury products. Her work has been featured in Vogue India and Brides Today.",
    packages: [
      { id: "mpkg001", name: "Radiance", price: 35000, popular: false, features: ["Bridal HD makeup", "Saree draping", "Trial session", "Touch-up kit"] },
      { id: "mpkg002", name: "Luminous", price: 55000, popular: true, features: ["Airbrush bridal makeup", "Hair styling", "Saree draping", "Bindi & jewellery setting", "1 function makeup", "Trial + main day"] },
      { id: "mpkg003", name: "Royal Bride", price: 90000, popular: false, features: ["3-function makeup (Mehendi, Sangeet, Wedding)", "Airbrush + HD", "Hair extensions styling", "Bridal skincare session", "On-call touch-ups", "Post-wedding look"] },
    ],
    reviews: [
      { id: "mvr001", name: "Meera & Arjun Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop", rating: 5, date: "March 2024", title: "I felt like a goddess", body: "Prerna listened to exactly what I wanted and delivered something beyond my imagination. My skin looked flawless 8 hours into the wedding. Absolutely worth it." },
    ],
  },
  // ── Wedding Planners ─────────────────────────────────────────────────────
  {
    id: "vd007", category: "Wedding Planner", slug: "forever-events",
    name: "Forever Events", tagline: "Every detail, perfectly placed",
    city: "Mumbai", state: "Maharashtra",
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.9, reviewCount: 168, verified: true, featured: true,
    yearsActive: 12, responseTime: "< 30 minutes",
    basePrice: 250000, priceUnit: "per wedding",
    tags: ["Full Planning", "Destination Weddings", "Budget Management", "Vendor Coordination"],
    highlights: ["Destination wedding specialists", "Dedicated planning team", "100+ vendor network"],
    insured: true, available: true,
    about: "Forever Events is India's most trusted luxury wedding planning company. Our dedicated team of planners handles every detail — from venue scouting to vendor coordination to day-of management — so you can be fully present in every beautiful moment.",
    packages: [
      { id: "wpkg001", name: "Day Coordination", price: 250000, popular: false, features: ["Day-of coordination", "Vendor liaison", "Timeline management", "Emergency support"] },
      { id: "wpkg002", name: "Partial Planning", price: 450000, popular: false, features: ["Vendor recommendations & booking", "Budget tracking", "3-month planning support", "Day-of coordination", "Guest management"] },
      { id: "wpkg003", name: "Full Planning", price: 800000, popular: true, features: ["End-to-end wedding management", "Venue scouting", "All vendor sourcing & negotiation", "Budget management", "Guest experience design", "Décor conceptualisation", "Unlimited consultations", "Post-wedding cleanup"] },
    ],
    reviews: [
      { id: "wvr001", name: "Riya & Sameer Gupta", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop", rating: 5, date: "February 2024", title: "Worth every single rupee", body: "We were planning from London and the Forever Events team made it feel like we were there. They handled everything flawlessly. We showed up and just enjoyed our wedding." },
    ],
  },
  {
    id: "vd008", category: "Wedding Planner", slug: "shaadi-by-design",
    name: "Shaadi by Design", tagline: "Your vision, our execution",
    city: "Bangalore", state: "Karnataka",
    coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85&auto=format&fit=crop",
    logo: "", images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=85&auto=format&fit=crop",
    ],
    rating: 4.7, reviewCount: 124, verified: true, featured: false,
    yearsActive: 7, responseTime: "< 2 hours",
    basePrice: 180000, priceUnit: "per wedding",
    tags: ["South Indian Weddings", "Destination", "Budget Planning"],
    highlights: ["South Indian ritual specialists", "Bangalore vendor network", "Digital planning tools"],
    insured: false, available: true,
    about: "Shaadi by Design specialises in South Indian wedding planning with deep expertise in Tamil, Telugu, Kannada and Kerala wedding traditions, while delivering a modern planning experience.",
    packages: [
      { id: "wpkg004", name: "Coordination", price: 180000, popular: false, features: ["Day-of coordination", "Vendor liaison", "Timeline"] },
      { id: "wpkg005", name: "Complete", price: 380000, popular: true, features: ["Full planning", "Vendor sourcing", "Budget management", "Guest coordination", "Day-of management"] },
    ],
    reviews: [
      { id: "wvr002", name: "Kavya & Siddharth Rajan", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop", rating: 5, date: "April 2024", title: "Perfect understanding of our traditions", body: "They knew every ritual and coordinated the pandits, family and vendors perfectly. Our Muhurtham was on time to the minute!" },
    ],
  },
];

const CATEGORIES = ["All", "Decorator", "Caterer", "DJ", "Makeup Artist", "Wedding Planner"];

export const vendorService = {
  getAll: ({ category, city, priceMax, sort } = {}) => {
    let results = [...VENDORS];
    if (category && category !== "All")
      results = results.filter(v => v.category === category);
    if (city && city !== "all")
      results = results.filter(v => v.city.toLowerCase() === city.toLowerCase());
    if (priceMax)
      results = results.filter(v => v.basePrice <= Number(priceMax));
    switch (sort) {
      case "price_asc":  results.sort((a, b) => a.basePrice - b.basePrice); break;
      case "price_desc": results.sort((a, b) => b.basePrice - a.basePrice); break;
      case "rating":     results.sort((a, b) => b.rating - a.rating);       break;
      default:           results.sort((a, b) => b.featured - a.featured);   break;
    }
    return results;
  },
  getById:    (id)  => VENDORS.find(v => v.id === id || v.slug === id) || null,
  getSimilar: (id)  => {
    const v = VENDORS.find(x => x.id === id || x.slug === id);
    if (!v) return [];
    return VENDORS.filter(x => x.id !== id && x.category === v.category).slice(0, 3);
  },
  getCategories: () => CATEGORIES,
  getCities:     () => [...new Set(VENDORS.map(v => v.city))],
};