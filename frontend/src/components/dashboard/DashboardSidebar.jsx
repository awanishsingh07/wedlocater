import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDashboardLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiWalletLine,
  RiUserLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiStoreLine,
  RiStarLine,
  RiBarChart2Line,
  RiShieldUserLine,
  RiGroupLine,
  RiFileListLine,
  RiAlertLine,
  RiArrowRightSLine,
} from "react-icons/ri";

const NAV_SETS = {
  user: [
    { icon: RiDashboardLine, label: "Dashboard", path: "/dashboard" },
    { icon: RiCalendarLine, label: "My Bookings", path: "/dashboard/bookings" },
    {
      icon: RiCheckboxCircleLine,
      label: "Checklist",
      path: "/dashboard/checklist",
    },
    { icon: RiWalletLine, label: "Budget", path: "/dashboard/budget" },
    { icon: RiUserLine, label: "Profile", path: "/dashboard/profile" },
    { icon: RiSettings3Line, label: "Settings", path: "/dashboard/settings" },
  ],
  vendor: [
    { icon: RiDashboardLine, label: "Overview", path: "/vendor/dashboard" },
    { icon: RiCalendarLine, label: "Bookings", path: "/vendor/bookings" },
    { icon: RiBarChart2Line, label: "Analytics", path: "/vendor/analytics" },
    { icon: RiStarLine, label: "Reviews", path: "/vendor/reviews" },
    { icon: RiStoreLine, label: "My Listing", path: "/vendor/listing" },
    { icon: RiWalletLine, label: "Earnings", path: "/vendor/earnings" },
    { icon: RiSettings3Line, label: "Settings", path: "/vendor/settings" },
  ],
  admin: [
    { icon: RiDashboardLine, label: "Overview", path: "/admin/dashboard" },
    { icon: RiGroupLine, label: "Users", path: "/admin/users" },
    { icon: RiStoreLine, label: "Vendors", path: "/admin/vendors" },
    { icon: RiFileListLine, label: "Bookings", path: "/admin/bookings" },
    { icon: RiBarChart2Line, label: "Analytics", path: "/admin/analytics" },
    {
      icon: RiAlertLine,
      label: "Disputes",
      path: "/admin/disputes",
      badge: "3",
    },
    {
      icon: RiShieldUserLine,
      label: "Approvals",
      path: "/admin/approvals",
      badge: "38",
    },
    { icon: RiSettings3Line, label: "Settings", path: "/admin/settings" },
  ],
};

export default function DashboardSidebar({
  role = "user",
  user = {},
  collapsed,
  setCollapsed,
}) {
  const links = NAV_SETS[role] || NAV_SETS.user;

  const roleLabel = { user: "Couple", vendor: "Vendor", admin: "Admin" }[role];
  const roleColor = {
    user: "text-gold",
    vendor: "text-maroon",
    admin: "text-maroon",
  }[role];

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex flex-col bg-dark border-r border-white/8
                   h-screen sticky top-0 overflow-hidden shrink-0 z-30"
      >
        {/* Logo + collapse toggle */}
        <div
          className={`flex items-center h-16 px-4 border-b border-white/8
                        ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <Link
              to="/"
              className="font-heading text-xl font-semibold text-ivory"
            >
              Wed<span className="text-gold">Locater</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-ivory/40 hover:text-gold hover:bg-white/8
                       transition-all duration-200"
          >
            {collapsed ? (
              <RiMenuUnfoldLine size={18} />
            ) : (
              <RiMenuFoldLine size={18} />
            )}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-gold/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-body text-xs font-semibold text-ivory truncate">
                  {user.name}
                </p>
                <p className={`font-body text-[10px] font-medium ${roleColor}`}>
                  {roleLabel} · {user.plan || "Free"}
                </p>
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-4 border-b border-white/8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-gold/40"
            />
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 hide-scrollbar">
          {links.map(({ icon: Icon, label, path, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path.endsWith("dashboard")}
              className={({ isActive }) =>
                `relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl
                 font-body text-sm font-medium transition-all duration-200 group
                 ${collapsed ? "justify-center" : ""}
                 ${
                   isActive
                     ? "bg-maroon text-ivory shadow-maroon"
                     : "text-ivory/50 hover:bg-white/8 hover:text-ivory"
                 }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && badge && (
                <span
                  className="ml-auto text-[10px] font-bold bg-gold text-dark
                                 rounded-full w-5 h-5 flex items-center justify-center shrink-0"
                >
                  {badge}
                </span>
              )}
              {/* Tooltip when collapsed */}
              {collapsed && (
                <div
                  className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg
                                bg-dark border border-white/10 text-ivory text-xs
                                whitespace-nowrap opacity-0 group-hover:opacity-100
                                pointer-events-none transition-opacity duration-200 z-50"
                >
                  {label}
                  {badge && (
                    <span className="ml-1.5 text-gold font-bold">
                      ({badge})
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/8">
          <button
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                        text-ivory/40 hover:text-red-400 hover:bg-white/5
                        font-body text-sm transition-all duration-200
                        ${collapsed ? "justify-center" : ""}`}
          >
            <RiLogoutBoxLine size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                      bg-dark border-t border-white/10 pb-safe"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {links.slice(0, 5).map(({ icon: Icon, label, path, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path.endsWith("dashboard")}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl
                 font-body text-[10px] font-medium transition-all duration-200 relative
                 ${isActive ? "text-gold" : "text-ivory/40 hover:text-ivory/70"}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
              {badge && (
                <span
                  className="absolute -top-0.5 right-2 text-[8px] font-bold
                                 bg-gold text-dark rounded-full w-4 h-4
                                 flex items-center justify-center"
                >
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
