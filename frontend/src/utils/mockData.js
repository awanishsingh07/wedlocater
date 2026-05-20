// ── Shared helpers ───────────────────────────────────────
export const MOCK_USER = {
  name:   "Priya & Rahul Sharma",
  email:  "priya.rahul@example.com",
  phone:  "+91 98765 43210",
  city:   "Mumbai",
  avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80&auto=format&fit=crop",
  weddingDate: "2025-02-14",
  guestCount:  "300–500",
  budgetTotal: 2500000,
  budgetSpent: 1340000,
  plan: "Premium",
};

export const MOCK_VENDOR_USER = {
  name:     "Royal Feast Caterers",
  category: "Caterer",
  email:    "info@royalfeast.com",
  phone:    "+91 91234 56789",
  city:     "Delhi",
  avatar:   "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&q=80&auto=format&fit=crop",
  rating:   4.8,
  reviews:  184,
  verified: true,
  plan:     "Business Pro",
};

export const MOCK_ADMIN = {
  name:   "Aditya Kumar",
  role:   "Super Admin",
  email:  "admin@wedlocater.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
};

// ── User dashboard ───────────────────────────────────────
export const USER_BOOKINGS = [
  {
    id: "B001", vendor: "The Grand Mahal Palace", category: "Venue",
    date: "14 Feb 2025", amount: 850000, status: "Confirmed",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "B002", vendor: "Arjun Mehta Photography", category: "Photography",
    date: "14 Feb 2025", amount: 120000, status: "Confirmed",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "B003", vendor: "Blooms & Bows Decor", category: "Decoration",
    date: "13 Feb 2025", amount: 220000, status: "Pending",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&auto=format&fit=crop",
  },
  {
    id: "B004", vendor: "Spice Symphony Caterers", category: "Catering",
    date: "14 Feb 2025", amount: 150000, status: "Negotiating",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80&auto=format&fit=crop",
  },
];

export const USER_CHECKLIST = [
  { id: 1,  task: "Book venue",              done: true,  due: "Done"       },
  { id: 2,  task: "Finalise photographer",   done: true,  due: "Done"       },
  { id: 3,  task: "Send invitations",        done: false, due: "1 Dec 2024" },
  { id: 4,  task: "Book caterer",            done: false, due: "15 Nov 2024" },
  { id: 5,  task: "Choose bridal makeup",    done: false, due: "20 Nov 2024" },
  { id: 6,  task: "Arrange bridal car",      done: false, due: "10 Jan 2025" },
  { id: 7,  task: "Book DJ / entertainment", done: false, due: "5 Jan 2025"  },
  { id: 8,  task: "Finalise honeymoon plan", done: false, due: "1 Feb 2025"  },
];

export const USER_BUDGET_BREAKDOWN = [
  { category: "Venue",        allocated: 900000,  spent: 850000  },
  { category: "Photography",  allocated: 150000,  spent: 120000  },
  { category: "Decoration",   allocated: 250000,  spent: 220000  },
  { category: "Catering",     allocated: 600000,  spent: 150000  },
  { category: "Attire",       allocated: 200000,  spent: 0       },
  { category: "Miscellaneous",allocated: 400000,  spent: 0       },
];

export const USER_ACTIVITY = [
  { id: 1, action: "Booking confirmed",    detail: "Grand Mahal Palace",       time: "2 hrs ago",  icon: "✅" },
  { id: 2, action: "Quote received",       detail: "Spice Symphony Caterers",  time: "5 hrs ago",  icon: "📩" },
  { id: 3, action: "Vendor shortlisted",   detail: "Blooms & Bows Decor",      time: "Yesterday",  icon: "❤️" },
  { id: 4, action: "AI suggestion ready",  detail: "3 new photographer picks", time: "2 days ago", icon: "🤖" },
];

