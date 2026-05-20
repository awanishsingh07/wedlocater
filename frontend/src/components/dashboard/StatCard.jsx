import { motion } from "framer-motion";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";

/*
  Props: label, value, sub, icon, trend (+N% / -N%), trendUp, accent ("gold"|"maroon"|"default")
*/
export default function StatCard({
  label    = "Total Bookings",
  value    = "0",
  sub      = "",
  icon: Icon,
  trend    = "",
  trendUp  = true,
  accent   = "default",
  delay    = 0,
}) {
  const accentMap = {
    gold:    "from-gold/10 to-gold/5   border-gold/20",
    maroon:  "from-maroon/10 to-maroon/5 border-maroon/15",
    default: "from-cream to-white      border-cream",
  };
  const iconMap = {
    gold:    "bg-gold/15 text-gold-dark",
    maroon:  "bg-maroon/10 text-maroon",
    default: "bg-cream text-muted",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative bg-gradient-to-br ${accentMap[accent]}
                  border rounded-luxury p-5 shadow-luxury
                  hover:shadow-luxury-md hover:-translate-y-0.5
                  transition-all duration-300 overflow-hidden group`}
    >
      {/* Decorative circle */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full
                      bg-current opacity-[0.04] pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-body text-xs text-muted uppercase tracking-widest mb-2">
            {label}
          </p>
          <p className="font-heading text-3xl font-semibold text-dark leading-none mb-1">
            {value}
          </p>
          {sub && (
            <p className="font-body text-xs text-muted mt-1 truncate">{sub}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2
                            ${trendUp ? "text-emerald-600" : "text-red-500"}`}>
              {trendUp ? <RiArrowUpLine size={13} /> : <RiArrowDownLine size={13} />}
              <span className="text-xs font-body font-medium">{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                          ${iconMap[accent]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
}