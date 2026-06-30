import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ShoppingBag, Calendar, Star, AlertTriangle, CheckCircle, DollarSign, ChefHat, Trash2 } from "lucide-react";

const ALL_NOTIFS = [
  { id: 1, type: "order", icon: ShoppingBag, title: "New Order Received", desc: "Order #ORD-1288 from Table 2 — Veg Thali × 4", time: "Just now", read: false, color: "#d4af37", bg: "rgba(212,175,55,0.12)" },
  { id: 2, type: "order", icon: ChefHat, title: "Order Ready for Delivery", desc: "Order #ORD-1280 is ready — Karthik R.", time: "2 min ago", read: false, color: "#4ade80", bg: "rgba(34,197,94,0.12)" },
  { id: 3, type: "reservation", icon: Calendar, title: "New Reservation", desc: "Meena Sundaram booked table for 6 guests — 2:00 PM today", time: "8 min ago", read: false, color: "#60a5fa", bg: "rgba(59,130,246,0.12)" },
  { id: 4, type: "review", icon: Star, title: "New 5-Star Review", desc: "Rajesh Kumar left a glowing review for Chicken Biryani", time: "15 min ago", read: false, color: "#facc15", bg: "rgba(234,179,8,0.12)" },
  { id: 5, type: "payment", icon: DollarSign, title: "Payment Received", desc: "₹966 received via UPI — Order #ORD-1282", time: "18 min ago", read: true, color: "#4ade80", bg: "rgba(34,197,94,0.12)" },
  { id: 6, type: "alert", icon: AlertTriangle, title: "Low Stock Alert", desc: "Saffron stock is running low — only 3 portions remaining", time: "25 min ago", read: true, color: "#fb923c", bg: "rgba(249,115,22,0.12)" },
  { id: 7, type: "order", icon: ShoppingBag, title: "Order Cancelled", desc: "Order #ORD-1279 cancelled by customer — Prawn Masala", time: "32 min ago", read: true, color: "#f87171", bg: "rgba(239,68,68,0.12)" },
  { id: 8, type: "reservation", icon: Calendar, title: "Reservation Reminder", desc: "Anand Krishnan — Anniversary dinner at 7:30 PM tonight", time: "1 hour ago", read: true, color: "#60a5fa", bg: "rgba(59,130,246,0.12)" },
  { id: 9, type: "review", icon: AlertTriangle, title: "Negative Review Alert", desc: "2-star review received — Late delivery complaint", time: "2 hours ago", read: true, color: "#f87171", bg: "rgba(239,68,68,0.12)" },
  { id: 10, type: "system", icon: CheckCircle, title: "Daily Report Ready", desc: "Your daily business report for June 29 is now available", time: "3 hours ago", read: true, color: "#818cf8", bg: "rgba(99,102,241,0.12)" },
  { id: 11, type: "payment", icon: DollarSign, title: "Catering Payment", desc: "₹80,000 advance received from TCS India Ltd. for catering", time: "4 hours ago", read: true, color: "#4ade80", bg: "rgba(34,197,94,0.12)" },
  { id: 12, type: "alert", icon: AlertTriangle, title: "Peak Hours Starting", desc: "Lunch peak hours begin in 15 minutes — kitchen alert", time: "5 hours ago", read: true, color: "#fb923c", bg: "rgba(249,115,22,0.12)" },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "order", label: "Orders" },
  { key: "reservation", label: "Reservations" },
  { key: "payment", label: "Payments" },
  { key: "review", label: "Reviews" },
  { key: "alert", label: "Alerts" },
  { key: "system", label: "System" },
];

export default function AdminNotifications() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = notifs.filter((n) => activeCategory === "all" || n.type === activeCategory);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: number) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Notifications</h2>
            {unread > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#d4af37", color: "#1a0f0a" }}>{unread} new</span>
            )}
          </div>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Real-time restaurant alerts and updates</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="px-3 py-2 rounded-xl text-xs font-medium"
            style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {CATEGORIES.slice(1).map((cat) => {
          const count = notifs.filter(n => n.type === cat.key).length;
          const unreadCount = notifs.filter(n => n.type === cat.key && !n.read).length;
          return (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className="rounded-xl p-3 border text-center transition-all"
              style={{ background: activeCategory === cat.key ? "rgba(212,175,55,0.12)" : "#110806", borderColor: activeCategory === cat.key ? "rgba(212,175,55,0.3)" : "rgba(212,175,55,0.1)" }}>
              <div className="text-lg font-bold" style={{ color: activeCategory === cat.key ? "#d4af37" : "#faf6f0" }}>{count}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{cat.label}</div>
              {unreadCount > 0 && <div className="mt-1 text-xs font-bold" style={{ color: "#d4af37" }}>+{unreadCount}</div>}
            </button>
          );
        })}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{ background: activeCategory === cat.key ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: activeCategory === cat.key ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${activeCategory === cat.key ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((notif) => (
            <motion.div key={notif.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              onClick={() => markRead(notif.id)}
              className="flex items-start gap-3 px-4 py-3.5 rounded-2xl border cursor-pointer transition-all group"
              style={{ background: notif.read ? "#110806" : "rgba(212,175,55,0.04)", borderColor: notif.read ? "rgba(212,175,55,0.08)" : "rgba(212,175,55,0.2)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: notif.bg }}>
                <notif.icon className="w-4 h-4" style={{ color: notif.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: notif.read ? "rgba(250,246,240,0.7)" : "#faf6f0" }}>{notif.title}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#d4af37" }} />}
                </div>
                <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.45)" }}>{notif.desc}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs" style={{ color: "rgba(250,246,240,0.3)" }}>{notif.time}</span>
                <button onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                  style={{ color: "rgba(239,68,68,0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "rgba(250,246,240,0.3)" }}>
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
