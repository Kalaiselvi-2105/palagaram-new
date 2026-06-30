import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Clock, CheckCircle2, CreditCard, Smartphone, Banknote, ChevronRight, Calendar, Users, User, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  requests: string;
};

type PaymentMethod = "upi" | "card" | "cash" | null;
type Step = 1 | 2 | 3 | 4;

function generateBookingId() {
  return "PLG" + Date.now().toString(36).toUpperCase().slice(-6);
}

const TIME_SLOTS = [
  "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "12:00 PM", "12:30 PM", "01:00 PM",
  "01:30 PM", "02:00 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
  "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM",
];

const OCCASIONS = ["None", "Birthday", "Anniversary", "Family Gathering", "Business Lunch", "Date Night", "Festival Celebration", "Other"];

export function Reservation() {
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [processing, setProcessing] = useState(false);
  const [bookingId] = useState(generateBookingId);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();

  const watchedGuests = watch("guests", "2");

  const onStep1Submit = (data: FormData) => {
    setFormData({ ...data, time: selectedTime });
    setStep(2);
  };

  const handlePayment = async () => {
    if (!paymentMethod) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    setStep(4);
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setStep(1);
    setPaymentMethod(null);
    setFormData(null);
    setSelectedTime("");
  };

  const steps = [
    { label: "Details", num: 1 },
    { label: "Review", num: 2 },
    { label: "Payment", num: 3 },
    { label: "Confirmed", num: 4 },
  ];

  return (
    <section id="contact" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C89B5A]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EADBC8] to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">Reserve Your Table</span>
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-serif font-bold text-[#4B352A]">
            Join Us for a Meal
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-8">
            <p className="text-[#4B352A]/70 text-lg leading-relaxed">
              Whether you're planning a family celebration, a quiet morning breakfast, or a business lunch — we'll have your table ready and your filter coffee waiting.
            </p>

            {[
              { icon: MapPin, label: "Location", value: "Main Road, Chidambaram,\nTamil Nadu 608001" },
              { icon: Phone, label: "Reservations", value: "+91 98765 43210" },
              { icon: Clock, label: "Open Daily", value: "6:00 AM – 10:30 PM\nAll Days, All Year" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-[#C89B5A]/12 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#C89B5A]" />
                </div>
                <div>
                  <p className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold mb-1">{item.label}</p>
                  <p className="text-[#4B352A] font-medium whitespace-pre-line">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Stepper indicator (desktop) */}
            <div className="hidden lg:block pt-6 border-t border-[#EADBC8]">
              <p className="text-[#4B352A]/50 text-xs uppercase tracking-widest mb-4 font-semibold">Booking Progress</p>
              <div className="flex flex-col gap-3">
                {steps.map((s) => (
                  <div key={s.num} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      step > s.num ? "bg-[#C89B5A] border-[#C89B5A] text-white" :
                      step === s.num ? "border-[#C89B5A] text-[#C89B5A] bg-white" :
                      "border-[#EADBC8] text-[#4B352A]/30 bg-white"
                    }`}>
                      {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                    </div>
                    <span className={`text-sm font-medium ${step === s.num ? "text-[#4B352A]" : step > s.num ? "text-[#C89B5A]" : "text-[#4B352A]/40"}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-8 bg-[#C89B5A]/40" />
                <span className="text-[#4B352A]/50 text-sm italic font-serif">"Come as a guest, leave as family."</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Multi-step form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            {/* Mobile step indicator */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    step > s.num ? "bg-[#C89B5A] border-[#C89B5A] text-white" :
                    step === s.num ? "border-[#C89B5A] text-[#C89B5A] bg-white" :
                    "border-[#EADBC8] text-[#4B352A]/30 bg-white"
                  }`}>
                    {step > s.num ? <Check className="w-3 h-3" /> : s.num}
                  </div>
                  {i < steps.length - 1 && <div className={`h-px flex-1 w-8 transition-all ${step > s.num ? "bg-[#C89B5A]" : "bg-[#EADBC8]"}`} />}
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#EADBC8] rounded-3xl shadow-lg overflow-hidden">
              <AnimatePresence mode="wait">

                {/* STEP 1: DETAILS */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="bg-[#4B352A] px-8 py-5">
                      <h3 className="text-[#FAF8F5] font-serif font-bold text-xl">Your Details</h3>
                      <p className="text-[#EADBC8]/60 text-sm">Step 1 of 3 — Tell us about your visit</p>
                    </div>
                    <form onSubmit={handleSubmit(onStep1Submit)} className="p-8 space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-[#4B352A] text-sm font-medium">Full Name *</Label>
                          <Input id="name" placeholder="Priya Rajagopal" {...register("name", { required: true })} className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.name ? "border-red-400" : ""}`} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-[#4B352A] text-sm font-medium">Phone *</Label>
                          <Input id="phone" placeholder="+91 98765 43210" {...register("phone", { required: true })} className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.phone ? "border-red-400" : ""}`} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[#4B352A] text-sm font-medium">Email <span className="text-[#4B352A]/40 font-normal">(for confirmation)</span></Label>
                        <Input id="email" type="email" placeholder="priya@email.com" {...register("email")} className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="date" className="text-[#4B352A] text-sm font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C89B5A]" /> Date *
                          </Label>
                          <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} {...register("date", { required: true })} className={`border-[#EADBC8] focus:border-[#C89B5A] rounded-xl ${errors.date ? "border-red-400" : ""}`} />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#4B352A] text-sm font-medium flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C89B5A]" /> Time *
                          </Label>
                          <select
                            value={selectedTime}
                            onChange={e => setSelectedTime(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#EADBC8] focus:border-[#C89B5A] rounded-xl text-[#4B352A] text-sm outline-none focus:ring-2 focus:ring-[#C89B5A]/15 bg-white"
                          >
                            <option value="">Select time</option>
                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[#4B352A] text-sm font-medium flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#C89B5A]" /> Number of Guests *
                        </Label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => { const v = Math.max(1, parseInt(watchedGuests || "2") - 1); setValue("guests", String(v)); }} className="w-10 h-10 rounded-full border border-[#EADBC8] flex items-center justify-center text-[#4B352A] hover:border-[#C89B5A] transition-colors font-bold text-lg">−</button>
                          <input type="number" min="1" max="50" {...register("guests", { required: true, min: 1, max: 50 })} className="w-20 text-center border border-[#EADBC8] focus:border-[#C89B5A] rounded-xl py-2 text-[#4B352A] font-semibold text-lg outline-none" />
                          <button type="button" onClick={() => { const v = Math.min(50, parseInt(watchedGuests || "2") + 1); setValue("guests", String(v)); }} className="w-10 h-10 rounded-full border border-[#EADBC8] flex items-center justify-center text-[#4B352A] hover:border-[#C89B5A] transition-colors font-bold text-lg">+</button>
                          <span className="text-[#4B352A]/50 text-sm">guests</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="occasion" className="text-[#4B352A] text-sm font-medium">Occasion</Label>
                        <select {...register("occasion")} className="w-full px-3 py-2 border border-[#EADBC8] focus:border-[#C89B5A] rounded-xl text-[#4B352A] text-sm outline-none focus:ring-2 focus:ring-[#C89B5A]/15 bg-white">
                          {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="requests" className="text-[#4B352A] text-sm font-medium">Special Requests <span className="text-[#4B352A]/40 font-normal">(optional)</span></Label>
                        <Textarea id="requests" placeholder="Dietary needs, seating preferences, allergies..." {...register("requests")} className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl resize-none" rows={3} />
                      </div>

                      <Button type="submit" disabled={!selectedTime} className="w-full bg-[#4B352A] hover:bg-[#3a2a1e] text-white rounded-xl py-3 text-base font-semibold flex items-center justify-center gap-2">
                        Review Booking <ChevronRight className="w-4 h-4" />
                      </Button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 2: REVIEW */}
                {step === 2 && formData && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="bg-[#4B352A] px-8 py-5">
                      <h3 className="text-[#FAF8F5] font-serif font-bold text-xl">Review Your Booking</h3>
                      <p className="text-[#EADBC8]/60 text-sm">Step 2 of 3 — Confirm your details</p>
                    </div>
                    <div className="p-8">
                      <div className="bg-[#F6F0E8] rounded-2xl p-6 space-y-4 mb-6">
                        {[
                          { label: "Name", value: formData.name, icon: User },
                          { label: "Phone", value: formData.phone, icon: Phone },
                          ...(formData.email ? [{ label: "Email", value: formData.email, icon: null }] : []),
                          { label: "Date", value: new Date(formData.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), icon: Calendar },
                          { label: "Time", value: formData.time, icon: Clock },
                          { label: "Guests", value: `${formData.guests} ${parseInt(formData.guests) === 1 ? "Guest" : "Guests"}`, icon: Users },
                          ...(formData.occasion && formData.occasion !== "None" ? [{ label: "Occasion", value: formData.occasion, icon: null }] : []),
                          ...(formData.requests ? [{ label: "Special Requests", value: formData.requests, icon: null }] : []),
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-[#4B352A]/40 text-xs uppercase tracking-wider font-semibold w-24 flex-shrink-0 pt-0.5">{item.label}</span>
                            <span className="text-[#4B352A] font-medium text-sm flex-1">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-[#C89B5A]/10 border border-[#C89B5A]/25 rounded-xl p-4 mb-6">
                        <p className="text-[#4B352A] text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C89B5A] flex-shrink-0" />
                          We'll call to confirm your reservation within 30 minutes of booking.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-xl flex items-center justify-center gap-2">
                          <ArrowLeft className="w-4 h-4" /> Edit
                        </Button>
                        <Button onClick={() => setStep(3)} className="flex-1 bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-xl flex items-center justify-center gap-2 font-semibold">
                          Proceed to Payment <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="bg-[#4B352A] px-8 py-5">
                      <h3 className="text-[#FAF8F5] font-serif font-bold text-xl">Choose Payment</h3>
                      <p className="text-[#EADBC8]/60 text-sm">Step 3 of 3 — Secure your table</p>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between bg-[#F6F0E8] rounded-xl px-5 py-3 mb-6">
                        <span className="text-[#4B352A]/60 text-sm">Table Reservation Fee</span>
                        <span className="text-[#4B352A] font-bold text-xl">₹99 <span className="text-xs font-normal text-[#4B352A]/40">(adjustable at bill)</span></span>
                      </div>

                      <p className="text-[#4B352A]/60 text-sm mb-4 font-medium uppercase tracking-wider">Select Payment Method</p>

                      <div className="space-y-3 mb-8">
                        {[
                          { id: "upi" as const, icon: Smartphone, label: "UPI Payment", sub: "Google Pay, PhonePe, Paytm, BHIM" },
                          { id: "card" as const, icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                          { id: "cash" as const, icon: Banknote, label: "Pay at Restaurant", sub: "Cash on arrival — no fee now" },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setPaymentMethod(opt.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                              paymentMethod === opt.id
                                ? "border-[#C89B5A] bg-[#C89B5A]/8"
                                : "border-[#EADBC8] hover:border-[#C89B5A]/50 bg-white"
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${paymentMethod === opt.id ? "bg-[#C89B5A] text-white" : "bg-[#F6F0E8] text-[#4B352A]"}`}>
                              <opt.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[#4B352A] font-semibold text-sm">{opt.label}</p>
                              <p className="text-[#4B352A]/50 text-xs">{opt.sub}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === opt.id ? "border-[#C89B5A]" : "border-[#EADBC8]"}`}>
                              {paymentMethod === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#C89B5A]" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* UPI details */}
                      <AnimatePresence>
                        {paymentMethod === "upi" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                            <div className="bg-[#F6F0E8] rounded-2xl p-5 flex flex-col items-center gap-3">
                              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center border border-[#EADBC8] p-2">
                                <div className="w-full h-full bg-[#4B352A] rounded-lg flex items-center justify-center">
                                  <span className="text-[#C89B5A] font-serif font-bold text-lg">QR</span>
                                </div>
                              </div>
                              <p className="text-[#4B352A] font-semibold text-sm">palagaram@upi</p>
                              <p className="text-[#4B352A]/50 text-xs text-center">Scan with any UPI app or pay to the UPI ID above</p>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "card" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                            <div className="space-y-3">
                              <div>
                                <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Card Number</Label>
                                <Input placeholder="1234 5678 9012 3456" maxLength={19} className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl font-mono" />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">Expiry</Label>
                                  <Input placeholder="MM / YY" maxLength={7} className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl font-mono" />
                                </div>
                                <div>
                                  <Label className="text-[#4B352A] text-sm font-medium mb-1.5 block">CVV</Label>
                                  <Input placeholder="•••" maxLength={4} type="password" className="border-[#EADBC8] focus:border-[#C89B5A] rounded-xl font-mono" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {paymentMethod === "cash" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                              <p className="text-green-800 text-sm flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                                No advance payment required. Your table will be reserved and payment collected on arrival. Please arrive within 10 minutes of your slot.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setStep(2)} className="border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-xl flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={handlePayment}
                          disabled={!paymentMethod || processing}
                          className="flex-1 bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {processing ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                          ) : paymentMethod === "cash" ? (
                            "Confirm Reservation"
                          ) : (
                            <>Pay ₹99 & Confirm</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONFIRMATION */}
                {step === 4 && formData && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                    <div className="p-10 flex flex-col items-center text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 14, stiffness: 180, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </motion.div>

                      <h3 className="font-serif font-bold text-2xl text-[#4B352A] mb-2">Table Reserved!</h3>
                      <p className="text-[#4B352A]/60 mb-6 text-sm max-w-xs">
                        Your table at Palagaram has been successfully reserved. See you soon!
                      </p>

                      <div className="w-full bg-[#F6F0E8] rounded-2xl p-5 mb-6">
                        <p className="text-[#4B352A]/50 text-xs uppercase tracking-widest mb-2">Booking Reference</p>
                        <div className="flex items-center justify-center gap-3">
                          <span className="font-mono font-bold text-2xl text-[#4B352A] tracking-widest">{bookingId}</span>
                          <button onClick={copyBookingId} className="w-8 h-8 rounded-lg bg-white border border-[#EADBC8] flex items-center justify-center hover:border-[#C89B5A] transition-colors">
                            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#4B352A]/50" />}
                          </button>
                        </div>
                      </div>

                      <div className="w-full space-y-2 mb-8 text-left">
                        {[
                          { label: "Name", value: formData.name },
                          { label: "Date", value: new Date(formData.date).toLocaleDateString("en-IN", { weekday: "short", month: "long", day: "numeric" }) },
                          { label: "Time", value: formData.time },
                          { label: "Guests", value: `${formData.guests} guests` },
                        ].map((r, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-[#EADBC8] last:border-0">
                            <span className="text-[#4B352A]/50 text-sm">{r.label}</span>
                            <span className="text-[#4B352A] font-medium text-sm">{r.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <Button onClick={resetForm} variant="outline" className="w-full border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] rounded-xl">
                          Make Another Reservation
                        </Button>
                        <a href="tel:+919876543210" className="w-full">
                          <Button className="w-full bg-[#4B352A] hover:bg-[#3a2a1e] text-white rounded-xl flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" /> Call Us
                          </Button>
                        </a>
                      </div>

                      <p className="text-[#4B352A]/40 text-xs mt-4">We'll call to confirm within 30 minutes.</p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
