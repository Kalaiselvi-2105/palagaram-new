import { motion } from "framer-motion";
import { Download, FileText, BarChart2, DollarSign, ShoppingBag, Printer, TrendingUp, Users, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 820000, orders: 720, customers: 340, tax: 41000 },
  { month: "Feb", revenue: 940000, orders: 810, customers: 390, tax: 47000 },
  { month: "Mar", revenue: 1100000, orders: 920, customers: 450, tax: 55000 },
  { month: "Apr", revenue: 980000, orders: 860, customers: 410, tax: 49000 },
  { month: "May", revenue: 1240000, orders: 1050, customers: 520, tax: 62000 },
  { month: "Jun", revenue: 1380000, orders: 1180, customers: 610, tax: 69000 },
];

const REPORT_TYPES = [
  { label: "Revenue Report", icon: DollarSign, color: "#d4af37", bg: "rgba(212,175,55,0.12)", desc: "Complete revenue breakdown with daily, weekly and monthly comparisons" },
  { label: "Sales Report", icon: TrendingUp, color: "#4ade80", bg: "rgba(34,197,94,0.12)", desc: "Detailed sales analytics by category, item, and time period" },
  { label: "Order Report", icon: ShoppingBag, color: "#60a5fa", bg: "rgba(59,130,246,0.12)", desc: "Order volume, fulfillment rates, cancellations, and delivery data" },
  { label: "Tax Report", icon: FileText, color: "#c084fc", bg: "rgba(192,132,252,0.12)", desc: "GST breakdown, tax collected by period, and compliance summary" },
  { label: "Customer Report", icon: Users, color: "#fb923c", bg: "rgba(249,115,22,0.12)", desc: "Customer acquisition, retention, lifetime value, and segmentation" },
  { label: "Reservation Report", icon: Calendar, color: "#2dd4bf", bg: "rgba(45,212,191,0.12)", desc: "Booking stats, table utilization, cancellation rates" },
];

const FORMAT_BTNS = [
  { label: "Export CSV", icon: FileText },
  { label: "Export Excel", icon: BarChart2 },
  { label: "Export PDF", icon: Download },
  { label: "Print", icon: Printer },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs space-y-1" style={{ background: "#1a0f0a", border: "1px solid rgba(212,175,55,0.3)", color: "#faf6f0" }}>
        <div className="font-semibold" style={{ color: "#d4af37" }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name}>
            {p.name === "revenue" ? `Revenue: ₹${(p.value / 1000).toFixed(0)}k` :
             p.name === "tax" ? `Tax: ₹${(p.value / 1000).toFixed(0)}k` :
             p.name === "orders" ? `Orders: ${p.value}` : `Customers: ${p.value}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Reports & Exports</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Generate and download detailed business reports</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 rounded-xl text-xs outline-none"
            style={{ background: "#110806", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}>
            <option>June 2026</option>
            <option>May 2026</option>
            <option>Q2 2026</option>
          </select>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "YTD Revenue", val: "₹74.6L", change: "+22%", color: "#d4af37" },
          { label: "YTD Orders", val: "6,540", change: "+18%", color: "#4ade80" },
          { label: "YTD Tax Collected", val: "₹3.73L", change: "+22%", color: "#c084fc" },
          { label: "YTD Customers", val: "2,720", change: "+28%", color: "#60a5fa" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 border"
            style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: "#faf6f0" }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "#4ade80" }}>{s.change} vs last year</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 border"
        style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ color: "#faf6f0" }}>Monthly Revenue & Tax</h3>
            <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Jan – Jun 2026</p>
          </div>
          <div className="flex gap-2">
            {FORMAT_BTNS.map((btn) => (
              <button key={btn.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.15)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}>
                <btn.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={MONTHLY_DATA} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} name="revenue" />
            <Bar dataKey="tax" fill="rgba(192,132,252,0.6)" radius={[4, 4, 0, 0]} name="tax" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Orders & Customers Line Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5 border"
        style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
        <h3 className="font-semibold mb-4" style={{ color: "#faf6f0" }}>Orders vs Customer Growth</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.06)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 4 }} name="orders" />
            <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#4ade80" strokeWidth={2} dot={{ fill: "#4ade80", r: 4 }} name="customers" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Report Cards */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(212,175,55,0.5)" }}>Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_TYPES.map((report, i) => (
            <motion.div key={report.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl p-4 border group cursor-pointer"
              style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: report.bg }}>
                  <report.icon className="w-5 h-5" style={{ color: report.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: "#faf6f0" }}>{report.label}</div>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{report.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                {["CSV", "Excel", "PDF"].map((fmt) => (
                  <button key={fmt}
                    className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.12)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.18)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}>
                    {fmt}
                  </button>
                ))}
                <button className="p-1.5 rounded-lg transition-all"
                  style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.18)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}>
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