// ── Vendor dashboard ─────────────────────────────────────
export const VENDOR_BOOKINGS = [
  {
    id: "V001", client: "Priya & Rahul Sharma", event: "Wedding Reception",
    date: "14 Feb 2025", guests: 400, amount: 480000, status: "Confirmed",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop",
  },
  {
    id: "V002", client: "Sneha & Vikram Nair",  event: "Wedding Ceremony",
    date: "20 Mar 2025", guests: 250, amount: 300000, status: "Pending",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop",
  },
  {
    id: "V003", client: "Aisha & Rohan Kapoor", event: "Sangeet Night",
    date: "5 Apr 2025",  guests: 180, amount: 216000, status: "Negotiating",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop",
  },
  {
    id: "V004", client: "Meera & Arjun Patel",  event: "Mehendi Ceremony",
    date: "12 Apr 2025", guests: 120, amount: 144000, status: "Confirmed",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop",
  },
];

export const VENDOR_EARNINGS = [
  { month: "Aug", amount: 280000 },
  { month: "Sep", amount: 420000 },
  { month: "Oct", amount: 380000 },
  { month: "Nov", amount: 610000 },
  { month: "Dec", amount: 540000 },
  { month: "Jan", amount: 720000 },
];

export const VENDOR_ACTIVITY = [
  { id: 1, action: "New enquiry",        detail: "Priya & Rahul – 400 guests",  time: "1 hr ago",   icon: "📩" },
  { id: 2, action: "Booking confirmed",  detail: "Meera & Arjun Patel",         time: "3 hrs ago",  icon: "✅" },
  { id: 3, action: "Review received",    detail: "5★ from Sneha & Vikram",      time: "Yesterday",  icon: "⭐" },
  { id: 4, action: "Profile featured",   detail: "WedLocater homepage",         time: "2 days ago", icon: "🏆" },
];

// ── Admin dashboard ──────────────────────────────────────
export const ADMIN_STATS = {
  totalUsers:    52840,
  totalVendors:  1284,
  totalBookings: 8920,
  totalRevenue:  48200000,
  newUsersToday: 124,
  pendingApprovals: 38,
};

export const ADMIN_RECENT_USERS = [
  { id: "U001", name: "Priya & Rahul Sharma",  city: "Mumbai",    plan: "Premium", joined: "2 hrs ago",  avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80&auto=format&fit=crop" },
  { id: "U002", name: "Sneha & Vikram Nair",   city: "Bangalore", plan: "Free",    joined: "5 hrs ago",  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop" },
  { id: "U003", name: "Aisha & Rohan Kapoor",  city: "Delhi",     plan: "Premium", joined: "Yesterday",  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop" },
  { id: "U004", name: "Meera & Arjun Patel",   city: "Jaipur",    plan: "Free",    joined: "2 days ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop" },
];

export const ADMIN_PENDING_VENDORS = [
  { id: "PV001", name: "Elegant Events Delhi",   category: "Decorator",   city: "Delhi",     submitted: "3 hrs ago"  },
  { id: "PV002", name: "Sound Bliss DJ Services",category: "DJ / Music",  city: "Mumbai",    submitted: "6 hrs ago"  },
  { id: "PV003", name: "Frame Perfect Studios",  category: "Photography", city: "Bangalore", submitted: "1 day ago"  },
  { id: "PV004", name: "Spice Route Caterers",   category: "Caterer",     city: "Chennai",   submitted: "2 days ago" },
];

export const ADMIN_REVENUE_DATA = [
  { month: "Jul", revenue: 3200000, bookings: 620 },
  { month: "Aug", revenue: 3800000, bookings: 740 },
  { month: "Sep", revenue: 4100000, bookings: 810 },
  { month: "Oct", revenue: 3600000, bookings: 690 },
  { month: "Nov", revenue: 5200000, bookings: 980 },
  { month: "Dec", revenue: 6800000, bookings: 1240 },
];

export const ADMIN_ACTIVITY = [
  { id: 1, action: "Vendor approved",    detail: "Arjun Mehta Photography",   time: "30 min ago", icon: "✅" },
  { id: 2, action: "Dispute raised",     detail: "Booking #B9821 – refund",   time: "1 hr ago",   icon: "⚠️" },
  { id: 3, action: "New vendor signup",  detail: "Sound Bliss DJ, Mumbai",    time: "2 hrs ago",  icon: "🆕" },
  { id: 4, action: "Revenue milestone",  detail: "₹5Cr crossed this month",   time: "Today",      icon: "🎉" },
];