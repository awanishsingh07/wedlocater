import { motion } from "framer-motion";
import { RiStarFill, RiStarLine, RiDoubleQuotesL } from "react-icons/ri";

function StarRow({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) =>
        i < Math.floor(rating)
          ? <RiStarFill  key={i} size={14} className="text-gold"  />
          : <RiStarLine  key={i} size={14} className="text-cream" />
      )}
    </div>
  );
}

function RatingBar({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-cream rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-full bg-gold-gradient rounded-full"
        />
      </div>
      <span className="font-body text-xs font-semibold text-dark w-6 text-right shrink-0">
        {value}
      </span>
    </div>
  );
}

export default function VenueReview({ reviews = [], rating = 0, reviewCount = 0 }) {
  return (
    <div className="flex flex-col gap-8">

      {/* ── Summary ── */}
      <div className="flex flex-col sm:flex-row gap-8 p-6 bg-white
                      rounded-luxury border border-cream shadow-luxury">
        <div className="flex flex-col items-center justify-center shrink-0 gap-2">
          <span className="font-heading text-6xl font-semibold text-maroon leading-none">
            {rating.toFixed(1)}
          </span>
          <StarRow rating={rating} />
          <span className="font-body text-xs text-muted">{reviewCount} reviews</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2.5">
          {[
            ["Venue & Spaces",  4.9],
            ["Food & Catering", 4.8],
            ["Staff & Service", 5.0],
            ["Value for Money", 4.6],
            ["Décor & Ambience",4.9],
          ].map(([label, val]) => (
            <RatingBar key={label} label={label} value={val} />
          ))}
        </div>
      </div>

      {/* ── Individual reviews ── */}
      <div className="flex flex-col gap-5">
        {reviews.map((rev, i) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
            className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <img src={rev.avatar} alt={rev.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-cream shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-heading text-base font-semibold text-dark">{rev.name}</h4>
                  <span className="font-body text-xs text-muted">{rev.date}</span>
                </div>
                <StarRow rating={rev.rating} />
              </div>
            </div>

            <RiDoubleQuotesL size={20} className="text-gold/40 mb-2" />
            <h5 className="font-heading text-base font-semibold text-dark mb-2">{rev.title}</h5>
            <p className="font-body text-sm text-muted leading-relaxed">{rev.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}