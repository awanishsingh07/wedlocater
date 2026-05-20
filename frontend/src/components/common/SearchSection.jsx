import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMapPinLine,
  RiCalendarLine,
  RiGroupLine,
  RiSearchLine,
  RiArrowRightLine,
} from "react-icons/ri";

const TABS = ["Venues", "Photographers", "Caterers", "Decorators", "All Vendors"];

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Jaipur", "Udaipur", "Kolkata", "Pune", "Ahmedabad",
  "Goa", "Chandigarh", "Lucknow", "Kochi",
];

const GUEST_RANGES = [
  "Up to 100", "100–300", "300–500", "500–1000", "1000+",
];

export default function SearchSection() {
  const [activeTab, setActiveTab]   = useState("Venues");
  const [city, setCity]             = useState("");
  const [date, setDate]             = useState("");
  const [guests, setGuests]         = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams({ category: activeTab, city, date, guests });
    const route  = activeTab === "Venues" ? "/venues" : "/vendors";
    navigate(`${route}?${params.toString()}`);
  };

  return (
    <section className="relative z-30 -mt-6 px-4 sm:px-6 lg:px-8 pb-0">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white rounded-luxury-lg shadow-luxury-lg
                     border border-cream overflow-hidden"
        >
          {/* ── Category tabs ── */}
          <div className="flex items-center gap-0 border-b border-cream
                          overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-shrink-0 px-5 py-4 text-sm font-body
                            font-medium tracking-wide transition-all duration-200
                            ${activeTab === tab
                              ? "text-maroon"
                              : "text-muted hover:text-dark"
                            }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Search fields ── */}
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* City */}
              <div className="flex flex-col gap-1.5">
                <label className="label-maroon !text-[10px]">Location</label>
                <div className="relative">
                  <RiMapPinLine
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold"
                  />
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="select-luxury !pl-9 text-sm"
                  >
                    <option value="">Select City</option>
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="label-maroon !text-[10px]">Wedding Date</label>
                <div className="relative">
                  <RiCalendarLine
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="input-luxury !pl-9 text-sm"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="label-maroon !text-[10px]">Guest Count</label>
                <div className="relative">
                  <RiGroupLine
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold"
                  />
                  <select
                    value={guests}
                    onChange={e => setGuests(e.target.value)}
                    className="select-luxury !pl-9 text-sm"
                  >
                    <option value="">Select Range</option>
                    {GUEST_RANGES.map(g => (
                      <option key={g} value={g}>{g} Guests</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search button */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSearch}
                  className="btn-primary w-full !justify-center !gap-2.5 !py-3.5 !rounded-xl"
                >
                  <RiSearchLine size={16} />
                  Search {activeTab}
                  <RiArrowRightLine size={15} />
                </button>
              </div>
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-cream">
              <span className="text-xs text-muted font-body">Popular:</span>
              {["Udaipur Palace", "Mumbai 5-star", "Delhi Farmhouse", "Goa Beach"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setCity(tag.split(" ")[0])}
                  className="px-3 py-1 rounded-full text-xs font-body
                             bg-cream text-muted border border-gold/15
                             hover:border-gold hover:text-gold
                             transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}