export const DEFAULT_CHECKLIST = [
  // ── 12+ months before ───────────────────────────────────────────────────
  { id: "c001", task: "Set total wedding budget",           category: "Planning",     priority: "High",   due: "12+ months",  done: true  },
  { id: "c002", task: "Finalise wedding date",              category: "Planning",     priority: "High",   due: "12+ months",  done: true  },
  { id: "c003", task: "Create guest list (first draft)",    category: "Guests",       priority: "High",   due: "12+ months",  done: true  },
  // ── 9–12 months ─────────────────────────────────────────────────────────
  { id: "c004", task: "Book wedding venue",                 category: "Venue",        priority: "High",   due: "9–12 months", done: true  },
  { id: "c005", task: "Book photographer & videographer",   category: "Photography",  priority: "High",   due: "9–12 months", done: true  },
  { id: "c006", task: "Hire wedding planner",               category: "Planning",     priority: "Medium", due: "9–12 months", done: false },
  // ── 6–9 months ──────────────────────────────────────────────────────────
  { id: "c007", task: "Book caterer",                       category: "Catering",     priority: "High",   due: "6–9 months",  done: false },
  { id: "c008", task: "Book decorator",                     category: "Decoration",   priority: "High",   due: "6–9 months",  done: false },
  { id: "c009", task: "Choose & book DJ / live band",       category: "Music",        priority: "Medium", due: "6–9 months",  done: false },
  { id: "c010", task: "Order bridal lehenga",               category: "Attire",       priority: "High",   due: "6–9 months",  done: false },
  { id: "c011", task: "Order groom's sherwani",             category: "Attire",       priority: "High",   due: "6–9 months",  done: false },
  // ── 3–6 months ──────────────────────────────────────────────────────────
  { id: "c012", task: "Send wedding invitations",           category: "Guests",       priority: "High",   due: "3–6 months",  done: false },
  { id: "c013", task: "Book bridal makeup artist",          category: "Makeup",       priority: "High",   due: "3–6 months",  done: false },
  { id: "c014", task: "Plan honeymoon destination",         category: "Honeymoon",    priority: "Medium", due: "3–6 months",  done: false },
  { id: "c015", task: "Book honeymoon travel & hotel",      category: "Honeymoon",    priority: "Medium", due: "3–6 months",  done: false },
  // ── 1–3 months ──────────────────────────────────────────────────────────
  { id: "c016", task: "Confirm final guest count with venue", category: "Guests",     priority: "High",   due: "1–3 months",  done: false },
  { id: "c017", task: "Bridal makeup trial session",        category: "Makeup",       priority: "Medium", due: "1–3 months",  done: false },
  { id: "c018", task: "Confirm menu with caterer",          category: "Catering",     priority: "High",   due: "1–3 months",  done: false },
  { id: "c019", task: "Arrange bridal car",                 category: "Transport",    priority: "Low",    due: "1–3 months",  done: false },
  { id: "c020", task: "Prepare wedding day timeline",       category: "Planning",     priority: "High",   due: "1–3 months",  done: false },
  // ── 1 month before ──────────────────────────────────────────────────────
  { id: "c021", task: "Confirm all vendor bookings",        category: "Planning",     priority: "High",   due: "1 month",     done: false },
  { id: "c022", task: "Prepare gift list & return gifts",   category: "Gifts",        priority: "Low",    due: "1 month",     done: false },
  { id: "c023", task: "Final dress fitting",                category: "Attire",       priority: "High",   due: "1 month",     done: false },
  { id: "c024", task: "Plan seating arrangement",           category: "Guests",       priority: "Medium", due: "1 month",     done: false },
];

export const CHECKLIST_CATEGORIES = [
  "All", "Planning", "Venue", "Photography", "Catering",
  "Decoration", "Music", "Attire", "Guests", "Makeup",
  "Honeymoon", "Transport", "Gifts",
];

export const PRIORITY_COLORS = {
  High:   { bg: "bg-maroon/8",  text: "text-maroon",    border: "border-maroon/15"  },
  Medium: { bg: "bg-gold/8",    text: "text-gold-dark",  border: "border-gold/15"    },
  Low:    { bg: "bg-muted/8",   text: "text-muted",      border: "border-muted/15"   },
};