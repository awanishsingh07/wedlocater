import { motion, AnimatePresence } from "framer-motion";
import { RiEditLine, RiDeleteBinLine, RiUserLine } from "react-icons/ri";

const RSVP_STYLES = {
  Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending:  "bg-amber-50   text-amber-700   border-amber-200",
  Declined: "bg-red-50     text-red-600     border-red-200",
};

const SIDE_STYLES = {
  Bride: "text-maroon bg-maroon/8 border-maroon/15",
  Groom: "text-gold-dark bg-gold/8 border-gold/15",
  Both:  "text-muted bg-cream border-cream",
};

export default function GuestTable({ guests = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-cream bg-cream/40">
              {["Guest / Group", "Relation", "Side", "Attending", "Dietary", "RSVP", ""].map(h => (
                <th key={h}
                  className="text-left px-4 py-3 font-body text-[10px] font-semibold
                             text-muted uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {guests.map((guest, i) => (
                <motion.tr
                  key={guest.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.04 + 0.1, duration: 0.35 }}
                  className="border-b border-cream/60 hover:bg-cream/25 transition-colors group"
                >
                  {/* Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cream border border-gold/20
                                      flex items-center justify-center shrink-0">
                        <RiUserLine size={14} className="text-muted" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-sm font-medium text-dark truncate max-w-[160px]">
                          {guest.name}
                        </p>
                        {guest.notes && (
                          <p className="font-body text-[10px] text-muted truncate max-w-[160px]">
                            {guest.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Relation */}
                  <td className="px-4 py-3.5">
                    <span className="font-body text-xs text-muted">{guest.relation}</span>
                  </td>

                  {/* Side */}
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-body font-semibold px-2.5 py-1
                                      rounded-full border ${SIDE_STYLES[guest.side] || SIDE_STYLES.Both}`}>
                      {guest.side}
                    </span>
                  </td>

                  {/* Attending */}
                  <td className="px-4 py-3.5">
                    <span className="font-body text-sm font-semibold text-dark">
                      {guest.rsvp === "Accepted" ? guest.attending : "—"}
                    </span>
                  </td>

                  {/* Dietary */}
                  <td className="px-4 py-3.5">
                    <span className="font-body text-xs text-muted">{guest.dietary}</span>
                  </td>

                  {/* RSVP */}
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-body font-semibold px-2.5 py-1
                                      rounded-full border ${RSVP_STYLES[guest.rsvp] || RSVP_STYLES.Pending}`}>
                      {guest.rsvp}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100
                                    transition-opacity duration-200">
                      <button onClick={() => onEdit(guest)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center
                                   text-muted hover:text-gold hover:bg-cream transition-all">
                        <RiEditLine size={13} />
                      </button>
                      <button onClick={() => onDelete(guest.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center
                                   text-muted hover:text-red-500 hover:bg-red-50 transition-all">
                        <RiDeleteBinLine size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {guests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">👥</span>
            <p className="font-heading text-lg text-dark">No guests found</p>
            <p className="font-body text-sm text-muted">Add guests or adjust your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}