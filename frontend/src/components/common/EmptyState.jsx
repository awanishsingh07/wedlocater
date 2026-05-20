import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PRESETS = {
  venues: {
    emoji: "🏛️",
    title: "No venues found",
    desc: "We couldn't find any venues matching your filters. Try adjusting your search or explore all venues.",
    cta: "Browse All Venues",
    to: "/venues",
  },
  photographers: {
    emoji: "📷",
    title: "No photographers found",
    desc: "No photographers match your criteria. Try a different style or city.",
    cta: "Browse All Photographers",
    to: "/photographers",
  },
  vendors: {
    emoji: "🎊",
    title: "No vendors found",
    desc: "No vendors match your search. Broaden your filters to discover more.",
    cta: "Browse All Vendors",
    to: "/vendors",
  },
  bookings: {
    emoji: "📅",
    title: "No bookings yet",
    desc: "You haven't made any bookings yet. Start planning your dream wedding today.",
    cta: "Explore Venues",
    to: "/venues",
  },
  guests: {
    emoji: "👥",
    title: "No guests added",
    desc: "Your guest list is empty. Start adding guests to track RSVPs and manage seating.",
    cta: null,
    to: null,
  },
  checklist: {
    emoji: "✅",
    title: "All tasks complete!",
    desc: "You've checked off every task. Your wedding planning is on track!",
    cta: null,
    to: null,
  },
  checklist_empty: {
    emoji: "📋",
    title: "No tasks found",
    desc: "No tasks match your current filter. Try switching to a different category.",
    cta: null,
    to: null,
  },
  budget: {
    emoji: "💰",
    title: "No expenses logged",
    desc: "Start tracking your wedding expenses by adding your first payment.",
    cta: null,
    to: null,
  },
  search: {
    emoji: "🔍",
    title: "No results found",
    desc: "We couldn't find what you're looking for. Try different keywords.",
    cta: null,
    to: null,
  },
  error: {
    emoji: "⚠️",
    title: "Something went wrong",
    desc: "We encountered an unexpected error. Please try again in a moment.",
    cta: "Try Again",
    to: null,
  },
};

export default function EmptyState({
  preset   = "search",
  title,
  desc,
  emoji,
  cta,
  to,
  onAction,
  className = "",
}) {
  const config = PRESETS[preset] || PRESETS.search;
  const _title = title || config.title;
  const _desc  = desc  || config.desc;
  const _emoji = emoji || config.emoji;
  const _cta   = cta   ?? config.cta;
  const _to    = to    ?? config.to;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col items-center justify-center text-center
                  px-6 py-16 sm:py-24 gap-5 ${className}`}
    >
      {/* Illustration placeholder */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl scale-150" />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full
                     bg-gradient-to-br from-cream to-white
                     border-2 border-gold/20 shadow-gold
                     flex items-center justify-center text-4xl sm:text-5xl"
        >
          {_emoji}
        </motion.div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-gold/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
        <div className="h-px w-8 bg-gold/30" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="font-heading text-display-sm text-dark">{_title}</h3>
        <p className="font-body text-sm text-muted leading-relaxed">{_desc}</p>
      </div>

      {/* CTA */}
      {_cta && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {_to ? (
            <Link to={_to} className="btn-primary !px-8">
              {_cta}
            </Link>
          ) : (
            <button onClick={onAction} className="btn-primary !px-8">
              {_cta}
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}