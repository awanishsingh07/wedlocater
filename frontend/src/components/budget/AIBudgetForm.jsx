import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiWalletLine, RiGroupLine, RiMapPinLine,
  RiSparklingLine, RiArrowRightLine,
} from "react-icons/ri";
import { WEDDING_STYLES, INDIAN_CITIES } from "../../data/aiBudgetData";
import { Spinner } from "../common/Loader";

const BUDGET_PRESETS = [
  { label: "₹5L",  value: 500000  },
  { label: "₹10L", value: 1000000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹25L", value: 2500000 },
  { label: "₹50L", value: 5000000 },
];

const GUEST_PRESETS = [
  { label: "50",   value: 50   },
  { label: "150",  value: 150  },
  { label: "300",  value: 300  },
  { label: "500",  value: 500  },
  { label: "1000", value: 1000 },
];

const FMT_BUDGET = (n) => {
  if (!n) return "";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function AIBudgetForm({ onGenerate, loading = false }) {
  const [form, setForm] = useState({
    totalBudget: 1000000,
    guestCount:  200,
    city:        "Mumbai",
    style:       "modern",
  });
  const [errors, setErrors] = useState({});

  const handle = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.totalBudget || form.totalBudget < 100000)
      errs.totalBudget = "Minimum budget is ₹1 Lakh";
    if (!form.guestCount || form.guestCount < 10)
      errs.guestCount = "Guest count must be at least 10";
    if (!form.city) errs.city = "Please select a city";
    if (!form.style) errs.style = "Please select a wedding style";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onGenerate(form);
  };

  const selectedStyle = WEDDING_STYLES.find(s => s.value === form.style);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-7">

        {/* ── Total Budget ── */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-xs font-semibold text-dark/70 uppercase tracking-widest">
            Total Wedding Budget <span className="text-maroon">*</span>
          </label>

          {/* Preset chips */}
          <div className="flex flex-wrap gap-2 mb-1">
            {BUDGET_PRESETS.map(p => (
              <button
                key={p.value}
                type="button"
                onClick={() => handle("totalBudget", p.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-body font-medium
                            border transition-all duration-200
                            ${form.totalBudget === p.value
                              ? "bg-maroon text-ivory border-maroon shadow-maroon"
                              : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                            }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Custom input */}
          <div className="relative">
            <RiWalletLine size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
            <input
              type="number"
              min={100000}
              step={50000}
              value={form.totalBudget}
              onChange={e => handle("totalBudget", Number(e.target.value))}
              placeholder="Enter budget in ₹"
              className={`input-luxury !pl-10 text-sm
                          ${errors.totalBudget ? "!border-red-400 !ring-2 !ring-red-100" : ""}`}
            />
            {form.totalBudget > 0 && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2
                               font-body text-xs text-gold font-semibold">
                {FMT_BUDGET(form.totalBudget)}
              </span>
            )}
          </div>
          {errors.totalBudget && (
            <p className="font-body text-xs text-red-500">{errors.totalBudget}</p>
          )}

          {/* Budget slider */}
          <div className="relative mt-1">
            <input
              type="range"
              min={100000}
              max={10000000}
              step={50000}
              value={form.totalBudget}
              onChange={e => handle("totalBudget", Number(e.target.value))}
              className="w-full accent-gold cursor-pointer"
              style={{ accentColor: "#C9A84C" }}
            />
            <div className="flex justify-between text-[10px] font-body text-muted mt-0.5">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>
        </div>

        {/* ── Guest Count ── */}
        <div className="flex flex-col gap-2">
          <label className="font-body text-xs font-semibold text-dark/70 uppercase tracking-widest">
            Expected Guest Count <span className="text-maroon">*</span>
          </label>

          <div className="flex flex-wrap gap-2 mb-1">
            {GUEST_PRESETS.map(p => (
              <button
                key={p.value}
                type="button"
                onClick={() => handle("guestCount", p.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-body font-medium
                            border transition-all duration-200
                            ${form.guestCount === p.value
                              ? "bg-maroon text-ivory border-maroon shadow-maroon"
                              : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                            }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <RiGroupLine size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
            <input
              type="number"
              min={10}
              max={5000}
              value={form.guestCount}
              onChange={e => handle("guestCount", Number(e.target.value))}
              placeholder="Number of guests"
              className={`input-luxury !pl-10 text-sm
                          ${errors.guestCount ? "!border-red-400 !ring-2 !ring-red-100" : ""}`}
            />
          </div>
          {errors.guestCount && (
            <p className="font-body text-xs text-red-500">{errors.guestCount}</p>
          )}
        </div>

        {/* ── City + Style grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold text-dark/70 uppercase tracking-widest">
              Wedding City <span className="text-maroon">*</span>
            </label>
            <div className="relative">
              <RiMapPinLine size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <select
                value={form.city}
                onChange={e => handle("city", e.target.value)}
                className={`select-luxury !pl-10 text-sm
                            ${errors.city ? "!border-red-400 !ring-2 !ring-red-100" : ""}`}
              >
                <option value="">Select city</option>
                {INDIAN_CITIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {errors.city && (
              <p className="font-body text-xs text-red-500">{errors.city}</p>
            )}
          </div>

          {/* Style */}
          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold text-dark/70 uppercase tracking-widest">
              Wedding Style <span className="text-maroon">*</span>
            </label>
            <div className="relative">
              <RiSparklingLine size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <select
                value={form.style}
                onChange={e => handle("style", e.target.value)}
                className={`select-luxury !pl-10 text-sm
                            ${errors.style ? "!border-red-400 !ring-2 !ring-red-100" : ""}`}
              >
                {WEDDING_STYLES.map(s => (
                  <option key={s.value} value={s.value}>
                    {s.emoji} {s.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.style && (
              <p className="font-body text-xs text-red-500">{errors.style}</p>
            )}
          </div>
        </div>

        {/* ── Style pills ── */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs text-muted">Quick style select:</p>
          <div className="flex flex-wrap gap-2">
            {WEDDING_STYLES.map(s => (
              <button
                key={s.value}
                type="button"
                onClick={() => handle("style", s.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs
                            font-body font-medium border transition-all duration-200
                            ${form.style === s.value
                              ? "bg-gold-gradient text-dark border-gold shadow-gold"
                              : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                            }`}
              >
                <span>{s.emoji}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Summary preview ── */}
        {form.totalBudget > 0 && form.guestCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap items-center gap-4 p-4 rounded-xl
                       bg-cream/60 border border-gold/15"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{selectedStyle?.emoji}</span>
              <span className="font-body text-xs font-semibold text-dark">
                {selectedStyle?.label} Wedding
              </span>
            </div>
            <div className="w-px h-4 bg-gold/20" />
            <span className="font-body text-xs text-muted">
              <strong className="text-dark">{FMT_BUDGET(form.totalBudget)}</strong> budget
            </span>
            <div className="w-px h-4 bg-gold/20" />
            <span className="font-body text-xs text-muted">
              <strong className="text-dark">{form.guestCount}</strong> guests
            </span>
            <div className="w-px h-4 bg-gold/20" />
            <span className="font-body text-xs text-muted">
              ~<strong className="text-dark">
                ₹{Math.round(form.totalBudget / form.guestCount).toLocaleString("en-IN")}
              </strong> per head
            </span>
            <div className="w-px h-4 bg-gold/20" />
            <span className="font-body text-xs text-muted">
              📍 <strong className="text-dark">{form.city}</strong>
            </span>
          </motion.div>
        )}

        {/* ── Generate button ── */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.015, y: -1 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className="relative w-full py-4 rounded-full font-body text-sm font-semibold
                     bg-gold-gradient text-dark shadow-gold overflow-hidden
                     disabled:opacity-70 disabled:cursor-not-allowed
                     transition-shadow duration-300 hover:shadow-lg"
        >
          {/* Shimmer sweep on hover */}
          <motion.div
            className="absolute inset-0 bg-white/20 skew-x-12"
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.55 }}
          />

          <span className="relative z-10 flex items-center justify-center gap-2.5">
            {loading ? (
              <>
                <Spinner size={18} color="#2B2B2B" />
                Generating your AI plan…
              </>
            ) : (
              <>
                <RiSparklingLine size={17} />
                Generate AI Budget Plan
                <RiArrowRightLine size={16} />
              </>
            )}
          </span>
        </motion.button>

        <p className="text-center font-body text-[11px] text-muted">
          🔒 &nbsp; Your data stays private. No account required to generate a plan.
        </p>
      </div>
    </form>
  );
}