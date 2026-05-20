import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RiSearchLine, RiFilterLine, RiSortDesc,
  RiFlowerLine, RiRestaurantLine, RiMusicLine,
  RiScissorsLine, RiCalendarLine, RiStore2Line,
} from "react-icons/ri";
import VendorCard    from "../../components/vendor/VendorCard";
import VendorFilters from "../../components/vendor/VendorFilters";
import { vendorService } from "../../services/vendorService";

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured First"   },
  { value: "rating",     label: "Highest Rated"    },
  { value: "price_asc",  label: "Price: Low → High"},
  { value: "price_desc", label: "Price: High → Low"},
];

const CATEGORY_ICONS = {
  All:              RiStore2Line,
  Decorator:        RiFlowerLine,
  Caterer:          RiRestaurantLine,
  DJ:               RiMusicLine,
  "Makeup Artist":  RiScissorsLine,
  "Wedding Planner":RiCalendarLine,
};

const PAGE_SIZE = 6;
const DEFAULT_FILTERS = { city: "all", priceMax: "", ratingMin: "", verified: false };

export default function Vendors() {
  const [filters,      setFilters]      = useState(DEFAULT_FILTERS);
  const [sort,         setSort]         = useState("featured");
  const [search,       setSearch]       = useState("");
  const [activeCategory, setCategory]  = useState("All");
  const [page,         setPage]         = useState(1);
  const [mobileFilter, setMobileFilter] = useState(false);

  const categories = vendorService.getCategories();
  const cities     = vendorService.getCities();

  const all = useMemo(() => vendorService.getAll({
    ...filters,
    category: activeCategory !== "All" ? activeCategory : undefined,
    sort,
  }), [filters, activeCategory, sort]);

  const filtered = useMemo(() => {
    let res = all;
    if (filters.ratingMin) res = res.filter(v => v.rating >= Number(filters.ratingMin));
    if (filters.verified)  res = res.filter(v => v.verified);
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    }
    return res;
  }, [all, search, filters.ratingMin, filters.verified]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (next) => { setFilters(next); setPage(1); };
  const handleReset        = ()     => { setFilters(DEFAULT_FILTERS); setPage(1); };

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[320px] sm:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=85&auto=format&fit=crop"
          alt="Vendors"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/25 via-dark/50 to-dark/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/25 via-transparent to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label-gold !text-gold/90 mb-3">✦ &nbsp; Verified Wedding Vendors</p>
            <h1 className="font-heading text-display-lg text-ivory mb-3">
              Every Vendor, One Marketplace
            </h1>
            <div className="divider-center mb-4" />
            <p className="font-body text-ivory/65 max-w-xl mx-auto text-sm sm:text-base">
              Decorators, caterers, DJs, makeup artists and wedding planners — all
              verified, reviewed and ready to make your celebration extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category pills ── */}
      <div className="bg-white border-b border-cream">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {categories.map(c => {
              const Icon = CATEGORY_ICONS[c] || RiStore2Line;
              return (
                <button key={c} onClick={() => { setCategory(c); setPage(1); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-body
                              font-medium whitespace-nowrap border transition-all duration-200
                              ${activeCategory === c
                                ? "bg-maroon text-ivory border-maroon"
                                : "bg-white text-muted border-cream hover:border-gold hover:text-gold"
                              }`}>
                  <Icon size={13} />
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Search + Sort ── */}
      <section className="sticky top-16 z-30 bg-ivory/95 backdrop-blur-md border-b border-cream shadow-luxury">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileFilter(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                         border border-cream bg-white text-sm font-body text-dark
                         hover:border-gold transition-all shrink-0">
              <RiFilterLine size={15} className="text-gold" /> Filters
            </button>
            <div className="flex-1 relative">
              <RiSearchLine size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input type="text" placeholder="Search vendors by name, city or category…" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="input-luxury !pl-10 !py-2.5 text-sm w-full" />
            </div>
            <div className="relative shrink-0">
              <RiSortDesc size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}
                className="select-luxury !pl-9 !py-2.5 text-sm pr-8 cursor-pointer min-w-[170px]">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">
          <VendorFilters filters={filters} cities={cities}
            onChange={handleFilterChange} onReset={handleReset}
            mobileOpen={mobileFilter} onMobileClose={() => setMobileFilter(false)} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="font-body text-sm text-muted">
                Showing <strong className="text-dark">{filtered.length}</strong> vendors
                {activeCategory !== "All" && (
                  <span> · <strong className="text-maroon">{activeCategory}s</strong></span>
                )}
              </p>
            </div>

            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                {paginated.map((v, i) => (
                  <VendorCard key={v.id} vendor={v} index={i} detailBase="/vendors" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-5xl">🎊</span>
                <h3 className="font-heading text-display-sm text-dark">No vendors found</h3>
                <p className="font-body text-sm text-muted max-w-xs">Try adjusting your filters or search.</p>
                <button onClick={handleReset} className="btn-secondary !text-xs !px-6 mt-2">Reset Filters</button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-cream flex items-center justify-center
                             text-muted hover:border-gold hover:text-gold disabled:opacity-40 transition-all">‹</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-xl border text-sm font-body font-medium transition-all
                                ${page === i + 1 ? "bg-maroon text-ivory border-maroon shadow-maroon" : "border-cream text-muted hover:border-gold bg-white"}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-9 h-9 rounded-xl border border-cream flex items-center justify-center
                             text-muted hover:border-gold hover:text-gold disabled:opacity-40 transition-all">›</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}