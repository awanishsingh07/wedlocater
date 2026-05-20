import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiHeartLine,
  RiHeartFill,
  RiStarFill,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiPhoneLine,
  RiWhatsappLine,
  RiTimeLine,
  RiShieldCheckLine,
} from "react-icons/ri";

/*
  Props:
  ─────────────────────────────────────────────────────────
  id           string | number
  name         string            – vendor / business name
  category     string            – "Caterer" | "Decorator" | "DJ" etc.
  categoryIcon React component   – icon for the category (optional)
  location     string
  image        string            – cover image URL
  logo         string            – brand logo / avatar (optional)
  price        number            – starting price
  priceUnit    string            – "per plate" | "per event" etc.
  rating       number
  reviewCount  number
  tags         string[]          – feature tags
  highlights   string[]          – 2-3 key selling points
  yearsActive  number
  verified     boolean
  featured     boolean
  insured      boolean           – shows insurance badge
  responseTime string            – "< 1 hour" | "Same day"
  className    string
  onWishlist   fn(id, state)
  wishlisted   boolean
  onContact    fn(id)            – callback for contact button
  ─────────────────────────────────────────────────────────
*/

const FORMAT_PRICE = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

export default function VendorCard({
  id            = "1",
  name          = "Royal Feast Caterers",
  category      = "Caterer",
  categoryIcon  = null,
  location      = "Delhi, NCR",
  image         = "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&auto=format&fit=crop",
  logo          = "",
  price         = 1200,
  priceUnit     = "per plate",
  rating        = 4.7,
  reviewCount   = 184,
  tags          = ["Multi-Cuisine", "Live Counters", "Hygienic", "Royal Thali"],
  highlights    = ["500+ events catered", "Personal chef assigned", "Tasting session free"],
  yearsActive   = 12,
  verified      = true,
  featured      = false,
  insured       = true,
  responseTime  = "< 2 hours",
  className     = "",
  onWishlist    = () => {},
  wishlisted    = false,
  onContact     = () => {},
}) {
  const [liked, setLiked] = useState(wishlisted);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    onWishlist(id, next);
  };

  const handleContact = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onContact(id);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative bg-white rounded-luxury border border-cream
                  shadow-luxury hover:shadow-luxury-md overflow-hidden
                  flex flex-col h-full ${className}`}
    >
      {/* ── Cover image ── */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500 ease-luxury"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-dark/55 via-dark/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && (
            <span className="badge-gold !text-[10px] !py-0.5">✦ Featured</span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1
                           bg-dark/50 backdrop-blur-sm rounded-full
                           text-[10px] text-ivory font-body font-medium">
            {categoryIcon ? <categoryIcon size={10} /> : null}
            {category}
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          aria-label="Toggle wishlist"
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

        {/* Bottom meta */}
        <div className="absolute bottom-3 left-3 right-3
                        flex items-end justify-between">
          {/* Logo / avatar */}
          {logo && (
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-white/80
                            shadow-sm overflow-hidden">
              <img src={logo} alt={name} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Response time chip */}
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1
                          bg-white/20 backdrop-blur-md rounded-full
                          border border-white/25">
            <RiTimeLine size={11} className="text-gold" />
            <span className="text-[10px] text-ivory font-body">
              Responds {responseTime}
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-3">

        {/* Name + verified + location */}
        <div>
          <div className="flex items-start gap-1.5">
            <h3 className="font-heading text-lg font-semibold text-dark
                           group-hover:text-maroon transition-colors duration-200
                           leading-snug flex-1">
              {name}
            </h3>
            {verified && (
              <RiCheckboxCircleLine
                size={17}
                className="text-gold shrink-0 mt-0.5"
                title="Verified Vendor"
              />
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <RiMapPinLine size={11} className="text-gold shrink-0" />
            <span className="text-xs text-muted">{location}</span>
            <span className="text-muted mx-1">·</span>
            <span className="text-[11px] text-muted font-body">{yearsActive} yrs active</span>
          </div>
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

        {/* Highlights list */}
        <ul className="flex flex-col gap-1.5">
          {highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
              <span className="text-[11px] text-muted font-body">{h}</span>
            </li>
          ))}
        </ul>

        {/* Trust badges */}
        <div className="flex items-center gap-3">
          {insured && (
            <div className="flex items-center gap-1">
              <RiShieldCheckLine size={13} className="text-gold" />
              <span className="text-[10px] font-body text-muted">Insured</span>
            </div>
          )}
          {verified && (
            <div className="flex items-center gap-1">
              <RiCheckboxCircleLine size={13} className="text-gold" />
              <span className="text-[10px] font-body text-muted">Background Verified</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-cream mt-auto" />

        {/* Price + actions */}
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

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* WhatsApp quick contact */}
            <button
              onClick={handleContact}
              className="w-8 h-8 rounded-full border border-gold/30
                         flex items-center justify-center text-gold
                         hover:bg-gold hover:text-white hover:border-gold
                         transition-all duration-200"
              aria-label="Contact via WhatsApp"
            >
              <RiWhatsappLine size={15} />
            </button>

            <Link
              to={`/vendors/${id}`}
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
      </div>

      {/* Gold hover border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-gold-gradient scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />
    </motion.div>
  );
}