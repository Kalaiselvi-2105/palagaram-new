import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, CheckCircle2, Clock, ChefHat, Package, Truck, Star, Download, Printer } from "lucide-react";
import { Order, STATUS_COLORS } from "@/data/accountData";

interface Props { order: Order | null; onClose: () => void; onInvoice: (order: Order) => void; }

const timeline = [
  { label: "Order Placed", icon: CheckCircle2, key: "placed" },
  { label: "Accepted", icon: CheckCircle2, key: "accepted" },
  { label: "Preparing", icon: ChefHat, key: "preparing" },
  { label: "Packed", icon: Package, key: "packed" },
  { label: "Out For Delivery", icon: Truck, key: "out" },
  { label: "Delivered", icon: Star, key: "delivered" },
];

function getTimelineStep(status: string) {
  const map: Record<string, number> = {
    Pending: 0, Accepted: 1, Preparing: 2, Packed: 3, "Out For Delivery": 4, Delivered: 5, Completed: 5,
  };
  return map[status] ?? 0;
}

export function OrderDetailsModal({ order, onClose, onInvoice }: Props) {
  if (!order) return null;
  const step = getTimelineStep(order.status);
  const sc = STATUS_COLORS[order.status];

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAF8F5] rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Order Details</p>
                  <h2 className="text-white font-bold text-xl mt-0.5">{order.id}</h2>
                  <p className="text-white/50 text-xs mt-1">{order.date} at {order.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>{order.status}</span>
                  <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
              {/* Timeline */}
              {!["Cancelled", "Refunded", "Returned"].includes(order.status) && (
                <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                  <h3 className="text-sm font-semibold text-[#2D1A10] mb-4">Order Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#EADBC8]" />
                    <div className="absolute left-4 top-4 w-0.5 bg-[#C89B5A] transition-all duration-700"
                      style={{ height: `${(step / (timeline.length - 1)) * 100}%` }} />
                    <div className="space-y-5">
                      {timeline.map((t, i) => {
                        const done = i <= step;
                        const active = i === step;
                        return (
                          <motion.div key={t.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-4 relative"
                          >
                            <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              done ? "border-[#C89B5A] bg-[#C89B5A]" : "border-[#EADBC8] bg-white"
                            } ${active ? "shadow-lg shadow-[#C89B5A]/30" : ""}`}>
                              <t.icon className={`w-3.5 h-3.5 ${done ? "text-white" : "text-gray-300"}`} />
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${done ? "text-[#2D1A10]" : "text-gray-400"}`}>{t.label}</p>
                              {active && <p className="text-xs text-[#C89B5A] font-medium mt-0.5">Current Status</p>}
                            </div>
                            {active && (
                              <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="ml-auto w-2 h-2 rounded-full bg-[#C89B5A]"
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <h3 className="text-sm font-semibold text-[#2D1A10] mb-3">Delivery Information</h3>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2D1A10]">{order.address.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
                    <p className="text-xs text-gray-500">{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{order.address.phone}</p>
                    </div>
                    {order.specialInstructions && (
                      <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                        <p className="text-xs text-amber-700 font-medium">Note: {order.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <h3 className="text-sm font-semibold text-[#2D1A10] mb-3">Ordered Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#2D1A10] truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.category} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#2D1A10]">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <h3 className="text-sm font-semibold text-[#2D1A10] mb-3">Price Breakdown</h3>
                <div className="space-y-2">
                  {[
                    { label: "Subtotal", value: `₹${order.subtotal.toLocaleString()}`, regular: true },
                    { label: "GST (6%)", value: `₹${order.gst.toLocaleString()}`, regular: true },
                    { label: "Delivery Charge", value: order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`, regular: true },
                    ...(order.discount > 0 ? [{ label: `Discount (${order.couponUsed})`, value: `-₹${order.discount.toLocaleString()}`, regular: false, green: true }] : []),
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-500">{row.label}</span>
                      <span className={row.green ? "text-emerald-600 font-medium" : "text-[#2D1A10]"}>{row.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-[#EADBC8] pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-[#2D1A10]">Grand Total</span>
                      <span className="font-bold text-[#C89B5A] text-lg">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBC8]">
                <h3 className="text-sm font-semibold text-[#2D1A10] mb-3">Payment Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-400 text-xs">Payment Method</p><p className="font-medium text-[#2D1A10] mt-0.5">{order.paymentMethod}</p></div>
                  <div><p className="text-gray-400 text-xs">Transaction ID</p><p className="font-medium text-[#2D1A10] mt-0.5 text-xs">{order.transactionId}</p></div>
                  <div><p className="text-gray-400 text-xs">Invoice Number</p><p className="font-medium text-[#2D1A10] mt-0.5 text-xs">{order.invoiceNumber}</p></div>
                  <div><p className="text-gray-400 text-xs">Tracking No.</p><p className="font-medium text-[#2D1A10] mt-0.5 text-xs">{order.trackingNumber}</p></div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 px-6 pb-5 pt-3 border-t border-[#EADBC8] bg-white flex gap-3">
              <button
                onClick={() => onInvoice(order)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-[#C89B5A] text-[#C89B5A] font-semibold text-sm hover:bg-[#C89B5A] hover:text-white transition-all"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </button>
              <button
                onClick={onClose}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#2D1A10] text-white font-semibold text-sm hover:bg-[#4B2E1A] transition-all"
              >
                <Printer className="w-4 h-4" /> Print Invoice
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
