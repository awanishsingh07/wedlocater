import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiMenuLine,
  RiCloseLine,
  RiUserLine,
  RiHeartLine,
  RiSearchLine,
  RiArrowDownSLine,
} from "react-icons/ri";

const NAV_LINKS = [
  { label: "Venues",        path: "/venues" },
  { label: "Vendors",       path: "/vendors" },
  { label: "Photographers", path: "/photographers" },
  { label: "AI Budget Planner",path: "/ai-budget" },
];

const MOBILE_EXTRAS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Login",     path: "/login" },
  { label: "Register",  path: "/register" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const searchRef = useRef(null);
  const location  = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const activeCls = ({ isActive }) =>
    isActive
      ? "text-gold font-semibold after:w-full"
      : "text-dark/80 hover:text-maroon after:w-0 hover:after:w-full";

  return (
    <>
      {/* ── Top announcement bar ── */}
      <div className="bg-maroon text-ivory text-center py-1 px-4 text-[10px] font-body tracking-[0.2em] uppercase">
        ✦ &nbsp; India's Premium AI Wedding Planning Platform &nbsp; ✦
      </div>

      {/* ── Main navbar ── */}
      <motion.header
        initial={false}
        animate={scrolled ? "scrolled" : "top"}
        variants={{
          top:      { backgroundColor: "rgba(250,247,242,0.92)", boxShadow: "none" },
          scrolled: { backgroundColor: "rgba(250,247,242,0.98)", boxShadow: "0 4px 32px rgba(43,43,43,0.10)" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 z-50 backdrop-blur-md border-b border-gold/10"
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-14 md:h-16 px-4 sm:px-5 lg:px-6">

            {/* ── Logo ── */}
            <Link to="/" className="flex flex-col leading-none group shrink-0">
              <span className="font-heading text-xl md:text-2xl font-semibold text-maroon tracking-tight group-hover:text-maroon-dark transition-colors duration-200">
                Wed<span className="text-gold">Locater</span>
              </span>
              <span className="font-body text-[8px] tracking-[0.22em] uppercase text-muted mt-0.5 pl-0.5">
                Luxury Wedding Planning
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-7">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `relative font-body text-sm font-medium tracking-wide
                       transition-colors duration-200 pb-0.5
                       after:absolute after:bottom-0 after:left-0 after:h-[1.5px]
                       after:bg-gold after:transition-all after:duration-300
                       ${activeCls({ isActive })}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* ── Desktop right actions ── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-dark/70 hover:text-maroon hover:bg-cream
                           transition-all duration-200"
                aria-label="Search"
              >
                <RiSearchLine size={18} />
              </button>

              {/* Wishlist */}
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-dark/70 hover:text-maroon hover:bg-cream
                           transition-all duration-200 relative"
                aria-label="Wishlist"
              >
                <RiHeartLine size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-maroon text-ivory
                                 text-[9px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-gold/25 mx-1" />

              {/* Login */}
              <Link to="/login" className="btn-secondary !px-4 !py-1.5 !text-[11px]">
                Sign In
              </Link>

              {/* Register */}
              <Link to="/register" className="btn-primary !px-4 !py-1.5 !text-[11px]">
                Get Started
              </Link>
            </div>

            {/* ── Mobile right actions ── */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="w-8 h-8 flex items-center justify-center rounded-full
                           text-dark/70 hover:text-maroon hover:bg-cream transition-all"
                aria-label="Search"
              >
                <RiSearchLine size={18} />
              </button>
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-full
                           text-dark/80 hover:text-maroon hover:bg-cream transition-all"
                aria-label="Toggle menu"
              >
                {menuOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
              </button>
            </div>

          </nav>
        </div>

        {/* ── Search bar (slide down) ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gold/10 bg-ivory"
            >
              <div className="container-luxury px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <RiSearchLine
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search venues, photographers, decorators…"
                    className="input-luxury !pl-11 !pr-12"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-maroon transition-colors"
                  >
                    <RiCloseLine size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm
                         bg-ivory shadow-luxury-lg flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gold/15">
                <span className="font-heading text-xl font-semibold text-maroon">
                  Wed<span className="text-gold">Locater</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full
                             bg-cream text-dark/70 hover:text-maroon transition-colors"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <p className="label-gold mb-4">Navigation</p>
                <ul className="flex flex-col gap-1">
                  {[...NAV_LINKS, ...MOBILE_EXTRAS].map(({ label, path }, i) => (
                    <motion.li
                      key={path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-3.5 rounded-xl
                           font-body text-sm font-medium transition-all duration-200
                           ${isActive
                             ? "bg-maroon text-ivory shadow-maroon"
                             : "text-dark/80 hover:bg-cream hover:text-maroon"
                           }`
                        }
                      >
                        {label}
                        <RiArrowDownSLine className="-rotate-90 opacity-40" size={16} />
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer CTA */}
              <div className="px-6 py-6 border-t border-gold/15 flex flex-col gap-3">
                <Link to="/register" className="btn-primary w-full !justify-center">
                  Start Planning Free
                </Link>
                <Link to="/login" className="btn-secondary w-full !justify-center">
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}