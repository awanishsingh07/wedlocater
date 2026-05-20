import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftLine, RiHome4Line, RiSearchLine } from "react-icons/ri";

const QUICK_LINKS = [
  { label: "Browse Venues",        to: "/venues"       },
  { label: "Find Photographers",   to: "/photographers"},
  { label: "Vendor Marketplace",   to: "/vendors"      },
  { label: "Budget Planner",       to: "/budget"       },
];

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90svh] bg-ivory flex flex-col items-center justify-center
                    px-4 py-16 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                        bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                        bg-maroon/5 blur-[100px]" />
        {/* Decorative dots grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl">

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <span className="font-heading text-[160px] sm:text-[220px] font-semibold
                           leading-none text-cream select-none">
            404
          </span>
          {/* Overlaid emoji */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-6xl sm:text-8xl">🏛️</span>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="flex flex-col gap-3 -mt-6"
        >
          <p className="label-gold">Page Not Found</p>
          <h1 className="font-heading text-display-md text-dark">
            This venue doesn't exist
          </h1>
          <p className="font-body text-muted text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The page you're looking for may have been moved, renamed, or never existed.
            Let us help you find what you need.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="divider-center" />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={() => navigate(-1)} className="btn-secondary !px-6">
            <RiArrowLeftLine size={16} />
            Go Back
          </button>
          <Link to="/" className="btn-primary !px-6">
            <RiHome4Line size={16} />
            Return Home
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <p className="font-body text-xs text-muted">Or jump to:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                           text-xs font-body font-medium
                           bg-white border border-cream text-muted
                           hover:border-gold hover:text-gold
                           transition-all duration-200"
              >
                <RiSearchLine size={11} />
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}