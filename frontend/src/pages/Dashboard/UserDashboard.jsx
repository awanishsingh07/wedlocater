import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiCalendarLine, RiWalletLine, RiCheckboxLine,
  RiHeartLine, RiSparklingLine, RiArrowRightLine,
} from "react-icons/ri";
import StatCard          from "../../components/dashboard/StatCard";
import ActivityFeed      from "../../components/dashboard/ActivityFeed";
import SectionHeader     from "../../components/dashboard/SectionHeader";
import StatusBadge       from "../../components/dashboard/StatusBadge";
import ChartPlaceholder  from "../../components/dashboard/ChartPlaceholder";
import {
  MOCK_USER, USER_BOOKINGS, USER_CHECKLIST,
  USER_BUDGET_BREAKDOWN, USER_ACTIVITY,
} from "../../utils/mockData";

const FMT = (n) => `₹${(n / 100000).toFixed(1)}L`;

// Days until wedding
const daysUntil = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / 86400000));
};

const DONUT_DATA = [
  { label: "Venue",        value: 850000,  color: "#6B0F1A" },
  { label: "Photography",  value: 120000,  color: "#C9A84C" },
  { label: "Decoration",   value: 220000,  color: "#8B1A28" },
  { label: "Catering",     value: 150000,  color: "#E2C97E" },
];

export default function UserDashboard() {
  const user    = MOCK_USER;
  const days    = daysUntil(user.weddingDate);
  const done    = USER_CHECKLIST.filter(c => c.done).length;
  const pct     = Math.round((user.budgetSpent / user.budgetTotal) * 100);
  const [checklist, setChecklist] = useState(USER_CHECKLIST);

  const toggleTask = (id) =>
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div className="flex flex-col gap-8">

      {/* ── Welcome banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-luxury-lg bg-maroon-gradient p-6 sm:p-8"
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }} />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full
                        bg-gold/10 blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row
                        items-start sm:items-center gap-5 justify-between">
          <div>
            <p className="label-gold !text-gold/80 mb-2">
              <RiSparklingLine className="inline mr-1" size={12} />
              Your Countdown
            </p>
            <h2 className="font-heading text-display-md text-maroon/70 mb-1">
              {days} days to go, {user.name.split(" ")[0]}! 💍
            </h2>
            <p className="font-body text-sm text-creme/60">
              Wedding date: {new Date(user.weddingDate).toLocaleDateString("en-IN",
                { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm
                          rounded-luxury px-8 py-4 border border-white/15 shrink-0">
            <span className="font-heading text-5xl font-semibold text-gold leading-none">{days}</span>
            <span className="font-body text-xs text-maroon/60 tracking-widest uppercase mt-1">Days Left</span>
          </div>
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Budget Spent"   value={FMT(user.budgetSpent)}
          sub={`of ${FMT(user.budgetTotal)} total`}
          icon={RiWalletLine}  accent="gold"   delay={0}
          trend="+12% this month" trendUp={false} />
        <StatCard label="Bookings Done"  value={`${USER_BOOKINGS.filter(b => b.status === "Confirmed").length}`}
          sub={`${USER_BOOKINGS.length} total bookings`}
          icon={RiCalendarLine} accent="maroon" delay={0.08}
          trend="2 confirmed" trendUp />
        <StatCard label="Tasks Complete" value={`${done}/${checklist.length}`}
          sub={`${checklist.length - done} tasks remaining`}
          icon={RiCheckboxLine} accent="default" delay={0.16}
          trend={`${Math.round(done / checklist.length * 100)}% done`} trendUp />
        <StatCard label="Days Until Wedding" value={`${days}`}
          sub={`${user.weddingDate}`}
          icon={RiHeartLine}   accent="gold"   delay={0.24}
          trend="Countdown" trendUp />
      </div>

      {/* ── Budget bar ── */}
      <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
        <SectionHeader label="Budget Tracker" title="Spending Overview" action="View Budget" />
        <div className="mb-4">
          <div className="flex justify-between text-xs font-body mb-2">
            <span className="text-muted">Spent: <strong className="text-dark">{FMT(user.budgetSpent)}</strong></span>
            <span className="text-muted">{pct}% of budget used</span>
            <span className="text-muted">Remaining: <strong className="text-maroon">{FMT(user.budgetTotal - user.budgetSpent)}</strong></span>
          </div>
          <div className="h-3 bg-cream rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-gold-gradient rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {USER_BUDGET_BREAKDOWN.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 0.4 }}
              className="flex flex-col gap-1.5 p-3 rounded-xl bg-cream/60 border border-cream"
            >
              <span className="font-body text-[10px] text-muted uppercase tracking-wide truncate">
                {item.category}
              </span>
              <span className="font-heading text-base font-semibold text-dark">
                {FMT(item.spent || 0)}
              </span>
              <div className="h-1 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-gradient rounded-full"
                  style={{ width: `${item.allocated ? (item.spent / item.allocated) * 100 : 0}%` }}
                />
              </div>
              <span className="font-body text-[10px] text-muted">
                of {FMT(item.allocated)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bookings + Checklist ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bookings */}
        <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <SectionHeader label="My Bookings" title="Vendor Bookings" action="View All" />
          <div className="flex flex-col gap-3">
            {USER_BOOKINGS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-cream/50
                           border border-cream hover:border-gold/30
                           hover:bg-cream transition-all duration-200 group"
              >
                <img src={b.image} alt={b.vendor}
                  className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-body text-sm font-medium text-dark truncate">{b.vendor}</p>
                  <p className="font-body text-xs text-muted">{b.category} · {b.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <StatusBadge status={b.status} />
                  <span className="font-heading text-sm font-semibold text-maroon">
                    {FMT(b.amount)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <SectionHeader label="Wedding Checklist" title="Task Progress" action="View All" />
          <div className="flex flex-col gap-2">
            {checklist.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.2 }}
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                           hover:bg-cream/60 transition-all duration-200 group"
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center
                                shrink-0 transition-all duration-200
                                ${task.done
                                  ? "bg-gold border-gold"
                                  : "border-cream bg-white group-hover:border-gold/50"
                                }`}>
                  {task.done && (
                    <svg viewBox="0 0 12 12" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </div>
                <span className={`font-body text-sm flex-1 transition-all duration-200
                                 ${task.done ? "line-through text-muted/50" : "text-dark"}`}>
                  {task.task}
                </span>
                <span className={`font-body text-[10px] whitespace-nowrap shrink-0
                                 ${task.done ? "text-gold" : "text-muted/60"}`}>
                  {task.due}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chart + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartPlaceholder
            title="Budget Distribution"
            subtitle="Breakdown by category"
            type="donut"
            height={180}
            data={DONUT_DATA}
          />
        </div>
        <ActivityFeed items={USER_ACTIVITY} title="Recent Activity" />
      </div>

    </div>
  );
}