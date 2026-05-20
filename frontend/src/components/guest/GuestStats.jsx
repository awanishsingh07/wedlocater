import { motion } from "framer-motion";
import { RiGroupLine, RiCheckboxCircleLine, RiTimeLine, RiCloseCircleLine } from "react-icons/ri";

export default function GuestStats({ guests = [] }) {
  const total     = guests.length;
  const accepted  = guests.filter(g => g.rsvp === "Accepted");
  const pending   = guests.filter(g => g.rsvp === "Pending");
  const declined  = guests.filter(g => g.rsvp === "Declined");
  const attending = guests.reduce((s, g) => s + (g.rsvp === "Accepted" ? g.attending : 0), 0);

  const stats = [
    { label: "Total Invites",    value: total,            sub: `${attending} attending`,  icon: RiGroupLine,          color: "from-gold/10    to-gold/5   border-gold/20   text-gold-dark" },
    { label: "Accepted",         value: accepted.length,  sub: `${attending} guests`,     icon: RiCheckboxCircleLine, color: "from-emerald-50 to-white    border-emerald-200 text-emerald-700" },
    { label: "Pending",          value: pending.length,   sub: "Awaiting RSVP",           icon: RiTimeLine,           color: "from-amber-50   to-white    border-amber-200   text-amber-700" },
    { label: "Declined",         value: declined.length,  sub: "Cannot attend",           icon: RiCloseCircleLine,    color: "from-red-50     to-white    border-red-200     text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, sub, icon: Icon, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`bg-gradient-to-br ${color} border rounded-luxury p-4 flex items-start gap-3`}
        >
          <div className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <p className="font-heading text-3xl font-semibold leading-none">{value}</p>
            <p className="font-body text-xs font-semibold mt-0.5">{label}</p>
            <p className="font-body text-[10px] text-muted mt-0.5">{sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}