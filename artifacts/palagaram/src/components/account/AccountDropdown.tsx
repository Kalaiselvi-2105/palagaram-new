import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  User, Package, Truck, Heart, MapPin, Bell, CreditCard, Settings, LogOut, ChevronRight, Star
} from "lucide-react";
import { MOCK_PROFILE, MOCK_NOTIFICATIONS } from "@/data/accountData";

interface AccountDropdownProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: User, label: "My Profile", href: "/my-profile", color: "text-[#C89B5A]", bg: "bg-[#FDF8F2]" },
  { icon: Package, label: "My Orders", href: "/my-orders", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Truck, label: "Track Orders", href: "/track-order", color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: MapPin, label: "Saved Addresses", href: "/saved-addresses", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Bell, label: "Notifications", href: "/notifications", color: "text-violet-600", bg: "bg-violet-50", badge: true },
  { icon: CreditCard, label: "Saved Payments", href: "/saved-addresses", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Settings, label: "Account Settings", href: "/my-profile", color: "text-gray-600", bg: "bg-gray-100" },
];

export function AccountDropdown({ open, onClose }: AccountDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-0 top-full mt-3 w-72 z-[200]"
          style={{ transformOrigin: "top right" }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/60"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
            
            {/* Profile Header */}
            <div className="px-5 py-4 bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #C89B5A 0%, transparent 60%)" }} />
              <div className="flex items-center gap-3 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C89B5A] to-[#A07840] flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                  {MOCK_PROFILE.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{MOCK_PROFILE.name}</p>
                  <p className="text-white/60 text-xs truncate">{MOCK_PROFILE.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-[#C89B5A] fill-[#C89B5A]" />
                    <span className="text-[#C89B5A] text-xs font-semibold">{MOCK_PROFILE.membershipLevel} Member</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-3 relative">
                <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                  <p className="text-white font-bold text-sm">{MOCK_PROFILE.totalOrders}</p>
                  <p className="text-white/50 text-[10px]">Orders</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                  <p className="text-[#C89B5A] font-bold text-sm">{MOCK_PROFILE.loyaltyPoints.toLocaleString()}</p>
                  <p className="text-white/50 text-[10px]">Points</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                  <p className="text-white font-bold text-sm">₹{(MOCK_PROFILE.totalSpent / 1000).toFixed(1)}k</p>
                  <p className="text-white/50 text-[10px]">Spent</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, i) => (
                <Link key={i} href={item.href} onClick={onClose}>
                  <motion.div
                    whileHover={{ x: 3, backgroundColor: "rgba(250,248,245,0.9)" }}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-[#2D1A10] text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {unreadCount}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C89B5A] transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="px-4 pb-3 pt-1 border-t border-gray-100">
              <motion.button
                whileHover={{ backgroundColor: "rgba(254,242,242,0.9)" }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                onClick={onClose}
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-red-500 text-sm font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
