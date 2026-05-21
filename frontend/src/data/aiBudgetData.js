// ── Mock AI recommendation engine ────────────────────────────────────────────

export const WEDDING_STYLES = [
  { value: "royal",       label: "Royal",       emoji: "👑" },
  { value: "traditional", label: "Traditional", emoji: "🪔" },
  { value: "modern",      label: "Modern",      emoji: "✨" },
  { value: "destination", label: "Destination", emoji: "🌴" },
  { value: "luxury",      label: "Luxury",      emoji: "💎" },
];

export const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Jaipur", "Udaipur", "Kolkata", "Pune", "Ahmedabad",
  "Goa", "Chandigarh", "Lucknow", "Kochi", "Agra",
];

// Category metadata
export const CATEGORY_META = {
  venue: {
    label:       "Venue",
    icon:        "🏛️",
    color:       "#6B0F1A",
    lightColor:  "rgba(107,15,26,0.08)",
    borderColor: "border-maroon/15",
    description: "Banquet hall, palace, farmhouse or hotel",
  },
  photography: {
    label:       "Photography & Video",
    icon:        "📷",
    color:       "#C9A84C",
    lightColor:  "rgba(201,168,76,0.10)",
    borderColor: "border-gold/20",
    description: "Photographer, videographer & drone coverage",
  },
  catering: {
    label:       "Catering",
    icon:        "🍽️",
    color:       "#8B1A28",
    lightColor:  "rgba(139,26,40,0.08)",
    borderColor: "border-maroon/10",
    description: "Food, beverages & service staff",
  },
  decoration: {
    label:       "Decoration",
    icon:        "🌸",
    color:       "#A8872D",
    lightColor:  "rgba(168,135,45,0.10)",
    borderColor: "border-gold/15",
    description: "Floral, lighting, mandap & stage décor",
  },
  music: {
    label:       "DJ / Music",
    icon:        "🎵",
    color:       "#4A0A12",
    lightColor:  "rgba(74,10,18,0.07)",
    borderColor: "border-maroon/10",
    description: "DJ, live band & sound system",
  },
  makeup: {
    label:       "Bridal Makeup",
    icon:        "💄",
    color:       "#6B0F1A",
    lightColor:  "rgba(107,15,26,0.06)",
    borderColor: "border-maroon/10",
    description: "Bridal makeup, hair & styling",
  },
  attire: {
    label:       "Attire",
    icon:        "👗",
    color:       "#C9A84C",
    lightColor:  "rgba(201,168,76,0.08)",
    borderColor: "border-gold/15",
    description: "Bridal lehenga, groom sherwani & family",
  },
  miscellaneous: {
    label:       "Miscellaneous",
    icon:        "✨",
    color:       "#7A7065",
    lightColor:  "rgba(122,112,101,0.08)",
    borderColor: "border-cream",
    description: "Invitations, gifts, transport & other",
  },
};

// ── Allocation percentages by wedding style ───────────────────────────────────
const STYLE_ALLOCATIONS = {
  royal: {
    venue: 38, photography: 10, catering: 22,
    decoration: 14, music: 5, makeup: 4, attire: 4, miscellaneous: 3,
  },
  traditional: {
    venue: 30, photography: 9, catering: 28,
    decoration: 12, music: 5, makeup: 5, attire: 7, miscellaneous: 4,
  },
  modern: {
    venue: 28, photography: 14, catering: 24,
    decoration: 12, music: 8, makeup: 5, attire: 5, miscellaneous: 4,
  },
  destination: {
    venue: 32, photography: 12, catering: 20,
    decoration: 13, music: 6, makeup: 5, attire: 6, miscellaneous: 6,
  },
  luxury: {
    venue: 35, photography: 12, catering: 20,
    decoration: 16, music: 5, makeup: 4, attire: 5, miscellaneous: 3,
  },
};

// ── City cost multipliers ─────────────────────────────────────────────────────
const CITY_MULTIPLIERS = {
  Mumbai: 1.35, Delhi: 1.25, Bangalore: 1.15, Chennai: 1.05,
  Hyderabad: 1.00, Jaipur: 1.10, Udaipur: 1.20, Kolkata: 0.95,
  Pune: 1.10, Ahmedabad: 0.95, Goa: 1.30, Chandigarh: 1.00,
  Lucknow: 0.90, Kochi: 1.00, Agra: 1.05,
};

