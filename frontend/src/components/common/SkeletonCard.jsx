import { motion } from "framer-motion";

/* ── Shimmer keyframes via inline style ── */
const shimmerStyle = {
  background: "linear-gradient(90deg, #F5EFE4 0%, #FAF7F2 50%, #F5EFE4 100%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-shimmer 1.6s ease-in-out infinite",
};

/* ── Inject keyframes once ── */
if (typeof document !== "undefined" && !document.getElementById("skeleton-style")) {
  const style = document.createElement("style");
  style.id = "skeleton-style";
  style.textContent = `
    @keyframes skeleton-shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
  `;
  document.head.appendChild(style);
}

function SkeletonBox({ className = "" }) {
  return (
    <div className={`rounded-lg ${className}`} style={shimmerStyle} />
  );
}

/* ── Venue / photographer / vendor card skeleton ── */
export function SkeletonVenueCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="bg-white rounded-luxury border border-cream shadow-luxury overflow-hidden"
    >
      {/* Image placeholder */}
      <SkeletonBox className="h-52 rounded-none" />

      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <SkeletonBox className="h-5 w-3/4" />
          <SkeletonBox className="h-3.5 w-1/2" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-3 w-16" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <SkeletonBox className="h-5 w-16 rounded-full" />
          <SkeletonBox className="h-5 w-20 rounded-full" />
          <SkeletonBox className="h-5 w-14 rounded-full" />
        </div>

        {/* Divider */}
        <div className="h-px bg-cream" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <SkeletonBox className="h-3 w-20" />
            <SkeletonBox className="h-6 w-24" />
          </div>
          <SkeletonBox className="h-8 w-28 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Stat card skeleton ── */
export function SkeletonStatCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-luxury border border-cream shadow-luxury p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-8 w-32" />
          <SkeletonBox className="h-3 w-20" />
        </div>
        <SkeletonBox className="w-11 h-11 rounded-xl shrink-0" />
      </div>
    </motion.div>
  );
}

/* ── Dashboard activity row skeleton ── */
export function SkeletonActivityRow({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-3"
    >
      <SkeletonBox className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5">
        <SkeletonBox className="h-3.5 w-3/4" />
        <SkeletonBox className="h-3 w-1/2" />
      </div>
      <SkeletonBox className="h-3 w-16 shrink-0" />
    </motion.div>
  );
}

/* ── Budget category card skeleton ── */
export function SkeletonBudgetCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-luxury border border-cream shadow-luxury p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2.5">
        <SkeletonBox className="w-10 h-10 rounded-xl shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-3 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBox className="h-16 rounded-xl" />
        <SkeletonBox className="h-16 rounded-xl" />
      </div>
      <SkeletonBox className="h-2 rounded-full" />
      <div className="flex justify-between">
        <SkeletonBox className="h-3 w-16" />
        <SkeletonBox className="h-3 w-20" />
      </div>
    </motion.div>
  );
}

/* ── Photographer card skeleton ── */
export function SkeletonPhotographerCard({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white rounded-luxury border border-cream shadow-luxury overflow-hidden"
    >
      <div className="relative h-48">
        <SkeletonBox className="h-full rounded-none" />
        <div className="absolute bottom-3 left-3">
          <SkeletonBox className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2.5">
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-3 w-1/2" />
        <SkeletonBox className="h-3 w-24" />
        <div className="flex gap-2">
          <SkeletonBox className="h-5 w-16 rounded-full" />
          <SkeletonBox className="h-5 w-20 rounded-full" />
        </div>
        <SkeletonBox className="h-12 rounded-xl" />
        <div className="h-px bg-cream" />
        <div className="flex justify-between items-center">
          <SkeletonBox className="h-6 w-20" />
          <SkeletonBox className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Grid of venue skeletons ── */
export default function SkeletonCardGrid({ count = 6, type = "venue" }) {
  const Card = type === "photographer" ? SkeletonPhotographerCard : SkeletonVenueCard;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
      {[...Array(count)].map((_, i) => <Card key={i} index={i} />)}
    </div>
  );
}