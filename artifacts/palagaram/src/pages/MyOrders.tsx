import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Package, ShoppingBag, CheckCircle, Clock, XCircle, RefreshCcw, TrendingUp, Star, SlidersHorizontal } from "lucide-react";
import { Link } from "wouter";
import { MOCK_ORDERS, MOCK_PROFILE, Order, OrderStatus } from "@/data/accountData";
import { OrderCard } from "@/components/account/OrderCard";
import { OrderDetailsModal } from "@/components/account/OrderDetailsModal";
import { TrackOrderModal } from "@/components/account/TrackOrderModal";
import { RaiseIssueModal } from "@/components/account/RaiseIssueModal";
import { InvoiceModal } from "@/components/account/InvoiceModal";

const STATUS_FILTERS: (OrderStatus | "All")[] = [
  "All", "Pending", "Accepted", "Preparing", "Ready", "Packed",
  "Out For Delivery", "Delivered", "Cancelled", "Refunded", "Returned", "Completed",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_high", label: "Highest Price" },
  { value: "price_low", label: "Lowest Price" },
];

type SortOption = "newest" | "oldest" | "price_high" | "price_low";

function useAnimatedCount(target: number) {
  return target;
}

const StatCard = ({ icon: Icon, label, value, color, bg }: { icon: any; label: string; value: string | number; color: string; bg: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(45,26,16,0.10)" }}
    className="bg-white rounded-2xl p-5 border border-[#EADBC8] transition-shadow"
  >
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className="text-2xl font-black text-[#2D1A10]">{value}</p>
    <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
  </motion.div>
);

export default function MyOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const [detailsOrder, setDetailsOrder] = useState<Order | null>(null);
  const [trackOrder, setTrackOrder] = useState<Order | null>(null);
  const [issueOrder, setIssueOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const stats = useMemo(() => ({
    total: MOCK_ORDERS.length,
    active: MOCK_ORDERS.filter((o) => ["Pending", "Accepted", "Preparing", "Packed", "Out For Delivery", "Ready"].includes(o.status)).length,
    delivered: MOCK_ORDERS.filter((o) => ["Delivered", "Completed"].includes(o.status)).length,
    cancelled: MOCK_ORDERS.filter((o) => o.status === "Cancelled").length,
    refunded: MOCK_ORDERS.filter((o) => o.status === "Refunded").length,
    spent: MOCK_ORDERS.filter((o) => !["Cancelled", "Refunded"].includes(o.status)).reduce((s, o) => s + o.total, 0),
    points: MOCK_PROFILE.loyaltyPoints,
  }), []);

  const filtered = useMemo(() => {
    let list = [...MOCK_ORDERS];
    if (statusFilter !== "All") list = list.filter((o) => o.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q)) ||
        o.trackingNumber.toLowerCase().includes(q) ||
        String(o.total).includes(q)
      );
    }
    switch (sort) {
      case "oldest": list.sort((a, b) => a.date.localeCompare(b.date)); break;
      case "price_high": list.sort((a, b) => b.total - a.total); break;
      case "price_low": list.sort((a, b) => a.total - b.total); break;
      default: list.sort((a, b) => b.date.localeCompare(a.date));
    }
    return list;
  }, [statusFilter, search, sort]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Topbar */}
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/">
              <span className="text-white/40 hover:text-white/70 text-sm transition-colors cursor-pointer">Home</span>
            </Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">My Orders</span>
          </div>
          <h1 className="text-white font-black text-3xl md:text-4xl">My Orders</h1>
          <p className="text-white/50 text-sm mt-1">Welcome back, {MOCK_PROFILE.name.split(" ")[0]}! Here's your order history.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6 pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard icon={Package} label="Total Orders" value={stats.total} color="text-[#C89B5A]" bg="bg-[#FDF8F2]" />
          <StatCard icon={Clock} label="Active Orders" value={stats.active} color="text-blue-600" bg="bg-blue-50" />
          <StatCard icon={CheckCircle} label="Delivered" value={stats.delivered} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled} color="text-red-500" bg="bg-red-50" />
          <StatCard icon={RefreshCcw} label="Refunded" value={stats.refunded} color="text-pink-600" bg="bg-pink-50" />
          <StatCard icon={TrendingUp} label="Money Spent" value={`₹${stats.spent.toLocaleString()}`} color="text-violet-600" bg="bg-violet-50" />
          <StatCard icon={Star} label="Loyalty Points" value={stats.points.toLocaleString()} color="text-amber-600" bg="bg-amber-50" />
          <StatCard icon={ShoppingBag} label="Avg Order Value" value={`₹${Math.round(stats.spent / (stats.total || 1))}`} color="text-indigo-600" bg="bg-indigo-50" />
        </div>

        {/* Search & Sort */}
        <div className="bg-white rounded-2xl border border-[#EADBC8] p-4 mb-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order ID, item, tracking..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm text-[#2D1A10] placeholder-gray-400 transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm text-[#2D1A10] bg-white cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${showFilters ? "border-[#C89B5A] bg-[#FDF8F2] text-[#C89B5A]" : "border-gray-200 text-gray-600 hover:border-[#C89B5A]"}`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Additional Filters</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-500">
                    <select className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm bg-white cursor-pointer">
                      <option>All Payment Types</option>
                      <option>UPI</option>
                      <option>Credit Card</option>
                      <option>Wallet</option>
                    </select>
                    <input type="date" className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm bg-white cursor-pointer" placeholder="From Date" />
                    <input type="date" className="px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm bg-white cursor-pointer" placeholder="To Date" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {STATUS_FILTERS.map((s) => {
            const count = s === "All" ? MOCK_ORDERS.length : MOCK_ORDERS.filter((o) => o.status === s).length;
            if (s !== "All" && count === 0) return null;
            const active = statusFilter === s;
            return (
              <motion.button
                key={s}
                onClick={() => setStatusFilter(s)}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  active
                    ? "bg-[#2D1A10] border-[#2D1A10] text-white shadow-lg"
                    : "bg-white border-[#EADBC8] text-gray-600 hover:border-[#C89B5A] hover:text-[#C89B5A]"
                }`}
              >
                {s}
                {count > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {count}
                  </span>
                )}
                {active && (
                  <motion.div layoutId="pill-indicator" className="absolute inset-0 rounded-full" style={{ zIndex: -1 }} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Order List */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-[#FDF8F2] border-2 border-[#EADBC8] flex items-center justify-center mb-6">
              <Package className="w-10 h-10 text-[#C89B5A]/50" />
            </div>
            <h3 className="text-xl font-bold text-[#2D1A10]">No orders found</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              {search ? "No orders match your search. Try different keywords." : "Looks like you haven't placed any orders yet."}
            </p>
            <Link href="/menu">
              <button className="mt-6 px-8 py-3 rounded-2xl bg-[#C89B5A] text-white font-bold text-sm hover:bg-[#B88A4A] transition-colors">
                Explore Menu
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 font-medium">{filtered.length} order{filtered.length !== 1 ? "s" : ""} found</p>
            {filtered.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                index={i}
                onViewDetails={setDetailsOrder}
                onTrack={setTrackOrder}
                onRaiseIssue={setIssueOrder}
                onInvoice={setInvoiceOrder}
                onCancel={() => {}}
                onReorder={() => {}}
                onRate={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <OrderDetailsModal order={detailsOrder} onClose={() => setDetailsOrder(null)} onInvoice={(o) => { setDetailsOrder(null); setInvoiceOrder(o); }} />
      <TrackOrderModal order={trackOrder} onClose={() => setTrackOrder(null)} />
      <RaiseIssueModal order={issueOrder} onClose={() => setIssueOrder(null)} />
      <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
    </div>
  );
}
