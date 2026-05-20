import { motion } from "framer-motion";

const FMT = (n) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;

export default function BudgetChart({ categories = [], totalBudget = 0 }) {
  const totalSpent     = categories.reduce((s, c) => s + c.spent, 0);
  const totalAllocated = categories.reduce((s, c) => s + c.allocated, 0);
  const remaining      = totalBudget - totalSpent;
  const unallocated    = totalBudget - totalAllocated;
  const spentPct       = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Build donut segments
  const segments = categories.filter(c => c.allocated > 0).map(c => ({
    label:     c.label,
    value:     c.allocated,
    color:     c.color,
    icon:      c.icon,
    pct:       Math.round((c.allocated / totalBudget) * 100),
  }));
  if (unallocated > 0) {
    segments.push({ label: "Unallocated", value: unallocated, color: "#E2C97E", icon: "⬜", pct: Math.round((unallocated / totalBudget) * 100) });
  }

  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;

  const buildArc = (pct, offset) => {
    const r = 15.9155;
    const circumference = 2 * Math.PI * r;
    const dashArray = `${(pct / 100) * circumference} ${circumference}`;
    const dashOffset = -((offset / 100) * circumference);
    return { dashArray, dashOffset };
  };

  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
      <p className="label-gold mb-5">Budget Allocation</p>

      <div className="flex flex-col items-center gap-6">
        {/* SVG Donut */}
        <div className="relative shrink-0" style={{ width: 200, height: 200 }}>
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {/* Background track */}
            <circle cx="18" cy="18" r="15.9155" fill="none"
              stroke="#F5EFE4" strokeWidth="3.5" />

            {/* Segments */}
            {segments.map((seg, i) => {
              const offset = cumulative;
              const arc    = buildArc(seg.pct, offset);
              cumulative  += seg.pct;
              return (
                <motion.circle
                  key={seg.label}
                  cx="18" cy="18" r="15.9155"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="3.5"
                  strokeDasharray={arc.dashArray}
                  strokeDashoffset={arc.dashOffset}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${2 * Math.PI * 15.9155}` }}
                  animate={{ strokeDasharray: arc.dashArray }}
                  transition={{ duration: 0.8, delay: i * 0.08 + 0.3, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {/* Centre text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-2xl font-semibold text-dark leading-none">
              {spentPct}%
            </span>
            <span className="font-body text-[10px] text-muted mt-0.5">spent</span>
            <span className="font-heading text-sm font-semibold text-maroon mt-1">
              {FMT(totalSpent)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full flex flex-col gap-2">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.4 }}
              className="flex items-center justify-between gap-2 py-1.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: seg.color }} />
                <span className="font-body text-xs text-dark truncate">{seg.icon} {seg.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-body text-xs text-muted">{seg.pct}%</span>
                <span className="font-body text-xs font-semibold text-dark">
                  {FMT(seg.value)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-cream">
        {[
          { label: "Total Budget",  value: FMT(totalBudget),  color: "text-dark"          },
          { label: "Total Spent",   value: FMT(totalSpent),   color: "text-maroon"        },
          { label: "Remaining",     value: FMT(remaining),    color: remaining < 0 ? "text-red-500" : "text-emerald-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center p-3 bg-cream/50 rounded-xl border border-cream">
            <p className="font-body text-[9px] text-muted uppercase tracking-widest mb-1">{label}</p>
            <p className={`font-heading text-base font-semibold ${color}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}