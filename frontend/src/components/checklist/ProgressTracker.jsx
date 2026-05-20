import { motion } from "framer-motion";
import { RiCheckboxCircleLine, RiTimeLine } from "react-icons/ri";

export default function ProgressTracker({ total = 0, done = 0 }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const milestones = [25, 50, 75, 100];

  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="label-gold mb-1">Wedding Progress</p>
          <h2 className="font-heading text-display-sm text-dark">
            {done} of {total} tasks complete
          </h2>
        </div>
        <div className="flex flex-col items-center bg-maroon/5 border border-maroon/10
                        rounded-luxury px-5 py-3 shrink-0">
          <span className="font-heading text-4xl font-semibold text-maroon leading-none">
            {pct}%
          </span>
          <span className="font-body text-[10px] text-muted tracking-wide uppercase mt-0.5">
            Complete
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 bg-cream rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full bg-gold-gradient rounded-full relative"
        >
          {pct > 5 && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2
                            w-2 h-2 rounded-full bg-white/50" />
          )}
        </motion.div>

        {/* Milestone markers */}
        {milestones.map(m => (
          <div
            key={m}
            className={`absolute top-0 bottom-0 w-0.5 transition-colors duration-500
                        ${pct >= m ? "bg-white/40" : "bg-cream"}`}
            style={{ left: `${m}%` }}
          />
        ))}
      </div>

      {/* Milestone labels */}
      <div className="flex justify-between text-[9px] font-body text-muted mb-5">
        {milestones.map(m => (
          <span key={m} className={`transition-colors duration-300 ${pct >= m ? "text-gold font-semibold" : ""}`}>
            {m}%
          </span>
        ))}
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <RiCheckboxCircleLine size={18} className="text-emerald-600 shrink-0" />
          <div>
            <p className="font-heading text-lg font-semibold text-emerald-700 leading-none">{done}</p>
            <p className="font-body text-[10px] text-emerald-600 mt-0.5">Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-100">
          <RiTimeLine size={18} className="text-amber-600 shrink-0" />
          <div>
            <p className="font-heading text-lg font-semibold text-amber-700 leading-none">{total - done}</p>
            <p className="font-body text-[10px] text-amber-600 mt-0.5">Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}