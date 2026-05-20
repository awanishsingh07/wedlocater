import { motion } from "framer-motion";

const shimmerStyle = {
  background: "linear-gradient(90deg, #F5EFE4 0%, #FAF7F2 50%, #F5EFE4 100%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-shimmer 1.6s ease-in-out infinite",
};

function SkeletonBox({ className = "" }) {
  return <div className={`rounded-lg ${className}`} style={shimmerStyle} />;
}

/* ── Generic table skeleton ── */
export default function SkeletonTable({
  rows    = 6,
  columns = 5,
  label   = "",
}) {
  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury overflow-hidden">
      {label && (
        <div className="px-5 py-4 border-b border-cream">
          <SkeletonBox className="h-5 w-40" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Thead */}
          <thead>
            <tr className="border-b border-cream bg-cream/30">
              {[...Array(columns)].map((_, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <SkeletonBox className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Tbody */}
          <tbody>
            {[...Array(rows)].map((_, ri) => (
              <motion.tr
                key={ri}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ri * 0.05 }}
                className="border-b border-cream/60"
              >
                {[...Array(columns)].map((_, ci) => (
                  <td key={ci} className="px-4 py-3.5">
                    {ci === 0 ? (
                      <div className="flex items-center gap-2.5">
                        <SkeletonBox className="w-8 h-8 rounded-full shrink-0" />
                        <div className="flex flex-col gap-1.5 flex-1">
                          <SkeletonBox className="h-3.5 w-32" />
                          <SkeletonBox className="h-3 w-20" />
                        </div>
                      </div>
                    ) : ci === columns - 1 ? (
                      <SkeletonBox className="h-5 w-16 rounded-full" />
                    ) : (
                      <SkeletonBox className={`h-3 ${ci % 2 === 0 ? "w-24" : "w-16"}`} />
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Dashboard booking row skeleton ── */
export function SkeletonBookingRow({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-3 rounded-xl border border-cream"
    >
      <SkeletonBox className="w-10 h-10 rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <SkeletonBox className="h-3.5 w-3/4" />
        <SkeletonBox className="h-3 w-1/2" />
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <SkeletonBox className="h-5 w-16 rounded-full" />
        <SkeletonBox className="h-4 w-12" />
      </div>
    </motion.div>
  );
}

/* ── Guest table skeleton ── */
export function SkeletonGuestTable({ rows = 8 }) {
  return <SkeletonTable rows={rows} columns={6} />;
}