// ── AI Suggestions by style ───────────────────────────────────────────────────
export const AI_SUGGESTIONS = {
  royal: [
    { icon: "🏛️", tip: "Book palace venues 8–10 months in advance to secure the best rates and dates." },
    { icon: "💡", tip: "Consider a weekday or Sunday wedding at a palace to reduce rental cost by 15–20%." },
    { icon: "📷", tip: "Invest in a second photographer for the baraat — royal ceremonies have too many key moments for one lens." },
    { icon: "🎨", tip: "Negotiate a full-venue décor package rather than individual elements to save 10–12%." },
    { icon: "🍽️", tip: "A plated dinner for 200 guests costs less per head than a buffet — consider this for the main reception." },
  ],
  traditional: [
    { icon: "🪔", tip: "Hire a pandit directly rather than through the venue — you can save ₹20,000–₹40,000." },
    { icon: "💡", tip: "Combine Mehendi and Sangeet into one evening to reduce décor and catering costs." },
    { icon: "📷", tip: "Allocate slightly more to photography — traditional ceremonies have irreplaceable ritual moments." },
    { icon: "🌸", tip: "Use seasonal flowers for décor — marigold and rose mandaps cost 30% less in winter months." },
    { icon: "🍽️", tip: "A traditional thali setup is budget-friendly and culturally authentic for large guest counts." },
  ],
  modern: [
    { icon: "✨", tip: "Invest in a premium DJ — modern weddings live on the dance floor; don't compromise on music." },
    { icon: "📷", tip: "Prioritise a videographer for a modern wedding — a cinematic reel is your biggest keepsake." },
    { icon: "💡", tip: "Minimalist décor is on trend and costs 20–25% less than traditional floral setups." },
    { icon: "🎨", tip: "Consider a cocktail-style reception — it reduces catering cost while feeling ultra-premium." },
    { icon: "🏛️", tip: "Rooftop and industrial loft venues are more affordable than ballrooms and very photogenic." },
  ],
  destination: [
    { icon: "🌴", tip: "Book your venue, stay and catering as a package — destination resorts offer significant bundles." },
    { icon: "💡", tip: "Keep your guest list tight for a destination wedding — travel and accommodation costs add up." },
    { icon: "📷", tip: "A destination wedding warrants drone footage — it elevates your film to cinematic quality." },
    { icon: "🍽️", tip: "Local catering at the destination is usually more cost-effective than bringing your own vendor." },
    { icon: "✈️", tip: "Book flights and accommodation blocks 6+ months out for significant group travel savings." },
  ],
  luxury: [
    { icon: "💎", tip: "Invest in a full-service wedding planner — for luxury budgets, they typically save more than they cost." },
    { icon: "📷", tip: "Commission a luxury photography house with a dedicated film team for a 20+ minute cinematic feature." },
    { icon: "🌸", tip: "Consider imported florals for key installations — Dutch roses and orchids create instant opulence." },
    { icon: "🍽️", tip: "A celebrity chef takeover for one course creates an unforgettable dining moment worth the premium." },
    { icon: "✨", tip: "Pyrotechnics and cold spark fountains are legal indoor alternatives to fireworks and incredibly impactful." },
  ],
};

// ── Main AI budget generator ──────────────────────────────────────────────────
export function generateAIBudget({ totalBudget, guestCount, city, style }) {
  const allocations  = STYLE_ALLOCATIONS[style] || STYLE_ALLOCATIONS.modern;
  const multiplier   = CITY_MULTIPLIERS[city]   || 1.0;
  const suggestions  = AI_SUGGESTIONS[style]    || AI_SUGGESTIONS.modern;

  const breakdown = Object.entries(allocations).map(([key, pct]) => {
    const base    = Math.round((totalBudget * pct) / 100);
    const adjusted = Math.round(base * (key === "venue" || key === "catering" ? multiplier : 1));
    return {
      id:          key,
      ...CATEGORY_META[key],
      percentage:  pct,
      amount:      adjusted,
    };
  });

  // Recalculate to ensure it sums to totalBudget exactly
  const currentSum = breakdown.reduce((s, c) => s + c.amount, 0);
  const diff       = totalBudget - currentSum;
  breakdown[breakdown.length - 1].amount += diff;

  // Per-plate estimate
  const cateringItem  = breakdown.find(b => b.id === "catering");
  const perPlate      = guestCount > 0 ? Math.round(cateringItem.amount / guestCount) : 0;

  return {
    breakdown,
    suggestions,
    summary: {
      totalBudget,
      guestCount,
      city,
      style,
      multiplier,
      perPlate,
      estimatedPerGuest: Math.round(totalBudget / guestCount),
    },
  };
}