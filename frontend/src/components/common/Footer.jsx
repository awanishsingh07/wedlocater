import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiYoutubeLine,
  RiPinterestLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiHeartFill,
  RiArrowRightUpLine,
} from "react-icons/ri";

const FOOTER_LINKS = {
  Services: [
    { label: "Venue Booking", path: "/venues" },
    { label: "Vendor Directory", path: "/vendors" },
    { label: "Photographers", path: "/photographers" },
    { label: "Budget Planner", path: "/budget" },
    { label: "AI Suggestions", path: "/" },
  ],
  Company: [
    { label: "About Us", path: "/" },
    { label: "How It Works", path: "/" },
    { label: "Testimonials", path: "/" },
    { label: "Careers", path: "/" },
    { label: "Blog", path: "/" },
  ],
  Support: [
    { label: "Help Center", path: "/" },
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Service", path: "/" },
    { label: "Refund Policy", path: "/" },
    { label: "Contact Us", path: "/" },
  ],
};

const SOCIALS = [
  { icon: RiInstagramLine, label: "Instagram", href: "#" },
  { icon: RiFacebookBoxLine, label: "Facebook", href: "#" },
  { icon: RiYoutubeLine, label: "YouTube", href: "#" },
  { icon: RiPinterestLine, label: "Pinterest", href: "#" },
];

const CONTACT = [
  { icon: RiMailLine, text: "hello@wedlocater.com" },
  { icon: RiPhoneLine, text: "+91 98765 43210" },
  { icon: RiMapPinLine, text: "Mumbai • Delhi • Bangalore" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-ivory/80 font-body relative overflow-hidden">
      {/* ── Decorative top border ── */}
      <div className="h-px w-full bg-gold-gradient opacity-60" />

      {/* ── Decorative background flourish ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                      bg-maroon/10 blur-[120px] pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                      bg-gold/5 blur-[100px] pointer-events-none"
      />

      {/* ── Newsletter strip ── */}
      <div className="relative border-b border-white/8">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-12">
          <div
            className="flex flex-col lg:flex-row items-start lg:items-center
                          justify-between gap-8"
          >
            <div className="max-w-md">
              <p className="label-gold mb-3">Stay Inspired</p>
              <h3 className="font-heading text-display-sm text-ivory leading-snug">
                Get wedding ideas delivered to your inbox
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="input-luxury !bg-white/8 !border-white/15 !text-ivory
                           placeholder:!text-ivory/40 focus:!border-gold
                           min-w-0 sm:min-w-[280px]"
              />
              <button className="btn-gold !whitespace-nowrap shrink-0">
                Subscribe
                <RiArrowRightUpLine size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="relative container-luxury px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-flex flex-col leading-none mb-6 group"
            >
              <span
                className="font-heading text-3xl font-semibold text-ivory
                               group-hover:text-gold transition-colors duration-200"
              >
                Wed<span className="text-gold">Locater</span>
              </span>
              <span
                className="font-body text-[9px] tracking-[0.22em] uppercase
                               text-ivory/40 mt-1 pl-0.5"
              >
                Luxury Wedding Planning
              </span>
            </Link>

            <p className="text-sm text-ivory/50 leading-relaxed max-w-xs mb-8">
              India's most trusted AI-powered wedding planning platform.
              Discover premium venues, curated vendors, and create your dream
              wedding — all in one place.
            </p>

            {/* Contact details */}
            <ul className="flex flex-col gap-3 mb-8">
              {CONTACT.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-sm text-ivory/55"
                >
                  <span
                    className="w-7 h-7 rounded-lg bg-white/6 border border-white/8
                                   flex items-center justify-center shrink-0"
                  >
                    <Icon size={13} className="text-gold" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/12 bg-white/5
                             flex items-center justify-center text-ivory/50
                             hover:border-gold hover:text-gold hover:bg-gold/10
                             transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p
                className="font-heading text-sm font-semibold text-ivory/90
                            tracking-wide mb-5"
              >
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm text-ivory/45 hover:text-gold
                                 transition-colors duration-200 flex items-center gap-1.5
                                 group"
                    >
                      <span
                        className="w-0 group-hover:w-3 overflow-hidden
                                       transition-all duration-200 opacity-0
                                       group-hover:opacity-100"
                      >
                        <RiArrowRightUpLine
                          size={11}
                          className="text-gold shrink-0"
                        />
                      </span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trust badges row ── */}
      <div className="relative border-t border-white/8">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              "5000+ Weddings Planned",
              "1200+ Verified Vendors",
              "50+ Cities",
              "4.9★ Average Rating",
            ].map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-xs text-ivory/40 font-body tracking-wide">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/8">
        <div className="container-luxury px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-ivory/30 text-center sm:text-left">
              © {new Date().getFullYear()} WedLocater. All rights reserved.
            </p>
            <p className="text-xs text-ivory/30 flex items-center gap-1.5">
              Crafted with
              <RiHeartFill size={11} className="text-maroon" />
              for love stories across India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
