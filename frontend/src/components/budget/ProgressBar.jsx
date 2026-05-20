import { motion } from "framer-motion";

export default function ProgressBar({
  value     = 0,
  max       = 100,
  color     = "#C9A84C",
  height    = "h-2",
  showLabel = false,
  delay     = 0,
  animate   = true,
}) {
  const pct = Math.min(100, Math.round((value / (max || 1)) * 100));
  const isOver = pct >= 90;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-[10px] font-body text-muted mb-1">
          <span>{pct}% used</span>
          <span className={isOver ? "text-red-500 font-semibold" : ""}>{pct >= 100 ? "Over budget!" : ""}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-cream rounded-full overflow-hidden`}>
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, delay, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: pct >= 100
                ? "linear-gradient(90deg, #dc2626, #ef4444)"
                : pct >= 80
                ? "linear-gradient(90deg, #C9A84C, #f59e0b)"
                : `linear-gradient(90deg, ${color}, ${color}cc)`,
            }}
          />
        ) : (
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
        )}
      </div>
    </div>
  );
}