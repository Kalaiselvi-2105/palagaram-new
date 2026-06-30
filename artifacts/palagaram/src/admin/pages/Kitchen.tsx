import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Clock, AlertTriangle, CheckCircle, Zap, ChefHat, Package, Timer } from "lucide-react";

const KITCHEN_ORDERS = [
  { id: "#ORD-1283", customer: "Priya Sharma", type: "Delivery", items: ["Paneer Butter Masala × 1", "Butter Naan × 3"], started: 8, total: 18, priority: "express", note: "No onion no garlic" },
  { id: "#ORD-1282", customer: "Arjun Nair", type: "Delivery", items: ["Mutton Biryani × 2", "Mirchi Salna × 2"], started: 2, total: 25, priority: "normal", note: "" },
  { id: "#ORD-1285", customer: "Table 5", type: "Dine-In", items: ["Fish Curry × 2", "Appam × 6", "Veg Biryani × 1"], started: 5, total: 22, priority: "priority", note: "VIP Guest" },
  { id: "#ORD-1286", customer: "Kavitha S.", type: "Takeaway", items: ["Chicken Biryani × 3", "Raita × 3"], started: 12, total: 20, priority: "normal", note: "Extra spicy" },
  { id: "#ORD-1287", customer: "Venkat R.", type: "Delivery", items: ["Prawn Masala × 1", "Steam Rice × 2"], started: 15, total: 20, priority: "normal", note: "" },
  { id: "#ORD-1288", customer: "Table 2", type: "Dine-In", items: ["Veg Thali × 4"], started: 0, total: 20, priority: "normal", note: "" },
];

const COMPLETED = [
  { id: "#ORD-1280", customer: "Karthik R.", items: ["Fish Curry × 1", "Appam × 4"], completedAt: "12:48 PM", timeTaken: 18 },
  { id: "#ORD-1279", customer: "Divya M.", items: ["Prawn Masala × 1", "Steam Rice × 2"], completedAt: "12:32 PM", timeTaken: 21 },
];

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  express: { label: "⚡ EXPRESS", color: "#fb923c", bg: "rgba(249,115,22,0.12)", border: "rgba(249,115,22,0.4)" },
  priority: { label: "⭐ VIP", color: "#d4af37", bg: "rgba(212,175,55,0.12)", border: "rgba(212,175,55,0.4)" },
  normal: { label: "Normal", color: "rgba(250,246,240,0.4)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)" },
};

function KitchenTimer({ started, total }: { started: number; total: number }) {
  const [elapsed, setElapsed] = useState(started);
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const pct = Math.min((elapsed / total) * 100, 100);
  const remaining = Math.max(total - elapsed, 0);
  const isLate = elapsed > total;
  const isWarning = elapsed > total * 0.8;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: "rgba(250,246,240,0.5)" }}>{elapsed}m elapsed</span>
        <span style={{ color: isLate ? "#f87171" : isWarning ? "#fb923c" : "#4ade80" }}>
          {isLate ? `${elapsed - total}m LATE` : `${remaining}m left`}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          style={{ width: `${pct}%`, background: isLate ? "#f87171" : isWarning ? "linear-gradient(90deg, #fb923c, #f87171)" : "linear-gradient(90deg, #d4af37, #4ade80)" }}
          className="h-full rounded-full transition-all duration-500"
        />
      </div>
    </div>
  );
}

function KitchenCard({ order, onComplete }: { order: typeof KITCHEN_ORDERS[0]; onComplete: () => void }) {
  const pri = PRIORITY_CONFIG[order.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, y: -10 }}
      className="rounded-2xl p-4 border flex flex-col gap-3"
      style={{ background: "#110806", borderColor: pri.border }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: "#d4af37" }}>{order.id}</span>
            <span className="text-xs px-2 py-0.5 rounded-full border font-semibold" style={{ background: pri.bg, color: pri.color, borderColor: pri.border }}>{pri.label}</span>
          </div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.5)" }}>{order.customer} · {order.type}</div>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(212,175,55,0.12)" }}>
          <ChefHat className="w-4 h-4" style={{ color: "#d4af37" }} />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1">
        {order.items.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(250,246,240,0.75)" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#d4af37" }} />
            {item}
          </div>
        ))}
      </div>

      {/* Note */}
      {order.note && (
        <div className="flex items-start gap-2 text-xs px-2 py-1.5 rounded-lg" style={{ background: "rgba(249,115,22,0.08)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}>
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          {order.note}
        </div>
      )}

      {/* Timer */}
      <KitchenTimer started={order.started} total={order.total} />

      {/* Done button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onComplete}
        className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-1"
        style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}
      >
        <CheckCircle className="w-4 h-4" />
        Mark as Ready
      </motion.button>
    </motion.div>
  );
}

const PERF_STATS = [
  { label: "Avg Prep Time", val: "19 min", icon: Timer, color: "#d4af37" },
  { label: "Orders Completed", val: "61", icon: CheckCircle, color: "#4ade80" },
  { label: "Late Orders", val: "3", icon: AlertTriangle, color: "#fb923c" },
  { label: "Express Orders", val: "8", icon: Zap, color: "#818cf8" },
];

export default function Kitchen() {
  const [orders, setOrders] = useState(KITCHEN_ORDERS);
  const [completed, setCompleted] = useState(COMPLETED);

  const handleComplete = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setCompleted((prev) => [{ id: order.id, customer: order.customer, items: order.items, completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), timeTaken: order.started }, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Kitchen Display</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold animate-pulse" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>● LIVE</span>
          </div>
          <p className="text-sm mt-1 ml-10" style={{ color: "rgba(250,246,240,0.35)" }}>{orders.length} active orders in kitchen</p>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PERF_STATS.map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-3 border flex items-center gap-3"
            style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${stat.color}18` }}>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.val}</div>
              <div className="text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.5)" }}>
              Preparing Queue <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>{orders.length}</span>
            </h3>
          </div>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orders.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-16 rounded-2xl" style={{ background: "#110806", border: "1px solid rgba(212,175,55,0.1)" }}>
                  <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-20" style={{ color: "#d4af37" }} />
                  <p style={{ color: "rgba(250,246,240,0.3)" }}>No orders in queue</p>
                </motion.div>
              ) : (
                orders.map((order) => (
                  <KitchenCard key={order.id} order={order} onComplete={() => handleComplete(order.id)} />
                ))
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Completed Panel */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(212,175,55,0.5)" }}>
            Completed Today <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}>{completed.length + 61}</span>
          </h3>
          <div className="space-y-2">
            {completed.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl p-3 border flex items-center gap-3"
                style={{ background: "#110806", borderColor: "rgba(34,197,94,0.12)" }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(34,197,94,0.12)" }}>
                  <CheckCircle className="w-4 h-4" style={{ color: "#4ade80" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: "#d4af37" }}>{c.id}</span>
                    <span className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>{c.completedAt}</span>
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: "#faf6f0" }}>{c.customer}</div>
                  <div className="text-xs truncate" style={{ color: "rgba(250,246,240,0.4)" }}>{c.items.join(", ")}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg flex-shrink-0" style={{ background: "rgba(34,197,94,0.08)", color: "#4ade80" }}>
                  {c.timeTaken}m
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
