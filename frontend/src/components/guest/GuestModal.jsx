import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiUserAddLine } from "react-icons/ri";
import { RSVP_STATUSES, SIDES, DIETARY_OPTS, RELATION_OPTS } from "../../data/guestData";

const EMPTY = {
  name: "", relation: "", side: "Both", phone: "", email: "",
  rsvp: "Pending", attending: 0, table: 0, dietary: "Vegetarian", notes: "",
};

export default function GuestModal({ open, onClose, onSave, editGuest = null }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editGuest ? { ...editGuest } : EMPTY);
  }, [editGuest, open]);

  const handle = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ ...form, id: editGuest?.id || `g${Date.now()}` });
    onClose();
  };

  const Field = ({ label, children, required }) => (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-dark/70 tracking-wide">
        {label}{required && <span className="text-maroon ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-ivory w-full max-w-xl max-h-[90svh] overflow-y-auto
                            rounded-luxury-lg shadow-luxury-lg border border-cream">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-cream shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-maroon/10 flex items-center justify-center">
                    <RiUserAddLine size={16} className="text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-dark">
                      {editGuest ? "Edit Guest" : "Add Guest"}
                    </h3>
                    <p className="font-body text-xs text-muted">
                      {editGuest ? "Update guest information" : "Add a new guest to your list"}
                    </p>
                  </div>
                </div>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full bg-cream flex items-center justify-center
                             text-muted hover:text-maroon transition-colors">
                  <RiCloseLine size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name / Group Name" required>
                    <input value={form.name} onChange={e => handle("name", e.target.value)}
                      className="input-luxury text-sm" placeholder="e.g. Priya & Rahul Sharma" />
                  </Field>
                  <Field label="Relation">
                    <select value={form.relation} onChange={e => handle("relation", e.target.value)}
                      className="select-luxury text-sm">
                      <option value="">Select relation</option>
                      {RELATION_OPTS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field label="Side">
                    <div className="flex gap-2">
                      {SIDES.map(s => (
                        <button key={s} type="button" onClick={() => handle("side", s)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-body font-medium border transition-all
                                      ${form.side === s ? "bg-maroon text-ivory border-maroon" : "bg-white text-muted border-cream hover:border-gold"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="RSVP Status">
                    <div className="flex gap-2">
                      {RSVP_STATUSES.map(s => {
                        const active = form.rsvp === s;
                        const colors = {
                          Accepted: active ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-muted border-cream hover:border-emerald-400",
                          Pending:  active ? "bg-amber-500 text-white border-amber-500"   : "bg-white text-muted border-cream hover:border-amber-400",
                          Declined: active ? "bg-red-500 text-white border-red-500"       : "bg-white text-muted border-cream hover:border-red-400",
                        };
                        return (
                          <button key={s} type="button" onClick={() => handle("rsvp", s)}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-body font-medium border transition-all ${colors[s]}`}>
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Phone">
                    <input value={form.phone} onChange={e => handle("phone", e.target.value)}
                      className="input-luxury text-sm" placeholder="+91 98765 43210" type="tel" />
                  </Field>
                  <Field label="Email">
                    <input value={form.email} onChange={e => handle("email", e.target.value)}
                      className="input-luxury text-sm" placeholder="email@example.com" type="email" />
                  </Field>
                  <Field label="No. Attending">
                    <input value={form.attending} onChange={e => handle("attending", Number(e.target.value))}
                      className="input-luxury text-sm" type="number" min={0} max={20} />
                  </Field>
                  <Field label="Table No.">
                    <input value={form.table} onChange={e => handle("table", Number(e.target.value))}
                      className="input-luxury text-sm" type="number" min={0} />
                  </Field>
                  <Field label="Dietary Preference">
                    <select value={form.dietary} onChange={e => handle("dietary", e.target.value)}
                      className="select-luxury text-sm">
                      {DIETARY_OPTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Notes">
                  <textarea value={form.notes} onChange={e => handle("notes", e.target.value)}
                    className="input-luxury text-sm !h-20 resize-none"
                    placeholder="Any special requirements or notes…" />
                </Field>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={onClose}
                    className="btn-secondary flex-1 !justify-center !py-3 !text-sm">
                    Cancel
                  </button>
                  <button type="submit"
                    className="btn-primary flex-1 !justify-center !py-3 !text-sm">
                    {editGuest ? "Save Changes" : "Add Guest"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}