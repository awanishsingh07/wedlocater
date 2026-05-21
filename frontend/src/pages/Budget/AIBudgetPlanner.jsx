import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  RiSparklingLine,
  RiRobot2Line,
  RiArrowRightLine,
  RiDownloadLine,
  RiRefreshLine,
  RiCheckboxCircleLine,
  RiLockLine,
  RiUserLine,
  RiBarChart2Line,
  RiLightbulbLine,
  RiHeartLine,
  RiArrowDownLine,
} from "react-icons/ri";

import AIBudgetForm from "../../components/budget/AIBudgetForm";
import AIRecommendationCard from "../../components/budget/AIRecommendationCard";
import AISuggestionCard from "../../components/budget/AISuggestionCard";
import { generateAIBudget } from "../../data/aiBudgetData";

const FMT = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

// ── Stagger container ──
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ── Mini bar chart for summary ──
function MiniChart({ breakdown, totalBudget }) {
  const max = Math.max(...breakdown.map((b) => b.amount));
  return (
    <div className="flex items-end justify-between gap-1.5 h-20 px-1">
      {breakdown.map((item, i) => {
        const heightPct = (item.amount / max) * 100;
        return (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1 flex-1 min-w-0"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: i * 0.07 + 0.5,
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{
                height: `${heightPct}%`,
                background: item.color,
                transformOrigin: "bottom",
                minHeight: "4px",
              }}
              className="w-full rounded-t-md"
              title={`${item.label}: ${FMT(item.amount)}`}
            />
            <span className="text-[9px] font-body text-muted truncate w-full text-center">
              {item.icon}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Feature chips for hero ──
const HERO_FEATURES = [
  { icon: "🤖", label: "AI Powered" },
  { icon: "📊", label: "Smart Allocation" },
  { icon: "🏙️", label: "City-Aware" },
  { icon: "💎", label: "Style Optimised" },
  { icon: "⚡", label: "Instant Results" },
];

export default function AIBudgetPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const resultRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);
  const heroY = useTransform(scrollY, [0, 300], [0, 60]);

  const handleGenerate = async (data) => {
    setLoading(true);
    setResult(null);

    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 2200));

    const aiResult = generateAIBudget(data);
    setFormData(data);
    setResult(aiResult);
    setLoading(false);

    // Scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleReset = () => {
    setResult(null);
    setFormData(null);
    setHighlightId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalSpent = result
    ? result.breakdown.reduce((s, b) => s + b.amount, 0)
    : 0;

  return (
    <div className="bg-ivory min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[520px] sm:min-h-[580px] flex flex-col
                   items-center justify-center overflow-hidden"
      >
        {/* Animated background layers */}
        <div className="absolute inset-0 bg-maroon-gradient" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-24 w-96 h-96 rounded-full
                     bg-gold/20 blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full
                     bg-maroon-light/30 blur-[80px] pointer-events-none"
        />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center text-center
                     px-4 sm:px-6 gap-6 max-w-4xl mx-auto pt-16 pb-20"
        >
          {/* AI badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <RiRobot2Line size={16} className="text-gold" />
            </motion.div>
            <span className="font-body text-xs font-semibold text-gold tracking-widest uppercase">
              Powered by AI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="flex flex-col gap-3"
          >
            <h1
              className="font-heading font-semibold text-maroon leading-[1.05]
                           text-[clamp(2.4rem,6vw,5rem)]"
            >
              AI Powered Wedding
              <br />
              <em className="not-italic text-shimmer">Budget Planner</em>
            </h1>
            <p className="font-body text-black/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Tell us your total budget, guest count, city and wedding style -
              and let our AI craft a smart, personalised spending plan in
              seconds.
            </p>
          </motion.div>

          {/* Feature chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {HERO_FEATURES.map((f, i) => (
              <motion.span
                key={f.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 + 0.4 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                           bg-white/10 backdrop-blur-sm border border-white/15
                           font-body text-[11px] text-yellow/80"
              >
                {f.icon} {f.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-1 mt-2"
          >
            <span className="font-body text-[10px] text-ivory/40 tracking-widest uppercase">
              Fill in below
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <RiArrowDownLine size={16} className="text-gold/60" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          INPUT FORM SECTION
      ══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-luxury-lg shadow-luxury-lg border border-cream p-6 sm:p-8"
          >
            {/* Form header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <RiSparklingLine size={14} className="text-gold" />
                  <p className="label-gold">Step 1 of 1</p>
                </div>
                <h2 className="font-heading text-display-sm text-dark">
                  Tell us about your wedding
                </h2>
                <p className="font-body text-sm text-muted mt-1">
                  All fields help us generate a more accurate budget split for
                  you.
                </p>
              </div>

              {/* How it works mini-steps */}
              <div className="hidden sm:flex flex-col gap-2 shrink-0 bg-cream/50 rounded-xl p-4 border border-cream">
                {[
                  { n: "1", t: "Enter details" },
                  { n: "2", t: "AI analyses data" },
                  { n: "3", t: "Get your plan" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full bg-maroon text-ivory text-[10px]
                                     font-body font-bold flex items-center justify-center shrink-0"
                    >
                      {s.n}
                    </span>
                    <span className="font-body text-xs text-muted">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <AIBudgetForm onGenerate={handleGenerate} loading={loading} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOADING OVERLAY (inside section)
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/60 backdrop-blur-sm
                       flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-ivory rounded-luxury-lg shadow-luxury-lg border border-cream
                         p-8 sm:p-12 flex flex-col items-center gap-6 max-w-sm mx-4 text-center"
            >
              {/* Animated robot */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-full bg-maroon/8 border border-maroon/15
                           flex items-center justify-center"
              >
                <RiRobot2Line size={40} className="text-maroon" />
              </motion.div>

              <div>
                <h3 className="font-heading text-display-sm text-dark mb-2">
                  AI is analysing your wedding
                </h3>
                <p className="font-body text-sm text-muted">
                  Our AI is calculating the optimal budget split based on your
                  wedding style, city and guest count…
                </p>
              </div>

              {/* Animated steps */}
              <div className="flex flex-col gap-2.5 w-full">
                {[
                  "Analysing wedding style…",
                  "Checking city cost index…",
                  "Calculating allocations…",
                  "Generating smart tips…",
                ].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.45 + 0.3 }}
                    className="flex items-center gap-2.5 text-left"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.45 + 0.5 }}
                      className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center shrink-0"
                    >
                      <RiCheckboxCircleLine size={12} className="text-gold" />
                    </motion.div>
                    <span className="font-body text-xs text-muted">{step}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-cream rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold-gradient rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          RESULTS SECTION
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {result && (
          <motion.div
            ref={resultRef}
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Results hero banner ── */}
            <section className="bg-ivory px-4 sm:px-6 lg:px-8 pt-4 pb-10">
              <div className="container-luxury">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  className="relative overflow-hidden rounded-luxury-lg bg-white
                             border border-cream shadow-luxury p-6 sm:p-8"
                >
                  {/* Background accent */}
                  <div
                    className="absolute top-0 right-0 w-64 h-full
                                  bg-gold-gradient opacity-[0.04] pointer-events-none"
                  />

                  <div
                    className="flex flex-col lg:flex-row items-start
                                  lg:items-center justify-between gap-6 relative z-10"
                  >
                    {/* Left: summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <RiCheckboxCircleLine
                            size={18}
                            className="text-emerald-600"
                          />
                        </div>
                        <p className="label-gold">AI Plan Generated</p>
                      </div>

                      <h2 className="font-heading text-display-sm text-dark mb-2">
                        Your Personalised Budget Plan
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm font-body">
                        <span className="text-muted">
                          💰{" "}
                          <strong className="text-dark">
                            {FMT(result.summary.totalBudget)}
                          </strong>{" "}
                          total
                        </span>
                        <span className="text-muted">
                          👥{" "}
                          <strong className="text-dark">
                            {result.summary.guestCount}
                          </strong>{" "}
                          guests
                        </span>
                        <span className="text-muted">
                          📍{" "}
                          <strong className="text-dark">
                            {result.summary.city}
                          </strong>
                        </span>
                        <span className="text-muted">
                          ✨{" "}
                          <strong className="text-dark capitalize">
                            {result.summary.style}
                          </strong>{" "}
                          style
                        </span>
                        <span className="text-muted">
                          ~
                          <strong className="text-maroon">
                            ₹
                            {result.summary.estimatedPerGuest.toLocaleString(
                              "en-IN",
                            )}
                          </strong>{" "}
                          per guest
                        </span>
                      </div>
                    </div>

                    {/* Right: mini chart + actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                      {/* Mini bar chart */}
                      <div className="bg-cream/60 rounded-xl p-4 border border-cream w-44">
                        <p className="font-body text-[9px] text-muted uppercase tracking-widest mb-2">
                          Allocation preview
                        </p>
                        <MiniChart
                          breakdown={result.breakdown}
                          totalBudget={result.summary.totalBudget}
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-row lg:flex-col gap-2">
                        <button
                          onClick={handleReset}
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2
                                     px-4 py-2.5 rounded-xl border border-cream bg-white
                                     text-xs font-body font-medium text-muted
                                     hover:border-gold hover:text-gold transition-all duration-200"
                        >
                          <RiRefreshLine size={14} />
                          Regenerate
                        </button>
                        <button
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2
                                     px-4 py-2.5 rounded-xl border border-cream bg-white
                                     text-xs font-body font-medium text-muted
                                     hover:border-gold hover:text-gold transition-all duration-200"
                        >
                          <RiDownloadLine size={14} />
                          Export PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── Recommendation cards grid ── */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="container-luxury">
                <div className="flex items-end justify-between gap-4 mb-7">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <RiBarChart2Line size={14} className="text-gold" />
                      <p className="label-gold">Smart Allocation</p>
                    </div>
                    <h2 className="font-heading text-display-sm text-dark">
                      AI Budget Breakdown
                    </h2>
                  </div>
                  <p className="font-body text-xs text-muted hidden sm:block">
                    {result.breakdown.length} categories · {FMT(totalSpent)}{" "}
                    total
                  </p>
                </div>

                {/* Cards grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
                >
                  {result.breakdown.map((item, i) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      onClick={() =>
                        setHighlightId((prev) =>
                          prev === item.id ? null : item.id,
                        )
                      }
                    >
                      <AIRecommendationCard
                        item={item}
                        totalBudget={result.summary.totalBudget}
                        index={i}
                        highlighted={highlightId === item.id}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Total row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="mt-5 p-4 sm:p-5 rounded-luxury bg-cream/60 border border-gold/15
                             flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-muted">
                      Total allocated:
                    </span>
                    <span className="font-heading text-xl font-semibold text-dark">
                      {FMT(totalSpent)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-muted">
                      Catering per plate estimate:
                    </span>
                    <span className="font-heading text-base font-semibold text-maroon">
                      ₹{result.summary.perPlate.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-muted">
                      City cost factor:
                    </span>
                    <span className="font-heading text-base font-semibold text-gold-dark">
                      {result.summary.multiplier.toFixed(2)}×
                    </span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── AI Suggestions section ── */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="container-luxury">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.55 }}
                >
                  <div className="flex items-end justify-between gap-4 mb-7">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <RiLightbulbLine size={14} className="text-gold" />
                        <p className="label-gold">AI Insights</p>
                      </div>
                      <h2 className="font-heading text-display-sm text-dark">
                        Smart Money Saving Tips
                      </h2>
                      <p className="font-body text-sm text-muted mt-1">
                        Tailored suggestions for a{" "}
                        <strong className="text-dark capitalize">
                          {result.summary.style}
                        </strong>{" "}
                        wedding in{" "}
                        <strong className="text-dark">
                          {result.summary.city}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.suggestions.map((sug, i) => (
                      <AISuggestionCard key={i} suggestion={sug} index={i} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── Visual allocation summary ── */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12">
              <div className="container-luxury">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.55 }}
                  className="bg-white rounded-luxury-lg border border-cream shadow-luxury p-6 sm:p-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <RiBarChart2Line size={16} className="text-gold" />
                    <h3 className="font-heading text-display-sm text-dark">
                      Allocation Overview
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3.5">
                    {result.breakdown.map((item, i) => {
                      const pct = Math.round(
                        (item.amount / result.summary.totalBudget) * 100,
                      );
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 + 0.3, duration: 0.4 }}
                          className="flex items-center gap-3 group cursor-default"
                        >
                          {/* Icon + label */}
                          <div className="flex items-center gap-2 w-36 sm:w-44 shrink-0">
                            <span className="text-base">{item.icon}</span>
                            <span className="font-body text-xs text-dark truncate">
                              {item.label}
                            </span>
                          </div>

                          {/* Bar */}
                          <div className="flex-1 h-2.5 bg-cream rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                delay: i * 0.07 + 0.5,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                              }}
                            />
                          </div>

                          {/* Values */}
                          <div className="flex items-center gap-2 w-28 sm:w-36 shrink-0 justify-end">
                            <span className="font-body text-xs text-muted">
                              {pct}%
                            </span>
                            <span className="font-heading text-sm font-semibold text-dark">
                              {FMT(item.amount)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ── Login CTA ── */}
            <section className="px-4 sm:px-6 lg:px-8 pb-16">
              <div className="container-luxury">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="relative overflow-hidden rounded-luxury-lg bg-maroon-gradient
                             p-8 sm:p-12 text-center"
                >
                  {/* Background pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `radial-gradient(circle, #C9A84C 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Glow orbs */}
                  <div
                    className="absolute top-0 left-1/4 w-64 h-64 rounded-full
                                  bg-gold/10 blur-[80px] pointer-events-none"
                  />
                  <div
                    className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full
                                  bg-maroon-light/20 blur-[60px] pointer-events-none"
                  />

                  <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl mx-auto">
                    {/* Heart icon */}
                    <motion.div
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-16 h-16 rounded-full bg-white/10 border border-white/20
                                 flex items-center justify-center"
                    >
                      <RiHeartLine size={28} className="text-gold" />
                    </motion.div>

                    <div className="flex flex-col gap-2">
                      <p className="label-gold !text-gold/80">Save Your Plan</p>
                      <h3 className="font-heading text-display-md text-maroon/80">
                        Want to save your personalised budget plan?
                      </h3>
                      <p className="font-body text-black/70 text-sm leading-relaxed max-w-md mx-auto">
                        Create a free account to save this AI plan, track your
                        spending, manage vendors and access your complete
                        wedding dashboard.
                      </p>
                    </div>

                    {/* Feature list */}
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        "💾 Save your AI plan",
                        "📊 Track spending",
                        "📋 Manage vendors",
                        "👥 Guest list",
                        "✅ Checklist",
                      ].map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                                     bg-white/10 backdrop-blur-sm border border-white/15
                                     font-body text-xs text-yellow/80"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        to="/register"
                        className="inline-flex items-center justify-center gap-2
                                   px-8 py-3.5 rounded-full font-body text-sm font-semibold
                                   bg-gold-gradient text-dark shadow-gold
                                   hover:shadow-lg hover:-translate-y-0.5
                                   transition-all duration-300 min-w-[160px]"
                      >
                        <RiUserLine size={16} />
                        Create Free Account
                      </Link>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2
                                   px-8 py-3.5 rounded-full font-body text-sm font-semibold
                                   bg-white/10 backdrop-blur-sm border border-white/25 text-dark
                                   shadow-lg bg-gold-gradient shadow-gold
                                   hover:bg-white/20 hover:-translate-y-0.5
                                   transition-all duration-300 min-w-[160px]"
                      >
                        <RiLockLine size={16} />
                        Sign In
                      </Link>
                    </div>

                    <p className="font-body text-[11px] text-creme/30">
                      Free forever · No credit card required · Cancel anytime
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          STATIC BOTTOM SECTION (when no result yet)
      ══════════════════════════════════════════ */}
      {!result && !loading && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="container-luxury">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4"
            >
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Analysis",
                  desc: "Our AI engine analyses your budget against real wedding cost data across Indian cities and wedding styles.",
                },
                {
                  icon: "📊",
                  title: "Smart Allocation",
                  desc: "Get category-wise budget splits optimised for your guest count, venue type and wedding style preferences.",
                },
                {
                  icon: "💡",
                  title: "Expert Suggestions",
                  desc: "Receive personalised money-saving tips and planning advice from our AI trained on thousands of Indian weddings.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 + 0.4 }}
                  className="bg-white rounded-luxury border border-cream shadow-luxury p-5
                             hover:shadow-luxury-md hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{f.icon}</span>
                  <h3 className="font-heading text-base font-semibold text-dark mb-2">
                    {f.title}
                  </h3>
                  <p className="font-body text-xs text-muted leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
