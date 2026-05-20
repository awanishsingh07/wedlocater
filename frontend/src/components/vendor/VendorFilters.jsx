import { motion, AnimatePresence } from "framer-motion";
import {
  RiFilterLine, RiCloseLine, RiMapPinLine,
  RiWalletLine, RiStarLine,
} from "react-icons/ri";

const PRICE_OPTS = [
  { label: "Any",            value: "" },
  { label: "Under ₹50K",     value: 50000 },
  { label: "Under ₹1L",      value: 100000 },
  { label: "Under ₹2L",      value: 200000 },
  { label: "Under ₹5L",      value: 500000 },
];
const RATING_OPTS = [
  { label: "Any",    value: "" },
  { label: "4.5+",   value: 4.5 },
  { label: "4.8+",   value: 4.8 },
  { label: "5.0",    value: 5.0 },
];

function Section({ icon: Icon, title, children }) {
  return (
    <div className="border-b border-cream pb-5 last:border-none last:pb-0">
      <div className="flex items-center gap-2 mb-3.5">
        <Icon size={14} className="text-gold" />
        <span className="font-body text-xs font-semibold uppercase tracking-widest text-dark">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function VendorFilters({ filters, cities = [], onChange, onReset, mobileOpen, onMobileClose }) {
  const h = (k, v) => onChange({ ...filters, [k]: v });

  const RadioGroup = ({ name, opts, filterKey }) => (
    <div className="flex flex-col gap-2">
      {opts.map(({ label, value }) => (
        <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => h(filterKey, value)}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                        transition-all duration-200 cursor-pointer
                        ${filters[filterKey] === value
                          ? "border-gold bg-gold"
                          : "border-cream group-hover:border-gold"
                        }`}
          >
            {filters[filterKey] === value && (
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </div>
          <span className="font-body text-sm text-muted group-hover:text-dark transition-colors">{label}</span>
          <input type="radio" name={name} className="sr-only"
            checked={filters[filterKey] === value}
            onChange={() => h(filterKey, value)} />
        </label>
      ))}
    </div>
  );

  const Content = (
    <div className="flex flex-col gap-5">
      {/* City */}
      <Section icon={RiMapPinLine} title="City">
        <div className="flex flex-wrap gap-2">
          {["All", ...cities].map(c => (
            <button key={c} onClick={() => h("city", c === "All" ? "all" : c)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-medium border
                          transition-all duration-200
                          ${(filters.city === c || (c === "All" && filters.city === "all"))
                            ? "bg-maroon text-ivory border-maroon"
                            : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                          }`}>
              {c}
            </button>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section icon={RiWalletLine} title="Budget">
        <RadioGroup name="price" opts={PRICE_OPTS} filterKey="priceMax" />
      </Section>

      {/* Rating */}
      <Section icon={RiStarLine} title="Minimum Rating">
        <RadioGroup name="rating" opts={RATING_OPTS} filterKey="ratingMin" />
      </Section>

      {/* Verified toggle */}
      <Section icon={RiFilterLine} title="Other Filters">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div onClick={() => h("verified", !filters.verified)}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                        transition-all duration-200 cursor-pointer
                        ${filters.verified ? "bg-gold border-gold" : "border-cream group-hover:border-gold"}`}>
            {filters.verified && (
              <svg viewBox="0 0 12 12" className="w-3 h-3">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            )}
          </div>
          <span className="font-body text-sm text-muted group-hover:text-dark transition-colors">
            Verified only
          </span>
        </label>
      </Section>

      <button onClick={onReset}
        className="w-full py-2.5 rounded-xl border border-cream text-xs font-body
                   font-medium text-muted hover:border-maroon hover:text-maroon transition-all">
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-60 xl:w-68 shrink-0">
        <div className="sticky top-24 bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <div className="flex items-center gap-2 mb-5">
            <RiFilterLine size={16} className="text-gold" />
            <h3 className="font-heading text-base font-semibold text-dark">Filters</h3>
          </div>
          {Content}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-dark/30 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose} />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-ivory shadow-luxury-lg
                         flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-cream shrink-0">
                <div className="flex items-center gap-2">
                  <RiFilterLine size={16} className="text-gold" />
                  <h3 className="font-heading text-base font-semibold text-dark">Filters</h3>
                </div>
                <button onClick={onMobileClose}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center
                             text-muted hover:text-maroon transition-colors">
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