import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiGroupLine, RiHeartLine, RiHeartFill,
  RiStarFill, RiArrowRightLine, RiBuilding2Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";

const FMT = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
              : `₹${n.toLocaleString("en-IN")}`;

export default function VenueCard({ venue, index = 0 }) {
  const [liked, setLiked]         = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!venue) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-luxury border border-cream
                 shadow-luxury hover:shadow-luxury-md overflow-hidden flex flex-col h-full"
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={venue.images[activeImg]}
          alt={venue.name}
          loading="lazy"
          className="w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500 ease-luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {venue.featured && (
            <span className="badge-gold !text-[10px] !py-0.5 shadow-sm">✦ Featured</span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1
                           bg-dark/50 backdrop-blur-sm rounded-full
                           text-[10px] text-ivory font-body font-medium">
            <RiBuilding2Line size={10} />
            {venue.venueType}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(v => !v); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full
                     bg-white/20 backdrop-blur-md border border-white/30
                     flex items-center justify-center hover:bg-white/40 transition-all duration-200"
        >
          {liked
            ? <RiHeartFill size={15} className="text-maroon" />
            : <RiHeartLine size={15} className="text-ivory" />
          }
        </button>

        {/* Gallery dots */}
        {venue.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {venue.images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setActiveImg(i)}
                onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                className={`rounded-full transition-all duration-200
                  ${i === activeImg ? "w-4 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-ivory/60"}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1
                        text-[11px] text-ivory/90 font-body">
          <RiGroupLine size={12} />
          <span>{venue.capacity.min}–{venue.capacity.max} guests</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-semibold text-dark
                           group-hover:text-maroon transition-colors duration-200
                           leading-snug truncate">
              {venue.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <RiMapPinLine size={11} className="text-gold shrink-0" />
              <span className="text-xs text-muted truncate">
                {venue.city}, {venue.state}
              </span>
            </div>
          </div>
          {venue.verified && (
            <RiCheckboxCircleLine size={18} className="text-gold shrink-0 mt-0.5" />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} size={11}
                className={i < Math.floor(venue.rating) ? "text-gold" : "text-cream"} />
            ))}
          </div>
          <span className="text-xs font-semibold font-body text-dark">{venue.rating}</span>
          <span className="text-xs text-muted font-body">({venue.reviewCount} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {venue.amenities.slice(0, 3).map(a => (
            <span key={a} className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                                     bg-cream text-muted border border-gold/15">
              {a}
            </span>
          ))}
          {venue.amenities.length > 3 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                             bg-cream text-muted border border-gold/15">
              +{venue.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Indoor / outdoor chips */}
        <div className="flex gap-2">
          {venue.indoor && (
            <span className="text-[10px] font-body text-maroon bg-maroon/8
                             border border-maroon/15 px-2 py-0.5 rounded-full">
              Indoor
            </span>
          )}
          {venue.outdoor && (
            <span className="text-[10px] font-body text-gold-dark bg-gold/8
                             border border-gold/15 px-2 py-0.5 rounded-full">
              Outdoor
            </span>
          )}
        </div>

        <div className="h-px bg-cream mt-auto" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="font-body text-[10px] text-muted uppercase tracking-wide">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-semibold text-maroon">
                {FMT(venue.price)}
              </span>
              <span className="text-xs text-muted font-body">{venue.priceUnit}</span>
            </div>
          </div>
          <Link
            to={`/venues/${venue.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                       text-xs font-body font-medium bg-maroon text-ivory shadow-maroon
                       hover:bg-maroon-dark hover:-translate-y-0.5 transition-all duration-200"
          >
            View Details
            <RiArrowRightLine size={13} />
          </Link>
        </div>
      </div>

      {/* Gold hover border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}