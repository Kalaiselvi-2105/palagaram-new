import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, ShoppingBag, Clock, Flame, CheckCircle, Truck,
  XCircle, Calendar, Users, Star, DollarSign, BarChart2,
  ArrowUpRight, ArrowDownRight, Package, Heart, Zap
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const REVENUE_DATA = [
  { day: "Mon", revenue: 42000, orders: 38 },
  { day: "Tue", revenue: 58000, orders: 52 },
  { day: "Wed", revenue: 51000, orders: 45 },
  { day: "Thu", revenue: 67000, orders: 61 },
  { day: "Fri", revenue: 89000, orders: 84 },
  { day: "Sat", revenue: 112000, orders: 98 },
  { day: "Sun", revenue: 78000, orders: 72 },
];

const CATEGORY_DATA = [
  { name: "Biryani", value: 35, color: "#d4af37" },
  { name: "Starters", value: 22, color: "#f0c040" },
  { name: "Curries", value: 18, color: "#b8962e" },
  { name: "Desserts", value: 15, color: "#e8d49a" },
  { name: "Beverages", value: 10, color: "#a07820" },
];

const KPI_CARDS = [
  { label: "Today's Revenue", value: "₹89,420", change: "+18.2%", positive: true, icon: DollarSign, gradient: "from-amber-900/40 to-yellow-900/20", iconBg: "rgba(212,175,55,0.2)", iconColor: "#d4af37" },
  { label: "Today's Orders", value: "84", change: "+12%", positive: true, icon: ShoppingBag, gradient: "from-blue-900/30 to-blue-900/10", iconBg: "rgba(59,130,246,0.2)", iconColor: "#60a5fa" },
  { label: "Pending Orders", value: "12", change: "-3", positive: false, icon: Clock, gradient: "from-orange-900/30 to-orange-900/10", iconBg: "rgba(249,115,22,0.2)", iconColor: "#fb923c" },
  { label: "Preparing Now", value: "5", change: "Active", positive: true, icon: Flame, gradient: "from-red-900/30 to-red-900/10", iconBg: "rgba(239,68,68,0.2)", iconColor: "#f87171" },
  { label: "Delivered", value: "61", change: "+9%", positive: true, icon: CheckCircle, gradient: "from-green-900/30 to-green-900/10", iconBg: "rgba(34,197,94,0.2)", iconColor: "#4ade80" },
  { label: "Out for Delivery", value: "6", change: "In Transit", positive: true, icon: Truck, gradient: "from-purple-900/30 to-purple-900/10", iconBg: "rgba(168,85,247,0.2)", iconColor: "#c084fc" },
  { label: "Cancelled", value: "2", change: "-40%", positive: true, icon: XCircle, gradient: "from-rose-900/30 to-rose-900/10", iconBg: "rgba(244,63,94,0.2)", iconColor: "#fb7185" },
  { label: "Reservations Today", value: "18", change: "+5", positive: true, icon: Calendar, gradient: "from-teal-900/30 to-teal-900/10", iconBg: "rgba(20,184,166,0.2)", iconColor: "#2dd4bf" },
  { label: "Catering Requests", value: "3", change: "New", positive: true, icon: Package, gradient: "from-indigo-900/30 to-indigo-900/10", iconBg: "rgba(99,102,241,0.2)", iconColor: "#818cf8" },
  { label: "New Customers", value: "24", change: "+15%", positive: true, icon: Users, gradient: "from-cyan-900/30 to-cyan-900/10", iconBg: "rgba(6,182,212,0.2)", iconColor: "#22d3ee" },
  { label: "Avg Rating", value: "4.8★", change: "+0.1", positive: true, icon: Star, gradient: "from-yellow-900/30 to-yellow-900/10", iconBg: "rgba(234,179,8,0.2)", iconColor: "#facc15" },
  { label: "Monthly Revenue", value: "₹18.4L", change: "+22%", positive: true, icon: TrendingUp, gradient: "from-emerald-900/30 to-emerald-900/10", iconBg: "rgba(16,185,129,0.2)", iconColor: "#34d399" },
];

