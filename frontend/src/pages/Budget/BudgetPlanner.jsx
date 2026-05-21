import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiEditLine, RiCheckLine, RiCloseLine,
  RiAddLine, RiDownloadLine, RiWalletLine,
} from "react-icons/ri";
import BudgetCard   from "../../components/budget/BudgetCard";
import BudgetChart  from "../../components/budget/BudgetChart";
import ExpenseCard  from "../../components/budget/ExpenseCard";
import ProgressBar  from "../../components/budget/ProgressBar";
import { DEFAULT_TOTAL_BUDGET, BUDGET_CATEGORIES, EXPENSE_LOG } from "../../data/budgetData";

const FMT = (n) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString("en-IN")}`;

export default function BudgetPlanner() {
  const [totalBudget,  setTotalBudget]  = useState(DEFAULT_TOTAL_BUDGET);
  const [editingTotal, setEditingTotal] = useState(false);
  const [draftTotal,   setDraftTotal]   = useState(DEFAULT_TOTAL_BUDGET);
  const [categories,   setCategories]   = useState(BUDGET_CATEGORIES);
  const [expenses]                      = useState(EXPENSE_LOG);
  const [expenseFilter, setFilter]      = useState("All");

  const totalSpent     = categories.reduce((s, c) => s + c.spent, 0);
  const totalAllocated = categories.reduce((s, c) => s + c.allocated, 0);
  const remaining      = totalBudget - totalSpent;
  const unallocated    = totalBudget - totalAllocated;
  const spentPct       = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  const handleCategoryUpdate = (id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const saveTotal = () => {
    setTotalBudget(Number(draftTotal));
    setEditingTotal(false);
  };

  const filteredExpenses = expenseFilter === "All"
    ? expenses
    : expenses.filter(e => e.status === expenseFilter);

  return (
    <div className="bg-ivory min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-maroon-gradient py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-gold/10 blur-[80px] pointer-events-none" />
        <div className="container-luxury relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center
                          justify-between gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="label-gold !text-gold/80 mb-2">
                <RiWalletLine className="inline mr-1" size={12} />
                Wedding Finance
              </p>
              <h1 className="font-heading text-display-md text-maroon/80 mb-2">Budget Tracker</h1>
              <p className="font-body text-creme/60 text-sm max-w-md">
                Track every rupee of your wedding budget across categories, monitor spending
                and stay in control of your big day finances.
              </p>
            </motion.div>

            {/* Total budget card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-luxury
                         p-5 min-w-[220px] shrink-0"
            >
              <p className="font-body text-[10px] text-creme/50 uppercase tracking-widest mb-1">
                Total Wedding Budget
              </p>
              {editingTotal ? (
                <div className="flex items-center gap-2">
                  <span className="text-maroon font-body">₹</span>
                  <input
                    type="number"
                    value={draftTotal}
                    onChange={e => setDraftTotal(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/30 rounded-lg
                               text-maroon font-heading text-xl px-2 py-1 outline-none
                               focus:border-gold min-w-0"
                    autoFocus
                  />
                  <button onClick={saveTotal}
                    className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all">
                    <RiCheckLine size={14} />
                  </button>
                  <button onClick={() => setEditingTotal(false)}
                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-ivory/50 hover:text-ivory transition-all">
                    <RiCloseLine size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl font-semibold text-maroon">
                    {FMT(totalBudget)}
                  </span>
                  <button onClick={() => { setDraftTotal(totalBudget); setEditingTotal(true); }}
                    className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center
                               text-ivory/50 hover:text-gold transition-all">
                    <RiEditLine size={12} />
                  </button>
                </div>
              )}
              <div className="mt-2">
                <ProgressBar value={totalSpent} max={totalBudget} height="h-1.5" animate={false} />
                <p className="font-body text-[10px] text-creme/40 mt-1">{spentPct}% spent</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-luxury px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Summary stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Budget",      value: FMT(totalBudget),    sub: "Your wedding fund",         color: "text-dark"           },
            { label: "Total Spent",        value: FMT(totalSpent),     sub: "Paid + committed",          color: "text-maroon"         },
            { label: "Remaining",          value: FMT(remaining),      sub: remaining < 0 ? "Over budget!" : "Available to spend", color: remaining < 0 ? "text-red-500" : "text-emerald-600" },
            { label: "Unallocated Budget", value: FMT(unallocated > 0 ? unallocated : 0), sub: "Not yet assigned", color: "text-gold-dark"  },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="bg-white rounded-luxury border border-cream shadow-luxury p-4">
              <p className="font-body text-[10px] text-muted uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`font-heading text-2xl sm:text-3xl font-semibold leading-none ${s.color}`}>{s.value}</p>
              <p className="font-body text-xs text-muted mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Chart + category cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <BudgetChart categories={categories} totalBudget={totalBudget} />
          </div>
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="label-gold mb-1">Category Breakdown</p>
                <h2 className="font-heading text-display-sm text-dark">Allocation by Category</h2>
              </div>
              <button className="btn-secondary !text-xs !px-4 !py-2.5">
                <RiAddLine size={14} /> Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <BudgetCard key={cat.id} category={cat} index={i} onUpdate={handleCategoryUpdate} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Expense log ── */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center
                          justify-between gap-4 mb-6">
            <div>
              <p className="label-gold mb-1">Expense Log</p>
              <h2 className="font-heading text-display-sm text-dark">Payment History</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Paid", "Pending", "Upcoming"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-body font-medium border
                              transition-all duration-200
                              ${expenseFilter === f
                                ? "bg-maroon text-ivory border-maroon"
                                : "bg-white text-muted border-cream hover:border-gold"
                              }`}>
                  {f}
                </button>
              ))}
              <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full
                                 text-xs font-body font-medium border border-cream bg-white
                                 text-muted hover:border-gold hover:text-gold transition-all">
                <RiDownloadLine size={13} /> Export
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {filteredExpenses.map((exp, i) => (
                <ExpenseCard key={exp.id} expense={exp} index={i} />
              ))}
            </AnimatePresence>
            {filteredExpenses.length === 0 && (
              <div className="text-center py-12 text-muted font-body text-sm">
                No expenses found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}