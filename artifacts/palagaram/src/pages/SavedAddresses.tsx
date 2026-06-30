import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit3, Trash2, Home, Briefcase, Map, CheckCircle, X } from "lucide-react";
import { Link } from "wouter";
import { MOCK_ADDRESSES, SavedAddress } from "@/data/accountData";

const TYPE_CONFIG: Record<SavedAddress["type"], { icon: React.ElementType; color: string; bg: string; emoji: string }> = {
  Home: { icon: Home, color: "text-blue-600", bg: "bg-blue-50", emoji: "🏠" },
  Office: { icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50", emoji: "🏢" },
  Other: { icon: Map, color: "text-amber-600", bg: "bg-amber-50", emoji: "📍" },
};

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [newAddr, setNewAddr] = useState({ type: "Home" as SavedAddress["type"], label: "", line1: "", line2: "", city: "", pincode: "" });

  const setDefault = (id: string) => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  const deleteAddr = (id: string) => {
    setDeletedId(id);
    setTimeout(() => { setAddresses((prev) => prev.filter((a) => a.id !== id)); setDeletedId(null); }, 350);
  };

  const handleAdd = () => {
    if (!newAddr.label || !newAddr.line1 || !newAddr.city) return;
    const addr: SavedAddress = {
      id: `a${Date.now()}`, type: newAddr.type, label: newAddr.label,
      name: "Arjun Krishnamurthy", phone: "+91 98765 43210",
      line1: newAddr.line1, line2: newAddr.line2,
      city: newAddr.city, state: "Tamil Nadu", pincode: newAddr.pincode, isDefault: false,
    };
    setAddresses((prev) => [...prev, addr]);
    setNewAddr({ type: "Home", label: "", line1: "", line2: "", city: "", pincode: "" });
    setShowAdd(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/"><span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors">Home</span></Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">Saved Addresses</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-black text-3xl">Saved Addresses</h1>
              <p className="text-white/50 text-sm mt-1">{addresses.length} address{addresses.length !== 1 ? "es" : ""} saved</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C89B5A] text-white text-sm font-bold hover:bg-[#B88A4A] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add New
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-16 space-y-4">
        {/* Add Address Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-3xl border-2 border-[#C89B5A]/30 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#2D1A10]">Add New Address</h3>
                  <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {(["Home", "Office", "Other"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewAddr((p) => ({ ...p, type: t }))}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${newAddr.type === t ? "border-[#C89B5A] bg-[#FDF8F2] text-[#C89B5A]" : "border-gray-200 text-gray-500 hover:border-[#C89B5A]/50"}`}
                    >
                      {TYPE_CONFIG[t].emoji} {t}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={newAddr.label} onChange={(e) => setNewAddr((p) => ({ ...p, label: e.target.value }))} placeholder="Label (e.g. Home)" className="col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm" />
                  <input value={newAddr.line1} onChange={(e) => setNewAddr((p) => ({ ...p, line1: e.target.value }))} placeholder="Street Address*" className="col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm" />
                  <input value={newAddr.line2} onChange={(e) => setNewAddr((p) => ({ ...p, line2: e.target.value }))} placeholder="Apartment, Floor (optional)" className="col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm" />
                  <input value={newAddr.city} onChange={(e) => setNewAddr((p) => ({ ...p, city: e.target.value }))} placeholder="City*" className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm" />
                  <input value={newAddr.pincode} onChange={(e) => setNewAddr((p) => ({ ...p, pincode: e.target.value }))} placeholder="Pincode" className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#C89B5A] outline-none text-sm" />
                </div>
                <button onClick={handleAdd} className="w-full py-3.5 rounded-2xl bg-[#2D1A10] text-white font-bold text-sm hover:bg-[#4B2E1A] transition-colors">
                  Save Address
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Address Cards */}
        <AnimatePresence mode="popLayout">
          {addresses.map((addr, i) => {
            const tc = TYPE_CONFIG[addr.type];
            const isDeleting = deletedId === addr.id;
            return (
              <motion.div
                key={addr.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isDeleting ? 0 : 1, scale: isDeleting ? 0.95 : 1, x: isDeleting ? -30 : 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${tc.bg} flex items-center justify-center text-xl`}>
                        {tc.emoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#2D1A10]">{addr.label}</p>
                          {addr.isDefault && (
                            <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                              <CheckCircle className="w-2.5 h-2.5" /> Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{addr.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setEditingId(editingId === addr.id ? null : addr.id)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      {!addr.isDefault && (
                        <button
                          onClick={() => deleteAddr(addr.id)}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-red-200 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="pl-13">
                    <p className="text-sm text-[#2D1A10] font-medium">{addr.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                    <p className="text-xs text-gray-500">{addr.city}, {addr.state} — {addr.pincode}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                  </div>
                  {!addr.isDefault && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setDefault(addr.id)}
                        className="text-xs font-semibold text-[#C89B5A] hover:underline flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" /> Set as Default
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
