import { motion } from "framer-motion";
import { RiEditLine, RiDeleteBinLine, RiUserLine, RiPhoneLine } from "react-icons/ri";

const RSVP_STYLES = {
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending:  "bg-amber-50   text-amber-700   border-amber-200",
  Declined: "bg-red-50     text-red-600     border-red-200",
};

export default function GuestCard({ guest, onEdit, onDelete, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-luxury border border-cream shadow-luxury p-4
                 hover:shadow-luxury-md hover:-translate-y-0.5 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-cream border border-gold/20
                          flex items-center justify-center shrink-0">
            <RiUserLine size={16} className="text-muted" />
          </div>
          <div className="min-w-0">
            <p className="font-body text-sm font-semibold text-dark truncate">{guest.name}</p>
            <p className="font-body text-[10px] text-muted truncate">{guest.relation}</p>
          </div>
        </div>
        <span className={`text-[10px] font-body font-semibold px-2.5 py-1 rounded-full border shrink-0
                          ${RSVP_STYLES[guest.rsvp] || RSVP_STYLES.Pending}`}>
          {guest.rsvp}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs font-body text-muted">
        <div className="flex items-center gap-1">
          <RiPhoneLine size={11} className="text-gold" />
          <span>{guest.phone || "No phone"}</span>
        </div>
        <span>{guest.dietary}</span>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream">
        <span className="font-body text-[10px] text-muted">
          {guest.rsvp === "Accepted" ? `${guest.attending} attending` : "—"} · Table {guest.table || "TBD"}
        </span>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(guest)}
            className="w-6 h-6 rounded-lg flex items-center justify-center
                       text-muted hover:text-gold hover:bg-cream transition-all">
            <RiEditLine size={12} />
          </button>
          <button onClick={() => onDelete(guest.id)}
            className="w-6 h-6 rounded-lg flex items-center justify-center
                       text-muted hover:text-red-500 hover:bg-red-50 transition-all">
            <RiDeleteBinLine size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}