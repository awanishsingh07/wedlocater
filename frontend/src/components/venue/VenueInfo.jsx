import { motion } from "framer-motion";
import {
  RiCheckboxCircleLine, RiMapPinLine, RiGroupLine,
  RiHome4Line, RiShieldCheckLine, RiInformationLine,
} from "react-icons/ri";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-cream last:border-none">
      <div className="w-8 h-8 rounded-lg bg-cream flex items-center justify-center shrink-0">
        <Icon size={15} className="text-gold" />
      </div>
      <div>
        <p className="font-body text-[10px] text-muted uppercase tracking-widest">{label}</p>
        <p className="font-body text-sm font-medium text-dark mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function VenueInfo({ venue }) {
  if (!venue) return null;
  const { about, amenities, spaces, policies, capacity, indoor, outdoor, city, state } = venue;

  return (
    <div className="flex flex-col gap-8">

      {/* ── About ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="label-gold mb-3">About this Venue</p>
        <p className="font-body text-base text-muted leading-relaxed">{about}</p>
      </motion.section>

      {/* ── Quick info ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="bg-white rounded-luxury border border-cream shadow-luxury p-5"
      >
        <p className="label-gold mb-3">Venue Details</p>
        <InfoRow icon={RiMapPinLine} label="Location"
          value={`${venue.address}, ${city}, ${state}`} />
        <InfoRow icon={RiGroupLine} label="Guest Capacity"
          value={`${capacity.min} – ${capacity.max} guests`} />
        <InfoRow icon={RiHome4Line} label="Venue Setting"
          value={[indoor && "Indoor", outdoor && "Outdoor"].filter(Boolean).join(" & ")} />
        <InfoRow icon={RiShieldCheckLine} label="Verification Status"
          value={venue.verified ? "Verified & Background Checked" : "Pending Verification"} />
      </motion.section>

      {/* ── Event spaces ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
      >
        <p className="label-gold mb-4">Event Spaces</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {spaces.map((space, i) => (
            <motion.div
              key={space.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.2 }}
              className="p-4 rounded-luxury bg-white border border-cream
                         shadow-luxury hover:border-gold/30 hover:shadow-luxury-md
                         transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-heading text-base font-semibold text-dark">{space.name}</h4>
                <span className={`text-[10px] font-body font-medium px-2 py-0.5 rounded-full border
                  ${space.type === "Indoor"
                    ? "bg-maroon/8 text-maroon border-maroon/15"
                    : "bg-gold/8 text-gold-dark border-gold/15"
                  }`}>
                  {space.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-body text-muted">
                <div className="flex items-center gap-1">
                  <RiGroupLine size={12} className="text-gold" />
                  <span>Up to {space.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RiHome4Line size={12} className="text-gold" />
                  <span>{space.area}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Amenities ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="label-gold mb-4">Amenities & Services</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {amenities.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 + 0.25 }}
              className="flex items-center gap-2 p-2.5 rounded-xl
                         bg-cream/60 border border-cream"
            >
              <RiCheckboxCircleLine size={14} className="text-gold shrink-0" />
              <span className="font-body text-xs text-dark">{a}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Policies ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.26 }}
        className="bg-gold/5 border border-gold/20 rounded-luxury p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <RiInformationLine size={16} className="text-gold" />
          <p className="label-gold">Venue Policies</p>
        </div>
        <ul className="flex flex-col gap-2.5">
          {policies.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
              <span className="font-body text-sm text-dark/80">{p}</span>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
}