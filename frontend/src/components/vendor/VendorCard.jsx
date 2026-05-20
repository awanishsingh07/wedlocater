import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiHeartLine, RiHeartFill, RiStarFill,
  RiArrowRightLine, RiCheckboxCircleLine, RiWhatsappLine, RiTimeLine,
} from "react-icons/ri";

const FMT = (n, unit) => {
  if (unit === "per plate") return `₹${n.toLocaleString("en-IN")}/plate`;
  return n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;
};

export default function VendorCard({ vendor, index = 0, detailBase = "/vendors" }) {
  const [liked, setLiked] = useState(false);
  if (!vendor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-luxury border border-cream
                 shadow-luxury hover:shadow-luxury-md overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <img src={vendor.coverImage} alt={vendor.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-luxury" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vendor.featured && <span className="badge-gold !text-[10px] !py-0.5">✦ Featured</span>}
          <span className="px-2.5 py-1 bg-dark/50 backdrop-blur-sm rounded-full
                           text-[10px] text-ivory font-body font-medium">
            {vendor.category}
          </span>
        </div>
        <button onClick={(e) => { e.preventDefault(); setLiked(v => !v); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md
                     border border-white/30 flex items-center justify-center
                     hover:bg-white/40 transition-all duration-200">
          {liked ? <RiHeartFill size={15} className="text-maroon" /> : <RiHeartLine size={15} className="text-ivory" />}
        </button>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1
                        bg-white/20 backdrop-blur-md rounded-full border border-white/25">
          <RiTimeLine size={11} className="text-gold" />
          <span className="text-[10px] text-ivory font-body">Responds {vendor.responseTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pb-5 gap-3">
        <div>
          <div className="flex items-start gap-1.5">
            <h3 className="font-heading text-lg font-semibold text-dark
                           group-hover:text-maroon transition-colors duration-200 flex-1 leading-snug">
              {vendor.name}
            </h3>
            {vendor.verified && <RiCheckboxCircleLine size={17} className="text-gold shrink-0 mt-0.5" />}
          </div>
          <p className="font-body text-xs text-gold-dark italic mt-0.5">"{vendor.tagline}"</p>
          <div className="flex items-center gap-1 mt-1">
            <RiMapPinLine size={11} className="text-gold shrink-0" />
            <span className="text-xs text-muted">{vendor.city} · {vendor.yearsActive} yrs</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill key={i} size={11}
                className={i < Math.floor(vendor.rating) ? "text-gold" : "text-cream"} />
            ))}
          </div>
          <span className="text-xs font-semibold font-body text-dark">{vendor.rating}</span>
          <span className="text-xs text-muted font-body">({vendor.reviewCount})</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {vendor.tags.slice(0, 3).map(t => (
            <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                                     bg-cream text-muted border border-gold/15">{t}</span>
          ))}
          {vendor.tags.length > 3 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-body
                             bg-cream text-muted border border-gold/15">+{vendor.tags.length - 3}</span>
          )}
        </div>

        <ul className="flex flex-col gap-1">
          {vendor.highlights.slice(0, 2).map(h => (
            <li key={h} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
              <span className="text-[11px] text-muted font-body">{h}</span>
            </li>
          ))}
        </ul>

        <div className="h-px bg-cream mt-auto" />

        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="font-body text-[10px] text-muted uppercase tracking-wide">Starting</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-semibold text-maroon">
                {FMT(vendor.basePrice, vendor.priceUnit)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center
                               text-gold hover:bg-gold hover:text-white hover:border-gold transition-all">
              <RiWhatsappLine size={15} />
            </button>
            <Link to={`${detailBase}/${vendor.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                         text-xs font-body font-medium bg-maroon text-ivory shadow-maroon
                         hover:bg-maroon-dark hover:-translate-y-0.5 transition-all duration-200">
              View Details <RiArrowRightLine size={13} />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}