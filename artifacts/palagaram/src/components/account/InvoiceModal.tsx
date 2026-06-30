import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer } from "lucide-react";
import { Order } from "@/data/accountData";

interface Props { order: Order | null; onClose: () => void; }

export function InvoiceModal({ order, onClose }: Props) {
  if (!order) return null;

  const handlePrint = () => window.print();

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="font-bold text-[#2D1A10] text-lg">Invoice</h2>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              {/* Invoice Content */}
              <div className="border-2 border-[#EADBC8] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] px-6 py-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#C89B5A] flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white font-black text-xl">P</span>
                  </div>
                  <h3 className="text-white font-black text-xl tracking-tight">PALAGARAM</h3>
                  <p className="text-white/50 text-xs mt-1">Authentic South Indian Cuisine</p>
                  <p className="text-white/40 text-xs">Chennai, Tamil Nadu • +91 44 2234 5678</p>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Invoice Meta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Invoice Number</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Date</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Transaction</p>
                      <p className="text-[10px] font-bold text-[#2D1A10] mt-0.5">{order.transactionId}</p>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="bg-[#FAF8F5] rounded-xl px-4 py-3">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Bill To</p>
                    <p className="text-sm font-bold text-[#2D1A10]">{order.address.name}</p>
                    <p className="text-xs text-gray-500">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
                    <p className="text-xs text-gray-500">{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.address.phone}</p>
                  </div>

                  {/* Items Table */}
                  <div>
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 pb-2 mb-2">
                      <span className="col-span-6">Item</span>
                      <span className="col-span-2 text-center">Qty</span>
                      <span className="col-span-2 text-right">Rate</span>
                      <span className="col-span-2 text-right">Amt</span>
                    </div>
                    {order.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-2 border-b border-gray-100">
                        <span className="col-span-6 text-[#2D1A10] font-medium">{item.name}</span>
                        <span className="col-span-2 text-center text-gray-500">{item.quantity}</span>
                        <span className="col-span-2 text-right text-gray-500">₹{item.price}</span>
                        <span className="col-span-2 text-right font-semibold text-[#2D1A10]">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5 pt-1">
                    {[
                      { label: "Subtotal", value: `₹${order.subtotal}` },
                      { label: "GST (6%)", value: `₹${order.gst}` },
                      { label: "Delivery Charge", value: order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}` },
                      ...(order.discount > 0 ? [{ label: `Discount`, value: `-₹${order.discount}`, green: true }] : []),
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-gray-500">{r.label}</span>
                        <span className={(r as any).green ? "text-emerald-600 font-semibold" : "text-[#2D1A10]"}>{r.value}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-dashed border-[#EADBC8] pt-2 mt-2 flex justify-between">
                      <span className="font-black text-[#2D1A10] text-sm">TOTAL PAID</span>
                      <span className="font-black text-[#C89B5A] text-lg">₹{order.total}</span>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 mt-2">Payment via {order.paymentMethod}</p>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-3 border-t border-gray-100">
                    <p className="text-xs text-[#C89B5A] font-semibold">Thank you for dining with Palagaram!</p>
                    <p className="text-[10px] text-gray-400 mt-1">This is a system-generated invoice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 px-6 pb-5 pt-3 border-t border-gray-100 flex gap-3">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-[#2D1A10] text-[#2D1A10] font-semibold text-sm hover:bg-[#2D1A10] hover:text-white transition-all">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#C89B5A] text-white font-semibold text-sm hover:bg-[#B88A4A] transition-all">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
