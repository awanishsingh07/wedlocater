import { motion } from "framer-motion";
import { RiStarFill, RiStarLine, RiDoubleQuotesL } from "react-icons/ri";

export default function ReviewCard({ review, index = 0 }) {
  if (!review) return null;
  const { name, avatar, rating, date, title, body } = review;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6
                 hover:shadow-luxury-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-4">
        <img src={avatar} alt={name}
          className="w-10 h-10 rounded-full object-cover border-2 border-cream shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-heading text-base font-semibold text-dark truncate">{name}</h4>
            <span className="font-body text-xs text-muted whitespace-nowrap">{date}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(rating)
                ? <RiStarFill  key={i} size={12} className="text-gold"  />
                : <RiStarLine  key={i} size={12} className="text-cream" />
            )}
          </div>
        </div>
      </div>
      <RiDoubleQuotesL size={18} className="text-gold/30 mb-1.5" />
      <h5 className="font-heading text-sm font-semibold text-dark mb-1.5">{title}</h5>
      <p className="font-body text-sm text-muted leading-relaxed">{body}</p>
    </motion.div>
  );
}