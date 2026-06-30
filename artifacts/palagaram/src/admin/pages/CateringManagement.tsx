import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, MapPin, DollarSign, CheckCircle, XCircle, Download, UserCheck, FileText, Phone } from "lucide-react";

const CATERING_REQUESTS = [
  { id: "CAT-001", client: "Suresh Babu", phone: "+91 98765 43210", event: "Wedding Reception", date: "2026-07-15", venue: "Grand Palace Hall, Adyar", guests: 350, budget: 175000, preference: "Non-Veg", status: "Pending", manager: null, notes: "Premium setup required, live counter preferred", createdAt: "2026-06-28" },
  { id: "CAT-002", client: "TCS India Ltd.", phone: "+91 87654 32109", event: "Annual Day Dinner", date: "2026-07-20", venue: "Client Office, OMR", guests: 200, budget: 80000, preference: "Both", status: "Approved", manager: "Rajan K.", notes: "Corporate billing, GST invoice required", createdAt: "2026-06-25" },
  { id: "CAT-003", client: "Priya Sundaram", phone: "+91 76543 21098", event: "Birthday Celebration", date: "2026-07-08", venue: "Home", guests: 60, budget: 30000, preference: "Veg", status: "Quoted", manager: "Kavitha M.", notes: "Jain food option needed for 10 guests", createdAt: "2026-06-29" },
  { id: "CAT-004", client: "Lakshmi Raghavan", phone: "+91 65432 10987", event: "Housewarming", date: "2026-07-12", venue: "Velachery Residence", guests: 80, budget: 40000, preference: "Veg", status: "Converted", manager: "Selvam R.", notes: "Traditional South Indian menu", createdAt: "2026-06-20" },
  { id: "CAT-005", client: "Mohan Industries", phone: "+91 54321 09876", event: "Client Lunch", date: "2026-07-10", venue: "Taj Hotel Banquet", guests: 40, budget: 50000, preference: "Both", status: "Rejected", manager: null, notes: "Date conflict", createdAt: "2026-06-27" },
];

const MANAGERS = ["Rajan K.", "Kavitha M.", "Selvam R.", "Preethi J.", "Murugan S."];

const STATUS_CFG: Record<string, { bg: string; text: string; border: string }> = {
  Pending: { bg: "rgba(234,179,8,0.1)", text: "#facc15", border: "rgba(234,179,8,0.25)" },
  Approved: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", border: "rgba(34,197,94,0.25)" },
  Quoted: { bg: "rgba(99,102,241,0.1)", text: "#818cf8", border: "rgba(99,102,241,0.25)" },
  Converted: { bg: "rgba(212,175,55,0.15)", text: "#d4af37", border: "rgba(212,175,55,0.3)" },
  Rejected: { bg: "rgba(239,68,68,0.1)", text: "#f87171", border: "rgba(239,68,68,0.25)" },
};

function CateringCard({ request }: { request: typeof CATERING_REQUESTS[0] }) {
  const [status, setStatus] = useState(request.status);
  const [manager, setManager] = useState(request.manager || "");
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CFG[status];

  return (
    <motion.div layout className="rounded-2xl border overflow-hidden" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,175,55,0.1)" }}>
              <Users className="w-5 h-5" style={{ color: "#d4af37" }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm" style={{ color: "#faf6f0" }}>{request.client}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border" style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}>{status}</span>
                <span className="text-xs" style={{ color: "rgba(212,175,55,0.6)" }}>{request.id}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-1.5 text-xs" style={{ color: "rgba(250,246,240,0.45)" }}>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{request.event} · {request.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{request.guests} guests</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{request.phone}</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{request.venue}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold" style={{ color: "#d4af37" }}>₹{(request.budget / 1000).toFixed(0)}k</div>
            <div className="text-xs" style={{ color: "rgba(250,246,240,0.4)" }}>{request.preference} Menu</div>
          </div>
        </div>

        {/* Per head */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t flex-wrap" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
          <div className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(212,175,55,0.06)", color: "rgba(212,175,55,0.7)" }}>
            ₹{Math.round(request.budget / request.guests)}/head
          </div>
          {request.manager && (
            <div className="text-xs flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: "rgba(34,197,94,0.06)", color: "#4ade80" }}>
              <UserCheck className="w-3 h-3" />{request.manager}
            </div>
          )}
          {request.notes && (
            <div className="text-xs truncate flex-1" style={{ color: "rgba(250,246,240,0.4)" }}>📝 {request.notes}</div>
          )}
        </div>
      </div>

      {/* Actions */}
      {status !== "Rejected" && status !== "Converted" && (
        <div className="px-5 pb-4 flex flex-wrap gap-2">
          {status === "Pending" && (
            <>
              <button onClick={() => setStatus("Approved")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
                <CheckCircle className="w-3.5 h-3.5" /> Approve
              </button>
              <button onClick={() => setStatus("Rejected")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
            </>
          )}
          {status === "Approved" && (
            <button onClick={() => setStatus("Quoted")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
              <FileText className="w-3.5 h-3.5" /> Generate Quote
            </button>
          )}
          {status === "Quoted" && (
            <button onClick={() => setStatus("Converted")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
              Convert to Booking
            </button>
          )}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Download className="w-3.5 h-3.5" /> Quote PDF
          </button>
          {!manager && (
            <select value={manager} onChange={(e) => setManager(e.target.value)}
              className="px-2 py-1.5 rounded-lg text-xs outline-none"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <option value="">Assign Manager</option>
              {MANAGERS.map((m) => <option key={m}>{m}</option>)}
            </select>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function CateringManagement() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Pending", "Approved", "Quoted", "Converted", "Rejected"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Catering Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Premium event catering CRM</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
          + New Enquiry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statuses.slice(1).map((s) => {
          const count = CATERING_REQUESTS.filter((r) => r.status === s).length;
          const cfg = STATUS_CFG[s];
          return (
            <div key={s} className="rounded-xl p-3 border text-center" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
              <div className="text-xl font-bold" style={{ color: cfg.text }}>{count}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{ background: filter === s ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: filter === s ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${filter === s ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
            {s}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {CATERING_REQUESTS.filter((r) => filter === "All" || r.status === filter).map((req, i) => (
            <motion.div key={req.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <CateringCard request={req} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
