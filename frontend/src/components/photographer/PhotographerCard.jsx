import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiHeartLine, RiHeartFill, RiStarFill,
  RiArrowRightLine, RiCheckboxCircleLine, RiCameraLine,
  RiAwardLine, RiVideoLine,
} from "react-icons/ri";

const FMT = (n) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;
const SVC_ICON = { Photography: RiCameraLine, Videography: RiVideoLine };

export default function PhotographerCard({ photographer: p, index = 0 }) {
  const [liked,     setLiked]     = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  if (!p) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-luxury border border-cream
                 shadow-luxury hover:shadow-luxury-md overflow-hidden flex flex-col h-full"
    >
      {/* Portfolio strip */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img src={p.portfolioImages[activeImg]} alt={p.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-luxury" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.featured && <span className="badge-gold !text-[10px] !py-0.5">✦ Featured</span>}
          {p.available
            ? <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90
                               rounded-full text-[10px] text-white font-body font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Available
              </span>
            : <span className="px-2.5 py-1 bg-dark/60 rounded-full text-[10px] text-ivory/70 font-body">
                Booked Out
              </span>
          }
        </div>
        <button onClick={(e) => { e.preventDefault(); setLiked(v => !v); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md
                     border border-white/30 flex items-center justify-center
                     hover:bg-white/40 transition-all duration-200">
          {liked ? <RiHeartFill size={15} className="text-maroon" /> : <RiHeartLine size={15} className="text-ivory" />}
        </button>
        {/* Portfolio thumbnails */}
        {p.portfolioImages.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {p.portfolioImages.slice(0, 3).map((img, i) => (
              <button key={i} onMouseEnter={() => setActiveImg(i)}
                onClick={(e) => { e.preventDefault(); setActiveImg(i); }}
                className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all
                            ${i === activeImg ? "border-gold" : "border-white/40"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        {/* Avatar */}
        <div className="absolute bottom-3 left-3">
          <div className="relative w-10 h-10">
            <img src={p.avatar} alt={p.name}
              className="w-full h-full rounded-full object-cover border-2 border-gold shadow-gold" />
            {p.verified && (
              <RiCheckboxCircleLine size={13} className="absolute -bottom-0.5 -right-0.5
                                                         text-gold bg-white rounded-full" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-2.5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-dark
                         group-hover:text-maroon transition-colors leading-snug">{p.name}</h3>
          <p className="font-body text-xs text-gold-dark italic mt-0.5">"{p.tagline}"</p>
          <div className="flex items-center gap-1 mt-1">
            <RiMapPinLine size={11} className="text-gold shrink-0" />
            <span className="text-xs text-muted">{p.city}, {p.state}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} size={11}
                className={i < Math.floor(p.rating) ? "text-gold" : "text-cream"} />
            ))}
          </div>
          <span className="text-xs font-semibold font-body text-dark">{p.rating}</span>
          <span className="text-xs text-muted font-body">({p.reviewCount})</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.styles.map(s => (
            <span key={s} className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                                     bg-cream text-muted border border-gold/15">{s}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {p.services.slice(0, 3).map(srv => {
            const Icon = SVC_ICON[srv] || RiCameraLine;
            return (
              <div key={srv} className="flex items-center gap-1">
                <Icon size={12} className="text-gold-dark" />
                <span className="text-[11px] font-body text-muted">{srv}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 py-2.5 px-3 bg-cream/60 rounded-xl border border-cream">
          <div className="flex items-center gap-1.5">
            <RiAwardLine size={13} className="text-gold" />
            <div>
              <p className="text-xs font-semibold font-body text-dark">{p.experience} yrs</p>
              <p className="text-[10px] text-muted font-body">Experience</p>
            </div>
          </div>
          <div className="w-px h-7 bg-gold/20" />
          <div className="flex items-center gap-1.5">
            <RiCameraLine size={13} className="text-gold" />
            <div>
              <p className="text-xs font-semibold font-body text-dark">{p.weddings}+</p>
              <p className="text-[10px] text-muted font-body">Weddings</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-cream mt-auto" />
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="font-body text-[10px] text-muted uppercase tracking-wide">From</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-semibold text-maroon">{FMT(p.basePrice)}</span>
              <span className="text-xs text-muted font-body">{p.priceUnit}</span>
            </div>
          </div>
          <Link to={`/photographers/${p.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body
                       font-medium bg-maroon text-ivory shadow-maroon
                       hover:bg-maroon-dark hover:-translate-y-0.5 transition-all duration-200">
            View Profile <RiArrowRightLine size={13} />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}