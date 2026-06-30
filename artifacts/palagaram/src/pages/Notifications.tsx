import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, Package, Tag, Calendar, PartyPopper, Star, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { MOCK_NOTIFICATIONS, Notification } from "@/data/accountData";

const TYPE_ICONS: Record<Notification["type"], React.ElementType> = {
  order: Package,
  offer: Tag,
  reservation: Calendar,
  festival: PartyPopper,
  reward: Star,
};

const TYPE_COLORS: Record<Notification["type"], { bg: string; text: string; ring: string }> = {
  order: { bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
  offer: { bg: "bg-rose-50", text: "text-rose-500", ring: "ring-rose-100" },
  reservation: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
  festival: { bg: "bg-violet-50", text: "text-violet-600", ring: "ring-violet-100" },
  reward: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
};

const TABS = ["All", "Orders", "Offers", "Rewards"] as const;
type Tab = typeof TABS[number];

export default function Notifications() {
  const [notes, setNotes] = useState(MOCK_NOTIFICATIONS);
  const [tab, setTab] = useState<Tab>("All");

  const unread = notes.filter((n) => !n.read).length;

  const markAllRead = () => setNotes((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotes((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNote = (id: string) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const filtered = notes.filter((n) => {
    if (tab === "All") return true;
    if (tab === "Orders") return n.type === "order";
    if (tab === "Offers") return n.type === "offer" || n.type === "festival";
    if (tab === "Rewards") return n.type === "reward";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/"><span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors">Home</span></Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">Notifications</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-black text-3xl">Notifications</h1>
              {unread > 0 && (
                <p className="text-white/50 text-sm mt-1">{unread} unread notification{unread !== 1 ? "s" : ""}</p>
              )}
            </div>
            {unread > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={markAllRead}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <CheckCheck className="w-4 h-4" /> Mark all read
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-16">
        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[#EADBC8] p-1.5 flex gap-1 mb-5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === t ? "bg-[#2D1A10] text-white shadow-md" : "text-gray-500 hover:text-[#2D1A10]"
              }`}
            >
              {t}
              {t === "All" && unread > 0 && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${tab === t ? "bg-white/20 text-white" : "bg-red-100 text-red-600"}`}>
                  {unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[#FDF8F2] border-2 border-[#EADBC8] flex items-center justify-center mb-4">
              <Bell className="w-9 h-9 text-[#C89B5A]/40" />
            </div>
            <h3 className="text-lg font-bold text-[#2D1A10]">No notifications</h3>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((note, i) => {
                const Icon = TYPE_ICONS[note.type];
                const colors = TYPE_COLORS[note.type];
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    layout
                    className={`bg-white rounded-2xl border p-4 flex gap-3 cursor-pointer transition-all hover:shadow-md ${
                      !note.read ? "border-[#C89B5A]/30 shadow-sm" : "border-[#EADBC8]"
                    }`}
                    onClick={() => markRead(note.id)}
                  >
                    <div className={`relative w-11 h-11 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                      {!note.read && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#C89B5A] border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-bold ${!note.read ? "text-[#2D1A10]" : "text-gray-700"}`}>{note.title}</p>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                          className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{note.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{note.time}</p>
                    </div>
                    {!note.read && <div className="w-2 h-2 rounded-full bg-[#C89B5A] flex-shrink-0 mt-1.5" />}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
