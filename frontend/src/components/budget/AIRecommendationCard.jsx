import { motion } from "framer-motion";

const FMT = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

export default function AIRecommendationCard({
  item,
  totalBudget,
  index       = 0,
  highlighted = false,
}) {
  if (!item) return null;

  const pct = Math.round((item.amount / totalBudget) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay:    index * 0.08 + 0.2,
        ease:     [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative flex flex-col gap-3.5 p-5 rounded-luxury border
                  shadow-luxury hover:shadow-luxury-md transition-shadow duration-300
                  overflow-hidden
                  ${highlighted
                    ? "bg-maroon-gradient border-maroon/20"
                    : "bg-white border-cream"
                  }`}
    >
      {/* Decorative background circle */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 pointer-events-none"
        style={{ background: item.color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: highlighted ? "rgba(255,255,255,0.12)" : item.lightColor }}
          >
            {item.icon}
          </div>
          <div>
            <h3 className={`font-heading text-base font-semibold leading-snug
                            ${highlighted ? "text-ivory" : "text-dark"}`}>
              {item.label}
            </h3>
            <p className={`font-body text-[10px] leading-snug
                           ${highlighted ? "text-ivory/55" : "text-muted"}`}>
              {item.description}
            </p>
          </div>
        </div>

        {/* Percentage badge */}
        <span
          className="text-[11px] font-body font-bold px-2.5 py-1 rounded-full shrink-0"
          style={{
            background: highlighted ? "rgba(255,255,255,0.15)" : item.lightColor,
            color:      highlighted ? "#E2C97E" : item.color,
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-baseline gap-1.5">
        <span className={`font-heading text-3xl font-semibold leading-none
                          ${highlighted ? "text-gold" : "text-maroon"}`}>
          {FMT(item.amount)}
        </span>
        <span className={`font-body text-xs ${highlighted ? "text-ivory/50" : "text-muted"}`}>
          allocated
        </span>
      </div>

      {/* Progress bar */}
      <div className={`h-1.5 rounded-full overflow-hidden
                       ${highlighted ? "bg-white/15" : "bg-cream"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: index * 0.08 + 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: highlighted
              ? "linear-gradient(90deg, #C9A84C, #E2C97E)"
              : `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
          }}
        />
      </div>

      {/* Footer note */}
      <p className={`font-body text-[10px] ${highlighted ? "text-ivory/45" : "text-muted/70"}`}>
        {pct}% of total budget · {FMT(item.amount)}
      </p>
    </motion.div>
  );
}