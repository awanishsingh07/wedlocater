import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiStarFill, RiCheckboxCircleLine, RiArrowLeftLine,
  RiHeartLine, RiHeartFill, RiShareLine, RiCameraLine,
  RiAwardLine, RiCalendarLine, RiArrowRightLine, RiSparklingLine,
  RiPhoneLine, RiWhatsappLine,
} from "react-icons/ri";
import PortfolioGrid  from "../../components/photographer/PortfolioGrid";
import PackageCard    from "../../components/photographer/PackageCard";
import ReviewCard     from "../../components/vendor/ReviewCard";
import PhotographerCard from "../../components/photographer/PhotographerCard";
import { photographerService } from "../../services/photographerService";

export default function PhotographerDetails() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [liked, setLiked] = useState(false);
  const [tab,   setTab]   = useState("packages");

  const p       = photographerService.getById(id);
  const similar = photographerService.getSimilar(id);

  if (!p) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <span className="text-5xl">📷</span>
      <h2 className="font-heading text-display-sm text-dark">Photographer not found</h2>
      <Link to="/photographers" className="btn-primary">Browse All Photographers</Link>
    </div>
  );

  return (
    <div className="bg-ivory min-h-screen">

      {/* Breadcrumb */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-xs font-body text-muted">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>›</span>
          <Link to="/photographers" className="hover:text-gold transition-colors">Photographers</Link>
          <span>›</span>
          <span className="text-dark truncate">{p.name}</span>
        </div>
      </div>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Cover + profile ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative rounded-luxury-lg overflow-hidden mb-8 h-52 sm:h-64">
          <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-end gap-4">
            <div className="relative">
              <img src={p.avatar} alt={p.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover
                           border-3 border-gold shadow-gold" />
              {p.verified && (
                <RiCheckboxCircleLine size={20} className="absolute -bottom-1 -right-1 text-gold bg-white rounded-full" />
              )}
            </div>
            <div>
              <h1 className="font-heading text-xl sm:text-2xl font-semibold text-ivory">{p.name}</h1>
              <p className="font-heading text-sm text-gold italic">"{p.tagline}"</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => setLiked(v => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md
                         border border-white/30 text-xs font-body font-medium text-ivory
                         hover:bg-white/30 transition-all">
              {liked ? <RiHeartFill size={14} className="text-maroon" /> : <RiHeartLine size={14} />} Save
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md
                               border border-white/30 text-xs font-body font-medium text-ivory
                               hover:bg-white/30 transition-all">
              <RiShareLine size={14} /> Share
            </button>
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md
                         border border-white/30 text-xs font-body font-medium text-ivory
                         hover:bg-white/30 transition-all">
              <RiArrowLeftLine size={14} /> Back
            </button>
          </div>
        </motion.div>

        {/* ── Meta strip ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 p-4 sm:p-5
                     bg-white rounded-luxury border border-cream shadow-luxury">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <RiMapPinLine size={15} className="text-gold" /> {p.city}, {p.state}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <RiStarFill key={i} size={13}
                  className={i < Math.floor(p.rating) ? "text-gold" : "text-cream"} />
              ))}
            </div>
            <span className="font-body text-sm font-semibold text-dark">{p.rating}</span>
            <span className="font-body text-xs text-muted">({p.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <RiAwardLine size={15} className="text-gold" /> {p.experience} years experience
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <RiCameraLine size={15} className="text-gold" /> {p.weddings}+ weddings
          </div>
          {p.available && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                             bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-body font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for booking
            </span>
          )}
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

          {/* Left: main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Portfolio */}
            <section>
              <p className="label-gold mb-4">Portfolio Gallery</p>
              <PortfolioGrid images={p.portfolioImages} name={p.name} />
            </section>

            {/* About */}
            <section className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
              <p className="label-gold mb-3">About</p>
              <p className="font-body text-base text-muted leading-relaxed mb-5">{p.about}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-cream/60 rounded-xl border border-cream">
                  <p className="label-gold !text-[9px] mb-1">Styles</p>
                  <p className="font-body text-xs text-dark">{p.styles.join(", ")}</p>
                </div>
                <div className="p-3 bg-cream/60 rounded-xl border border-cream">
                  <p className="label-gold !text-[9px] mb-1">Services</p>
                  <p className="font-body text-xs text-dark">{p.services.join(", ")}</p>
                </div>
                <div className="p-3 bg-cream/60 rounded-xl border border-cream">
                  <p className="label-gold !text-[9px] mb-1">Equipment</p>
                  <p className="font-body text-xs text-dark">{p.equipment.slice(0, 2).join(", ")}</p>
                </div>
                {p.awards.length > 0 && (
                  <div className="p-3 bg-cream/60 rounded-xl border border-cream">
                    <p className="label-gold !text-[9px] mb-1">Awards</p>
                    <p className="font-body text-xs text-dark">{p.awards[0]}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Tabs: packages / reviews */}
            <section>
              <div className="flex gap-0 border-b border-cream mb-6">
                {[
                  { key: "packages", label: `Packages (${p.packages.length})` },
                  { key: "reviews",  label: `Reviews (${p.reviewCount})`       },
                ].map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`relative px-6 py-3.5 text-sm font-body font-medium shrink-0 transition-colors
                                ${tab === t.key ? "text-maroon" : "text-muted hover:text-dark"}`}>
                    {t.label}
                    {tab === t.key && (
                      <motion.span layoutId="phot-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                ))}
              </div>

              {tab === "packages" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {p.packages.map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={i}
                      onSelect={() => navigate("/register")} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {p.reviews.map((rev, i) => <ReviewCard key={rev.id} review={rev} index={i} />)}
                </div>
              )}
            </section>
          </div>

          {/* Right: sticky contact card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-24 bg-white rounded-luxury-lg border border-cream
                         shadow-luxury-lg p-6 flex flex-col gap-5">
              <div>
                <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">Starting from</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-4xl font-semibold text-maroon">
                    {`₹${(p.basePrice / 100000).toFixed(1)}L`}
                  </span>
                  <span className="font-body text-sm text-muted">{p.priceUnit}</span>
                </div>
              </div>
              <div className="h-px bg-cream" />
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <RiCalendarLine size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                  <input type="date" className="input-luxury !pl-10 text-sm"
                    min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <button onClick={() => navigate("/register")} className="btn-primary w-full !justify-center !py-4">
                <RiCalendarLine size={16} /> Book This Photographer
              </button>
              <button className="btn-secondary w-full !justify-center !py-3 !text-xs">
                Request a Quote <RiArrowRightLine size={14} />
              </button>
              <div className="h-px bg-cream" />
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                   border border-cream text-xs font-body font-medium text-dark
                                   hover:border-gold hover:text-gold transition-all">
                  <RiPhoneLine size={14} /> Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                                   border border-emerald-200 bg-emerald-50 text-xs font-body
                                   font-medium text-emerald-700 hover:bg-emerald-100 transition-all">
                  <RiWhatsappLine size={14} /> WhatsApp
                </button>
              </div>
              <p className="text-[10px] text-center text-muted font-body leading-relaxed">
                <RiSparklingLine className="inline text-gold mr-1" size={11} />
                Free enquiry · No booking fees · Verified artist
              </p>
            </motion.div>
          </div>
        </div>

        {/* Similar photographers */}
        {similar.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="label-gold mb-2">You Might Also Like</p>
                <h2 className="font-heading text-display-sm text-dark">Similar Photographers</h2>
              </div>
              <Link to="/photographers" className="font-body text-xs font-medium text-maroon
                                                   hover:text-gold transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {similar.map((ph, i) => <PhotographerCard key={ph.id} photographer={ph} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}