const RECENT_ORDERS = [
  { id: "#ORD-1284", customer: "Rajesh Kumar", items: "Chicken Biryani × 2, Raita", amount: "₹680", status: "Delivered", time: "2m ago" },
  { id: "#ORD-1283", customer: "Priya Sharma", items: "Paneer Butter Masala, Naan × 3", amount: "₹520", status: "Preparing", time: "8m ago" },
  { id: "#ORD-1282", customer: "Arjun Nair", items: "Mutton Biryani, Mirchi Salna", amount: "₹890", status: "Pending", time: "12m ago" },
  { id: "#ORD-1281", customer: "Meera Iyer", items: "Veg Thali, Payasam", amount: "₹350", status: "Out for Delivery", time: "18m ago" },
  { id: "#ORD-1280", customer: "Karthik R.", items: "Fish Curry, Appam × 4", amount: "₹760", status: "Delivered", time: "25m ago" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Delivered: { bg: "rgba(34,197,94,0.15)", text: "#4ade80" },
  Preparing: { bg: "rgba(249,115,22,0.15)", text: "#fb923c" },
  Pending: { bg: "rgba(234,179,8,0.15)", text: "#facc15" },
  "Out for Delivery": { bg: "rgba(168,85,247,0.15)", text: "#c084fc" },
  Cancelled: { bg: "rgba(239,68,68,0.15)", text: "#f87171" },
};

const POPULAR_ITEMS = [
  { name: "Chicken Biryani", orders: 184, revenue: "₹55,200", trend: "+12%" },
  { name: "Mutton Biryani", orders: 132, revenue: "₹52,800", trend: "+8%" },
  { name: "Paneer Butter Masala", orders: 98, revenue: "₹29,400", trend: "+5%" },
  { name: "Fish Curry", orders: 76, revenue: "₹22,800", trend: "+18%" },
  { name: "Prawn Masala", orders: 64, revenue: "₹25,600", trend: "+22%" },
];

function KPICard({ card, index }: { card: typeof KPI_CARDS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl p-4 border overflow-hidden bg-gradient-to-br ${card.gradient}`}
      style={{ borderColor: "rgba(212,175,55,0.12)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-60" style={{ background: `linear-gradient(135deg, rgba(212,175,55,0.04), transparent)` }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.iconBg }}>
            <card.icon className="w-4 h-4" style={{ color: card.iconColor }} />
          </div>
          <span className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full`}
            style={{ background: card.positive ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", color: card.positive ? "#4ade80" : "#f87171" }}>
            {card.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {card.change}
          </span>
        </div>
        <div className="text-2xl font-bold" style={{ color: "#faf6f0" }}>{card.value}</div>
        <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.45)" }}>{card.label}</div>
      </div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs" style={{ background: "#1a0f0a", border: "1px solid rgba(212,175,55,0.3)", color: "#faf6f0" }}>
        <div className="font-semibold mb-1" style={{ color: "#d4af37" }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name}>
            {p.name === "revenue" ? `Revenue: ₹${p.value.toLocaleString()}` : `Orders: ${p.value}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOpen = currentTime.getHours() >= 11 && currentTime.getHours() < 23;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)", border: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: isOpen ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)", color: isOpen ? "#4ade80" : "#f87171" }}>
                ● {isOpen ? "OPEN" : "CLOSED"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#faf6f0" }}>
              Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 17 ? "Afternoon" : "Evening"}, Admin 👋
            </h2>
            <p className="text-sm mt-1" style={{ color: "rgba(250,246,240,0.45)" }}>
              {currentTime.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold tabular-nums" style={{ color: "#d4af37", fontFamily: "monospace" }}>
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
            <div className="text-xs mt-1" style={{ color: "rgba(212,175,55,0.5)" }}>Live • IST</div>
          </div>
        </div>
        <div className="relative mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Today's Revenue", val: "₹89,420" },
            { label: "Active Orders", val: "17" },
            { label: "Avg Order Value", val: "₹1,064" },
            { label: "Growth vs Yesterday", val: "+18.2%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl px-3 py-2" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.12)" }}>
              <div className="text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
              <div className="text-base font-bold mt-0.5" style={{ color: "#d4af37" }}>{s.val}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div>
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.5)" }}>Live KPIs</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {KPI_CARDS.map((card, i) => (
            <KPICard key={card.label} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-2xl p-5 border"
          style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold" style={{ color: "#faf6f0" }}>Weekly Revenue & Orders</h3>
              <p className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Past 7 days performance</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1" style={{ color: "#d4af37" }}><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#d4af37" }} />Revenue</span>
              <span className="flex items-center gap-1" style={{ color: "#60a5fa" }}><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#60a5fa" }} />Orders</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} fill="url(#revGrad)" />
              <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} fill="url(#ordGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-5 border"
          style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
        >
          <h3 className="font-semibold mb-1" style={{ color: "#faf6f0" }}>Sales by Category</h3>
          <p className="text-xs mb-3" style={{ color: "rgba(250,246,240,0.35)" }}>This week</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} contentStyle={{ background: "#1a0f0a", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {CATEGORY_DATA.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                  <span style={{ color: "rgba(250,246,240,0.6)" }}>{cat.name}</span>
                </div>
                <span style={{ color: "#faf6f0" }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders + Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            <h3 className="font-semibold" style={{ color: "#faf6f0" }}>Recent Orders</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}>Live</span>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(212,175,55,0.06)" }}>
            {RECENT_ORDERS.map((order, i) => (
              <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }} className="flex items-center gap-3 px-5 py-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: "#d4af37" }}>{order.id}</span>
                    <span className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>{order.time}</span>
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: "#faf6f0" }}>{order.customer}</div>
                  <div className="text-xs truncate" style={{ color: "rgba(250,246,240,0.4)" }}>{order.items}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold" style={{ color: "#d4af37" }}>{order.amount}</div>
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: STATUS_COLORS[order.status]?.bg, color: STATUS_COLORS[order.status]?.text }}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            <h3 className="font-semibold" style={{ color: "#faf6f0" }}>Top Selling Items</h3>
            <span className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>This week</span>
          </div>
          <div className="p-5 space-y-3">
            {POPULAR_ITEMS.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 + i * 0.05 }} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: i === 0 ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)", color: i === 0 ? "#d4af37" : "rgba(250,246,240,0.4)" }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "#faf6f0" }}>{item.name}</div>
                  <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.orders / 184) * 100}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #d4af37, #f0c040)" }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold" style={{ color: "#faf6f0" }}>{item.orders}</div>
                  <div className="text-xs" style={{ color: "#4ade80" }}>{item.trend}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
