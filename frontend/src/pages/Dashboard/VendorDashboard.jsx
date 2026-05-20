import { motion } from "framer-motion";
import {
  RiWalletLine, RiCalendarLine, RiStarLine,
  RiEyeLine, RiGroupLine,
} from "react-icons/ri";
import StatCard         from "../../components/dashboard/StatCard";
import ActivityFeed     from "../../components/dashboard/ActivityFeed";
import SectionHeader    from "../../components/dashboard/SectionHeader";
import StatusBadge      from "../../components/dashboard/StatusBadge";
import ChartPlaceholder from "../../components/dashboard/ChartPlaceholder";
import {
  MOCK_VENDOR_USER, VENDOR_BOOKINGS, VENDOR_EARNINGS, VENDOR_ACTIVITY,
} from "../../utils/mockData";

const FMT    = (n) => `₹${(n / 100000).toFixed(1)}L`;
const FMT_K  = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`;

const TOTAL_REVENUE = VENDOR_BOOKINGS.reduce((s, b) => s + b.amount, 0);
const CONFIRMED     = VENDOR_BOOKINGS.filter(b => b.status === "Confirmed").length;

const BAR_DATA = VENDOR_EARNINGS.map(e => ({
  label: e.month,
  value: e.amount,
  color: "linear-gradient(135deg,#6B0F1A,#8B1A28)",
}));

export default function VendorDashboard() {
  const vendor = MOCK_VENDOR_USER;

  return (
    <div className="flex flex-col gap-8">

      {/* ── Profile banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-luxury-lg bg-white
                   border border-cream shadow-luxury p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-full
                        bg-gold-gradient opacity-5 pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img src={vendor.avatar} alt={vendor.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-gold/40" />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full
                             bg-emerald-500 border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="font-heading text-display-sm text-dark">{vendor.name}</h2>
              <span className="badge-maroon">{vendor.category}</span>
              {vendor.verified && <span className="badge-gold">✓ Verified</span>}
            </div>
            <p className="font-body text-sm text-muted">{vendor.city} · {vendor.plan}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <RiStarLine key={i} size={13}
                  className={i < Math.floor(vendor.rating) ? "text-gold" : "text-cream"} />
              ))}
              <span className="font-body text-xs font-semibold text-dark ml-1">{vendor.rating}</span>
              <span className="font-body text-xs text-muted">({vendor.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="btn-secondary !px-5 !py-2.5 !text-xs">Edit Profile</button>
            <button className="btn-primary !px-5 !py-2.5 !text-xs">View Listing</button>
          </div>
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue"  value={FMT(TOTAL_REVENUE)}
          sub="All time earnings"        icon={RiWalletLine}   accent="gold"    delay={0}
          trend="+18% vs last month"  trendUp />
        <StatCard label="Confirmed Bookings" value={`${CONFIRMED}`}
          sub={`${VENDOR_BOOKINGS.length} total enquiries`}
          icon={RiCalendarLine}          accent="maroon"  delay={0.08}
          trend="+3 this week" trendUp />
        <StatCard label="Profile Views"  value="2,840"
          sub="Last 30 days"             icon={RiEyeLine}      accent="default" delay={0.16}
          trend="+22% vs last month" trendUp />
        <StatCard label="Avg Rating"     value={`${vendor.rating}`}
          sub={`${vendor.reviews} verified reviews`}
          icon={RiStarLine}              accent="gold"    delay={0.24}
          trend="+0.2 this quarter" trendUp />
      </div>

      {/* ── Revenue chart + upcoming ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartPlaceholder
            title="Monthly Revenue"
            subtitle="Last 6 months earnings"
            type="bar"
            height={200}
            data={BAR_DATA}
          />
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
          <h3 className="font-heading text-lg font-semibold text-dark mb-5">
            This Month
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { label: "New Enquiries",     value: "12",   icon: RiGroupLine,    color: "text-maroon" },
              { label: "Events Confirmed",  value: "4",    icon: RiCalendarLine, color: "text-gold-dark" },
              { label: "Avg Event Value",   value: "₹3.6L",icon: RiWalletLine,   color: "text-maroon" },
              { label: "Response Rate",     value: "94%",  icon: RiEyeLine,      color: "text-gold-dark" },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.3 }}
                className="flex items-center justify-between p-3
                           bg-cream/50 rounded-xl border border-cream">
                <div className="flex items-center gap-2.5">
                  <s.icon size={16} className={s.color} />
                  <span className="font-body text-sm text-muted">{s.label}</span>
                </div>
                <span className="font-heading text-base font-semibold text-dark">{s.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bookings table ── */}
      <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5 sm:p-6">
        <SectionHeader label="Bookings" title="Recent Enquiries & Bookings" action="View All" />
        <div className="overflow-x-auto -mx-5 sm:-mx-6">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-cream">
                {["Client", "Event", "Date", "Guests", "Amount", "Status", ""].map(h => (
                  <th key={h}
                    className="text-left px-5 sm:px-6 py-3 font-body text-[10px]
                               font-semibold text-muted uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VENDOR_BOOKINGS.map((b, i) => (
                <motion.tr
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                  className="border-b border-cream/60 hover:bg-cream/30
                             transition-colors duration-200 group"
                >
                  <td className="px-5 sm:px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={b.avatar} alt={b.client}
                        className="w-8 h-8 rounded-full object-cover border border-cream" />
                      <span className="font-body text-sm font-medium text-dark">{b.client}</span>
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-muted">{b.event}</td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-muted">{b.date}</td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-muted">{b.guests}</td>
                  <td className="px-5 sm:px-6 py-3.5 font-heading text-sm font-semibold text-maroon">
                    {FMT(b.amount)}
                  </td>
                  <td className="px-5 sm:px-6 py-3.5"><StatusBadge status={b.status} /></td>
                  <td className="px-5 sm:px-6 py-3.5">
                    <button className="font-body text-xs text-maroon hover:text-gold
                                       transition-colors duration-200 opacity-0 group-hover:opacity-100">
                      Details →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Activity ── */}
      <ActivityFeed items={VENDOR_ACTIVITY} title="Recent Activity" />
    </div>
  );
}