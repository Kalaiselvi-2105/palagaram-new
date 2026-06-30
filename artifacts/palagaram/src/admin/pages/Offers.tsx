import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, Trash2, Copy, ToggleLeft, ToggleRight, Calendar, Percent, Gift } from "lucide-react";

const COUPONS = [
  { id: 1, code: "FIRST50", type: "percent", value: 50, maxDiscount: 200, minOrder: 300, uses: 0, maxUses: 100, usedCount: 67, active: true, expiry: "2026-07-31", description: "50% off for first-time customers" },
  { id: 2, code: "DINE10", type: "percent", value: 10, maxDiscount: 100, minOrder: 200, uses: 0, maxUses: 500, usedCount: 234, active: true, expiry: "2026-07-15", description: "10% off on all dine-in orders" },
  { id: 3, code: "SUMMER100", type: "flat", value: 100, maxDiscount: 100, minOrder: 500, uses: 0, maxUses: 200, usedCount: 89, active: true, expiry: "2026-07-31", description: "₹100 flat off on orders above ₹500" },
  { id: 4, code: "BIRYANI20", type: "percent", value: 20, maxDiscount: 150, minOrder: 400, uses: 0, maxUses: 300, usedCount: 156, active: false, expiry: "2026-06-30", description: "20% off on all biryani orders" },
  { id: 5, code: "REFER200", type: "flat", value: 200, maxDiscount: 200, minOrder: 600, uses: 0, maxUses: -1, usedCount: 43, active: true, expiry: "2026-12-31", description: "Referral bonus — ₹200 off for referee" },
];

const OFFERS = [
  { id: 1, name: "Weekend Special", desc: "Get a complimentary dessert with every Family Pack order on weekends", discount: "Free Dessert", validity: "Every Sat-Sun", active: true, emoji: "🍮" },
  { id: 2, name: "Lunch Combo Deal", desc: "Choose any curry + rice + roti + dessert at a special bundled price", discount: "Save ₹80", validity: "11am - 3pm daily", active: true, emoji: "🍛" },
  { id: 3, name: "Festival Bonanza", desc: "Special menu with traditional recipes and premium plating for festive seasons", discount: "20% Off", validity: "Festival dates", active: false, emoji: "🎉" },
  { id: 4, name: "Birthday Month Offer", desc: "Celebrate your birthday with a complimentary cake slice and 15% off your order", discount: "15% + Free Cake", validity: "Birthday month", active: true, emoji: "🎂" },
];

function CouponCard({ coupon }: { coupon: typeof COUPONS[0] }) {
  const [active, setActive] = useState(coupon.active);
  const usagePct = coupon.maxUses > 0 ? (coupon.usedCount / coupon.maxUses) * 100 : 50;

  return (
    <motion.div layout whileHover={{ y: -2 }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: "#110806", borderColor: active ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)", opacity: active ? 1 : 0.7 }}>
      {/* Header strip */}
      <div className="h-1" style={{ background: active ? "linear-gradient(90deg, #d4af37, #f0c040)" : "rgba(255,255,255,0.08)" }} />
      <div className="p-4">
        {/* Code + toggle */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold tracking-widest" style={{ color: "#d4af37" }}>{coupon.code}</span>
            <button className="p-1.5 rounded-lg" style={{ color: "rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.08)" }}>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          <button onClick={() => setActive(!active)}>
            {active ? <ToggleRight className="w-8 h-8" style={{ color: "#4ade80" }} /> : <ToggleLeft className="w-8 h-8" style={{ color: "rgba(255,255,255,0.3)" }} />}
          </button>
        </div>

        {/* Discount */}
        <div className="flex items-center gap-2 mb-2">
          <div className="text-2xl font-bold" style={{ color: "#faf6f0" }}>
            {coupon.type === "percent" ? `${coupon.value}%` : `₹${coupon.value}`}
          </div>
          <div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.5)" }}>{coupon.description}</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>Min order ₹{coupon.minOrder} · Max discount ₹{coupon.maxDiscount}</div>
          </div>
        </div>

        {/* Usage bar */}
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>
            <span>{coupon.usedCount} used</span>
            <span>{coupon.maxUses > 0 ? `${coupon.maxUses} max` : "Unlimited"}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${usagePct}%` }} transition={{ duration: 0.8 }}
              className="h-full rounded-full" style={{ background: usagePct > 80 ? "#f87171" : "linear-gradient(90deg, #d4af37, #f0c040)" }} />
          </div>
        </div>

        {/* Expiry + actions */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>
            <Calendar className="w-3.5 h-3.5" />
            Expires {coupon.expiry}
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-lg" style={{ color: "rgba(212,175,55,0.5)", background: "rgba(212,175,55,0.08)" }}>
              <Percent className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg" style={{ color: "rgba(239,68,68,0.5)", background: "rgba(239,68,68,0.08)" }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OfferCard({ offer }: { offer: typeof OFFERS[0] }) {
  const [active, setActive] = useState(offer.active);
  return (
    <motion.div layout whileHover={{ y: -2 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border p-4"
      style={{ background: "#110806", borderColor: active ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)", opacity: active ? 1 : 0.6 }}>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{offer.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm" style={{ color: "#faf6f0" }}>{offer.name}</span>
            <button onClick={() => setActive(!active)}>
              {active ? <ToggleRight className="w-7 h-7" style={{ color: "#4ade80" }} /> : <ToggleLeft className="w-7 h-7" style={{ color: "rgba(255,255,255,0.3)" }} />}
            </button>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.5)" }}>{offer.desc}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>{offer.discount}</span>
            <span className="text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>📅 {offer.validity}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Offers() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Offers & Coupons</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Manage promotional campaigns and discount codes</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
          <Plus className="w-3.5 h-3.5" /> Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Coupons", val: COUPONS.filter(c => c.active).length, color: "#4ade80" },
          { label: "Total Uses", val: COUPONS.reduce((s, c) => s + c.usedCount, 0), color: "#d4af37" },
          { label: "Revenue Saved", val: "₹42,380", color: "#c084fc" },
          { label: "Conversion Rate", val: "34%", color: "#60a5fa" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Coupons */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.5)" }}>Discount Coupons</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {COUPONS.map((c) => <CouponCard key={c.id} coupon={c} />)}
          </AnimatePresence>
          {/* Add new */}
          <motion.button whileHover={{ scale: 1.01, borderColor: "rgba(212,175,55,0.4)" }}
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 gap-2 transition-all"
            style={{ borderColor: "rgba(212,175,55,0.15)", minHeight: 160 }}>
            <Plus className="w-8 h-8" style={{ color: "rgba(212,175,55,0.3)" }} />
            <span className="text-sm" style={{ color: "rgba(212,175,55,0.4)" }}>Create New Coupon</span>
          </motion.button>
        </div>
      </div>

      {/* Offers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.5)" }}>Active Offers & Promotions</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}>
            <Gift className="w-3.5 h-3.5" /> Add Offer
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {OFFERS.map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </div>
    </div>
  );
}
