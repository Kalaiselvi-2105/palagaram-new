import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowLeft, Check, CheckCircle2, Copy, Phone, Calendar, Users, ChevronRight, Loader2 } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";

type Step = 1 | 2 | 3 | 4;

const OCCASIONS = ["None", "Birthday", "Anniversary", "Family Gathering", "Business Lunch", "Date Night", "Festival Celebration", "Graduation", "Other"];

// Time slots with some pre-occupied
const ALL_TIMES = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00",
];

// Simulate occupied times
const OCCUPIED_TIMES = new Set(["09:30", "13:00", "15:30", "19:30", "20:30"]);

type SeatingArea = "Family Hall" | "AC Hall" | "Normal Dining";

const SEATING_CONFIG: Record<SeatingArea, {
  desc: string;
  totalTables: number;
  occupiedTables: number[];
}> = {
  "Family Hall":   { desc: "Large round tables for groups", totalTables: 8, occupiedTables: [1, 4, 7] },
  "AC Hall":       { desc: "Quiet dining with air conditioning", totalTables: 10, occupiedTables: [2, 6, 9] },
  "Normal Dining": { desc: "Classic open-air experience", totalTables: 12, occupiedTables: [3, 7, 10, 12] },
};

function generateBookingRef() {
  const now = new Date();
  const d = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const n = Math.floor(1000 + Math.random() * 9000);
  return `PAL-${d}-${n}`;
}

const STEPS = [
  { num: 1, label: "When" },
  { num: 2, label: "Where" },
  { num: 3, label: "Details" },
  { num: 4, label: "Confirmed" },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  guests: number;
  occasion: string;
  requests: string;
};

