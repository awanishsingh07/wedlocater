import { motion } from "framer-motion";
import {
  RiGroupLine, RiStoreLine, RiCalendarLine,
  RiMoneyDollarCircleLine, RiAlertLine, RiCheckboxCircleLine,
  RiArrowRightLine,
} from "react-icons/ri";
import StatCard         from "../../components/dashboard/StatCard";
import ActivityFeed     from "../../components/dashboard/ActivityFeed";
import SectionHeader    from "../../components/dashboard/SectionHeader";
import StatusBadge      from "../../components/dashboard/StatusBadge";
import ChartPlaceholder from "../../components/dashboard/ChartPlaceholder";
import {
  ADMIN_STATS, ADMIN_RECENT_USERS, ADMIN_PENDING_VENDORS,
  ADMIN_REVENUE_DATA, ADMIN_ACTIVITY,
} from "../../utils/mockData";

const FMT_CR = (n) => `₹${(n / 10000000).toFixed(1)}Cr`;
const FMT_K  = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

const LINE_DATA = ADMIN_REVENUE_DATA.map(r => ({
  label: r.month, value: r.revenue,
}));
const BAR_DATA = ADMIN_REVENUE_DATA.map(r => ({
  label: r.month, value: r.bookings,
  color: "linear-gradient(135deg,#C9A84C,#E2C97E)",
}));

const CATEGORY_DONUT = [
  { label: "Venues",       value: 42, color: "#6B0F1A" },
  { label: "Photography",  value: 28, color: "#C9A84C" },
  { label: "Catering",     value: 18, color: "#8B1A28" },
  { label: "Others",       value: 12, color: "#E2C97E" },
];

export default function AdminDashboard() {
  const s = ADMIN_STATS;

  return (
    <div className="flex flex-col gap-8">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Total Users",     value: FMT_K(s.totalUsers),    sub: `+${s.newUsersToday} today`,     icon: RiGroupLine,               accent: "gold",    trend: "+8.4%",  trendUp: true  },
          { label: "Total Vendors",   value: s.totalVendors,          sub: `${s.pendingApprovals} pending`, icon: RiStoreLine,               accent: "maroon",  trend: "+12",    trendUp: true  },
          { label: "Total Bookings",  value: FMT_K(s.totalBookings),  sub: "All time",                      icon: RiCalendarLine,            accent: "default", trend: "+6.2%",  trendUp: true  },
          { label: "Total Revenue",   value: FMT_CR(s.totalRevenue),  sub: "All time GMV",                  icon: RiMoneyDollarCircleLine,   accent: "gold",    trend: "+18.7%", trendUp: true  },
          { label: "Pending Approvals",value: s.pendingApprovals,     sub: "Vendor KYC",                    icon: RiAlertLine,               accent: "maroon",  trend: "Urgent", trendUp: false },
          { label: "New Users Today", value: s.newUsersToday,         sub: "Past 24 hours",                 icon: RiCheckboxCircleLine,      accent: "default", trend: "+31%",   trendUp: true  },
        ].map((c, i) => (
          <StatCard key={c.label} {...c} delay={i * 0.06} />
        ))}
      </div>

      {/* ── Revenue + Bookings charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Revenue Trend"
          subtitle="Monthly platform revenue (₹)"
          type="line"
          height={200}
          data={LINE_DATA}
        />
        <ChartPlaceholder
          title="Booking Volume"
          subtitle="Monthly bookings count"
          type="bar"
          height={200}
          data={BAR_DATA}
        />
      </div>

      {/* ── Category mix + pending vendors ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Donut */}
        <ChartPlaceholder
          title="Category Mix"
          subtitle="Bookings by vendor type"
          type="donut"
          height={160}
          data={CATEGORY_DONUT}
        />

        {/* Pending vendor approvals */}
        <div className="lg:col-span-2 bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <SectionHeader label="Approvals" title="Pending Vendor KYC" action="View All" />
          <div className="flex flex-col gap-2">
            {ADMIN_PENDING_VENDORS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                className="flex items-center gap-3 p-3 rounded-xl
                           bg-cream/50 border border-cream hover:border-gold/30
                           transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-maroon/10 flex items-center
                                justify-center shrink-0">
                  <RiStoreLine size={16} className="text-maroon" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-dark truncate">{v.name}</p>
                  <p className="font-body text-xs text-muted">{v.category} · {v.city}</p>
                </div>
                <span className="font-body text-[10px] text-muted/60 whitespace-nowrap shrink-0">
                  {v.submitted}
                </span>
                <div className="flex gap-2 shrink-0">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-body font-medium
                                     bg-emerald-50 text-emerald-700 border border-emerald-200
                                     hover:bg-emerald-100 transition-colors duration-200">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-body font-medium
                                     bg-red-50 text-red-600 border border-red-200
                                     hover:bg-red-100 transition-colors duration-200">
                    Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent users + activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent users */}
        <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <SectionHeader label="Users" title="Recently Joined" action="View All" />
          <div className="flex flex-col gap-2">
            {ADMIN_RECENT_USERS.map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                className="flex items-center gap-3 p-3 rounded-xl
                           hover:bg-cream/60 transition-colors duration-200 group cursor-pointer"
              >
                <img src={u.avatar} alt={u.name}
                  className="w-9 h-9 rounded-full object-cover border border-cream shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-dark truncate">{u.name}</p>
                  <p className="font-body text-xs text-muted">{u.city}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border
                    ${u.plan === "Premium"
                      ? "bg-gold/10 text-gold-dark border-gold/20"
                      : "bg-cream text-muted border-cream"
                    }`}>
                    {u.plan}
                  </span>
                  <span className="font-body text-[10px] text-muted/60">{u.joined}</span>
                </div>
                <RiArrowRightLine size={14} className="text-muted/30 group-hover:text-gold
                                                        transition-colors duration-200 shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <ActivityFeed items={ADMIN_ACTIVITY} title="Platform Activity" />
      </div>

    </div>
  );
}