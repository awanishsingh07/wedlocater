import { motion } from "framer-motion";
import { RiRefreshLine, RiArrowLeftLine, RiAlertLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorState({
  code      = 500,
  title     = "Something went wrong",
  desc      = "We encountered an unexpected error. Our team has been notified.",
  onRetry,
  showBack  = true,
  className = "",
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col items-center justify-center text-center
                  px-6 py-20 sm:py-32 min-h-[50vh] gap-6 ${className}`}
    >
      {/* Error icon */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-maroon/5 blur-2xl scale-150" />
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative w-20 h-20 rounded-full bg-maroon/8 border border-maroon/15
                     flex items-center justify-center"
        >
          <RiAlertLine size={36} className="text-maroon" />
        </motion.div>
      </div>

      {/* Error code */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-heading text-[80px] sm:text-[120px] font-semibold
                         leading-none text-maroon/10 select-none">
          {code}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-md -mt-8">
        <h2 className="font-heading text-display-md text-dark">{title}</h2>
        <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
      </div>

      {/* Divider */}
      <div className="divider-center" />

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRetry}
            className="btn-primary !px-7"
          >
            <RiRefreshLine size={16} />
            Try Again
          </motion.button>
        )}
        {showBack && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="btn-secondary !px-7"
          >
            <RiArrowLeftLine size={16} />
            Go Back
          </motion.button>
        )}
        <Link to="/" className="font-body text-sm text-maroon hover:text-gold transition-colors">
          Return home →
        </Link>
      </div>
    </motion.div>
  );
}