import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiHeartLine,
  RiHeartFill,
  RiStarFill,
  RiArrowRightLine,
  RiCameraLine,
  RiVideoLine,
  RiCheckboxCircleLine,
  RiImageLine,
  RiAwardLine,
} from "react-icons/ri";

/*
  Props:
  ─────────────────────────────────────────────────────────
  id             string | number
  name           string            – photographer / studio name
  tagline        string            – short creative tagline
  location       string
  avatar         string            – profile photo URL
  portfolioImgs  string[]          – 3 portfolio preview images
  price          number            – starting price (₹)
  priceUnit      string            – "per day" | "per event"
  rating         number
  reviewCount    number
  styles         string[]          – ["Candid", "Traditional", "Cinematic"]
  services       string[]          – ["Photography", "Videography", "Drone"]
  experience     number            – years of experience
  weddings       number            – total weddings shot
  verified       boolean
  featured       boolean
  available      boolean           – shows availability chip
  className      string
  onWishlist     fn(id, state)
  wishlisted     boolean
  ─────────────────────────────────────────────────────────
*/

const FORMAT_PRICE = (n) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

const SERVICE_ICON = { Photography: RiCameraLine, Videography: RiVideoLine, Drone: RiImageLine };

export default function PhotographerCard({
  id            = "1",
  name          = "Arjun Mehta Photography",
  tagline       = "Where light meets emotion",
  location      = "Mumbai, Maharashtra",
  avatar        = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&faces=true",
  portfolioImgs = [
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80&auto=format&fit=crop",
  ],
  price         = 80000,
  priceUnit     = "per day",
  rating        = 4.9,
  reviewCount   = 218,
  styles        = ["Candid", "Traditional", "Cinematic"],
  services      = ["Photography", "Videography", "Drone"],
  experience    = 8,
  weddings      = 430,
  verified      = true,
  featured      = false,
  available     = true,
  className     = "",
  onWishlist    = () => {},
  wishlisted    = false,
}) {
  const [liked, setLiked]         = useState(wishlisted);
  const [activeImg, setActiveImg] = useState(0);

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
      {/* ── Portfolio strip ── */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {/* Main portfolio image */}
        <img
          src={portfolioImgs[activeImg]}
          alt={`${name} portfolio`}
          loading="lazy"
          className="w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500 ease-luxury"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-dark/60 via-dark/10 to-transparent" />

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {featured && (
            <span className="badge-gold !text-[10px] !py-0.5 shadow-sm">✦ Featured</span>
          )}
          {available && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1
                             bg-emerald-500/90 backdrop-blur-sm rounded-full
                             text-[10px] text-white font-body font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available
            </span>
          )}
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

        {/* Portfolio thumbnail strip */}
        {portfolioImgs.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {portfolioImgs.map((img, i) => (
              <button
                key={i}
                onMouseEnter={() => setActiveImg(i)}
                onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all duration-200
                  ${i === activeImg ? "border-gold" : "border-white/40 hover:border-white"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Avatar pinned bottom-left */}
        <div className="absolute bottom-3 left-3">
          <div className="relative w-11 h-11">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover
                         border-2 border-gold shadow-gold"
            />
            {verified && (
              <RiCheckboxCircleLine
                size={14}
                className="absolute -bottom-0.5 -right-0.5 text-gold bg-white rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-3">

        {/* Name + location */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-dark
                         group-hover:text-maroon transition-colors duration-200
                         leading-snug">
            {name}
          </h3>
          <p className="font-body text-xs text-gold-dark italic mt-0.5 leading-snug">
            "{tagline}"
          </p>
          <div className="flex items-center gap-1 mt-1">
            <RiMapPinLine size={11} className="text-gold shrink-0" />
            <span className="text-xs text-muted">{location}</span>
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
          <span className="text-xs text-muted font-body">({reviewCount})</span>
        </div>

        {/* Services icons */}
        <div className="flex items-center gap-3">
          {services.map((srv) => {
            const Icon = SERVICE_ICON[srv] || RiCameraLine;
            return (
              <div key={srv} className="flex items-center gap-1">
                <Icon size={13} className="text-gold-dark" />
                <span className="text-[11px] font-body text-muted">{srv}</span>
              </div>
            );
          })}
        </div>

        {/* Style tags */}
        <div className="flex flex-wrap gap-1.5">
          {styles.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                         bg-cream text-muted border border-gold/15"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Experience + weddings stats */}
        <div className="flex items-center gap-4 py-2.5 px-3
                        bg-cream/60 rounded-xl border border-gold/10">
          <div className="flex items-center gap-1.5">
            <RiAwardLine size={13} className="text-gold" />
            <div>
              <p className="text-xs font-semibold text-dark font-body">{experience} yrs</p>
              <p className="text-[10px] text-muted font-body">Experience</p>
            </div>
          </div>
          <div className="w-px h-7 bg-gold/20" />
          <div className="flex items-center gap-1.5">
            <RiCameraLine size={13} className="text-gold" />
            <div>
              <p className="text-xs font-semibold text-dark font-body">{weddings}+</p>
              <p className="text-[10px] text-muted font-body">Weddings</p>
            </div>
          </div>
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
            to={`/photographers/${id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2
                       rounded-full text-xs font-body font-medium
                       bg-maroon text-ivory shadow-maroon
                       hover:bg-maroon-dark hover:-translate-y-0.5
                       transition-all duration-200"
          >
            View Profile
            <RiArrowRightLine size={13} />
          </Link>
        </div>
      </div>

      {/* Gold hover border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-gold-gradient scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 origin-left" />
    </motion.div>
  );
}