import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, MapPin, Clock, CheckCircle2, ChefHat, Package, Truck, User } from "lucide-react";
import { Order } from "@/data/accountData";

interface Props { order: Order | null; onClose: () => void; }

const STEPS = [
  { icon: CheckCircle2, label: "Order Accepted", desc: "Restaurant confirmed your order", key: 0 },
  { icon: ChefHat, label: "Preparing Your Food", desc: "Our chefs are crafting your meal", key: 1 },
  { icon: Package, label: "Packed & Ready", desc: "Your order is packed and sealed", key: 2 },
  { icon: User, label: "Driver Assigned", desc: "Rahul Kumar is your delivery partner", key: 3 },
  { icon: Truck, label: "Out For Delivery", desc: "Your order is on the way!", key: 4 },
  { icon: CheckCircle2, label: "Delivered", desc: "Enjoy your meal!", key: 5 },
];

function getCurrentStep(status: string) {
  const map: Record<string, number> = {
    Accepted: 0, Preparing: 1, Ready: 1, Packed: 2, "Out For Delivery": 4, Delivered: 5, Completed: 5,
  };
  return map[status] ?? 0;
}

export function TrackOrderModal({ order, onClose }: Props) {
  if (!order) return null;
  const step = getCurrentStep(order.status);

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAF8F5] rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">Live Tracking</p>
                  <h2 className="text-white font-bold text-lg mt-0.5">{order.id}</h2>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* ETA Banner */}
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C89B5A] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/60 text-xs">Estimated Arrival</p>
                  <p className="text-white font-black text-2xl">{order.estimatedDelivery}</p>
                  <p className="text-white/50 text-xs mt-0.5">Today, {order.date}</p>
                </div>
                <div className="ml-auto">
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold">Live</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden border border-[#EADBC8] h-36 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-white shadow-lg flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-emerald-600" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full border-2 border-emerald-400"
                    />
                  </div>
                  <p className="text-sm font-semibold text-emerald-800 mt-2">Live Map</p>
                  <p className="text-xs text-emerald-600">Tracking your delivery in real-time</p>
                </div>
                {/* Animated vehicle */}
                <motion.div
                  animate={{ x: [0, 160, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute top-4 left-4"
                >
                  <div className="w-8 h-8 bg-[#C89B5A] rounded-full flex items-center justify-center shadow-lg">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <h3 className="text-sm font-bold text-[#2D1A10] mb-4">Delivery Timeline</h3>
                <div className="space-y-4">
                  {STEPS.map((s, i) => {
                    const done = i <= step;
                    const active = i === step;
                    return (
                      <motion.div
                        key={s.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-4"
                      >
                        <div className="relative flex-shrink-0">
                          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                            done ? "border-[#C89B5A] bg-[#C89B5A]" : "border-gray-200 bg-white"
                          } ${active ? "shadow-lg shadow-[#C89B5A]/30" : ""}`}>
                            <s.icon className={`w-4 h-4 ${done ? "text-white" : "text-gray-300"}`} />
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`absolute left-1/2 top-full w-0.5 h-4 -translate-x-1/2 mt-0.5 ${done && i < step ? "bg-[#C89B5A]" : "bg-gray-200"}`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${done ? "text-[#2D1A10]" : "text-gray-400"}`}>{s.label}</p>
                          {(done || active) && <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>}
                        </div>
                        {active && (
                          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-2 h-2 rounded-full bg-[#C89B5A] flex-shrink-0"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Rider Info */}
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 border border-[#EADBC8]"
                >
                  <h3 className="text-sm font-bold text-[#2D1A10] mb-3">Your Delivery Partner</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C89B5A] to-[#A07840] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      R
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2D1A10]">Rahul Kumar</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i < 4 ? "bg-[#C89B5A]" : "bg-gray-200"}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.8 · 347 deliveries</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button disabled className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center opacity-60 cursor-not-allowed">
                        <Phone className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button disabled className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center opacity-60 cursor-not-allowed">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center mt-2">Call & Chat features coming soon</p>
                </motion.div>
              )}

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Delivering to</p>
                    <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.address.line1}</p>
                    <p className="text-xs text-gray-500">{order.address.city}, {order.address.pincode}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
