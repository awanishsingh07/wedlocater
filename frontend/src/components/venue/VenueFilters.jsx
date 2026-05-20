import { motion, AnimatePresence } from "framer-motion";
import {
  RiFilterLine, RiCloseLine, RiMapPinLine,
  RiWalletLine, RiGroupLine, RiHome4Line,
} from "react-icons/ri";

const CITIES       = ["All", "Udaipur", "Jaipur", "Mumbai", "Delhi", "Agra", "Hyderabad", "Chennai", "Goa"];
const PRICE_RANGES = [
  { label: "Any",         value: "" },
  { label: "Under ₹2L",   value: 200000 },
  { label: "Under ₹4L",   value: 400000 },
  { label: "Under ₹6L",   value: 600000 },
  { label: "Under ₹8L",   value: 800000 },
  { label: "Under ₹10L",  value: 1000000 },
];
const CAPACITY_OPTS = [
  { label: "Any",       value: "" },
  { label: "100+ guests", value: 100 },
  { label: "300+ guests", value: 300 },
  { label: "500+ guests", value: 500 },
  { label: "1000+ guests",value: 1000 },
];

function FilterSection({ icon: Icon, title, children }) {
  return (
    <div className="border-b border-cream pb-5 last:border-none last:pb-0">
      <div className="flex items-center gap-2 mb-3.5">
        <Icon size={14} className="text-gold" />
        <span className="font-body text-xs font-semibold text-dark uppercase tracking-widest">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function VenueFilters({ filters, onChange, onReset, mobileOpen, onMobileClose }) {
  const handle = (key, val) => onChange({ ...filters, [key]: val });

  const Content = (
    <div className="flex flex-col gap-5">
      {/* City */}
      <FilterSection icon={RiMapPinLine} title="City">
        <div className="flex flex-wrap gap-2">
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => handle("city", c === "All" ? "all" : c)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-medium
                          border transition-all duration-200
                          ${(filters.city === c || (c === "All" && filters.city === "all"))
                            ? "bg-maroon text-ivory border-maroon"
                            : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                          }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection icon={RiWalletLine} title="Price Range">
        <div className="flex flex-col gap-2">
          {PRICE_RANGES.map(({ label, value }) => (
            <label key={label}
              className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                              transition-all duration-200
                              ${filters.priceMax === value
                                ? "border-gold bg-gold"
                                : "border-cream group-hover:border-gold"
                              }`}>
                {filters.priceMax === value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="font-body text-sm text-muted group-hover:text-dark
                               transition-colors duration-200">
                {label}
              </span>
              <input type="radio" name="price" className="sr-only"
                checked={filters.priceMax === value}
                onChange={() => handle("priceMax", value)} />
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Capacity */}
      <FilterSection icon={RiGroupLine} title="Guest Capacity">
        <div className="flex flex-col gap-2">
          {CAPACITY_OPTS.map(({ label, value }) => (
            <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                              transition-all duration-200
                              ${filters.capacityMin === value
                                ? "border-gold bg-gold"
                                : "border-cream group-hover:border-gold"
                              }`}>
                {filters.capacityMin === value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="font-body text-sm text-muted group-hover:text-dark
                               transition-colors duration-200">
                {label}
              </span>
              <input type="radio" name="capacity" className="sr-only"
                checked={filters.capacityMin === value}
                onChange={() => handle("capacityMin", value)} />
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Indoor / Outdoor */}
      <FilterSection icon={RiHome4Line} title="Venue Setting">
        <div className="flex flex-col gap-2">
          {[
            { key: "indoor",  label: "Indoor venues"  },
            { key: "outdoor", label: "Outdoor venues" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => handle(key, !filters[key])}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                            transition-all duration-200 cursor-pointer
                            ${filters[key]
                              ? "bg-gold border-gold"
                              : "border-cream bg-white group-hover:border-gold"
                            }`}
              >
                {filters[key] && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                )}
              </div>
              <span className="font-body text-sm text-muted group-hover:text-dark
                               transition-colors duration-200">
                {label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset */}
      <button onClick={onReset}
        className="w-full py-2.5 rounded-xl border border-cream text-xs font-body
                   font-medium text-muted hover:border-maroon hover:text-maroon
                   transition-all duration-200">
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
        <div className="sticky top-24 bg-white rounded-luxury border border-cream
                        shadow-luxury p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <RiFilterLine size={16} className="text-gold" />
              <h3 className="font-heading text-base font-semibold text-dark">Filters</h3>
            </div>
          </div>
          {Content}
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark/30 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-ivory
                         shadow-luxury-lg flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4
                              border-b border-cream shrink-0">
                <div className="flex items-center gap-2">
                  <RiFilterLine size={16} className="text-gold" />
                  <h3 className="font-heading text-base font-semibold text-dark">Filters</h3>
                </div>
                <button onClick={onMobileClose}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center
                             text-muted hover:text-maroon transition-colors duration-200">
                  <RiCloseLine size={18} />
                </button>
              </div>
              <div className="flex-1 p-5">{Content}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}