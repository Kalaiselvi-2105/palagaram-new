import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, ChevronUp, Printer, Download, Phone, MapPin, Clock, Package, CheckCircle, Truck, XCircle, AlertCircle, Copy, Eye } from "lucide-react";

const STATUS_TABS = ["All", "Pending", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled"];

const ORDERS = [
  { id: "#ORD-1284", customer: "Rajesh Kumar", phone: "+91 98765 43210", address: "12, Anna Nagar, Chennai - 600040", items: [{ name: "Chicken Biryani", qty: 2, price: 280 }, { name: "Raita", qty: 1, price: 60 }, { name: "Mineral Water", qty: 2, price: 20 }], subtotal: 660, gst: 33, discount: 0, coupon: null, total: 693, payment: "UPI", status: "Delivered", type: "Delivery", time: "12:35 PM", notes: "Extra spicy please", kitchen: "Rush - Customer waiting" },
  { id: "#ORD-1283", customer: "Priya Sharma", phone: "+91 87654 32109", address: "45, T Nagar, Chennai - 600017", items: [{ name: "Paneer Butter Masala", qty: 1, price: 260 }, { name: "Butter Naan", qty: 3, price: 45 }], subtotal: 395, gst: 19.75, discount: 39.5, coupon: "FIRST50", total: 375.25, payment: "Card", status: "Preparing", type: "Delivery", time: "1:02 PM", notes: "", kitchen: "No onion no garlic" },
  { id: "#ORD-1282", customer: "Arjun Nair", phone: "+91 76543 21098", address: "88, Velachery, Chennai - 600042", items: [{ name: "Mutton Biryani", qty: 2, price: 380 }, { name: "Mirchi Salna", qty: 2, price: 80 }], subtotal: 920, gst: 46, discount: 0, coupon: null, total: 966, payment: "Cash", status: "Pending", type: "Delivery", time: "1:15 PM", notes: "Call before delivery", kitchen: "" },
  { id: "#ORD-1281", customer: "Meera Iyer", phone: "+91 65432 10987", address: "Table 4 - Dine In", items: [{ name: "Veg Thali", qty: 2, price: 180 }, { name: "Payasam", qty: 2, price: 80 }], subtotal: 520, gst: 26, discount: 52, coupon: "DINE10", total: 494, payment: "UPI", status: "Out for Delivery", type: "Dine-In", time: "1:28 PM", notes: "", kitchen: "Table 4" },
  { id: "#ORD-1280", customer: "Karthik R.", phone: "+91 54321 09876", address: "22, Adyar, Chennai - 600020", items: [{ name: "Fish Curry", qty: 1, price: 320 }, { name: "Appam", qty: 4, price: 35 }], subtotal: 460, gst: 23, discount: 0, coupon: null, total: 483, payment: "Wallet", status: "Delivered", type: "Takeaway", time: "11:50 AM", notes: "", kitchen: "" },
  { id: "#ORD-1279", customer: "Divya M.", phone: "+91 43210 98765", address: "56, Mylapore, Chennai - 600004", items: [{ name: "Prawn Masala", qty: 1, price: 380 }, { name: "Steam Rice", qty: 2, price: 60 }], subtotal: 500, gst: 25, discount: 0, coupon: null, total: 525, payment: "UPI", status: "Cancelled", type: "Delivery", time: "12:10 PM", notes: "Not available - Cancelled", kitchen: "" },
];

const STATUS_CONFIG: Record<string, { icon: any; bg: string; text: string; border: string }> = {
  Pending: { icon: AlertCircle, bg: "rgba(234,179,8,0.12)", text: "#facc15", border: "rgba(234,179,8,0.3)" },
  Preparing: { icon: Clock, bg: "rgba(249,115,22,0.12)", text: "#fb923c", border: "rgba(249,115,22,0.3)" },
  Ready: { icon: Package, bg: "rgba(99,102,241,0.12)", text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  "Out for Delivery": { icon: Truck, bg: "rgba(168,85,247,0.12)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
  Delivered: { icon: CheckCircle, bg: "rgba(34,197,94,0.12)", text: "#4ade80", border: "rgba(34,197,94,0.3)" },
  Cancelled: { icon: XCircle, bg: "rgba(239,68,68,0.12)", text: "#f87171", border: "rgba(239,68,68,0.3)" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || { bg: "rgba(255,255,255,0.1)", text: "#fff", border: "rgba(255,255,255,0.2)", icon: null };
  const Icon = cfg.icon;
  return (
    <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium border"
      style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}>
      {Icon && <Icon className="w-3 h-3" />}
      {status}
    </span>
  );
}

function OrderCard({ order }: { order: typeof ORDERS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);

  const NEXT_STATUS: Record<string, string> = {
    Pending: "Preparing", Preparing: "Ready", Ready: "Out for Delivery", "Out for Delivery": "Delivered"
  };

  return (
    <motion.div layout className="rounded-2xl border overflow-hidden" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold" style={{ color: "#d4af37" }}>{order.id}</span>
            <StatusBadge status={status} />
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.5)" }}>{order.type}</span>
          </div>
          <div className="flex items-center gap-4 mt-1.5 flex-wrap">
            <span className="text-sm font-medium" style={{ color: "#faf6f0" }}>{order.customer}</span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(250,246,240,0.4)" }}><Phone className="w-3 h-3" />{order.phone}</span>
            <span className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}><Clock className="w-3 h-3 inline mr-1" />{order.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-base font-bold" style={{ color: "#d4af37" }}>₹{order.total.toFixed(0)}</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>{order.payment}</div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-lg transition-colors" style={{ color: "rgba(212,175,55,0.6)", background: "rgba(212,175,55,0.08)" }}>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Items */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(212,175,55,0.5)" }}>Order Items</div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span style={{ color: "rgba(250,246,240,0.7)" }}>{item.name} × {item.qty}</span>
                        <span style={{ color: "#faf6f0" }}>₹{(item.price * item.qty).toFixed(0)}</span>
                      </div>
                    ))}
                    <div className="pt-2 space-y-1 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                      <div className="flex justify-between text-xs" style={{ color: "rgba(250,246,240,0.45)" }}>
                        <span>Subtotal</span><span>₹{order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-xs" style={{ color: "rgba(250,246,240,0.45)" }}>
                        <span>GST (5%)</span><span>₹{order.gst}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-xs" style={{ color: "#4ade80" }}>
                          <span>Discount {order.coupon && `(${order.coupon})`}</span>
                          <span>-₹{order.discount.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold pt-1 border-t" style={{ color: "#d4af37", borderColor: "rgba(212,175,55,0.1)" }}>
                        <span>Total</span><span>₹{order.total.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(212,175,55,0.5)" }}>Delivery Address</div>
                    <div className="flex gap-2 text-sm" style={{ color: "rgba(250,246,240,0.65)" }}>
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#d4af37" }} />
                      {order.address}
                    </div>
                  </div>
                  {order.notes && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(212,175,55,0.5)" }}>Customer Notes</div>
                      <div className="text-sm px-3 py-2 rounded-lg" style={{ background: "rgba(212,175,55,0.06)", color: "rgba(250,246,240,0.65)", border: "1px solid rgba(212,175,55,0.12)" }}>{order.notes}</div>
                    </div>
                  )}
                  {order.kitchen && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(212,175,55,0.5)" }}>Kitchen Instructions</div>
                      <div className="text-sm px-3 py-2 rounded-lg" style={{ background: "rgba(249,115,22,0.08)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}>{order.kitchen}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                {NEXT_STATUS[status] && (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStatus(NEXT_STATUS[status])}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
                    Mark as {NEXT_STATUS[status]}
                  </motion.button>
                )}
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Printer className="w-3.5 h-3.5" /> Print Invoice
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Copy className="w-3.5 h-3.5" /> Duplicate
                </button>
                {status !== "Cancelled" && status !== "Delivered" && (
                  <button onClick={() => setStatus("Cancelled")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <XCircle className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ORDERS.filter(o => {
    const matchTab = activeTab === "All" || o.status === activeTab;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Order Management</h2>
          <p className="text-sm" style={{ color: "rgba(250,246,240,0.35)" }}>Track and manage all customer orders</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border" style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37", borderColor: "rgba(212,175,55,0.2)" }}>
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
            + New Order
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name or order ID..."
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#110806", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.4)")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")}
        />
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {STATUS_TABS.map((tab) => {
          const count = tab === "All" ? ORDERS.length : ORDERS.filter(o => o.status === tab).length;
          return (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
              style={{ background: activeTab === tab ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: activeTab === tab ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${activeTab === tab ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
              {tab}
              {count > 0 && <span className="px-1 rounded-full text-xs" style={{ background: activeTab === tab ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)" }}>{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((order) => (
            <motion.div key={order.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <OrderCard order={order} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "rgba(250,246,240,0.3)" }}>
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
