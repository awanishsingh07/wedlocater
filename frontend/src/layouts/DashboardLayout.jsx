import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import {
  RiBellLine, RiSearchLine, RiSettings3Line,
} from "react-icons/ri";

export default function DashboardLayout({ role = "user", user = {} }) {
  const [collapsed, setCollapsed] = useState(false);

  const titleMap = {
    user:   "My Wedding Dashboard",
    vendor: "Vendor Dashboard",
    admin:  "Admin Dashboard",
  };

  return (
    <div className="flex min-h-screen bg-ivory font-body">
      {/* Sidebar */}
      <DashboardSidebar
        role={role}
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-ivory/95 backdrop-blur-md
                           border-b border-cream h-16 flex items-center
                           px-4 sm:px-6 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-lg font-semibold text-dark truncate">
              {titleMap[role]}
            </h1>
          </div>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-white border border-cream
                          rounded-xl px-3 py-2 text-sm text-muted w-48 xl:w-64">
            <RiSearchLine size={15} />
            <span className="text-xs">Search…</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center
                               bg-white border border-cream text-muted hover:text-maroon
                               hover:border-gold transition-all duration-200">
              <RiBellLine size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-maroon" />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center
                               bg-white border border-cream text-muted hover:text-maroon
                               hover:border-gold transition-all duration-200">
              <RiSettings3Line size={18} />
            </button>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-xl object-cover border-2 border-cream
                         hover:border-gold transition-all duration-200 cursor-pointer"
            />
          </div>
        </header>

        {/* Page content */}
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}