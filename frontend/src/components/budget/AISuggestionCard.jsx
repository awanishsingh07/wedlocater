import { motion } from "framer-motion";

export default function AISuggestionCard({ suggestion, index = 0 }) {
  if (!suggestion) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay:    index * 0.1 + 0.3,
        ease:     [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className="flex items-start gap-4 p-4 rounded-xl bg-white border border-cream
                 shadow-luxury hover:border-gold/30 hover:shadow-luxury-md
                 transition-all duration-300 group cursor-default"
    >
      {/* Icon bubble */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-10 h-10 rounded-xl bg-gold/8 border border-gold/15
                   flex items-center justify-center text-xl shrink-0"
      >
        {suggestion.icon}
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-dark/85 leading-relaxed group-hover:text-dark
                      transition-colors duration-200">
          {suggestion.tip}
        </p>
      </div>

      {/* Gold accent line */}
      <div className="w-0.5 self-stretch bg-cream group-hover:bg-gold/40
                      rounded-full transition-colors duration-300 shrink-0" />
    </motion.div>
  );
}