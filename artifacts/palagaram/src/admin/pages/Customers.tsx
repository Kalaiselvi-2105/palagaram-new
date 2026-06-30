import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Crown, Shield, AlertTriangle, ShoppingBag, TrendingUp, Phone, Mail, MapPin, Clock } from "lucide-react";

const CUSTOMERS = [
  { id: "C001", name: "Rajesh Kumar", email: "rajesh@email.com", phone: "+91 98765 43210", city: "Anna Nagar", joinDate: "2024-01-15", orders: 84, spent: 58420, avgOrder: 695, rating: 4.9, membership: "Gold", lastOrder: "2 hours ago", notes: "Regular customer, loves biryani", vip: true, blacklisted: false },
  { id: "C002", name: "Priya Sharma", email: "priya@email.com", phone: "+91 87654 32109", city: "T Nagar", joinDate: "2024-03-20", orders: 45, spent: 28750, avgOrder: 639, rating: 4.7, membership: "Silver", lastOrder: "Yesterday", notes: "Prefers vegetarian", vip: false, blacklisted: false },
  { id: "C003", name: "Arjun Nair", email: "arjun@email.com", phone: "+91 76543 21098", city: "Velachery", joinDate: "2023-11-08", orders: 128, spent: 104960, avgOrder: 820, rating: 4.8, membership: "Platinum", lastOrder: "1 hour ago", notes: "Top customer", vip: true, blacklisted: false },
  { id: "C004", name: "Meera Iyer", email: "meera@email.com", phone: "+91 65432 10987", city: "Mylapore", joinDate: "2024-05-12", orders: 22, spent: 12640, avgOrder: 575, rating: 4.5, membership: "Bronze", lastOrder: "3 days ago", notes: "", vip: false, blacklisted: false },
  { id: "C005", name: "Karthik R.", email: "karthik@email.com", phone: "+91 54321 09876", city: "Adyar", joinDate: "2024-02-28", orders: 67, spent: 43890, avgOrder: 655, rating: 4.6, membership: "Silver", lastOrder: "Today", notes: "Festival orders", vip: false, blacklisted: false },
  { id: "C006", name: "Vijay Mohan", email: "vijay@email.com", phone: "+91 43210 98765", city: "OMR", joinDate: "2023-08-14", orders: 8, spent: 4200, avgOrder: 525, rating: 2.1, membership: "Bronze", lastOrder: "2 weeks ago", notes: "Multiple complaints, difficult", vip: false, blacklisted: true },
  { id: "C007", name: "Lakshmi R.", email: "lakshmi@email.com", phone: "+91 32109 87654", city: "Chromepet", joinDate: "2024-04-01", orders: 156, spent: 142800, avgOrder: 916, rating: 5.0, membership: "Platinum", lastOrder: "Just now", notes: "Best customer ever! Always positive feedback", vip: true, blacklisted: false },
];

const MEMBERSHIP_CFG: Record<string, { color: string; bg: string; icon: any }> = {
  Platinum: { color: "#e0d0ff", bg: "rgba(192,132,252,0.15)", icon: Crown },
  Gold: { color: "#d4af37", bg: "rgba(212,175,55,0.15)", icon: Star },
  Silver: { color: "#a0aec0", bg: "rgba(160,174,192,0.12)", icon: Star },
  Bronze: { color: "#cd7f32", bg: "rgba(205,127,50,0.12)", icon: Star },
};

function CustomerRow({ customer }: { customer: typeof CUSTOMERS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [blacklisted, setBlacklisted] = useState(customer.blacklisted);
  const [vip, setVip] = useState(customer.vip);
  const mem = MEMBERSHIP_CFG[customer.membership];
  const Icon = mem?.icon || Star;

  return (
    <motion.div layout className="rounded-2xl border overflow-hidden" style={{ background: "#110806", borderColor: blacklisted ? "rgba(239,68,68,0.25)" : "rgba(212,175,55,0.12)" }}>
      <div className="flex flex-wrap items-center gap-3 px-5 py-3.5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: blacklisted ? "rgba(239,68,68,0.2)" : `linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.15))`, color: blacklisted ? "#f87171" : "#d4af37" }}>
          {customer.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: blacklisted ? "#f87171" : "#faf6f0" }}>{customer.name}</span>
            {vip && <Crown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#d4af37" }} />}
            {blacklisted && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>⛔ Blacklisted</span>}
            <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full" style={{ background: mem?.bg, color: mem?.color }}>
              <Icon className="w-3 h-3" />{customer.membership}
            </span>
          </div>
          <div className="flex gap-3 mt-0.5 text-xs flex-wrap" style={{ color: "rgba(250,246,240,0.4)" }}>
            <span>{customer.city}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{customer.lastOrder}</span>
          </div>
        </div>

        <div className="flex gap-6 text-right flex-shrink-0">
          <div>
            <div className="text-sm font-bold" style={{ color: "#d4af37" }}>₹{(customer.spent / 1000).toFixed(1)}k</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Total Spent</div>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "#faf6f0" }}>{customer.orders}</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Orders</div>
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: "#facc15" }}>{customer.rating}★</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Rating</div>
          </div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-5 pb-4 pt-2 border-t space-y-3" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(250,246,240,0.5)" }}><Mail className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />{customer.email}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(250,246,240,0.5)" }}><Phone className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />{customer.phone}</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(250,246,240,0.5)" }}><ShoppingBag className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />Avg ₹{customer.avgOrder}/order</div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(250,246,240,0.5)" }}><TrendingUp className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />Since {customer.joinDate}</div>
              </div>
              {customer.notes && (
                <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(212,175,55,0.06)", color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.1)" }}>
                  📝 {customer.notes}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}>View Orders</button>
                <button onClick={() => setVip(!vip)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: vip ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)", color: vip ? "#d4af37" : "rgba(250,246,240,0.6)", border: `1px solid ${vip ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.08)"}` }}>
                  <Crown className="w-3.5 h-3.5" />{vip ? "Remove VIP" : "Mark VIP"}
                </button>
                <button onClick={() => setBlacklisted(!blacklisted)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: blacklisted ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", color: blacklisted ? "#4ade80" : "#f87171", border: `1px solid ${blacklisted ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
                  <AlertTriangle className="w-3.5 h-3.5" />{blacklisted ? "Unblacklist" : "Blacklist"}
                </button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>Add Note</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Customers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filters = ["All", "VIP", "Platinum", "Gold", "Silver", "Bronze", "Blacklisted"];

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search.toLowerCase());
    const matchFilter = filter === "All" || (filter === "VIP" && c.vip) || (filter === "Blacklisted" && c.blacklisted) || c.membership === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Customer Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>{CUSTOMERS.length} total customers</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", val: `₹${(CUSTOMERS.reduce((s, c) => s + c.spent, 0) / 1000).toFixed(0)}k`, color: "#d4af37" },
          { label: "VIP Customers", val: CUSTOMERS.filter(c => c.vip).length, color: "#facc15" },
          { label: "Avg Order Value", val: `₹${Math.round(CUSTOMERS.reduce((s, c) => s + c.avgOrder, 0) / CUSTOMERS.length)}`, color: "#4ade80" },
          { label: "Blacklisted", val: CUSTOMERS.filter(c => c.blacklisted).length, color: "#f87171" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#110806", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.4)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{ background: filter === f ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: filter === f ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${filter === f ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((c) => <CustomerRow key={c.id} customer={c} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}
