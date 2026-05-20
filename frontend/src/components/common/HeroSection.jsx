import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  RiSparklingLine,
  RiArrowRightLine,
  RiPlayCircleLine,
  RiStarFill,
} from "react-icons/ri";

// High-quality Unsplash wedding images (landscape, no auth needed)
const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=85&auto=format&fit=crop",
    caption: "Palatial Venues",
    city: "Udaipur",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1800&q=85&auto=format&fit=crop",
    caption: "Timeless Moments",
    city: "Jaipur",
  },
  {
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1800&q=85&auto=format&fit=crop",
    caption: "Sacred Celebrations",
    city: "Varanasi",
  },
];

const STATS = [
  { value: "5,000+", label: "Weddings Planned" },
  { value: "1,200+", label: "Verified Vendors" },
  { value: "50+",    label: "Cities Covered" },
  { value: "4.9★",   label: "Average Rating" },
];

// Stagger container
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.3 },
  },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrapperRef = useRef(null);

  // Parallax
  const { scrollY } = useScroll();
  const imageY  = useTransform(scrollY, [0, 600], [0, 90]);
  const textY   = useTransform(scrollY, [0, 600], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Auto-cycle slides
  useEffect(() => {
    const id = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide(s => (s + 1) % HERO_SLIDES.length);
        setIsTransitioning(false);
      }, 600);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const goToSlide = (i) => {
    if (i === activeSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(i);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section
      ref={wrapperRef}
      className="relative w-full min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110 origin-center"
      >
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.url}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === activeSlide && !isTransitioning ? 1 : 0 }}
          >
            <img
              src={slide.url}
              alt={slide.caption}
              className="w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </motion.div>

      {/* ── Layered overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-b
                      from-dark/20 via-dark/40 to-dark/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r
                      from-maroon/30 via-transparent to-transparent z-10" />

      {/* ── Decorative top-left ornament ── */}
      <div className="absolute top-8 left-8 z-20 hidden lg:block">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="1" y="1" width="30" height="30" rx="2"
                stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="49" y="1" width="30" height="30" rx="2"
                stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.25" />
          <rect x="1" y="49" width="30" height="30" rx="2"
                stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="65" cy="65" r="4" fill="#C9A84C" fillOpacity="0.4" />
        </svg>
      </div>

      {/* ── Main hero content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 flex-1 flex flex-col items-center
                   justify-center text-center px-4 sm:px-6 lg:px-8
                   pt-20 pb-32"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto"
        >
          {/* Eyebrow label */}
          <motion.div variants={item} className="flex items-center justify-center gap-2 mb-6">
            <RiSparklingLine className="text-gold" size={14} />
            <span className="label-gold !text-gold/90 tracking-[0.25em]">
              AI Powered Wedding Planning
            </span>
            <RiSparklingLine className="text-gold" size={14} />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={item}
            className="font-heading font-semibold text-ivory leading-[1.05]
                       text-[clamp(3rem,7vw,6.5rem)] mb-6 text-balance"
          >
            Your Dream Wedding,{" "}
            <em className="not-italic text-shimmer">
              Perfectly Planned
            </em>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={item}
            className="font-body text-lg md:text-xl text-ivory/70
                       leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Discover curated venues, verified vendors, and AI-guided planning tools - 
            all in one platform built for India's most beautiful celebrations.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link to="/venues" className="btn-gold !text-sm !px-9 !py-4 !rounded-full">
              Explore Venues
              <RiArrowRightLine size={16} />
            </Link>
            <Link
              to="/vendors"
              className="inline-flex items-center gap-2.5 px-9 py-4
                         rounded-full text-sm font-body font-medium
                         text-ivory border border-ivory/30
                         backdrop-blur-sm bg-white/8
                         hover:bg-white/15 hover:border-ivory/50
                         transition-all duration-300"
            >
              <RiPlayCircleLine size={18} className="text-gold" />
              Watch How It Works
            </Link>
          </motion.div>

          {/* Rating strip */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-3 px-5 py-3
                       rounded-full bg-white/10 backdrop-blur-md
                       border border-white/15"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <RiStarFill key={i} size={12} className="text-gold" />
              ))}
            </div>
            <span className="text-xs text-ivory/80 font-body">
              Trusted by <strong className="text-ivory font-semibold">50,000+</strong> couples across India
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
                      flex items-center gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group flex items-center gap-2"
            aria-label={`Slide ${i + 1}: ${slide.city}`}
          >
            <span
              className={`block transition-all duration-500 rounded-full
                ${i === activeSlide
                  ? "w-8 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-ivory/40 hover:bg-ivory/70"
                }`}
            />
            {i === activeSlide && (
              <span className="text-[10px] text-ivory/60 font-body tracking-widest uppercase hidden sm:inline">
                {slide.city}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Stats bar pinned at bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative z-20 border-t border-white/10 bg-dark/50 backdrop-blur-md"
      >
        <div className="container-luxury px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center justify-center py-5
                            ${i < STATS.length - 1 ? "border-r border-white/10" : ""}
                            ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""}`}
              >
                <span className="font-heading text-2xl md:text-3xl font-semibold text-gold leading-none mb-1">
                  {value}
                </span>
                <span className="font-body text-[11px] text-ivory/45 tracking-wide uppercase">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}