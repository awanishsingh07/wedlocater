import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine, RiStarFill, RiCheckboxCircleLine, RiArrowLeftLine,
  RiHeartLine, RiHeartFill, RiShareLine, RiTimeLine,
  RiShieldCheckLine, RiPhoneLine, RiWhatsappLine,
  RiCalendarLine, RiArrowRightLine, RiSparklingLine,
} from "react-icons/ri";
import VendorGallery     from "../../components/vendor/VendorGallery";
import VendorPackageCard from "../../components/vendor/VendorPackageCard";
import ReviewCard        from "../../components/vendor/ReviewCard";
import VendorCard        from "../../components/vendor/VendorCard";
import { vendorService } from "../../services/vendorService";

export default function VendorDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [tab,   setTab]   = useState("packages");

  const vendor  = vendorService.getById(id);
  const similar = vendorService.getSimilar(id);

  if (!vendor) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <span className="text-5xl">🎊</span>
      <h2 className="font-heading text-display-sm text-dark">Vendor not found</h2>
      <Link to="/vendors" className="btn-primary">Browse All Vendors</Link>
    </div>
  );

  const FMT = (n) => {
    if (vendor.priceUnit === "per plate") return `₹${n.toLocaleString("en-IN")}/plate`;
    return n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-ivory min-h-screen">

      {/* Breadcrumb */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-xs font-body text-muted">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>›</span>
          <Link to="/vendors" className="hover:text-gold transition-colors">Vendors</Link>
          <span>›</span>
          <span className="text-muted">{vendor.category}</span>
          <span>›</span>
          <span className="text-dark truncate">{vendor.name}</span>
        </div>
      </div>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 pb-16">

        {/* ── Title row ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-maroon/8 border border-maroon/15 rounded-full
                               text-[10px] font-body font-medium text-maroon">
                {vendor.category}
              </span>
              {vendor.featured && <span className="badge-gold">✦ Featured</span>}
              {vendor.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-body font-medium text-gold-dark">
                  <RiCheckboxCircleLine size={12} /> Verified
                </span>
              )}
            </div>
            <h1 className="font-heading text-display-md text-dark mb-1.5">{vendor.name}</h1>
            <p className="font-heading text-lg text-gold italic mb-2">"{vendor.tagline}"</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted">
                <RiMapPinLine size={14} className="text-gold" /> {vendor.city}, {vendor.state}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} size={13}
                      className={i < Math.floor(vendor.rating) ? "text-gold" : "text-cream"} />
                  ))}
                </div>
                <span className="font-body text-sm font-semibold text-dark">{vendor.rating}</span>
                <span className="font-body text-xs text-muted">({vendor.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted">
                <RiTimeLine size={14} className="text-gold" /> Responds {vendor.responseTime}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setLiked(v => !v)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream bg-white
                         text-xs font-body font-medium hover:border-maroon hover:text-maroon transition-all">
              {liked ? <><RiHeartFill size={15} className="text-maroon" /> Saved</> : <><RiHeartLine size={15} /> Save</>}
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream bg-white
                               text-xs font-body font-medium hover:border-gold hover:text-gold transition-all">
              <RiShareLine size={15} /> Share
            </button>
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cream bg-white
                         text-xs font-body font-medium text-muted hover:border-gold transition-all">
              <RiArrowLeftLine size={14} /> Back
            </button>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-10 relative">
          <VendorGallery images={vendor.images} name={vendor.name} />
        </motion.div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* About */}
            <section className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
              <p className="label-gold mb-3">About</p>
              <p className="font-body text-base text-muted leading-relaxed mb-5">{vendor.about}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {vendor.tags.map(t => (
                  <div key={t} className="flex items-center gap-2 p-2.5 rounded-xl bg-cream/60 border border-cream">
                    <RiCheckboxCircleLine size={13} className="text-gold shrink-0" />
                    <span className="font-body text-xs text-dark">{t}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Trust */}
            <div className="flex flex-wrap gap-3">
              {vendor.insured && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-cream shadow-luxury">
                  <RiShieldCheckLine size={16} className="text-gold" />
                  <span className="font-body text-xs font-medium text-dark">Fully Insured</span>
                </div>
              )}
              {vendor.verified && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-cream shadow-luxury">
                  <RiCheckboxCircleLine size={16} className="text-gold" />
                  <span className="font-body text-xs font-medium text-dark">Background Verified</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-cream shadow-luxury">
                <RiTimeLine size={16} className="text-gold" />
                <span className="font-body text-xs font-medium text-dark">{vendor.yearsActive} years active</span>
              </div>
            </div>

            {/* Tabs */}
            <section>
              <div className="flex gap-0 border-b border-cream mb-6">
                {[
                  { key: "packages", label: `Packages (${vendor.packages.length})` },
                  { key: "reviews",  label: `Reviews (${vendor.reviewCount})`       },
                ].map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`relative px-6 py-3.5 text-sm font-body font-medium shrink-0
                                transition-colors ${tab === t.key ? "text-maroon" : "text-muted hover:text-dark"}`}>
                    {t.label}
                    {tab === t.key && (
                      <motion.span layoutId="vd-tab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                ))}
              </div>

              {tab === "packages" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendor.packages.map((pkg, i) => (
                    <VendorPackageCard key={pkg.id} pkg={pkg} unit={vendor.priceUnit}
                      index={i} onSelect={() => navigate("/register")} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {vendor.reviews.map((rev, i) => <ReviewCard key={rev.id} review={rev} index={i} />)}
                </div>
              )}
            </section>
          </div>

          {/* Right: sticky contact */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-24 bg-white rounded-luxury-lg border border-cream
                         shadow-luxury-lg p-6 flex flex-col gap-5">
              <div>
                <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">Starting from</p>
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="font-heading text-3xl font-semibold text-maroon">
                    {FMT(vendor.basePrice)}
                  </span>
                </div>
                <p className="font-body text-xs text-muted">{vendor.priceUnit}</p>
              </div>
              <div className="h-px bg-cream" />
              <div className="relative">
                <RiCalendarLine size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
                <input type="date" className="input-luxury !pl-10 text-sm"
                  min={new Date().toISOString().split("T")[0]} />
              </div>
              <button onClick={() => navigate("/register")} className="btn-primary w-full !justify-center !py-4">
                <RiCalendarLine size={16} /> Book Now
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
                Free enquiry · No booking fees · Verified vendor
              </p>
            </motion.div>
          </div>
        </div>

        {/* Similar vendors */}
        {similar.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="label-gold mb-2">Similar {vendor.category}s</p>
                <h2 className="font-heading text-display-sm text-dark">You Might Also Like</h2>
              </div>
              <Link to="/vendors" className="font-body text-xs font-medium text-maroon hover:text-gold transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {similar.map((v, i) => <VendorCard key={v.id} vendor={v} index={i} detailBase="/vendors" />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}