import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiArrowLeftLine, RiMapPinLine, RiGroupLine, RiStarFill,
  RiCheckboxCircleLine, RiHeartLine, RiHeartFill,
  RiShareLine, RiPhoneLine, RiWhatsappLine,
  RiCalendarLine, RiArrowRightLine, RiSparklingLine,
} from "react-icons/ri";
import VenueGallery  from "../../components/venue/VenueGallery";
import VenueInfo     from "../../components/venue/VenueInfo";
import VenueReview   from "../../components/venue/VenueReview";
import VenueCard     from "../../components/venue/VenueCard";
import { venueService } from "../../services/venueService";

const FMT = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
              : `₹${n.toLocaleString("en-IN")}`;

// ── Sticky price card ─────────────────────────────────────────────────
function PriceCard({ venue, onBook }) {
  const [date,   setDate]   = useState("");
  const [guests, setGuests] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 bg-white rounded-luxury-lg border border-cream
                 shadow-luxury-lg p-6 flex flex-col gap-5"
    >
      {/* Price */}
      <div>
        <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">
          Starting from
        </p>
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="font-heading text-4xl font-semibold text-maroon">
            {FMT(venue.price)}
          </span>
          <span className="font-body text-sm text-muted">{venue.priceUnit}</span>
        </div>
        <p className="font-body text-xs text-muted">
          ₹{venue.pricePerPlate.toLocaleString("en-IN")} per plate (estimated)
        </p>
      </div>

      <div className="h-px bg-cream" />

      {/* Date picker */}
      <div className="flex flex-col gap-1.5">
        <label className="label-maroon !text-[10px]">Wedding Date</label>
        <div className="relative">
          <RiCalendarLine size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="input-luxury !pl-10 text-sm"
            min={new Date().toISOString().split("T")[0]} />
        </div>
      </div>

      {/* Guest count */}
      <div className="flex flex-col gap-1.5">
        <label className="label-maroon !text-[10px]">Approx. Guests</label>
        <div className="relative">
          <RiGroupLine size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
          <select value={guests} onChange={e => setGuests(e.target.value)}
            className="select-luxury !pl-10 text-sm">
            <option value="">Select guest count</option>
            {["Up to 200", "200–500", "500–1000", "1000–1500", "1500+"].map(g => (
              <option key={g} value={g}>{g} guests</option>
            ))}
          </select>
        </div>
      </div>

      {/* Book now */}
      <button onClick={onBook} className="btn-primary w-full !justify-center !py-4">
        <RiCalendarLine size={16} />
        Book This Venue
      </button>

      <button className="btn-secondary w-full !justify-center !py-3 !text-xs">
        Request a Site Visit
        <RiArrowRightLine size={14} />
      </button>

      {/* Contact */}
      <div className="h-px bg-cream" />
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                           border border-cream text-xs font-body font-medium text-dark
                           hover:border-gold hover:text-gold transition-all duration-200">
          <RiPhoneLine size={14} /> Call
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                           border border-emerald-200 bg-emerald-50 text-xs font-body
                           font-medium text-emerald-700
                           hover:bg-emerald-100 transition-all duration-200">
          <RiWhatsappLine size={14} /> WhatsApp
        </button>
      </div>

      {/* Trust note */}
      <p className="text-[10px] text-center text-muted font-body leading-relaxed">
        <RiSparklingLine className="inline text-gold mr-1" size={11} />
        Free to enquire · No booking fees · Verified venue
      </p>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function VenueDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [liked, setLiked]   = useState(false);
  const [tab,   setTab]     = useState("info");

  const venue   = venueService.getById(id);
  const similar = venueService.getSimilar(id);

  if (!venue) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <span className="text-5xl">🏛️</span>
        <h2 className="font-heading text-display-sm text-dark">Venue not found</h2>
        <Link to="/venues" className="btn-primary">Browse All Venues</Link>
      </div>
    );
  }

  const handleBook = () => navigate("/register");

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-xs font-body text-muted">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>›</span>
          <Link to="/venues" className="hover:text-gold transition-colors">Venues</Link>
          <span>›</span>
          <span className="text-dark truncate">{venue.name}</span>
        </div>
      </div>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Title row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start
                        justify-between gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                               bg-maroon/8 border border-maroon/15
                               text-[10px] font-body font-medium text-maroon">
                {venue.venueType}
              </span>
              {venue.featured && <span className="badge-gold">✦ Featured</span>}
              {venue.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-body
                                 font-medium text-gold-dark">
                  <RiCheckboxCircleLine size={12} />
                  Verified
                </span>
              )}
            </div>
            <h1 className="font-heading text-display-md text-dark mb-1.5">
              {venue.name}
            </h1>
            <p className="font-heading text-lg text-gold italic mb-2">
              "{venue.tagline}"
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted">
                <RiMapPinLine size={14} className="text-gold" />
                {venue.city}, {venue.state}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} size={13}
                      className={i < Math.floor(venue.rating) ? "text-gold" : "text-cream"} />
                  ))}
                </div>
                <span className="font-body text-sm font-semibold text-dark">{venue.rating}</span>
                <span className="font-body text-xs text-muted">
                  ({venue.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-muted">
                <RiGroupLine size={14} className="text-gold" />
                {venue.capacity.min}–{venue.capacity.max} guests
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-center gap-2 shrink-0"
          >
            <button onClick={() => setLiked(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         border border-cream bg-white text-xs font-body font-medium
                         hover:border-maroon hover:text-maroon transition-all duration-200">
              {liked
                ? <><RiHeartFill size={15} className="text-maroon" /> Saved</>
                : <><RiHeartLine size={15} /> Save</>
              }
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                               border border-cream bg-white text-xs font-body font-medium
                               hover:border-gold hover:text-gold transition-all duration-200">
              <RiShareLine size={15} />
              Share
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         border border-cream bg-white text-xs font-body font-medium
                         text-muted hover:border-gold transition-all duration-200"
            >
              <RiArrowLeftLine size={14} />
              Back
            </button>
          </motion.div>
        </div>

        {/* ── Gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-10"
        >
          <VenueGallery images={venue.images} venueName={venue.name} />
        </motion.div>

        {/* ── Body: info + sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

          {/* Left column */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Tab bar */}
            <div className="flex gap-0 border-b border-cream overflow-x-auto hide-scrollbar">
              {[
                { key: "info",    label: "Venue Info"   },
                { key: "reviews", label: `Reviews (${venue.reviewCount})` },
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative px-6 py-3.5 text-sm font-body font-medium
                               shrink-0 transition-colors duration-200
                               ${tab === t.key ? "text-maroon" : "text-muted hover:text-dark"}`}
                >
                  {t.label}
                  {tab === t.key && (
                    <motion.span
                      layoutId="tab-line"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {tab === "info" ? (
              <VenueInfo venue={venue} />
            ) : (
              <VenueReview
                reviews={venue.reviews}
                rating={venue.rating}
                reviewCount={venue.reviewCount}
              />
            )}
          </div>

          {/* Right sticky column — price card */}
          <div className="lg:col-span-1">
            <PriceCard venue={venue} onBook={handleBook} />
          </div>
        </div>

        {/* ── Similar venues ── */}
        <section className="mt-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="label-gold mb-2">You Might Also Love</p>
              <h2 className="font-heading text-display-sm text-dark">Similar Venues</h2>
            </div>
            <Link to="/venues"
              className="font-body text-xs font-medium text-maroon hover:text-gold
                         transition-colors duration-200 whitespace-nowrap">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {similar.map((v, i) => (
              <VenueCard key={v.id} venue={v} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}