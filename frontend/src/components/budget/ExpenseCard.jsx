import { motion } from "framer-motion";
import { BUDGET_CATEGORIES } from "../../data/budgetData";

const FMT = (n) => `₹${n.toLocaleString("en-IN")}`;

const STATUS_STYLES = {
  Paid:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending:  "bg-amber-50   text-amber-700   border-amber-200",
  Upcoming: "bg-blue-50    text-blue-700    border-blue-200",
};

export default function ExpenseCard({ expense, index = 0 }) {
  const cat = BUDGET_CATEGORIES.find(c => c.id === expense.category);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 + 0.2, duration: 0.4 }}
      className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-cream
                 hover:border-gold/30 hover:shadow-luxury transition-all duration-200 group"
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: cat?.lightColor || "rgba(201,168,76,0.1)" }}>
        {cat?.icon || "💰"}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-dark truncate">{expense.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-body text-[10px] text-muted">{expense.date}</span>
          <span className="w-1 h-1 rounded-full bg-muted/30" />
          <span className="font-body text-[10px] text-muted capitalize">{cat?.label}</span>
        </div>
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="font-heading text-base font-semibold text-dark">{FMT(expense.amount)}</span>
        <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-full border
                          ${STATUS_STYLES[expense.status] || STATUS_STYLES.Pending}`}>
          {expense.status}
        </span>
      </div>
    </motion.div>
  );
}