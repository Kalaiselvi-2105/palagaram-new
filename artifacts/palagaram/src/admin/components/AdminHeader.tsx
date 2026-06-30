import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, Bell, Search, ChevronRight, Home } from "lucide-react";
import { useAuth } from "../AdminApp";

const ROUTE_LABELS: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/orders": "Order Management",
  "/admin/kitchen": "Kitchen Display",
  "/admin/reservations": "Reservations",
  "/admin/catering": "Catering Management",
  "/admin/menu": "Menu Management",
  "/admin/gallery": "Gallery",
  "/admin/customers": "Customers",
  "/admin/reviews": "Reviews",
  "/admin/notifications": "Notifications",
  "/admin/offers": "Offers & Coupons",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

export default function AdminHeader({ onMobileMenuToggle, sidebarCollapsed }: { onMobileMenuToggle: () => void; sidebarCollapsed: boolean }) {
  const [location] = useLocation();
  const { adminName } = useAuth();
  const pageLabel = ROUTE_LABELS[location] || "Admin";

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b flex-shrink-0" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)", minHeight: 60 }}>
      <div className="flex items-center gap-3">
        <button onClick={onMobileMenuToggle} className="lg:hidden p-2 rounded-lg" style={{ color: "rgba(212,175,55,0.6)" }}>
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(212,175,55,0.4)" }}>
            <Home className="w-3 h-3" />
            <ChevronRight className="w-3 h-3" />
            <span>{pageLabel}</span>
          </div>
          <h1 className="text-base font-semibold" style={{ color: "#faf6f0" }}>{pageLabel}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:block text-right">
          <div className="text-xs font-semibold" style={{ color: "#d4af37" }}>{timeStr}</div>
          <div className="text-xs" style={{ color: "rgba(250,246,240,0.3)" }}>{dateStr}</div>
        </div>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "rgba(212,175,55,0.4)" }} />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg outline-none w-44"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }}
          />
        </div>

        <motion.button whileHover={{ scale: 1.05 }} className="relative p-2 rounded-lg" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}>
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
        </motion.button>

        <div className="flex items-center gap-2 pl-3 border-l" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
            A
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium" style={{ color: "#faf6f0" }}>Admin</div>
            <div className="text-xs" style={{ color: "rgba(212,175,55,0.5)" }}>Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
