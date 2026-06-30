import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Upload } from "lucide-react";
import { Order } from "@/data/accountData";

interface Props { order: Order | null; onClose: () => void; }

const ISSUE_CATEGORIES = [
  { icon: "🔄", label: "Wrong Item" },
  { icon: "📦", label: "Missing Item" },
  { icon: "💔", label: "Damaged Food" },
  { icon: "🥶", label: "Cold Food" },
  { icon: "⏰", label: "Late Delivery" },
  { icon: "💰", label: "Refund Request" },
  { icon: "💳", label: "Payment Issue" },
  { icon: "📝", label: "Other" },
];

export function RaiseIssueModal({ order, onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [issueNumber] = useState(`ISS-${Date.now().toString().slice(-6)}`);

  const handleSubmit = () => {
    if (!selected || description.trim().length < 10) return;
    setSubmitted(true);
  };

  if (!order) return null;

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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {!submitted ? (
              <>
                <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] px-6 py-5 flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider">Raise Issue</p>
                    <h2 className="text-white font-bold text-lg mt-0.5">{order.id}</h2>
                  </div>
                  <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-6 py-5 space-y-5">
                  <div>
                    <p className="text-sm font-semibold text-[#2D1A10] mb-3">What's the issue?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {ISSUE_CATEGORIES.map((c) => (
                        <motion.button
                          key={c.label}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelected(c.label)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                            selected === c.label
                              ? "border-[#C89B5A] bg-[#FDF8F2] text-[#2D1A10]"
                              : "border-gray-200 text-gray-600 hover:border-[#C89B5A]/50"
                          }`}
                        >
                          <span className="text-base">{c.icon}</span>
                          <span className="text-xs">{c.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-[#2D1A10]">Describe the issue</p>
                      <span className="text-xs text-gray-400">{description.length}/500</span>
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                      placeholder="Tell us what happened in detail..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm text-[#2D1A10] placeholder-gray-400 resize-none transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.08)" }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 text-sm font-medium transition-all"
                  >
                    <Upload className="w-4 h-4" /> Upload Photo (Optional)
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={!selected || description.trim().length < 10}
                    className="w-full py-3.5 rounded-2xl bg-[#2D1A10] text-white font-bold text-sm transition-all disabled:opacity-40 hover:bg-[#4B2E1A]"
                  >
                    Submit Issue
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="px-6 py-12 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Issue Raised Successfully</p>
                  <h3 className="text-xl font-bold text-[#2D1A10] mt-1">{issueNumber}</h3>
                  <p className="text-sm text-gray-500 mt-3 max-w-xs">
                    Our customer care team will contact you within <strong className="text-[#2D1A10]">24 hours</strong>.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Issue: <span className="text-[#C89B5A] font-semibold">{selected}</span></p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-8 py-3 rounded-2xl bg-[#C89B5A] text-white font-semibold hover:bg-[#B88A4A] transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
