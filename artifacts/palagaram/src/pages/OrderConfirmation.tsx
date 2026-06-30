import { motion } from "framer-motion";
import { CheckCircle2, Copy, Check, Phone, Truck, Package, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OrderConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id") ?? "ORD-XXXXXX";
  const total = params.get("total") ?? "0";
  const type = params.get("type") ?? "delivery";
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const eta = type === "delivery" ? "30–45 minutes" : "20 minutes";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14, stiffness: 180 }}
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-serif font-bold text-4xl text-[#4B352A] mb-3">Order Placed!</h1>
            <p className="text-[#4B352A]/60 mb-8 max-w-sm mx-auto">
              Your order has been received. Our kitchen is already preparing your food with love and care.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-[#EADBC8] p-6 mb-6 text-left">
            <div className="text-center mb-5">
              <p className="text-[#4B352A]/50 text-xs uppercase tracking-widest mb-2">Order ID</p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono font-bold text-2xl text-[#4B352A] tracking-wider">{orderId}</span>
                <button onClick={copyId} className="w-8 h-8 rounded-lg bg-[#F6F0E8] border border-[#EADBC8] flex items-center justify-center hover:border-[#C89B5A] transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#4B352A]/50" />}
                </button>
              </div>
            </div>

            <div className="space-y-0 rounded-2xl border border-[#EADBC8] overflow-hidden">
              {[
                { label: "Order Type", value: type === "delivery" ? "Home Delivery" : "Pickup", icon: type === "delivery" ? Truck : Package },
                { label: "Estimated Time", value: eta, icon: null },
                { label: "Amount to Pay", value: `₹${parseInt(total).toLocaleString()}`, icon: null },
              ].map((r, i) => (
                <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                  <span className="text-[#4B352A]/50 text-sm">{r.label}</span>
                  <span className="text-[#4B352A] font-semibold text-sm flex items-center gap-1.5">
                    {r.icon && <r.icon className="w-3.5 h-3.5 text-[#C89B5A]" />}
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tracking status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#4B352A] rounded-3xl p-6 mb-6 text-left">
            <p className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold mb-4">Order Status</p>
            {[
              { label: "Order Received", done: true },
              { label: "Preparing in Kitchen", done: true },
              { label: type === "delivery" ? "Out for Delivery" : "Ready for Pickup", done: false },
              { label: type === "delivery" ? "Delivered" : "Picked Up", done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? "bg-[#C89B5A]" : "border-2 border-white/20"}`}>
                  {s.done && <Check className="w-3 h-3 text-white" />}
                </div>
                {i < 3 && <div className="absolute ml-2.5 mt-7 w-px h-3 bg-white/10" />}
                <span className={`text-sm font-medium ${s.done ? "text-[#FAF8F5]" : "text-[#EADBC8]/40"}`}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col gap-3">
            <a href="tel:+919876543210">
              <Button className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full py-3 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Us (+91 98765 43210)
              </Button>
            </a>
            <Link href="/menu">
              <Button variant="outline" className="w-full border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-full flex items-center justify-center gap-2">
                Order More <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/">
              <button className="w-full text-[#4B352A]/40 text-sm hover:text-[#4B352A] transition-colors mt-1">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
