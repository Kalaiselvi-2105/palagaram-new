import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard, BarChart3, ShoppingBag, ChefHat, Calendar,
  Utensils, UtensilsCrossed, Image, Users, Star, Bell, Tag,
  Settings, FileText, ChevronLeft, ChevronRight, LogOut, X, Layers
} from "lucide-react";
import { useAuth } from "../AdminApp";

const NAV_ITEMS = [
  { group: "Overview", items: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  ]},
  { group: "Operations", items: [
    { icon: ShoppingBag, label: "Orders", path: "/admin/orders", badge: "12" },
    { icon: ChefHat, label: "Kitchen", path: "/admin/kitchen", badge: "5" },
    { icon: Calendar, label: "Reservations", path: "/admin/reservations" },
    { icon: Utensils, label: "Catering", path: "/admin/catering", badge: "3" },
  ]},
  { group: "Content", items: [
    { icon: UtensilsCrossed, label: "Menu", path: "/admin/menu" },
    { icon: Layers, label: "Daily Combos", path: "/admin/daily-combos" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
  ]},
  { group: "CRM", items: [
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Star, label: "Reviews", path: "/admin/reviews", badge: "8" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications", badge: "24" },
    { icon: Tag, label: "Offers", path: "/admin/offers" },
  ]},
  { group: "System", items: [
    { icon: FileText, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ]},
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: SidebarProps) {
  const [location, setLocation] = useLocation();
  const { logout } = useAuth();

  const navigate = (path: string) => {
    setLocation(path);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)" }}>
                <ChefHat className="w-4 h-4 text-stone-900" />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "#d4af37", fontFamily: "'Playfair Display', serif" }}>Palagaram</div>
                <div className="text-xs" style={{ color: "rgba(212,175,55,0.4)" }}>Admin Panel</div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)" }}>
                <ChefHat className="w-4 h-4 text-stone-900" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={onCollapse} className="hidden lg:flex p-1 rounded-lg transition-colors hover:bg-white/5 ml-auto" style={{ color: "rgba(212,175,55,0.5)" }}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-4">
            {!collapsed && (
              <div className="px-2 mb-1 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.35)" }}>
                {group.group}
              </div>
            )}
            {group.items.map((item) => {
              const active = location === item.path || location.startsWith(item.path + "/");
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ x: collapsed ? 0 : 2 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 group relative"
                  style={{
                    background: active ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))" : "transparent",
                    color: active ? "#d4af37" : "rgba(250,246,240,0.55)",
                    border: active ? "1px solid rgba(212,175,55,0.25)" : "1px solid transparent",
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${active ? "" : "group-hover:text-amber-400"}`} style={{ color: active ? "#d4af37" : undefined }} />
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(212,175,55,0.25)", color: "#d4af37" }}>
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t" style={{ borderColor: "rgba(212,175,55,0.15)" }}>
        <motion.button
          onClick={logout}
          whileHover={{ x: collapsed ? 0 : 2 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
          style={{ color: "rgba(239,68,68,0.7)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col h-full flex-shrink-0 border-r overflow-hidden"
        style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full z-50 w-64 lg:hidden flex flex-col border-r"
            style={{ background: "#110806", borderColor: "rgba(212,175,55,0.15)" }}
          >
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-1 rounded-lg"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              <X className="w-4 h-4" />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
