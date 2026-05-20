import { motion } from "framer-motion";

/* ── Inline spinner ── */
export function Spinner({ size = 20, color = "#C9A84C" }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="none"
      className="animate-spin"
      style={{ color }}
    >
      <circle cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Gold dot pulse loader ── */
export function DotLoader({ label = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-gold"
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          />
        ))}
      </div>
      {label && (
        <p className="font-body text-xs text-muted tracking-widest uppercase">{label}</p>
      )}
    </div>
  );
}

/* ── Luxury ring loader ── */
export default function Loader({ size = 48, label = "" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gold/20"
          style={{ borderTopColor: "#C9A84C" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full border-2 border-transparent"
          style={{
            inset: size * 0.18,
            borderBottomColor: "#6B0F1A",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
        />
        {/* Centre dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        </div>
      </div>
      {label && (
        <p className="font-body text-xs text-muted tracking-wide">{label}</p>
      )}
    </div>
  );
}