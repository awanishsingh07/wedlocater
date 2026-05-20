import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiGroupLine,
  RiHeartLine,
  RiHeartFill,
  RiStarFill,
  RiArrowRightLine,
  RiBuilding2Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { useState } from "react";

/*
  Props:
  ─────────────────────────────────────────────────────────
  id           string | number   – unique identifier
  name         string            – venue name
  location     string            – city / area
  address      string            – full address (optional)
  image        string            – primary image URL
  images       string[]          – gallery images (optional)
  price        number            – starting price (₹)
  priceUnit    string            – "per plate" | "per day" etc.
  capacity     string            – e.g. "200–1500"
  rating       number            – 0–5
  reviewCount  number
  tags         string[]          – ["AC Hall", "Valet", "In-house Catering"]
  verified     boolean
  featured     boolean
  venueType    string            – "Palace" | "Farmhouse" | "Hotel" etc.
  className    string            – extra wrapper classes
  onWishlist   fn(id, state)     – callback when wishlist toggled
  wishlisted   boolean           – initial wishlist state
  ─────────────────────────────────────────────────────────
*/

const FORMAT_PRICE = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

export default function VenueCard({
  id            = "1",
  name          = "The Grand Mahal Palace",
  location      = "Udaipur, Rajasthan",
  address       = "",
  image         = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80&auto=format&fit=crop",
  images        = [],
  price         = 150000,
  priceUnit     = "per plate",
  capacity      = "500–2000",
  rating        = 4.8,
  reviewCount   = 312,
  tags          = ["AC Banquet", "Valet Parking", "In-house Catering"],
  verified      = true,
  featured      = false,
  venueType     = "Palace",
  className     = "",
  onWishlist    = () => {},
  wishlisted    = false,
}) {
  const [liked, setLiked]           = useState(wishlisted);
  const [activeImg, setActiveImg]   = useState(0);
  const galleryImgs                 = [image, ...images].slice(0, 4);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    onWishlist(id, next);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative bg-white rounded-luxury border border-cream
                  shadow-luxury hover:shadow-luxury-md overflow-hidden
                  flex flex-col h-full ${className}`}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden h-52 shrink-0">
        <img
          src={galleryImgs[activeImg]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500 ease-luxury"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-dark/50 via-transparent to-transparent" />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && (
            <span className="badge-gold !text-[10px] !py-0.5 shadow-sm">
              ✦ Featured
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1
                           bg-dark/50 backdrop-blur-sm rounded-full
                           text-[10px] text-ivory font-body font-medium">
            <RiBuilding2Line size={11} />
            {venueType}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full
                     bg-white/20 backdrop-blur-md border border-white/30
                     flex items-center justify-center
                     hover:bg-white/40 transition-all duration-200"
        >
          {liked
            ? <RiHeartFill size={15} className="text-maroon" />
            : <RiHeartLine size={15} className="text-ivory" />
          }
        </button>

        {/* Gallery dot nav */}
        {galleryImgs.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                          flex items-center gap-1.5">
            {galleryImgs.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setActiveImg(i)}
                onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                className={`rounded-full transition-all duration-200
                  ${i === activeImg
                    ? "w-4 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-ivory/60 hover:bg-ivory"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Bottom-left: capacity */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1
                        text-[11px] text-ivory/90 font-body">
          <RiGroupLine size={12} />
          <span>{capacity} guests</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-3">

        {/* Name + verified */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-semibold text-dark
                           group-hover:text-maroon transition-colors duration-200
                           leading-snug truncate">
              {name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <RiMapPinLine size={11} className="text-gold shrink-0" />
              <span className="text-xs text-muted truncate">{location}</span>
            </div>
          </div>
          {verified && (
            <RiCheckboxCircleLine
              size={18}
              className="text-gold shrink-0 mt-0.5"
              title="Verified Venue"
            />
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill
                key={i}
                size={11}
                className={i < Math.floor(rating) ? "text-gold" : "text-cream"}
              />
            ))}
          </div>
          <span className="text-xs font-semibold font-body text-dark">{rating}</span>
          <span className="text-xs text-muted font-body">({reviewCount} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                         bg-cream text-muted border border-gold/15"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                             bg-cream text-muted border border-gold/15">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-cream mt-auto" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="font-body text-[10px] text-muted uppercase tracking-wide">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-semibold text-maroon">
                {FORMAT_PRICE(price)}
              </span>
              <span className="text-xs text-muted font-body">{priceUnit}</span>
            </div>
          </div>

          <Link
            to={`/venues/${id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2
                       rounded-full text-xs font-body font-medium
                       bg-maroon text-ivory shadow-maroon
                       hover:bg-maroon-dark hover:-translate-y-0.5
                       transition-all duration-200"
          >
            View Details
            <RiArrowRightLine size={13} />
          </Link>
        </div>
      </div>

      {/* Gold bottom reveal on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-gold-gradient scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />
    </motion.div>
  );
}