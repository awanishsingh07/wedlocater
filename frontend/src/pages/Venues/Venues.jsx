import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RiSearchLine, RiFilterLine, RiSortDesc,
  RiMapPinLine, RiArrowRightLine,
} from "react-icons/ri";
import VenueCard    from "../../components/venue/VenueCard";
import VenueFilters from "../../components/venue/VenueFilters";
import { venueService } from "../../services/venueService";

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured First"   },
  { value: "rating",     label: "Highest Rated"    },
  { value: "price_asc",  label: "Price: Low → High"},
  { value: "price_desc", label: "Price: High → Low"},
  { value: "reviews",    label: "Most Reviewed"    },
];

const PAGE_SIZE = 6;

const DEFAULT_FILTERS = {
  city: "all", priceMax: "", capacityMin: "",
  indoor: false, outdoor: false,
};

export default function Venues() {
  const [filters,      setFilters]      = useState(DEFAULT_FILTERS);
  const [sort,         setSort]         = useState("featured");
  const [search,       setSearch]       = useState("");
  const [page,         setPage]         = useState(1);
  const [mobileFilter, setMobileFilter] = useState(false);

  const allVenues = useMemo(
    () => venueService.getAll({ ...filters, sort }),
    [filters, sort]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return allVenues;
    const q = search.toLowerCase();
    return allVenues.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q) ||
      v.venueType.toLowerCase().includes(q)
    );
  }, [allVenues, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (next) => { setFilters(next); setPage(1); };
  const handleReset        = ()     => { setFilters(DEFAULT_FILTERS); setPage(1); };
  const handleSearch       = (e)    => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-[320px] sm:h-[380px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=85&auto=format&fit=crop"
          alt="Venues"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/50 to-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/30 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center
                        text-center px-4 sm:px-6 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="label-gold !text-gold/90 mb-3">
              ✦ &nbsp; Discover Wedding Venues
            </p>
            <h1 className="font-heading text-display-lg text-ivory mb-3">
              Find Your Perfect Venue
            </h1>
            <div className="divider-center mb-4" />
            <p className="font-body text-ivory/65 max-w-xl mx-auto text-sm sm:text-base">
              From royal palaces to intimate garden estates — explore India's finest
              wedding venues, all verified and curated by WedLocater.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Search + Sort bar ── */}
      <section className="sticky top-16 z-30 bg-ivory/95 backdrop-blur-md
                          border-b border-cream shadow-luxury">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilter(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl
                         border border-cream bg-white text-sm font-body text-dark
                         hover:border-gold transition-all duration-200 shrink-0"
            >
              <RiFilterLine size={15} className="text-gold" />
              Filters
            </button>

            {/* Search */}
            <div className="flex-1 relative">
              <RiSearchLine size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, city or type…"
                value={search}
                onChange={handleSearch}
                className="input-luxury !pl-10 !py-2.5 text-sm w-full"
              />
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <RiSortDesc size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1); }}
                className="select-luxury !pl-9 !py-2.5 text-sm pr-8 appearance-none
                           cursor-pointer min-w-[160px]"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 items-start">

          {/* Filters sidebar */}
          <VenueFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            mobileOpen={mobileFilter}
            onMobileClose={() => setMobileFilter(false)}
          />

          {/* Results */}
          <div className="flex-1 min-w-0">

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-body text-sm text-muted">
                  Showing{" "}
                  <strong className="text-dark">{filtered.length}</strong>{" "}
                  venues
                  {filters.city !== "all" && (
                    <span> in <strong className="text-maroon">{filters.city}</strong></span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted font-body">
                <RiMapPinLine size={12} className="text-gold" />
                All India
              </div>
            </div>

            {/* Grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                {paginated.map((venue, i) => (
                  <VenueCard key={venue.id} venue={venue} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center gap-4"
              >
                <span className="text-5xl">🏛️</span>
                <h3 className="font-heading text-display-sm text-dark">No venues found</h3>
                <p className="font-body text-sm text-muted max-w-xs">
                  Try adjusting your filters or search term to explore more venues.
                </p>
                <button onClick={handleReset} className="btn-secondary !text-xs !px-6 mt-2">
                  Reset Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 rounded-xl border border-cream flex items-center justify-center
                             text-muted hover:border-gold hover:text-gold disabled:opacity-40
                             disabled:cursor-not-allowed transition-all duration-200"
                >
                  ‹
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-xl border text-sm font-body font-medium
                                transition-all duration-200
                                ${page === i + 1
                                  ? "bg-maroon text-ivory border-maroon shadow-maroon"
                                  : "border-cream text-muted hover:border-gold hover:text-gold bg-white"
                                }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 rounded-xl border border-cream flex items-center justify-center
                             text-muted hover:border-gold hover:text-gold disabled:opacity-40
                             disabled:cursor-not-allowed transition-all duration-200"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}