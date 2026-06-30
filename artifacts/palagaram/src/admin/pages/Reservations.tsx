import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, CheckCircle, XCircle, Edit, Phone, MessageSquare, Table } from "lucide-react";

const RESERVATIONS = [
  { id: "R-001", customer: "Anand Krishnan", phone: "+91 98765 43210", date: "2026-06-30", time: "1:00 PM", guests: 4, table: "T-4", status: "Confirmed", special: "Anniversary dinner, please arrange a cake", occasion: "Anniversary" },
  { id: "R-002", customer: "Meena Sundaram", phone: "+91 87654 32109", date: "2026-06-30", time: "2:00 PM", guests: 6, table: "T-7", status: "Pending", special: "Vegetarian only", occasion: "Birthday" },
  { id: "R-003", customer: "Ravi Chandran", phone: "+91 76543 21098", date: "2026-06-30", time: "7:30 PM", guests: 2, table: "T-2", status: "Confirmed", special: "Window seat preferred", occasion: "Date Night" },
  { id: "R-004", customer: "Lalitha Kumari", phone: "+91 65432 10987", date: "2026-06-30", time: "8:00 PM", guests: 8, table: null, status: "Pending", special: "Corporate dinner, separate bill", occasion: "Business" },
  { id: "R-005", customer: "Sanjay Nair", phone: "+91 54321 09876", date: "2026-07-01", time: "12:30 PM", guests: 3, table: "T-3", status: "Confirmed", special: "", occasion: "Lunch" },
  { id: "R-006", customer: "Preethi Raj", phone: "+91 43210 98765", date: "2026-07-01", time: "8:30 PM", guests: 10, table: null, status: "Cancelled", special: "Event cancelled", occasion: "" },
];

const TABLES = [
  { id: "T-1", capacity: 2, status: "occupied" },
  { id: "T-2", capacity: 2, status: "reserved" },
  { id: "T-3", capacity: 4, status: "available" },
  { id: "T-4", capacity: 4, status: "reserved" },
  { id: "T-5", capacity: 4, status: "occupied" },
  { id: "T-6", capacity: 6, status: "available" },
  { id: "T-7", capacity: 6, status: "reserved" },
  { id: "T-8", capacity: 8, status: "available" },
  { id: "T-9", capacity: 8, status: "occupied" },
  { id: "T-10", capacity: 10, status: "available" },
  { id: "T-11", capacity: 10, status: "occupied" },
  { id: "T-12", capacity: 12, status: "available" },
];

const STATUS_CFG: Record<string, { bg: string; text: string; border: string }> = {
  Confirmed: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", border: "rgba(34,197,94,0.25)" },
  Pending: { bg: "rgba(234,179,8,0.1)", text: "#facc15", border: "rgba(234,179,8,0.25)" },
  Cancelled: { bg: "rgba(239,68,68,0.1)", text: "#f87171", border: "rgba(239,68,68,0.25)" },
};

const TABLE_CFG: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  available: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.3)", text: "#4ade80", dot: "#4ade80" },
  reserved: { bg: "rgba(212,175,55,0.08)", border: "rgba(212,175,55,0.3)", text: "#d4af37", dot: "#d4af37" },
  occupied: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", text: "#f87171", dot: "#f87171" },
};

export default function Reservations() {
  const [reservations, setReservations] = useState(RESERVATIONS);
  const [activeDate, setActiveDate] = useState("2026-06-30");

  const filtered = reservations.filter((r) => r.date === activeDate);
  const dates = [...new Set(reservations.map((r) => r.date))];

  const updateStatus = (id: string, status: string) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Table Reservations</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Manage bookings and table assignments</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
          + New Reservation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Today", val: filtered.length, color: "#d4af37" },
          { label: "Confirmed", val: filtered.filter((r) => r.status === "Confirmed").length, color: "#4ade80" },
          { label: "Pending", val: filtered.filter((r) => r.status === "Pending").length, color: "#facc15" },
          { label: "Total Guests", val: filtered.filter((r) => r.status !== "Cancelled").reduce((s, r) => s + r.guests, 0), color: "#c084fc" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Date Tabs */}
          <div className="flex gap-2">
            {dates.map((d) => (
              <button key={d} onClick={() => setActiveDate(d)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: activeDate === d ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.05)", color: activeDate === d ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${activeDate === d ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
                {new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.map((r, i) => (
              <motion.div key={r.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border p-4 space-y-3"
                style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)" }}>
                      <Calendar className="w-4 h-4" style={{ color: "#d4af37" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "#faf6f0" }}>{r.customer}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full border" style={{ background: STATUS_CFG[r.status].bg, color: STATUS_CFG[r.status].text, borderColor: STATUS_CFG[r.status].border }}>
                          {r.status}
                        </span>
                        {r.occasion && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37" }}>{r.occasion}</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "rgba(250,246,240,0.45)" }}>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.time}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.guests} guests</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{r.phone}</span>
                        {r.table && <span className="flex items-center gap-1"><Table className="w-3 h-3" />Table {r.table}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {r.special && (
                  <div className="flex items-start gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(212,175,55,0.06)", color: "rgba(212,175,55,0.8)", border: "1px solid rgba(212,175,55,0.12)" }}>
                    <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    {r.special}
                  </div>
                )}

                {r.status !== "Cancelled" && (
                  <div className="flex flex-wrap gap-2">
                    {r.status === "Pending" && (
                      <>
                        <button onClick={() => updateStatus(r.id, "Confirmed")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
                          <CheckCircle className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button onClick={() => updateStatus(r.id, "Cancelled")}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                          <XCircle className="w-3.5 h-3.5" /> Decline
                        </button>
                      </>
                    )}
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Edit className="w-3.5 h-3.5" /> Reschedule
                    </button>
                    {!r.table && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: "rgba(212,175,55,0.1)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}>
                        <Table className="w-3.5 h-3.5" /> Assign Table
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Table Layout */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(212,175,55,0.5)" }}>Table Layout</h3>
          <div className="rounded-2xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {TABLES.map((table) => {
                const cfg = TABLE_CFG[table.status];
                return (
                  <motion.div key={table.id} whileHover={{ scale: 1.04 }}
                    className="rounded-xl p-2.5 border text-center cursor-pointer transition-all"
                    style={{ background: cfg.bg, borderColor: cfg.border }}>
                    <div className="text-xs font-bold" style={{ color: cfg.text }}>{table.id}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{table.capacity}P</div>
                    <div className="mt-1 w-1.5 h-1.5 rounded-full mx-auto" style={{ background: cfg.dot }} />
                  </motion.div>
                );
              })}
            </div>
            <div className="space-y-1.5">
              {Object.entries(TABLE_CFG).map(([status, cfg]) => {
                const count = TABLES.filter((t) => t.status === status).length;
                return (
                  <div key={status} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                      <span className="capitalize" style={{ color: "rgba(250,246,240,0.5)" }}>{status}</span>
                    </div>
                    <span style={{ color: cfg.text }}>{count} tables</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
