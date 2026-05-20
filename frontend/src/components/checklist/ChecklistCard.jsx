import { motion } from "framer-motion";

export default function ChecklistCard({ label, count, icon, color = "gold", delay = 0 }) {
  const colorMap = {
    gold:    "from-gold/10 to-gold/5   border-gold/20   text-gold-dark",
    maroon:  "from-maroon/10 to-maroon/5 border-maroon/15 text-maroon",
    green:   "from-emerald-50 to-emerald-50/50 border-emerald-200 text-emerald-700",
    amber:   "from-amber-50 to-amber-50/50   border-amber-200   text-amber-700",
  };
  const cls = colorMap[color] || colorMap.gold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`bg-gradient-to-br ${cls} border rounded-luxury p-4 flex items-center gap-3`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-heading text-2xl font-semibold leading-none">{count}</p>
        <p className="font-body text-xs text-muted mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}