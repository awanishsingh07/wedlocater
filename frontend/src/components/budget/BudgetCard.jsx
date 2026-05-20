import { useState } from "react";
import { motion } from "framer-motion";
import { RiEditLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import ProgressBar from "./ProgressBar";

const FMT = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;

export default function BudgetCard({ category, index = 0, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(category.allocated);

  const pct       = Math.min(100, Math.round((category.spent / category.allocated) * 100)) || 0;
  const remaining = category.allocated - category.spent;
  const isOver    = category.spent > category.allocated;

  const save = () => {
    onUpdate && onUpdate(category.id, { allocated: Number(draft) });
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white rounded-luxury border border-cream shadow-luxury
                 hover:shadow-luxury-md transition-all duration-300 p-5 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: category.lightColor }}>
            {category.icon}
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-dark leading-snug">
              {category.label}
            </h3>
            <p className="font-body text-[10px] text-muted">{category.description}</p>
          </div>
        </div>

        {/* Edit toggle */}
        {!editing ? (
          <button onClick={() => setEditing(true)}
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-muted hover:text-gold hover:bg-cream transition-all duration-200 shrink-0">
            <RiEditLine size={14} />
          </button>
        ) : (
          <div className="flex gap-1 shrink-0">
            <button onClick={save}
              className="w-7 h-7 rounded-lg flex items-center justify-center
                         bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all">
              <RiCheckLine size={14} />
            </button>
            <button onClick={() => { setEditing(false); setDraft(category.allocated); }}
              className="w-7 h-7 rounded-lg flex items-center justify-center
                         bg-red-50 text-red-400 hover:bg-red-100 transition-all">
              <RiCloseLine size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Budget input or display */}
      {editing ? (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-body text-sm">₹</span>
          <input
            type="number"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="input-luxury !pl-7 text-sm"
            min={0}
            autoFocus
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 bg-cream/50 rounded-xl border border-cream">
            <p className="font-body text-[9px] text-muted uppercase tracking-widest mb-0.5">Allocated</p>
            <p className="font-heading text-base font-semibold text-dark">{FMT(category.allocated)}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${
            isOver ? "bg-red-50 border-red-200" : "bg-cream/50 border-cream"
          }`}>
            <p className="font-body text-[9px] text-muted uppercase tracking-widest mb-0.5">Spent</p>
            <p className={`font-heading text-base font-semibold ${isOver ? "text-red-600" : "text-maroon"}`}>
              {FMT(category.spent)}
            </p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <ProgressBar value={category.spent} max={category.allocated} color={category.color}
        height="h-2" showLabel delay={index * 0.07 + 0.3} />

      {/* Remaining */}
      <div className="flex items-center justify-between text-xs font-body">
        <span className="text-muted">{pct}% used</span>
        <span className={`font-semibold ${isOver ? "text-red-500" : remaining === 0 ? "text-muted" : "text-emerald-600"}`}>
          {isOver ? `₹${Math.abs(remaining).toLocaleString("en-IN")} over` : `${FMT(remaining)} left`}
        </span>
      </div>
    </motion.div>
  );
}