import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Search, CheckCircle2, ChefHat, Package, User, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { MOCK_ORDERS } from "@/data/accountData";

const STEPS = [
  { icon: CheckCircle2, label: "Order Accepted", desc: "Restaurant confirmed your order" },
  { icon: ChefHat, label: "Preparing", desc: "Our chefs are crafting your meal" },
  { icon: Package, label: "Packed & Ready", desc: "Your order is packed and sealed" },
  { icon: User, label: "Driver Assigned", desc: "Rahul Kumar is your delivery partner" },
  { icon: Truck, label: "Out For Delivery", desc: "Your order is on the way!" },
  { icon: CheckCircle2, label: "Delivered", desc: "Enjoy your meal! 🎉" },
];

function getCurrentStep(status: string) {
  const map: Record<string, number> = {
    Accepted: 0, Preparing: 1, Ready: 1, Packed: 2, "Out For Delivery": 4, Delivered: 5, Completed: 5,
  };
  return map[status] ?? 0;
}

const activeOrders = MOCK_ORDERS.filter((o) => ["Pending", "Accepted", "Preparing", "Packed", "Out For Delivery", "Ready"].includes(o.status));

export default function TrackOrderPage() {
  const [trackId, setTrackId] = useState("");
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState(activeOrders[0] || null);

  const handleSearch = () => {
    if (!trackId.trim()) return;
    const order = MOCK_ORDERS.find(
      (o) => o.id.toLowerCase() === trackId.toLowerCase() || o.trackingNumber.toLowerCase() === trackId.toLowerCase()
    );
    setFoundOrder(order || null);
    setSearched(true);
  };

  const step = foundOrder ? getCurrentStep(foundOrder.status) : 0;
  const progress = foundOrder ? (step / (STEPS.length - 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/"><span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors">Home</span></Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">Track Order</span>
          </div>
          <h1 className="text-white font-black text-3xl">Track Your Order</h1>
          <p className="text-white/50 text-sm mt-1">Enter your Order ID or Tracking Number</p>

          {/* Search */}
          <div className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="e.g. PAL-2024-001 or TRK847291023"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-[#C89B5A] transition-colors text-sm"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSearch}
              className="px-6 py-3.5 rounded-2xl bg-[#C89B5A] text-white font-bold text-sm hover:bg-[#B88A4A] transition-colors"
            >
              Track
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-16 space-y-5">
        {/* Active Order Quick Select */}
        {activeOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#EADBC8] p-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Active Orders</p>
            <div className="space-y-2">
              {activeOrders.map((order) => (
                <motion.button
                  key={order.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setFoundOrder(order); setSearched(true); setTrackId(order.id); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    foundOrder?.id === order.id ? "border-[#C89B5A] bg-[#FDF8F2]" : "border-gray-100 hover:border-[#C89B5A]/40"
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#C89B5A] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D1A10]">{order.id}</p>
                    <p className="text-xs text-gray-400 truncate">{order.items.map((i) => i.name).join(", ")}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-indigo-600">{order.status}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">ETA {order.estimatedDelivery}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Not Found */}
        {searched && !foundOrder && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 rounded-2xl p-6 text-center border border-red-100">
            <p className="text-red-600 font-bold">Order not found</p>
            <p className="text-red-400 text-sm mt-1">Check your Order ID or Tracking Number</p>
          </motion.div>
        )}

        {/* Tracking UI */}
        {foundOrder && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* ETA Card */}
            <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] rounded-3xl p-5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #C89B5A 0%, transparent 60%)" }} />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C89B5A] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-xs">Estimated Arrival</p>
                  <p className="text-white font-black text-3xl">{foundOrder.estimatedDelivery}</p>
                  <p className="text-white/40 text-xs mt-0.5">{foundOrder.date} · {foundOrder.id}</p>
                </div>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs font-bold">Live</span>
                </motion.div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 relative">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#C89B5A] to-[#E8B87A]"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/40 text-[10px]">Order Placed</span>
                  <span className="text-[#C89B5A] text-[10px] font-bold">{foundOrder.status}</span>
                  <span className="text-white/40 text-[10px]">Delivered</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden h-44 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-emerald-50 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-emerald-600" />
                  </div>
                  <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border-2 border-emerald-400" />
                </div>
                <p className="text-sm font-bold text-emerald-800 mt-2">Live Map Preview</p>
                <p className="text-xs text-emerald-600">Real-time delivery tracking</p>
              </div>
              <motion.div
                animate={{ x: [0, 200, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute top-6 left-6"
              >
                <div className="w-10 h-10 bg-[#C89B5A] rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                  <Truck className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-5">
              <h3 className="text-sm font-bold text-[#2D1A10] mb-5">Delivery Timeline</h3>
              <div className="space-y-5 relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#EADBC8]" style={{ height: "calc(100% - 20px)" }} />
                <div className="absolute left-4 top-0 w-0.5 bg-[#C89B5A] transition-all duration-1000"
                  style={{ height: `${(step / (STEPS.length - 1)) * 100}%` }} />
                {STEPS.map((s, i) => {
                  const done = i <= step;
                  const active = i === step;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-4 relative"
                    >
                      <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        done ? "border-[#C89B5A] bg-[#C89B5A]" : "border-[#EADBC8] bg-white"
                      } ${active ? "shadow-lg shadow-[#C89B5A]/30" : ""}`}>
                        <s.icon className={`w-3.5 h-3.5 ${done ? "text-white" : "text-gray-300"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${done ? "text-[#2D1A10]" : "text-gray-400"}`}>{s.label}</p>
                        {(done || active) && <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>}
                      </div>
                      {active && (
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-2 h-2 rounded-full bg-[#C89B5A] flex-shrink-0" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Rider Info */}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-[#EADBC8] p-5">
                <h3 className="text-sm font-bold text-[#2D1A10] mb-4">Your Delivery Partner</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C89B5A] to-[#A07840] flex items-center justify-center text-white font-black text-xl shadow-lg">
                    R
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#2D1A10]">Rahul Kumar</p>
                    <p className="text-xs text-gray-500 mt-0.5">⭐ 4.8 · 347 deliveries · Hero Splendor Pro</p>
                    <p className="text-xs text-gray-400 mt-0.5">TN-01-AX-2234</p>
                  </div>
                  <div className="flex gap-2">
                    <button disabled className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center opacity-60 cursor-not-allowed" title="Coming soon">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </button>
                    <button disabled className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center opacity-60 cursor-not-allowed" title="Coming soon">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-3">Call & Chat features will be available with backend integration</p>
              </motion.div>
            )}

            {/* Delivery Address */}
            <div className="bg-white rounded-3xl border border-[#EADBC8] p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Delivering to</p>
                  <p className="text-sm font-bold text-[#2D1A10] mt-1">{foundOrder.address.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{foundOrder.address.line1}{foundOrder.address.line2 ? `, ${foundOrder.address.line2}` : ""}</p>
                  <p className="text-xs text-gray-500">{foundOrder.address.city}, {foundOrder.address.pincode}</p>
                </div>
              </div>
            </div>

            <Link href="/my-orders">
              <button className="w-full py-3.5 rounded-2xl border-2 border-[#EADBC8] text-[#2D1A10] font-semibold text-sm hover:border-[#C89B5A] hover:text-[#C89B5A] transition-all">
                View All Orders
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
