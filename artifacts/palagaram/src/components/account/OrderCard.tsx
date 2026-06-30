import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Download, Truck, AlertCircle, X, RotateCcw, Star, Share2, ChevronRight } from "lucide-react";
import { Order, STATUS_COLORS } from "@/data/accountData";

interface Props {
  order: Order;
  index: number;
  onViewDetails: (o: Order) => void;
  onTrack: (o: Order) => void;
  onRaiseIssue: (o: Order) => void;
  onInvoice: (o: Order) => void;
  onCancel: (o: Order) => void;
  onReorder: (o: Order) => void;
  onRate: (o: Order) => void;
}

export function OrderCard({ order, index, onViewDetails, onTrack, onRaiseIssue, onInvoice, onCancel, onReorder, onRate }: Props) {
  const sc = STATUS_COLORS[order.status];
  const [shared, setShared] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const canCancel = ["Pending", "Accepted"].includes(order.status) && !cancelled;
  const canTrack = ["Preparing", "Packed", "Out For Delivery", "Accepted"].includes(order.status);
  const canRate = ["Delivered", "Completed"].includes(order.status) && !order.ratingGiven;
  const canReorder = ["Delivered", "Completed", "Cancelled"].includes(order.status);

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleCancel = () => {
    if (canCancel) { setCancelled(true); onCancel(order); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, boxShadow: "0 20px 60px rgba(45,26,16,0.12)" }}
      className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden transition-shadow duration-300"
    >
      {/* Card Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-[#EADBC8]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] flex items-center justify-center">
            <span className="text-[#C89B5A] font-black text-xs">P</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#2D1A10]">{order.id}</p>
            <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {order.estimatedDelivery && canTrack && (
            <div className="hidden sm:flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-700 text-xs font-semibold">ETA {order.estimatedDelivery}</span>
            </div>
          )}
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Food Items Preview */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {order.items.slice(0, 3).map((item, i) => (
              <motion.img
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.06 + i * 0.05 }}
                src={item.imageUrl}
                alt={item.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                style={{ zIndex: 3 - i }}
              />
            ))}
            {order.items.length > 3 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#FAF8F5] flex items-center justify-center text-[10px] font-bold text-[#C89B5A] shadow-sm">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#2D1A10] truncate">
              {order.items.map((i) => i.name).join(", ")}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {order.items.reduce((s, i) => s + i.quantity, 0)} items · {order.paymentMethod}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-lg font-black text-[#2D1A10]">₹{order.total.toLocaleString()}</p>
            {order.ratingGiven && (
              <div className="flex items-center justify-end gap-0.5 mt-0.5">
                {[...Array(order.ratingGiven)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#C89B5A] fill-[#C89B5A]" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar for active orders */}
        {canTrack && (
          <div className="mb-3">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: order.status === "Out For Delivery" ? "80%" : order.status === "Packed" ? "60%" : order.status === "Preparing" ? "40%" : "20%" }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.06 + 0.3 }}
                className="h-full bg-gradient-to-r from-[#C89B5A] to-[#E8B87A] rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">Accepted</span>
              <span className="text-[10px] text-[#C89B5A] font-semibold">{order.status}</span>
              <span className="text-[10px] text-gray-400">Delivered</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2D1A10] text-white text-xs font-semibold hover:bg-[#4B2E1A] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </motion.button>

          {canTrack && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onTrack(order)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              <Truck className="w-3.5 h-3.5" /> Track Order
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onInvoice(order)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EADBC8] text-[#2D1A10] text-xs font-semibold hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Invoice
          </motion.button>

          {!["Cancelled", "Refunded", "Returned"].includes(order.status) && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onRaiseIssue(order)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EADBC8] text-orange-600 text-xs font-semibold hover:border-orange-200 hover:bg-orange-50 transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Raise Issue
            </motion.button>
          )}

          {canCancel && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-100 text-red-500 text-xs font-semibold hover:bg-red-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Cancel
            </motion.button>
          )}

          {canReorder && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onReorder(order)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 text-emerald-600 text-xs font-semibold hover:bg-emerald-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reorder
            </motion.button>
          )}

          {canRate && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onRate(order)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <Star className="w-3.5 h-3.5" /> Rate Order
            </motion.button>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EADBC8] text-gray-500 text-xs font-semibold hover:border-[#C89B5A] transition-colors ml-auto"
          >
            {shared ? <><ChevronRight className="w-3.5 h-3.5 text-emerald-500" /> Copied!</> : <><Share2 className="w-3.5 h-3.5" /> Share</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
