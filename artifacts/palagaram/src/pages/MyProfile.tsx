import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Calendar, Star, Edit3, Camera, Shield, ChevronRight, MapPin, CreditCard, Package, Award, Lock } from "lucide-react";
import { Link } from "wouter";
import { MOCK_PROFILE, MOCK_ADDRESSES, MOCK_SAVED_PAYMENTS, MOCK_ORDERS } from "@/data/accountData";

const MEMBERSHIP_COLORS: Record<string, { from: string; to: string; badge: string }> = {
  Bronze: { from: "#CD7F32", to: "#A0522D", badge: "bg-amber-100 text-amber-800" },
  Silver: { from: "#C0C0C0", to: "#808080", badge: "bg-gray-200 text-gray-700" },
  Gold: { from: "#C89B5A", to: "#A07840", badge: "bg-amber-50 text-amber-700" },
  Platinum: { from: "#6B7280", to: "#374151", badge: "bg-slate-100 text-slate-700" },
};

const mc = MEMBERSHIP_COLORS[MOCK_PROFILE.membershipLevel] || MEMBERSHIP_COLORS.Gold;

export default function MyProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(MOCK_PROFILE.name);
  const [phone, setPhone] = useState(MOCK_PROFILE.phone);
  const [email, setEmail] = useState(MOCK_PROFILE.email);
  const [birthday, setBirthday] = useState(MOCK_PROFILE.birthday);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const recentOrders = MOCK_ORDERS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/"><span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors">Home</span></Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">My Profile</span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#C89B5A] to-[#A07840] flex items-center justify-center shadow-2xl text-4xl font-black text-white">
                {MOCK_PROFILE.name.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#FAF8F5] hover:bg-[#FDF8F2] transition-colors">
                <Camera className="w-3.5 h-3.5 text-[#C89B5A]" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${mc.badge}`}>
                <Award className="w-3 h-3" /> {MOCK_PROFILE.membershipLevel} Member
              </div>
              <h1 className="text-white font-black text-2xl md:text-3xl">{MOCK_PROFILE.name}</h1>
              <p className="text-white/50 text-sm mt-1">Member since {MOCK_PROFILE.memberSince}</p>
            </div>
            {/* Quick Stats */}
            <div className="flex gap-3">
              {[
                { label: "Orders", value: MOCK_PROFILE.totalOrders },
                { label: "Points", value: MOCK_PROFILE.loyaltyPoints.toLocaleString() },
                { label: "Spent", value: `₹${(MOCK_PROFILE.totalSpent / 1000).toFixed(0)}k` },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl px-4 py-3 text-center min-w-[72px]">
                  <p className="text-white font-black text-lg">{s.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-4 pb-16 space-y-5">
        {/* Profile Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-[#EADBC8]/60">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C89B5A]" />
              <h2 className="text-sm font-bold text-[#2D1A10]">Personal Information</h2>
            </div>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                editing ? "bg-[#C89B5A] text-white hover:bg-[#B88A4A]" : "border border-[#EADBC8] text-[#C89B5A] hover:border-[#C89B5A]"
              }`}
            >
              <Edit3 className="w-3 h-3" /> {editing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {saved && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mx-6 mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-bold">✓</span>
              </div>
              <p className="text-sm text-emerald-700 font-medium">Profile saved successfully!</p>
            </motion.div>
          )}

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: User, label: "Full Name", value: name, onChange: setName, type: "text" },
              { icon: Phone, label: "Phone Number", value: phone, onChange: setPhone, type: "tel" },
              { icon: Mail, label: "Email Address", value: email, onChange: setEmail, type: "email" },
              { icon: Calendar, label: "Birthday", value: birthday, onChange: setBirthday, type: "date" },
            ].map((field) => (
              <div key={field.label}>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                  <field.icon className="w-3 h-3" /> {field.label}
                </label>
                {editing ? (
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C89B5A]/30 focus:border-[#C89B5A] outline-none text-sm text-[#2D1A10] bg-[#FDF8F2] transition-colors"
                  />
                ) : (
                  <p className="text-sm font-semibold text-[#2D1A10] px-4 py-3 bg-[#FAF8F5] rounded-xl">{field.value}</p>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="px-6 pb-5">
              <button onClick={handleSave} className="w-full py-3.5 rounded-2xl bg-[#2D1A10] text-white font-bold text-sm hover:bg-[#4B2E1A] transition-colors">
                Save All Changes
              </button>
            </div>
          )}
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#EADBC8] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2D1A10]">Change Password</p>
                <p className="text-xs text-gray-400">Keep your account secure</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EADBC8] text-sm font-semibold text-[#2D1A10] hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors">
              Update <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Saved Addresses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-[#EADBC8]/60">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C89B5A]" />
              <h2 className="text-sm font-bold text-[#2D1A10]">Saved Addresses</h2>
            </div>
            <Link href="/saved-addresses">
              <button className="text-xs font-semibold text-[#C89B5A] hover:underline">Manage All</button>
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {MOCK_ADDRESSES.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EADBC8]/60">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${addr.type === "Home" ? "bg-blue-50 text-blue-600" : addr.type === "Office" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {addr.type === "Home" ? "🏠" : addr.type === "Office" ? "🏢" : "📍"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#2D1A10]">{addr.label}</p>
                    {addr.isDefault && <span className="text-[10px] bg-[#C89B5A]/10 text-[#C89B5A] px-2 py-0.5 rounded-full font-semibold">Default</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                  <p className="text-xs text-gray-400">{addr.city}, {addr.pincode}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved Payments */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-[#EADBC8]/60">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C89B5A]" />
              <h2 className="text-sm font-bold text-[#2D1A10]">Saved Payments</h2>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {MOCK_SAVED_PAYMENTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EADBC8]/60">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm flex-shrink-0">
                  {p.type === "UPI" ? "💸" : p.type === "Card" ? "💳" : "👛"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#2D1A10]">{p.label}</p>
                  <p className="text-xs text-gray-500">{p.details}</p>
                </div>
                {p.isDefault && <span className="text-[10px] bg-[#C89B5A]/10 text-[#C89B5A] px-2 py-0.5 rounded-full font-semibold">Default</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-[#EADBC8]/60">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#C89B5A]" />
              <h2 className="text-sm font-bold text-[#2D1A10]">Recent Orders</h2>
            </div>
            <Link href="/my-orders">
              <button className="text-xs font-semibold text-[#C89B5A] hover:underline">View All</button>
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EADBC8]/60">
                <div className="flex -space-x-1.5">
                  {order.items.slice(0, 2).map((item) => (
                    <img key={item.id} src={item.imageUrl} alt={item.name} className="w-9 h-9 rounded-lg object-cover border-2 border-white" />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2D1A10] truncate">{order.items[0].name}{order.items.length > 1 ? ` +${order.items.length - 1}` : ""}</p>
                  <p className="text-xs text-gray-400">{order.id} · {order.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-[#2D1A10]">₹{order.total}</p>
                  <span className="text-[10px] text-gray-400">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reward Points */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #C89B5A 0%, transparent 60%)" }} />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-[#C89B5A] fill-[#C89B5A]" />
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Loyalty Rewards</p>
              </div>
              <p className="text-white font-black text-3xl">{MOCK_PROFILE.loyaltyPoints.toLocaleString()}</p>
              <p className="text-white/40 text-sm mt-0.5">Reward Points Available</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/50">{MOCK_PROFILE.membershipLevel}</span>
                  <span className="text-[#C89B5A] font-semibold">Platinum (5000 pts)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(MOCK_PROFILE.loyaltyPoints / 5000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#C89B5A] to-[#E8B87A]"
                  />
                </div>
                <p className="text-white/30 text-xs mt-1.5">{5000 - MOCK_PROFILE.loyaltyPoints} points to Platinum</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-[#C89B5A] flex items-center justify-center shadow-lg flex-shrink-0">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
