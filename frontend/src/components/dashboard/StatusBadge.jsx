const MAP = {
  Confirmed:   "bg-emerald-50  text-emerald-700 border-emerald-200",
  Pending:     "bg-amber-50    text-amber-700   border-amber-200",
  Negotiating: "bg-blue-50     text-blue-700    border-blue-200",
  Cancelled:   "bg-red-50      text-red-600     border-red-200",
  Active:      "bg-emerald-50  text-emerald-700 border-emerald-200",
  Suspended:   "bg-red-50      text-red-600     border-red-200",
  Approved:    "bg-emerald-50  text-emerald-700 border-emerald-200",
};

export default function StatusBadge({ status = "Pending" }) {
  const cls = MAP[status] || "bg-cream text-muted border-cream";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full
                      text-[10px] font-body font-semibold border ${cls}`}>
      {status}
    </span>
  );
}