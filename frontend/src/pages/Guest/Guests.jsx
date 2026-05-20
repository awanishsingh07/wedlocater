import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RiSearchLine, RiAddLine, RiDownloadLine,
  RiGridLine, RiListUnordered, RiFilterLine,
} from "react-icons/ri";
import GuestStats  from "../../components/guest/GuestStats";
import GuestTable  from "../../components/guest/GuestTable";
import GuestCard   from "../../components/guest/GuestCard";
import GuestModal  from "../../components/guest/GuestModal";
import { INITIAL_GUESTS, RSVP_STATUSES, SIDES } from "../../data/guestData";
import { AnimatePresence } from "framer-motion";

export default function Guests() {
  const [guests,      setGuests]      = useState(INITIAL_GUESTS);
  const [search,      setSearch]      = useState("");
  const [rsvpFilter,  setRsvpFilter]  = useState("All");
  const [sideFilter,  setSideFilter]  = useState("All");
  const [view,        setView]        = useState("table");   // "table" | "cards"
  const [modalOpen,   setModalOpen]   = useState(false);
  const [editGuest,   setEditGuest]   = useState(null);

  /* ── CSV export ── */
  const exportCSV = () => {
    const headers = ["Name", "Relation", "Side", "Phone", "Email", "RSVP", "Attending", "Table", "Dietary", "Notes"];
    const rows    = guests.map(g =>
      [g.name, g.relation, g.side, g.phone, g.email, g.rsvp, g.attending, g.table, g.dietary, g.notes]
        .map(v => `"${v}"`)
        .join(",")
    );
    const csv  = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "wedding_guests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ── CRUD ── */
  const saveGuest  = (g)  => {
    setGuests(prev => prev.find(x => x.id === g.id)
      ? prev.map(x => x.id === g.id ? g : x)
      : [...prev, g]
    );
  };
  const deleteGuest = (id) => setGuests(prev => prev.filter(g => g.id !== id));
  const openAdd     = ()   => { setEditGuest(null); setModalOpen(true); };
  const openEdit    = (g)  => { setEditGuest(g);    setModalOpen(true); };

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    let res = [...guests];
    if (rsvpFilter !== "All") res = res.filter(g => g.rsvp === rsvpFilter);
    if (sideFilter !== "All") res = res.filter(g => g.side === sideFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.relation.toLowerCase().includes(q) ||
        g.rsvp.toLowerCase().includes(q) ||
        g.city?.toLowerCase().includes(q)
      );
    }
    return res;
  }, [guests, rsvpFilter, sideFilter, search]);

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-maroon-gradient py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute -top-10 right-10 w-56 h-56 rounded-full bg-gold/10 blur-[70px] pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="label-gold !text-gold/80 mb-2">👥 &nbsp; Wedding Management</p>
              <h1 className="font-heading text-display-md text-ivory mb-2">Guest Management</h1>
              <p className="font-body text-ivory/60 text-sm max-w-lg">
                Manage your complete guest list, track RSVPs, dietary requirements
                and seating arrangements all in one place.
              </p>
            </motion.div>
            <div className="flex gap-3 shrink-0">
              <button onClick={exportCSV}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-white/10 backdrop-blur-sm border border-white/20 text-ivory
                           text-xs font-body font-medium hover:bg-white/20 transition-all">
                <RiDownloadLine size={15} /> Export CSV
              </button>
              <button onClick={openAdd} className="btn-gold !text-xs !px-5 !py-2.5">
                <RiAddLine size={15} /> Add Guest
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Stats ── */}
        <div className="mb-10">
          <GuestStats guests={guests} />
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="flex-1 relative">
            <RiSearchLine size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input type="text" placeholder="Search by name, relation or RSVP status…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="input-luxury !pl-10 !py-2.5 text-sm w-full" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {/* RSVP filter */}
            <div className="flex gap-1.5">
              {["All", ...RSVP_STATUSES].map(s => {
                const active = rsvpFilter === s;
                const colors = {
                  All:      active ? "bg-dark text-ivory border-dark"                  : "bg-white text-muted border-cream hover:border-gold",
                  Accepted: active ? "bg-emerald-600 text-white border-emerald-600"    : "bg-white text-muted border-cream hover:border-emerald-400",
                  Pending:  active ? "bg-amber-500 text-white border-amber-500"        : "bg-white text-muted border-cream hover:border-amber-400",
                  Declined: active ? "bg-red-500 text-white border-red-500"            : "bg-white text-muted border-cream hover:border-red-400",
                };
                return (
                  <button key={s} onClick={() => setRsvpFilter(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-body font-medium border transition-all ${colors[s]}`}>
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Side filter */}
            <div className="flex gap-1.5">
              {["All", ...SIDES].map(s => (
                <button key={s} onClick={() => setSideFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-body font-medium border transition-all
                              ${sideFilter === s ? "bg-maroon text-ivory border-maroon" : "bg-white text-muted border-cream hover:border-gold"}`}>
                  {s}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex gap-1 bg-cream border border-cream rounded-xl p-1">
              <button onClick={() => setView("table")}
                className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all
                            ${view === "table" ? "bg-white shadow-sm text-maroon" : "text-muted hover:text-dark"}`}>
                <RiListUnordered size={15} />
              </button>
              <button onClick={() => setView("cards")}
                className={`w-8 h-7 rounded-lg flex items-center justify-center transition-all
                            ${view === "cards" ? "bg-white shadow-sm text-maroon" : "text-muted hover:text-dark"}`}>
                <RiGridLine size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <p className="font-body text-sm text-muted mb-4">
          Showing <strong className="text-dark">{filtered.length}</strong> of{" "}
          <strong className="text-dark">{guests.length}</strong> guests
          {rsvpFilter !== "All" && (
            <span> · <strong className="text-maroon">{rsvpFilter}</strong></span>
          )}
        </p>

        {/* ── Table or Cards view ── */}
        <AnimatePresence mode="wait">
          {view === "table" ? (
            <motion.div key="table"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <GuestTable guests={filtered} onEdit={openEdit} onDelete={deleteGuest} />
            </motion.div>
          ) : (
            <motion.div key="cards"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((g, i) => (
                <GuestCard key={g.id} guest={g} index={i} onEdit={openEdit} onDelete={deleteGuest} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
                  <span className="text-4xl">👥</span>
                  <p className="font-heading text-lg text-dark">No guests found</p>
                  <p className="font-body text-sm text-muted">Adjust your search or filters.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Guest Modal ── */}
      <GuestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveGuest}
        editGuest={editGuest}
      />
    </div>
  );
}