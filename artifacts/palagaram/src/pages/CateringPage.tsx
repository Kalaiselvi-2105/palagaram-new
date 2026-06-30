import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Check, Star, Phone, MapPin, Clock,
  ChefHat, Leaf, Award, Users, Heart, Zap, Shield, Sparkles,
  MessageCircle, ExternalLink, Download, ArrowRight, Play,
  UtensilsCrossed, Coffee, IceCream, Soup, Salad, Cake
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Link } from "wouter";

/* ─────────────────────────── ANIMATION VARIANTS ─────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};
const slideIn = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3 } }),
};

/* ─────────────────────────── WIZARD DATA ──────────────────────────────── */
const EVENT_TYPES = [
  { label: "Wedding", emoji: "💍", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80", rec: "Royal Package" },
  { label: "Reception", emoji: "🥂", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80", rec: "Gold Package" },
  { label: "Engagement", emoji: "💐", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80", rec: "Premium Package" },
  { label: "Birthday Party", emoji: "🎂", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80", rec: "Silver Package" },
  { label: "House Warming", emoji: "🏡", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", rec: "Silver Package" },
  { label: "Corporate Event", emoji: "🏢", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", rec: "Corporate Package" },
  { label: "Temple Function", emoji: "🙏", img: "https://images.unsplash.com/photo-1545579133-99bb5ad189be?w=400&q=80", rec: "Satvik Package" },
  { label: "School / College", emoji: "🎓", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80", rec: "Economy Package" },
  { label: "Baby Shower", emoji: "👶", img: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=400&q=80", rec: "Silver Package" },
  { label: "Anniversary", emoji: "🌹", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80", rec: "Premium Package" },
  { label: "Outdoor Catering", emoji: "🌿", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", rec: "Custom Quote" },
  { label: "Other", emoji: "✨", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", rec: "Custom Quote" },
];

const FOOD_TYPES = [
  { label: "Pure Veg", desc: "Traditional pure vegetarian", icon: "🥗" },
  { label: "Brahmin Style", desc: "No onion, no garlic", icon: "🍃" },
  { label: "South Indian Trad.", desc: "Authentic regional cuisine", icon: "🍛" },
  { label: "North Indian", desc: "Paneer, dal makhani & more", icon: "🍲" },
  { label: "Multi Cuisine", desc: "Best of all regions", icon: "🌍" },
  { label: "Jain Food", desc: "Strictly Jain preparation", icon: "🌱" },
  { label: "Breakfast Only", desc: "Idli, dosa, vada spread", icon: "🌅" },
  { label: "Lunch", desc: "Full afternoon thali", icon: "☀️" },
  { label: "Dinner", desc: "Evening grand feast", icon: "🌙" },
  { label: "Snacks & Tea", desc: "Tiffin & beverages", icon: "☕" },
  { label: "Custom Menu", desc: "Design your own menu", icon: "✏️" },
];

const GUEST_SNAPS = [10, 25, 50, 100, 250, 500, 1000, 2000];
const GUEST_LABELS: Record<number, { label: string; tag: string; color: string }> = {
  10: { label: "Intimate Gathering", tag: "Up to 10 guests", color: "#8B7355" },
  25: { label: "Family Celebration", tag: "Up to 25 guests", color: "#9B8B5A" },
  50: { label: "Cozy Event", tag: "Up to 50 guests", color: "#C89B5A" },
  100: { label: "Social Gathering", tag: "Up to 100 guests", color: "#C89B5A" },
  250: { label: "Grand Celebration", tag: "Up to 250 guests", color: "#B8860B" },
  500: { label: "Major Event", tag: "Up to 500 guests", color: "#DAA520" },
  1000: { label: "Large Wedding Scale", tag: "Up to 1000 guests", color: "#FFD700" },
  2000: { label: "Mega Event Scale", tag: "2000+ guests", color: "#FFD700" },
};

const BUDGETS = [
  {
    tier: "Economy",
    range: "₹120 – ₹180",
    unit: "per head",
    icon: "🌿",
    color: "#8B7355",
    features: ["Welcome drink", "Rice + 2 curries", "Sambar & rasam", "1 Dessert", "Buttermilk"],
  },
  {
    tier: "Premium",
    range: "₹200 – ₹280",
    unit: "per head",
    icon: "⭐",
    color: "#C89B5A",
    features: ["2 Welcome drinks", "Rice + 4 curries", "3 Starters", "2 Desserts", "Payasam", "Filter coffee"],
    popular: true,
  },
  {
    tier: "Luxury",
    range: "₹320 – ₹450",
    unit: "per head",
    icon: "💎",
    color: "#DAA520",
    features: ["Mocktail bar", "6 Starters", "Rice + 6 curries", "Live counter", "3 Desserts", "Banana leaf service"],
  },
  {
    tier: "Royal",
    range: "Custom",
    unit: "quote",
    icon: "👑",
    color: "#B8860B",
    features: ["Everything in Luxury", "2 Live counters", "Celebrity chef option", "Dedicated team", "Full decor setup", "Priority support"],
  },
];

const LIVE_COUNTERS = [
  { label: "Live Dosa", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80", icon: "🫓" },
  { label: "Live Chaat", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80", icon: "🥙" },
  { label: "Live Idli", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80", icon: "⚪" },
  { label: "Live Parotta", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80", icon: "🫔" },
  { label: "Sweet Counter", img: "https://images.unsplash.com/photo-1555198132-b16f946a4d83?w=300&q=80", icon: "🍮" },
  { label: "Filter Coffee", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80", icon: "☕" },
  { label: "Fresh Juice", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80", icon: "🍹" },
  { label: "Ice Cream", img: "https://images.unsplash.com/photo-1567206563114-c179706c1b97?w=300&q=80", icon: "🍦" },
  { label: "Mini Tiffin", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&q=80", icon: "🥘" },
];

const ADD_SERVICES = [
  { label: "Flower Decoration", icon: "🌸" },
  { label: "Serving Staff", icon: "🤵" },
  { label: "Banana Leaf Setup", icon: "🍃" },
  { label: "Table Arrangement", icon: "🪑" },
  { label: "Welcome Drinks", icon: "🥤" },
  { label: "Return Gifts", icon: "🎁" },
  { label: "Photography", icon: "📸" },
  { label: "Sound System", icon: "🎵" },
];

const STEPS = [
  "Event Type", "Food Style", "Guest Count", "Budget",
  "Live Counters", "Add-ons", "Your Details", "Summary",
];

/* ─────────────────────────── STATIC SECTION DATA ─────────────────────── */
const WHY_US = [
  { icon: <Award className="w-6 h-6" />, title: "38+ Years of Trust", desc: "Since 1985, serving Tamil Nadu's most memorable celebrations." },
  { icon: <Leaf className="w-6 h-6" />, title: "100% Pure Vegetarian", desc: "Strictly Saatvik. No onion-garlic options available on request." },
  { icon: <ChefHat className="w-6 h-6" />, title: "Expert Chef Team", desc: "Trained masters of authentic South Indian culinary tradition." },
  { icon: <Users className="w-6 h-6" />, title: "Any Scale Event", desc: "20 to 5000+ guests — we handle every scale with equal care." },
  { icon: <Shield className="w-6 h-6" />, title: "Food Safety Certified", desc: "FSSAI certified kitchen with daily-fresh ingredient sourcing." },
  { icon: <Zap className="w-6 h-6" />, title: "On-Time Guarantee", desc: "Punctual delivery and setup — your event, never delayed." },
  { icon: <Star className="w-6 h-6" />, title: "2000+ Events Catered", desc: "An unmatched portfolio of weddings, corporates, and festivals." },
  { icon: <Heart className="w-6 h-6" />, title: "Personalised Menus", desc: "Every menu crafted to your event, tradition, and preferences." },
];

const TIMELINE = [
  { step: "01", title: "Enquiry", desc: "Share your event details. We respond within 2 hours.", icon: "📞" },
  { step: "02", title: "Planning Session", desc: "On-call or in-person consultation with our catering manager.", icon: "📋" },
  { step: "03", title: "Menu Finalization", desc: "Custom menu designed, tasted (optional), and confirmed.", icon: "🍽️" },
  { step: "04", title: "Event Day", desc: "Full setup, live counters, serving staff — we handle everything.", icon: "🎉" },
  { step: "05", title: "Follow-Up", desc: "Post-event feedback and loyalty program enrollment.", icon: "💌" },
];

const TESTIMONIALS = [
  { name: "Kavitha Sundaram", event: "Wedding", rating: 5, initials: "KS", quote: "The banana leaf sadhya they served was absolutely divine. Our 800 guests couldn't stop praising the food. Palagaram made our wedding legendary." },
  { name: "Rajesh Krishnan", event: "Corporate Event", rating: 5, initials: "RK", quote: "Organised lunch for 300 employees. Every dish was piping hot, served on time, and the quality was exceptional. Will book them again." },
  { name: "Meena Annamalai", event: "House Warming", rating: 5, initials: "MA", quote: "The live dosa and filter coffee counters were a hit! Guests kept going back for seconds. Truly a premium catering experience." },
  { name: "Siva Prasad", event: "Anniversary", rating: 5, initials: "SP", quote: "Palagaram catered our 25th anniversary dinner. The customised menu, the presentation, the staff — everything was world-class." },
];

const GALLERY_IMGS = [
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80", label: "Grand Wedding Feast", tall: true },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80", label: "Buffet Spread", tall: false },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80", label: "Live Dosa Counter", tall: false },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", label: "Signature Dishes", tall: true },
  { src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80", label: "Banana Leaf Sadhya", tall: false },
  { src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80", label: "Live Kitchen", tall: false },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80", label: "Celebration Setup", tall: true },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", label: "Corporate Catering", tall: false },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80", label: "Event Experience", tall: false },
];

const PACKAGES = [
  {
    name: "Wedding Package",
    guests: "100–2000+ guests",
    color: "#C89B5A",
    icon: "💍",
    highlights: ["Welcome mocktail bar", "Full banana leaf sadhya", "4 live counters", "Dedicated serving team", "Post-event cleanup"],
  },
  {
    name: "Corporate Package",
    guests: "50–500 guests",
    color: "#4B352A",
    icon: "🏢",
    popular: true,
    highlights: ["Quick service setup", "Breakfast / lunch / dinner", "Live filter coffee counter", "Hygiene-certified staff", "Invoice & GST billing"],
  },
  {
    name: "Festival Package",
    guests: "20–300 guests",
    color: "#2D1A10",
    icon: "🪔",
    highlights: ["Satvik no-onion menu", "Traditional banana leaf", "Payasam & sweets", "Temple-style prasad setup", "Flexible guest count"],
  },
];

const FAQS = [
  { q: "What is the minimum guest count for catering?", a: "We cater from as few as 20 guests for intimate family functions to 5000+ for grand wedding events." },
  { q: "How far in advance should I book?", a: "We recommend 2–4 weeks for small events, and 2–3 months for weddings and large events to ensure full availability." },
  { q: "Do you cater outside Chidambaram?", a: "Yes — we serve across Cuddalore district and surrounding areas. Travel charges apply for venues beyond 50 km." },
  { q: "Can I get a fully customised menu?", a: "Absolutely. Every menu is designed from scratch based on your preferences, region, tradition, and dietary requirements." },
  { q: "Are live counter chefs included in the packages?", a: "Live counters are available as add-ons in our Premium package and are included in Luxury and Royal packages." },
  { q: "What is the cancellation policy?", a: "Cancellations 7+ days before the event receive a 70% refund. Within 7 days, a 30% refund applies. Emergency cases are reviewed individually." },
  { q: "What payment methods do you accept?", a: "We accept UPI, NEFT, bank transfer, and cash. A 30% advance confirms your booking; balance is settled on the event day." },
];

/* ─────────────────────────── CONFETTI ─────────────────────────────────── */
const CONFETTI_COLORS = ["#C89B5A", "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
function Confetti() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${3 + Math.random() * 3}s`,
    size: `${6 + Math.random() * 8}px`,
    rotate: `${Math.random() * 360}deg`,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── MAIN COMPONENT ───────────────────────────── */
export default function CateringPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [eventType, setEventType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [guests, setGuests] = useState(100);
  const [budget, setBudget] = useState("");
  const [counters, setCounters] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", venue: "", city: "", note: "" });

  const wizardRef = useRef<HTMLDivElement>(null);

  const scrollToWizard = () => wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    scrollToWizard();
  };

  const toggleCounter = (c: string) =>
    setCounters(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const selectedEvent = EVENT_TYPES.find(e => e.label === eventType);

  // Smart recommendations
  const rec = selectedEvent?.rec || "";
  const showLiveCounterRec = guests >= 500;
  const showCorporateRec = eventType === "Corporate Event";

  const nearestSnap = GUEST_SNAPS.reduce((a, b) =>
    Math.abs(b - guests) < Math.abs(a - guests) ? b : a
  );
  const guestInfo = GUEST_LABELS[nearestSnap] || GUEST_LABELS[100];

  const estimatedBudget = () => {
    const map: Record<string, [number, number]> = { Economy: [120, 180], Premium: [200, 280], Luxury: [320, 450], Royal: [500, 999] };
    const r = map[budget];
    if (!r) return null;
    return `₹${(r[0] * guests).toLocaleString("en-IN")} – ₹${(r[1] * guests).toLocaleString("en-IN")} (approx.)`;
  };

  /* ── WIZARD STEPS ── */
  const renderStep = () => {
    switch (step) {
      /* ── STEP 1: Event Type ── */
      case 1:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">What's the occasion?</h2>
            <p className="text-[#4B352A]/60 mb-8 text-sm">Select your event type and we'll personalise everything for you.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {EVENT_TYPES.map((e) => (
                <motion.button
                  key={e.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setEventType(e.label); go(2); }}
                  className={`relative group rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left ${
                    eventType === e.label ? "border-[#C89B5A] ring-2 ring-[#C89B5A]/30" : "border-[#EADBC8] hover:border-[#C89B5A]/50"
                  }`}
                >
                  <div className="h-28 overflow-hidden">
                    <img src={e.img} alt={e.label} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/80 via-[#1A0E08]/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm leading-tight">{e.label}</p>
                    <p className="text-[#C89B5A] text-[10px] font-medium mt-0.5">{e.emoji}</p>
                  </div>
                  {eventType === e.label && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#C89B5A] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );

      /* ── STEP 2: Food Style ── */
      case 2:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Food preference</h2>
            <p className="text-[#4B352A]/60 mb-8 text-sm">How would you like your menu styled?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {FOOD_TYPES.map((f) => (
                <motion.button
                  key={f.label}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFoodType(f.label)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    foodType === f.label
                      ? "border-[#C89B5A] bg-[#C89B5A]/8 shadow-lg shadow-[#C89B5A]/10"
                      : "border-[#EADBC8] bg-white hover:border-[#C89B5A]/50 hover:bg-[#F6F0E8]"
                  }`}
                >
                  <span className="text-3xl">{f.icon}</span>
                  <div>
                    <p className={`font-semibold text-sm ${foodType === f.label ? "text-[#C89B5A]" : "text-[#2D1A10]"}`}>{f.label}</p>
                    <p className="text-[#4B352A]/50 text-xs mt-0.5">{f.desc}</p>
                  </div>
                  {foodType === f.label && (
                    <div className="ml-auto w-5 h-5 bg-[#C89B5A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={!foodType}
              onClick={() => go(3)}
              className="w-full sm:w-auto px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        );

      /* ── STEP 3: Guest Count ── */
      case 3:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">How many guests?</h2>
            <p className="text-[#4B352A]/60 mb-10 text-sm">Drag the slider to set your approximate guest count.</p>

            <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B352A] rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, #C89B5A 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <motion.div
                key={guests}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10"
              >
                <p className="text-6xl font-serif font-bold text-[#C89B5A] mb-1">
                  {guests >= 2000 ? "2000+" : guests}
                </p>
                <p className="text-[#FAF8F5] font-semibold text-lg">{guestInfo.label}</p>
                <p className="text-[#EADBC8]/60 text-sm mt-1">{guestInfo.tag}</p>
              </motion.div>
            </div>

            <div className="relative px-2 mb-6">
              <input
                type="range" min={0} max={7} step={1}
                value={GUEST_SNAPS.indexOf(nearestSnap)}
                onChange={(e) => setGuests(GUEST_SNAPS[Number(e.target.value)])}
                className="w-full h-2 appearance-none rounded-full cursor-pointer"
                style={{ background: `linear-gradient(to right, #C89B5A ${(GUEST_SNAPS.indexOf(nearestSnap) / 7) * 100}%, #EADBC8 ${(GUEST_SNAPS.indexOf(nearestSnap) / 7) * 100}%)` }}
              />
              <div className="flex justify-between mt-3">
                {GUEST_SNAPS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setGuests(s)}
                    className={`text-[10px] font-semibold transition-colors ${nearestSnap === s ? "text-[#C89B5A]" : "text-[#4B352A]/40 hover:text-[#C89B5A]"}`}
                  >
                    {s >= 2000 ? "2k+" : s >= 1000 ? "1k" : s}
                  </button>
                ))}
              </div>
            </div>

            {showLiveCounterRec && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#C89B5A]/10 border border-[#C89B5A]/30 rounded-2xl px-5 py-3.5 flex items-center gap-3 mb-6">
                <span className="text-xl">💡</span>
                <p className="text-[#4B352A] text-sm"><span className="font-semibold text-[#C89B5A]">Recommended:</span> For {guests >= 2000 ? "2000+" : guests} guests, we suggest adding 2+ Live Counters for the best experience.</p>
              </motion.div>
            )}

            <button onClick={() => go(4)} className="w-full sm:w-auto px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        );

      /* ── STEP 4: Budget ── */
      case 4:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Choose your budget tier</h2>
            <p className="text-[#4B352A]/60 mb-2 text-sm">All packages are customisable. This helps us plan your menu.</p>
            {rec && (
              <div className="inline-flex items-center gap-2 bg-[#C89B5A]/10 border border-[#C89B5A]/30 text-[#4B352A] text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B5A]" />
                Recommended for {eventType}: <span className="text-[#C89B5A]">{rec}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {BUDGETS.map((b) => (
                <motion.button
                  key={b.tier}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBudget(b.tier)}
                  className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                    budget === b.tier
                      ? "border-[#C89B5A] bg-[#C89B5A]/8 shadow-xl shadow-[#C89B5A]/15"
                      : "border-[#EADBC8] bg-white hover:border-[#C89B5A]/40"
                  }`}
                >
                  {b.popular && <span className="absolute -top-3 left-4 bg-[#C89B5A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{b.icon}</span>
                    {budget === b.tier && <div className="w-6 h-6 bg-[#C89B5A] rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>}
                  </div>
                  <p className="font-serif font-bold text-lg text-[#2D1A10] mb-0.5">{b.tier}</p>
                  <p className="text-[#C89B5A] font-bold text-base mb-3">{b.range} <span className="text-[#4B352A]/50 text-xs font-normal">/ {b.unit}</span></p>
                  <ul className="space-y-1.5">
                    {b.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#4B352A]/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C89B5A] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              ))}
            </div>
            <button disabled={!budget} onClick={() => go(5)} className="w-full sm:w-auto px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2">
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        );

      /* ── STEP 5: Live Counters ── */
      case 5:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Add live counters</h2>
            <p className="text-[#4B352A]/60 mb-2 text-sm">Multi-select. Live counters are a crowd favourite at every event!</p>
            {showLiveCounterRec && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full mb-5">
                ⭐ For {guests >= 2000 ? "2000+" : guests} guests, we recommend 2+ counters
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {LIVE_COUNTERS.map((c) => {
                const selected = counters.includes(c.label);
                return (
                  <motion.button
                    key={c.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleCounter(c.label)}
                    className={`relative group rounded-2xl overflow-hidden border-2 transition-all ${selected ? "border-[#C89B5A]" : "border-[#EADBC8] hover:border-[#C89B5A]/50"}`}
                  >
                    <div className="h-24 overflow-hidden">
                      <img src={c.img} alt={c.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute inset-0 transition-all duration-300 ${selected ? "bg-[#C89B5A]/40" : "bg-[#1A0E08]/30 group-hover:bg-[#1A0E08]/10"}`} />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {selected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-8 h-8 bg-[#C89B5A] rounded-full flex items-center justify-center mb-1 shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#1A0E08]/80 to-transparent">
                      <p className="text-white text-xs font-semibold text-center">{c.label}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => go(6)} className="px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => go(6)} className="text-[#4B352A]/50 text-sm hover:text-[#C89B5A] transition-colors">
                Skip this step →
              </button>
            </div>
          </div>
        );

      /* ── STEP 6: Add-on Services ── */
      case 6:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Additional services</h2>
            <p className="text-[#4B352A]/60 mb-8 text-sm">Enhance your event with these premium add-ons.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {ADD_SERVICES.map((s) => {
                const selected = services.includes(s.label);
                return (
                  <motion.button
                    key={s.label}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggleService(s.label)}
                    className={`p-5 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                      selected ? "border-[#C89B5A] bg-[#C89B5A]/8 shadow-lg shadow-[#C89B5A]/10" : "border-[#EADBC8] bg-white hover:border-[#C89B5A]/40 hover:bg-[#F6F0E8]"
                    }`}
                  >
                    <span className="text-3xl">{s.icon}</span>
                    <p className={`text-xs font-semibold leading-tight ${selected ? "text-[#C89B5A]" : "text-[#2D1A10]"}`}>{s.label}</p>
                    {selected && <div className="w-4 h-4 bg-[#C89B5A] rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></div>}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => go(7)} className="px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => go(7)} className="text-[#4B352A]/50 text-sm hover:text-[#C89B5A] transition-colors">Skip →</button>
            </div>
          </div>
        );

      /* ── STEP 7: Customer Details ── */
      case 7:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Almost there!</h2>
            <p className="text-[#4B352A]/60 mb-8 text-sm">Share your details and we'll prepare a personalised quote within 2 hours.</p>
            <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B352A] rounded-3xl p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX", required: true },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: false },
                  { key: "date", label: "Event Date", type: "date", placeholder: "", required: true },
                  { key: "venue", label: "Venue Name / Address", type: "text", placeholder: "Venue or hall name", required: false },
                  { key: "city", label: "City", type: "text", placeholder: "City of event", required: false },
                ].map(({ key, label, type, placeholder, required }) => (
                  <div key={key} className="relative">
                    <label className="text-[#C89B5A]/80 text-xs font-semibold uppercase tracking-wider block mb-2">{label}{required && " *"}</label>
                    <input
                      required={required}
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[#FAF8F5] placeholder-[#EADBC8]/30 text-sm focus:outline-none focus:border-[#C89B5A] focus:bg-white/15 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-[#C89B5A]/80 text-xs font-semibold uppercase tracking-wider block mb-2">Special Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Any special dietary needs, traditional requirements, or event details..."
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-[#FAF8F5] placeholder-[#EADBC8]/30 text-sm focus:outline-none focus:border-[#C89B5A] focus:bg-white/15 transition-all resize-none"
                />
              </div>
              <button
                onClick={() => { if (form.name && form.phone && form.date) go(8); }}
                disabled={!form.name || !form.phone || !form.date}
                className="mt-6 w-full sm:w-auto px-10 py-3.5 bg-[#C89B5A] text-white rounded-full font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#B88A4A] transition-colors shadow-lg flex items-center gap-2"
              >
                Review My Quote <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      /* ── STEP 8: Summary ── */
      case 8:
        const est = estimatedBudget();
        const waMsgRaw = `Hello Palagaram Catering! My name is ${form.name}. I would like to enquire about catering for my ${eventType} event for approximately ${guests} guests on ${form.date}. Please share a quote.`;
        const waMsg = encodeURIComponent(waMsgRaw);
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D1A10] mb-2">Your catering quote summary</h2>
            <p className="text-[#4B352A]/60 mb-8 text-sm">Review your selections before we prepare your personalised quote.</p>

            <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-xl overflow-hidden mb-8">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2D1A10] to-[#4B352A] px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[#C89B5A] text-xs font-semibold uppercase tracking-widest mb-1">Palagaram Catering</p>
                  <h3 className="text-[#FAF8F5] font-serif font-bold text-xl">{form.name || "Your Event"}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[#EADBC8]/60 text-xs">Event Date</p>
                  <p className="text-[#FAF8F5] font-semibold text-sm">{form.date || "TBD"}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Event Type", value: eventType || "—", emoji: selectedEvent?.emoji },
                  { label: "Food Style", value: foodType || "—" },
                  { label: "Guest Count", value: guests >= 2000 ? "2000+ guests" : `${guests} guests`, emoji: "👥" },
                  { label: "Budget Tier", value: budget || "—" },
                  { label: "City / Venue", value: form.city ? `${form.city}${form.venue ? ` — ${form.venue}` : ""}` : form.venue || "—" },
                  { label: "Contact", value: form.phone, emoji: "📞" },
                ].map(({ label, value, emoji }) => (
                  <div key={label} className="flex items-start gap-3 p-3 bg-[#F6F0E8] rounded-xl">
                    {emoji && <span className="text-base mt-0.5">{emoji}</span>}
                    <div>
                      <p className="text-[#4B352A]/50 text-xs uppercase tracking-wider font-semibold">{label}</p>
                      <p className="text-[#2D1A10] font-semibold text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}

                {counters.length > 0 && (
                  <div className="sm:col-span-2 p-3 bg-[#F6F0E8] rounded-xl">
                    <p className="text-[#4B352A]/50 text-xs uppercase tracking-wider font-semibold mb-2">Live Counters</p>
                    <div className="flex flex-wrap gap-2">
                      {counters.map(c => <span key={c} className="bg-[#C89B5A]/15 text-[#4B352A] text-xs font-medium px-3 py-1 rounded-full border border-[#C89B5A]/30">{c}</span>)}
                    </div>
                  </div>
                )}

                {services.length > 0 && (
                  <div className="sm:col-span-2 p-3 bg-[#F6F0E8] rounded-xl">
                    <p className="text-[#4B352A]/50 text-xs uppercase tracking-wider font-semibold mb-2">Additional Services</p>
                    <div className="flex flex-wrap gap-2">
                      {services.map(s => <span key={s} className="bg-[#4B352A]/10 text-[#4B352A] text-xs font-medium px-3 py-1 rounded-full border border-[#EADBC8]">{s}</span>)}
                    </div>
                  </div>
                )}

                {est && (
                  <div className="sm:col-span-2 p-4 bg-[#C89B5A]/10 border border-[#C89B5A]/30 rounded-xl">
                    <p className="text-[#4B352A]/60 text-xs uppercase tracking-wider font-semibold mb-1">Estimated Total Budget</p>
                    <p className="text-[#C89B5A] font-serif font-bold text-2xl">{est}</p>
                    <p className="text-[#4B352A]/40 text-xs mt-1">* Indicative. Actual quote may vary based on menu and add-ons.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSuccess(true)}
                className="flex items-center justify-center gap-2 bg-[#C89B5A] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg text-sm"
              >
                <Check className="w-4 h-4" /> Request Official Quote
              </button>
              <a href="tel:+914144224228" className="flex items-center justify-center gap-2 bg-[#2D1A10] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#3D2A1A] transition-colors text-sm">
                <Phone className="w-4 h-4" /> Call Now: +91 4144 224 228
              </a>
              <a
                href={`https://wa.me/914144224228?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#20C55A] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 border-2 border-[#EADBC8] text-[#4B352A] px-6 py-4 rounded-2xl font-semibold hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors text-sm"
              >
                <Download className="w-4 h-4" /> Download / Print
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* ── SUCCESS OVERLAY ── */}
      <AnimatePresence>
        {success && (
          <>
            <Confetti />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-[#2D1A10]/97 flex flex-col items-center justify-center px-6 text-center"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="max-w-md"
              >
                <div className="w-24 h-24 rounded-full bg-[#C89B5A]/20 border-2 border-[#C89B5A] flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">🎉</span>
                </div>
                <h2 className="text-4xl font-serif font-bold text-[#FAF8F5] mb-3">Thank You, {form.name || "Friend"}!</h2>
                <p className="text-[#EADBC8]/70 text-base leading-relaxed mb-8">
                  Your catering enquiry has been received. Our catering manager will contact you within <span className="text-[#C89B5A] font-semibold">2 hours</span> with a personalised quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/914144224228?text=${encodeURIComponent(`Hi Palagaram! I just submitted a catering enquiry for ${eventType}. Looking forward to hearing from you!`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#20C55A] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                  <Link href="/">
                    <button className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                      Back to Home
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80" alt="Catering hero" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E08]/90 via-[#1A0E08]/80 to-[#1A0E08]/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,_#C89B5A12_0%,_transparent_70%)] z-[1]" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[#EADBC8]/60 text-sm mb-6">
            <Link href="/"><span className="hover:text-[#C89B5A] transition-colors cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-[#C89B5A]">Catering Services</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Premium Catering • Est. 1985</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F5] mb-5 leading-none">
            Craft Your<br /><span className="text-[#C89B5A]">Perfect Event</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#EADBC8]/70 text-lg max-w-xl leading-relaxed mb-10">
            38 years of South Indian culinary heritage, now available for your most special moments.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3">
            <button onClick={scrollToWizard}
              className="inline-flex items-center gap-2 bg-[#C89B5A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg text-sm">
              <Sparkles className="w-4 h-4" /> Start Planning My Event
            </button>
            <a href="tel:+914144224228"
              className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm">
              <Phone className="w-4 h-4" /> Talk to Our Team
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-10 mt-14">
            {[["2000+", "Events Catered"], ["38+", "Years of Trust"], ["5000+", "Max Guest Capacity"]].map(([val, lbl], i) => (
              <div key={i}>
                <p className="text-[#C89B5A] font-serif font-bold text-3xl">{val}</p>
                <p className="text-[#EADBC8]/50 text-xs uppercase tracking-wider mt-1">{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOOKING WIZARD ── */}
      <section ref={wizardRef} className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">

          {/* Section label */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Interactive Booking</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D1A10]">Plan Your Catering in 8 Easy Steps</h2>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#4B352A]/60 uppercase tracking-wider">Step {step} of 8</span>
              <span className="text-xs font-semibold text-[#C89B5A]">{STEPS[step - 1]}</span>
            </div>
            <div className="h-1.5 bg-[#EADBC8] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C89B5A] to-[#DAA520] rounded-full"
                animate={{ width: `${(step / 8) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i + 1 <= step ? "bg-[#C89B5A]" : "bg-[#EADBC8]"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Wizard card */}
          <div className="bg-white rounded-3xl border border-[#EADBC8] shadow-xl overflow-hidden">
            {/* Back button */}
            {step > 1 && (
              <div className="px-6 pt-5 pb-0">
                <button onClick={() => go(step - 1)} className="flex items-center gap-1.5 text-[#4B352A]/50 hover:text-[#C89B5A] transition-colors text-sm font-medium">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>
            )}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slideIn}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE PALAGARAM ── */}
      <section className="py-20 bg-[#4B352A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Why Palagaram</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] mb-4">What Makes Us Different</h2>
            <p className="text-[#EADBC8]/60 max-w-xl mx-auto">Trusted for 38+ years because we treat every event as our own family celebration.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_US.map((w, i) => (
              <motion.div key={w.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#C89B5A]/30 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#C89B5A]/15 border border-[#C89B5A]/25 flex items-center justify-center text-[#C89B5A] mb-4 group-hover:bg-[#C89B5A]/25 transition-colors">
                  {w.icon}
                </div>
                <h3 className="text-[#FAF8F5] font-semibold text-base mb-1.5">{w.title}</h3>
                <p className="text-[#EADBC8]/50 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK TIMELINE ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Our Process</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">How We Work</h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto">From first call to final clean-up — a seamless, worry-free experience.</p>
          </motion.div>
          <div className="relative">
            {/* connector line desktop */}
            <div className="hidden md:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#C89B5A]/40 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {TIMELINE.map((t, i) => (
                <motion.div key={t.step} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full bg-white border-2 border-[#C89B5A] flex flex-col items-center justify-center mb-5 shadow-lg shadow-[#C89B5A]/15 z-10">
                    <span className="text-2xl">{t.icon}</span>
                  </div>
                  <span className="text-[#C89B5A] text-xs font-bold uppercase tracking-widest mb-1">{t.step}</span>
                  <h3 className="font-serif font-bold text-[#2D1A10] text-lg mb-2">{t.title}</h3>
                  <p className="text-[#4B352A]/60 text-sm leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 bg-[#F6F0E8]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Event Highlights</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Moments We've Crafted</h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto">A glimpse into the events, feasts, and memories we've been honoured to be part of.</p>
          </motion.div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {GALLERY_IMGS.map((img, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden mb-4 border border-[#EADBC8] hover:shadow-xl hover:shadow-[#C89B5A]/10 transition-all duration-500">
                <div className={`overflow-hidden ${img.tall ? "h-80" : "h-56"}`}>
                  <img src={img.src} alt={img.label} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-[#C89B5A] text-[10px] font-bold uppercase tracking-widest mb-0.5">Palagaram Catering</p>
                  <p className="text-white font-serif font-bold text-base">{img.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Client Stories</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Words From Our Clients</h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto">Real feedback from families and organisations who trusted Palagaram for their biggest moments.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl border border-[#EADBC8] p-7 shadow-sm hover:shadow-lg hover:shadow-[#C89B5A]/8 transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-[#C89B5A] fill-[#C89B5A]" />)}
                </div>
                <p className="text-[#4B352A]/75 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C89B5A]/15 border border-[#C89B5A]/30 flex items-center justify-center text-[#C89B5A] font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[#2D1A10] font-semibold text-sm">{t.name}</p>
                    <span className="text-[10px] bg-[#F6F0E8] border border-[#EADBC8] text-[#4B352A]/60 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">{t.event}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-20 bg-[#F6F0E8]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Popular Packages</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Event-Specific Packages</h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto">Curated starting points, fully customisable to your needs.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.name} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className={`relative rounded-2xl p-7 border ${pkg.popular ? "border-[#C89B5A] bg-[#2D1A10] shadow-2xl shadow-[#C89B5A]/15 scale-[1.02]" : "border-[#EADBC8] bg-white shadow-sm"}`}>
                {pkg.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2"><span className="bg-[#C89B5A] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">Most Booked</span></div>}
                <span className="text-4xl block mb-4">{pkg.icon}</span>
                <h3 className={`font-serif font-bold text-2xl mb-1 ${pkg.popular ? "text-[#FAF8F5]" : "text-[#2D1A10]"}`}>{pkg.name}</h3>
                <p className={`text-sm mb-5 ${pkg.popular ? "text-[#EADBC8]/50" : "text-[#4B352A]/50"}`}>{pkg.guests}</p>
                <ul className="space-y-2.5 mb-7">
                  {pkg.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? "text-[#C89B5A]" : "text-[#C89B5A]"}`} />
                      <span className={`text-sm ${pkg.popular ? "text-[#EADBC8]/75" : "text-[#4B352A]/70"}`}>{h}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToWizard}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    pkg.popular ? "bg-[#C89B5A] text-white hover:bg-[#B88A4A] shadow-md" : "border border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white"
                  }`}
                >
                  Book This Package <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">FAQ</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Common Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                className="bg-white rounded-2xl border border-[#EADBC8] overflow-hidden shadow-sm">
                <button
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#2D1A10] text-base group-hover:text-[#C89B5A] transition-colors leading-snug">{faq.q}</span>
                  <span className="text-[#C89B5A] flex-shrink-0 mt-0.5">
                    {openFaq === i
                      ? <motion.span initial={{ rotate: 0 }} animate={{ rotate: 180 }}><ChevronRight className="w-5 h-5 rotate-90" /></motion.span>
                      : <ChevronRight className="w-5 h-5 rotate-90 opacity-40" />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-[#4B352A]/65 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-[#2D1A10] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #C89B5A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-5xl block mb-5">🍽️</span>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Let's Create Together</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] mb-4">Let's Make Your Event<br /><span className="text-[#C89B5A]">Unforgettable</span></h2>
            <p className="text-[#EADBC8]/60 max-w-lg mx-auto mb-10 leading-relaxed">
              Every great celebration deserves extraordinary food. Let Palagaram be the flavour of your most cherished memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={scrollToWizard}
                className="inline-flex items-center gap-2 bg-[#C89B5A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg">
                <Sparkles className="w-4 h-4" /> Book Catering Now
              </button>
              <a href="tel:+914144224228"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/914144224228" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20C55A] transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT + MAP ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" /><span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Reach Us</span><span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#2D1A10] mb-3">Contact Information</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Phone className="w-5 h-5 text-[#C89B5A]" />, title: "Phone", val: "+91 4144 224 228", href: "tel:+914144224228" },
                { icon: <MessageCircle className="w-5 h-5 text-[#C89B5A]" />, title: "WhatsApp", val: "Chat with us instantly", href: "https://wa.me/914144224228" },
                { icon: <MapPin className="w-5 h-5 text-[#C89B5A]" />, title: "Address", val: "156 West Car Street, Chidambaram, TN – 608001", href: undefined },
                { icon: <Clock className="w-5 h-5 text-[#C89B5A]" />, title: "Hours", val: "Open Daily: 7:00 AM – 10:45 PM", href: undefined },
              ].map((c, i) => (
                <motion.div key={c.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
                  className="bg-white rounded-2xl border border-[#EADBC8] p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F6F0E8] border border-[#EADBC8] flex items-center justify-center mb-3">{c.icon}</div>
                  <p className="text-[#4B352A] font-semibold text-sm mb-1">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[#4B352A]/60 text-sm hover:text-[#C89B5A] transition-colors">{c.val}</a>
                  ) : <p className="text-[#4B352A]/60 text-sm">{c.val}</p>}
                </motion.div>
              ))}
            </div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="rounded-2xl overflow-hidden border border-[#EADBC8] shadow-lg">
                <iframe
                  title="Palagaram Location"
                  src="https://maps.google.com/maps?q=Palagaram+156+West+Car+Street+Chidambaram+Tamil+Nadu+608001&output=embed&z=16"
                  width="100%" height="320" style={{ border: 0, display: "block" }}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
                />
              </div>
              <div className="mt-3 text-center">
                <a href="https://www.google.com/maps/dir/?api=1&destination=156+West+Car+Street+Chidambaram+Tamil+Nadu+608001"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5A] border border-[#C89B5A]/40 px-5 py-2 rounded-full hover:bg-[#C89B5A]/10 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