export default function ReservationPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [seating, setSeating] = useState<SeatingArea>("AC Hall");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [bookingRef] = useState(generateBookingRef);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: { guests: 2, occasion: "None" },
  });
  const watchedGuests = watch("guests", 2);
  const config = SEATING_CONFIG[seating];

  const canStep1Next = selectedDate && selectedTime;
  const canStep2Next = selectedTable !== null;

  const handleStep3Submit = async (data: FormData) => {
    setFormData(data);
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1800));
    setProcessing(false);
    setStep(4);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setSeating("AC Hall");
    setSelectedTable(null);
    setFormData(null);
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-[#2D1A10] overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_#C89B5A14_0%,_transparent_70%)]" />
        {/* Floating leaves decorative */}
        {["🍃", "✦", "🍃", "✦", "🍃"].map((s, i) => (
          <motion.span
            key={i}
            className="absolute text-[#C89B5A]/20 text-2xl pointer-events-none select-none"
            style={{ left: `${10 + i * 22}%`, top: `${15 + (i % 2) * 35}%` }}
            animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {s}
          </motion.span>
        ))}
        <div className="relative z-10 container mx-auto px-6">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">Reserve a Table</span>
            <span className="h-px w-8 bg-[#C89B5A]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F5] mb-4">Reserve a Table</h1>
          <p className="text-[#EADBC8]/60 max-w-md mx-auto">Experience authentic South Indian dining</p>
        </div>
      </section>

      {/* Stepper */}
      <div className="sticky top-16 z-40 bg-white border-b border-[#EADBC8] shadow-sm py-4">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step > s.num ? "bg-[#C89B5A] border-[#C89B5A] text-white"
                    : step === s.num ? "border-[#C89B5A] text-[#C89B5A] bg-white"
                    : "border-[#EADBC8] text-[#4B352A]/30 bg-white"
                  }`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`hidden sm:block text-xs font-semibold transition-colors ${step === s.num ? "text-[#C89B5A]" : step > s.num ? "text-[#4B352A]/60" : "text-[#4B352A]/30"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 transition-all rounded-full ${step > s.num ? "bg-[#C89B5A]" : "bg-[#EADBC8]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="container mx-auto px-6 py-12 max-w-2xl">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: WHEN ─────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#EADBC8]">
                  <h2 className="font-serif font-bold text-2xl text-[#4B352A]">When will you visit?</h2>
                  <p className="text-[#4B352A]/50 text-sm mt-1">Choose your preferred date and time slot</p>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  {/* Date picker */}
                  <div>
                    <label className="text-[#4B352A] text-sm font-semibold uppercase tracking-wider mb-3 block flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C89B5A]" /> Select Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#EADBC8] focus:border-[#C89B5A] rounded-xl text-[#4B352A] outline-none transition-colors text-sm"
                    />
                    {selectedDate && (
                      <p className="text-[#C89B5A] text-xs mt-2 font-medium">
                        {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                    )}
                  </div>

                  {/* Time grid */}
                  <div>
                    <label className="text-[#4B352A] text-sm font-semibold uppercase tracking-wider mb-3 block">Select Time</label>
                    <div className="h-56 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
                      <div className="grid grid-cols-3 gap-1.5">
                        {ALL_TIMES.map(t => {
                          const occupied = OCCUPIED_TIMES.has(t);
                          const selected = selectedTime === t;
                          return (
                            <button
                              key={t}
                              disabled={occupied}
                              onClick={() => setSelectedTime(t)}
                              className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all border ${
                                selected ? "bg-[#C89B5A] border-[#C89B5A] text-white shadow"
                                : occupied ? "border-[#EADBC8] text-[#4B352A]/25 line-through cursor-not-allowed bg-[#F6F0E8]"
                                : "border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] hover:text-[#C89B5A] bg-white"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canStep1Next}
                    className="w-full bg-[#4B352A] hover:bg-[#3a2a1e] text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold disabled:opacity-40"
                  >
                    Choose Your Spot <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: WHERE ─────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#EADBC8] flex items-center gap-3">
                  <button onClick={goBack} className="text-[#4B352A]/50 hover:text-[#C89B5A] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-[#4B352A]">Choose your spot</h2>
                    <p className="text-[#4B352A]/50 text-sm mt-0.5">Select seating area and table</p>
                  </div>
                </div>
                <div className="p-8">
                  {/* Seating area selector */}
                  <p className="text-[#4B352A] text-xs uppercase tracking-widest font-semibold mb-3">Seating Area</p>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {(Object.keys(SEATING_CONFIG) as SeatingArea[]).map(area => (
                      <button
                        key={area}
                        onClick={() => { setSeating(area); setSelectedTable(null); }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${seating === area ? "border-[#C89B5A] bg-[#C89B5A]/8" : "border-[#EADBC8] hover:border-[#C89B5A]/40"}`}
                      >
                        <p className={`font-semibold text-sm ${seating === area ? "text-[#C89B5A]" : "text-[#4B352A]"}`}>{area}</p>
                        <p className="text-[#4B352A]/50 text-xs mt-1 leading-snug">{SEATING_CONFIG[area].desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Table legend */}
                  <div className="flex items-center gap-5 mb-5">
                    <p className="text-[#4B352A] text-xs uppercase tracking-widest font-semibold">Select a Table</p>
                    <div className="flex items-center gap-4 ml-auto">
                      {[
                        { color: "bg-white border-2 border-[#EADBC8]", label: "Available" },
                        { color: "bg-[#C89B5A] border-2 border-[#C89B5A]", label: "Selected" },
                        { color: "bg-[#EADBC8] border-2 border-[#EADBC8]", label: "Occupied" },
                      ].map(l => (
                        <div key={l.label} className="flex items-center gap-1.5">
                          <div className={`w-4 h-4 rounded ${l.color}`} />
                          <span className="text-[#4B352A]/60 text-xs">{l.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Table grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 mb-8">
                    {Array.from({ length: config.totalTables }, (_, i) => i + 1).map(tableNum => {
                      const occupied = config.occupiedTables.includes(tableNum);
                      const selected = selectedTable === tableNum;
                      return (
                        <button
                          key={tableNum}
                          disabled={occupied}
                          onClick={() => setSelectedTable(tableNum)}
                          className={`h-12 rounded-xl text-sm font-bold border-2 transition-all ${
                            selected ? "bg-[#C89B5A] border-[#C89B5A] text-white shadow-md scale-105"
                            : occupied ? "bg-[#EADBC8] border-[#EADBC8] text-[#4B352A]/30 cursor-not-allowed"
                            : "bg-white border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] hover:text-[#C89B5A] hover:scale-105"
                          }`}
                        >
                          {occupied ? "✕" : `T${tableNum}`}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canStep2Next}
                    className="w-full bg-[#4B352A] hover:bg-[#3a2a1e] text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold disabled:opacity-40"
                  >
                    Add Guest Details <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: GUEST DETAILS ─────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#EADBC8] flex items-center gap-3">
                  <button onClick={goBack} className="text-[#4B352A]/50 hover:text-[#C89B5A] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-[#4B352A]">Guest Details</h2>
                    <p className="text-[#4B352A]/50 text-sm mt-0.5">{seating} · Table {selectedTable} · {selectedTime} on {selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(handleStep3Submit)} className="p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#4B352A] text-sm font-semibold mb-2 block">Full Name *</Label>
                      <Input {...register("name", { required: true })} placeholder="Priya Rajagopal" className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.name ? "border-red-400" : ""}`} />
                    </div>
                    <div>
                      <Label className="text-[#4B352A] text-sm font-semibold mb-2 block">Phone Number *</Label>
                      <Input {...register("phone", { required: true })} placeholder="+91 98765 43210" className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.phone ? "border-red-400" : ""}`} />
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#4B352A] text-sm font-semibold mb-2 block">Email Address <span className="text-[#4B352A]/40 font-normal">(Optional)</span></Label>
                    <Input {...register("email")} type="email" placeholder="priya@email.com" className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#4B352A] text-sm font-semibold mb-2 block flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C89B5A]" /> Number of Guests
                      </Label>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setValue("guests", Math.max(1, watchedGuests - 1))}
                          className="w-10 h-10 rounded-full border-2 border-[#EADBC8] flex items-center justify-center text-[#4B352A] hover:border-[#C89B5A] font-bold text-lg">−</button>
                        <span className="w-10 text-center font-bold text-xl text-[#4B352A]">{watchedGuests}</span>
                        <button type="button" onClick={() => setValue("guests", Math.min(20, watchedGuests + 1))}
                          className="w-10 h-10 rounded-full border-2 border-[#EADBC8] flex items-center justify-center text-[#4B352A] hover:border-[#C89B5A] font-bold text-lg">+</button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-[#4B352A] text-sm font-semibold mb-2 block">Occasion</Label>
                      <select {...register("occasion")} className="w-full px-3 py-2.5 border-2 border-[#EADBC8] focus:border-[#C89B5A] rounded-xl text-[#4B352A] text-sm outline-none bg-white">
                        {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-[#4B352A] text-sm font-semibold mb-2 block">Special Requests <span className="text-[#4B352A]/40 font-normal">(Optional)</span></Label>
                    <Textarea {...register("requests")} placeholder="Dietary requirements, high chair needed, birthday cake arrangement..." className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl resize-none" rows={3} />
                  </div>

                  <Button type="submit" disabled={processing} className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
                    {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Confirming…</> : <>Confirm Reservation <CheckCircle2 className="w-4 h-4" /></>}
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: CONFIRMATION ──────────────────────────────────── */}
          {step === 4 && formData && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
              <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-sm overflow-hidden text-center">
                <div className="px-8 py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h2 className="font-serif font-bold text-3xl text-[#4B352A] mb-3">Reservation Confirmed!</h2>
                  <p className="text-[#4B352A]/60 mb-8 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-[#4B352A]">{formData.name}</span>. Your table is reserved. We've sent a confirmation SMS to <span className="font-semibold">{formData.phone}</span>.
                  </p>

                  {/* Booking reference */}
                  <div className="bg-[#F6F0E8] rounded-2xl p-5 mb-6">
                    <p className="text-[#4B352A]/50 text-xs uppercase tracking-widest mb-2">Booking Reference</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-mono font-bold text-2xl text-[#4B352A] tracking-widest">{bookingRef}</span>
                      <button onClick={copyRef} className="w-8 h-8 rounded-lg bg-white border border-[#EADBC8] flex items-center justify-center hover:border-[#C89B5A] transition-colors">
                        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#4B352A]/50" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary table */}
                  <div className="text-left space-y-0 rounded-2xl border border-[#EADBC8] overflow-hidden mb-8">
                    {[
                      { label: "Date & Time", value: `${selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long" })} at ${selectedTime}` },
                      { label: "Guests", value: `${formData.guests} ${formData.guests === 1 ? "Person" : "People"}` },
                      { label: "Seating", value: `${seating} (Table ${selectedTable})` },
                      ...(formData.occasion && formData.occasion !== "None" ? [{ label: "Occasion", value: formData.occasion }] : []),
                    ].map((r, i) => (
                      <div key={i} className={`flex justify-between items-center px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F5]"}`}>
                        <span className="text-[#4B352A]/50 text-sm">{r.label}</span>
                        <span className="text-[#4B352A] font-semibold text-sm text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/menu" className="flex-1">
                      <Button className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full font-semibold">
                        Order Food in Advance
                      </Button>
                    </Link>
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-full">
                        Back to Home
                      </Button>
                    </Link>
                  </div>

                  <button onClick={reset} className="mt-4 text-[#4B352A]/40 text-xs hover:text-[#4B352A] transition-colors">
                    Make another reservation
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-[#C89B5A]/10 border border-[#C89B5A]/20 rounded-2xl p-4 flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C89B5A] flex-shrink-0 mt-0.5" />
                <p className="text-[#4B352A] text-sm">We'll call to confirm within 30 minutes. For any changes, call us at <span className="font-semibold text-[#C89B5A]">+91 98765 43210</span></p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
