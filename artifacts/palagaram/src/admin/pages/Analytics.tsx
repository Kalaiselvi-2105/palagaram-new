import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const MONTHLY = [
  { month: "Jan", revenue: 820000, orders: 720, customers: 340 },
  { month: "Feb", revenue: 940000, orders: 810, customers: 390 },
  { month: "Mar", revenue: 1100000, orders: 920, customers: 450 },
  { month: "Apr", revenue: 980000, orders: 860, customers: 410 },
  { month: "May", revenue: 1240000, orders: 1050, customers: 520 },
  { month: "Jun", revenue: 1380000, orders: 1180, customers: 610 },
  { month: "Jul", revenue: 1520000, orders: 1320, customers: 680 },
];

const PEAK_HOURS = [
  { hour: "10am", orders: 12 }, { hour: "11am", orders: 28 }, { hour: "12pm", orders: 72 },
  { hour: "1pm", orders: 94 }, { hour: "2pm", orders: 68 }, { hour: "3pm", orders: 32 },
  { hour: "4pm", orders: 18 }, { hour: "5pm", orders: 24 }, { hour: "6pm", orders: 45 },
  { hour: "7pm", orders: 88 }, { hour: "8pm", orders: 110 }, { hour: "9pm", orders: 96 },
  { hour: "10pm", orders: 62 }, { hour: "11pm", orders: 28 },
];

const PAYMENT_METHODS = [
  { name: "UPI", value: 52, color: "#d4af37" },
  { name: "Card", value: 24, color: "#60a5fa" },
  { name: "Cash", value: 14, color: "#4ade80" },
  { name: "Wallet", value: 10, color: "#c084fc" },
];

const ORDER_TYPES = [
  { name: "Delivery", value: 58, color: "#f0c040" },
  { name: "Dine-In", value: 28, color: "#2dd4bf" },
  { name: "Takeaway", value: 14, color: "#fb923c" },
];

const TOP_ITEMS = [
  { name: "Chicken Biryani", orders: 1840, revenue: "₹5,52,000" },
  { name: "Mutton Biryani", orders: 1320, revenue: "₹5,28,000" },
  { name: "Paneer Butter Masala", orders: 980, revenue: "₹2,94,000" },
  { name: "Fish Curry", orders: 760, revenue: "₹2,28,000" },
  { name: "Prawn Masala", orders: 640, revenue: "₹2,56,000" },
  { name: "Veg Biryani", orders: 590, revenue: "₹1,47,500" },
];

const PERIODS = ["7 Days", "30 Days", "3 Months", "6 Months", "Year"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl px-3 py-2 text-xs space-y-1" style={{ background: "#1a0f0a", border: "1px solid rgba(212,175,55,0.3)", color: "#faf6f0" }}>
        <div className="font-semibold" style={{ color: "#d4af37" }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.stroke }} />
            <span style={{ color: "rgba(250,246,240,0.7)" }}>{p.name}:</span>
            <span>{typeof p.value === "number" && p.name === "revenue" ? `₹${(p.value / 1000).toFixed(0)}k` : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 border"
      style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}
    >
      <div className="mb-4">
        <h3 className="font-semibold" style={{ color: "#faf6f0" }}>{title}</h3>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

export default function Analytics() {
  const [activePeriod, setActivePeriod] = useState("7 Days");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Analytics & Insights</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Comprehensive restaurant performance data</p>
        </div>
        <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setActivePeriod(p)}
              className="px-3 py-1.5 text-xs font-medium transition-all"
              style={{ background: activePeriod === p ? "rgba(212,175,55,0.2)" : "transparent", color: activePeriod === p ? "#d4af37" : "rgba(250,246,240,0.4)" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", val: "₹15.2L", sub: "This period", color: "#d4af37" },
          { label: "Total Orders", val: "8,240", sub: "+22% vs last", color: "#60a5fa" },
          { label: "New Customers", val: "1,840", sub: "+15% growth", color: "#4ade80" },
          { label: "Avg Order Value", val: "₹1,843", sub: "+8% increase", color: "#c084fc" },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 border"
            style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.val}</div>
            <div className="text-sm font-medium mt-1" style={{ color: "#faf6f0" }}>{stat.label}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Revenue + Orders */}
      <SectionCard title="Revenue & Customer Growth" subtitle="Monthly trend comparison">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={MONTHLY}>
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4af37" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="custG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.06)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} fill="url(#revG)" name="revenue" />
            <Area yAxisId="right" type="monotone" dataKey="customers" stroke="#60a5fa" strokeWidth={2} fill="url(#custG)" name="customers" />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <SectionCard title="Peak Order Hours" subtitle="Order volume by time of day">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PEAK_HOURS} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.06)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(250,246,240,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Payment Methods */}
        <SectionCard title="Payment Method Breakdown" subtitle="Distribution this period">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={PAYMENT_METHODS} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {PAYMENT_METHODS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {PAYMENT_METHODS.map((pm) => (
                <div key={pm.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: pm.color }} />
                      <span style={{ color: "rgba(250,246,240,0.65)" }}>{pm.name}</span>
                    </div>
                    <span style={{ color: "#faf6f0" }}>{pm.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pm.value}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full" style={{ background: pm.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Type */}
        <SectionCard title="Order Type Distribution" subtitle="Delivery vs Dine-In vs Takeaway">
          <div className="flex items-center justify-around">
            {ORDER_TYPES.map((ot) => (
              <div key={ot.name} className="text-center">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke={ot.color} strokeWidth="3"
                      strokeDasharray={`${ot.value} ${100 - ot.value}`}
                      initial={{ strokeDasharray: "0 100" }}
                      animate={{ strokeDasharray: `${ot.value} ${100 - ot.value}` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base font-bold" style={{ color: ot.color }}>{ot.value}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium mt-2" style={{ color: "#faf6f0" }}>{ot.name}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Top Items */}
        <SectionCard title="Top Selling Items" subtitle="By total orders this period">
          <div className="space-y-3">
            {TOP_ITEMS.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0"
                  style={{ background: i < 3 ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.06)", color: i < 3 ? "#d4af37" : "rgba(250,246,240,0.4)" }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#faf6f0" }}>{item.name}</span>
                    <span style={{ color: "rgba(250,246,240,0.5)" }}>{item.orders}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(item.orders / 1840) * 100}%` }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                      className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #d4af37, #f0c040)" }} />
                  </div>
                </div>
                <span className="text-xs font-medium flex-shrink-0" style={{ color: "#d4af37" }}>{item.revenue}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
