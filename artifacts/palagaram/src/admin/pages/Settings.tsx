import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Upload, MapPin, Phone, Mail, Globe, Clock, ChefHat, Instagram, Facebook, Twitter } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type HoursMap = Record<string, { open: string; close: string; closed: boolean }>;

const DEFAULT_HOURS: HoursMap = {
  Monday: { open: "11:00", close: "23:00", closed: false },
  Tuesday: { open: "11:00", close: "23:00", closed: false },
  Wednesday: { open: "11:00", close: "23:00", closed: false },
  Thursday: { open: "11:00", close: "23:00", closed: false },
  Friday: { open: "11:00", close: "23:30", closed: false },
  Saturday: { open: "10:30", close: "23:30", closed: false },
  Sunday: { open: "10:30", close: "22:00", closed: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border p-5"
      style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
      <h3 className="text-sm font-semibold mb-4 pb-3 border-b uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)", borderColor: "rgba(212,175,55,0.1)" }}>{title}</h3>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: "rgba(212,175,55,0.6)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(212,175,55,0.15)",
  color: "#faf6f0",
  borderRadius: "0.75rem",
  padding: "0.625rem 0.875rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
};

export default function Settings() {
  const [hours, setHours] = useState<HoursMap>(DEFAULT_HOURS);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateHours = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Restaurant Settings</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Configure your restaurant profile and preferences</p>
        </div>
        <motion.button onClick={handleSave} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: saved ? "rgba(34,197,94,0.3)" : "linear-gradient(135deg, #d4af37, #f0c040)", color: saved ? "#4ade80" : "#1a0f0a" }}>
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </motion.button>
      </div>

      {/* Restaurant Info */}
      <Section title="Restaurant Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Restaurant Name">
            <input style={inputStyle} defaultValue="Palagaram Restaurant"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
          <Field label="Tagline">
            <input style={inputStyle} defaultValue="Authentic South Indian Cuisine"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
          <Field label="Phone Number">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
              <input style={{ ...inputStyle, paddingLeft: "2.5rem" }} defaultValue="+91 98765 43210"
                onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
            </div>
          </Field>
          <Field label="Email Address">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
              <input style={{ ...inputStyle, paddingLeft: "2.5rem" }} defaultValue="info@palagaram.com"
                onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
            </div>
          </Field>
          <div className="md:col-span-2">
            <Field label="Address">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
                <textarea style={{ ...inputStyle, paddingLeft: "2.5rem", resize: "none" }} rows={2}
                  defaultValue="45, Anna Nagar West, Chennai - 600040, Tamil Nadu"
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
              </div>
            </Field>
          </div>
          <Field label="Website">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
              <input style={{ ...inputStyle, paddingLeft: "2.5rem" }} defaultValue="www.palagaram.com"
                onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
            </div>
          </Field>
          <Field label="GSTIN">
            <input style={inputStyle} defaultValue="33AABCP1234R1ZX" placeholder="GST Number"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
        </div>
      </Section>

      {/* Branding */}
      <Section title="Branding & Media">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Restaurant Logo", desc: "PNG/SVG recommended (512×512px)" },
            { label: "Cover Banner", desc: "JPG/PNG (1920×600px recommended)" },
            { label: "Favicon", desc: "ICO/PNG (32×32px)" },
          ].map((item) => (
            <div key={item.label}>
              <Field label={item.label}>
                <motion.div whileHover={{ borderColor: "rgba(212,175,55,0.5)" }}
                  className="rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-all"
                  style={{ borderColor: "rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.02)" }}>
                  <Upload className="w-6 h-6" style={{ color: "rgba(212,175,55,0.4)" }} />
                  <span className="text-xs" style={{ color: "rgba(212,175,55,0.4)" }}>Upload</span>
                  <span className="text-xs text-center" style={{ color: "rgba(250,246,240,0.3)" }}>{item.desc}</span>
                </motion.div>
              </Field>
            </div>
          ))}
        </div>
      </Section>

      {/* Opening Hours */}
      <Section title="Opening Hours">
        <div className="space-y-2">
          {DAYS.map((day) => {
            const h = hours[day];
            return (
              <div key={day} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(212,175,55,0.06)" }}>
                <div className="w-24 text-sm font-medium" style={{ color: h.closed ? "rgba(250,246,240,0.3)" : "#faf6f0" }}>{day.slice(0, 3)}</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div onClick={() => updateHours(day, "closed", !h.closed)}
                    className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
                    style={{ background: !h.closed ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.3)" }}>
                    <motion.div animate={{ x: !h.closed ? 16 : 2 }} className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow" />
                  </div>
                  <span className="text-xs" style={{ color: h.closed ? "#f87171" : "#4ade80" }}>{h.closed ? "Closed" : "Open"}</span>
                </label>
                {!h.closed && (
                  <div className="flex items-center gap-2 flex-1">
                    <input type="time" value={h.open} onChange={(e) => updateHours(day, "open", e.target.value)}
                      className="flex-1 rounded-lg px-2 py-1 text-xs outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }} />
                    <span className="text-xs" style={{ color: "rgba(250,246,240,0.3)" }}>to</span>
                    <input type="time" value={h.close} onChange={(e) => updateHours(day, "close", e.target.value)}
                      className="flex-1 rounded-lg px-2 py-1 text-xs outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Social Links */}
      <Section title="Social Media Links">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Instagram", icon: Instagram, placeholder: "@palagaram_restaurant" },
            { label: "Facebook", icon: Facebook, placeholder: "facebook.com/palagaram" },
            { label: "Twitter / X", icon: Twitter, placeholder: "@palagaram" },
          ].map((s) => (
            <Field key={s.label} label={s.label}>
              <div className="relative">
                <s.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
                <input style={{ ...inputStyle, paddingLeft: "2.5rem" }} placeholder={s.placeholder}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
              </div>
            </Field>
          ))}
        </div>
      </Section>

      {/* Tax Settings */}
      <Section title="Tax & Billing Settings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="GST Rate (%)">
            <input style={inputStyle} type="number" defaultValue="5"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
          <Field label="Service Charge (%)">
            <input style={inputStyle} type="number" defaultValue="0"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
          <Field label="Delivery Charge (₹)">
            <input style={inputStyle} type="number" defaultValue="40"
              onFocus={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212,175,55,0.15)")} />
          </Field>
        </div>
      </Section>
    </div>
  );
}
