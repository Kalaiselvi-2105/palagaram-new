import { useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils, Users, Star, CheckCircle2, Phone, MapPin, Clock,
  ChefHat, Heart, Award, Leaf, MessageSquare, ChevronDown, ChevronUp,
  Send, PartyPopper, ExternalLink
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const SERVICES = [
  {
    icon: <PartyPopper className="w-7 h-7 text-[#C89B5A]" />,
    title: "Wedding Catering",
    desc: "Celebrate your special day with lavish South Indian vegetarian spreads — from engagement ceremonies to grand receptions.",
  },
  {
    icon: <Users className="w-7 h-7 text-[#C89B5A]" />,
    title: "Corporate Events",
    desc: "Professional catering for office parties, seminars, product launches, and business luncheons.",
  },
  {
    icon: <Heart className="w-7 h-7 text-[#C89B5A]" />,
    title: "Family Celebrations",
    desc: "Birthday parties, anniversaries, housewarming ceremonies, and intimate family gatherings done right.",
  },
  {
    icon: <Leaf className="w-7 h-7 text-[#C89B5A]" />,
    title: "Temple & Religious Functions",
    desc: "Satvik pure vegetarian meals for temple events, pooja functions, and religious gatherings.",
  },
  {
    icon: <ChefHat className="w-7 h-7 text-[#C89B5A]" />,
    title: "Live Counter Service",
    desc: "Our chefs set up live dosa, idli, and chaat counters at your venue for an interactive food experience.",
  },
  {
    icon: <Utensils className="w-7 h-7 text-[#C89B5A]" />,
    title: "Bulk Takeaway Orders",
    desc: "Large-scale takeaway packs for offices, schools, pilgrim groups, and community kitchens.",
  },
];

const WHY_US = [
  { icon: <Award className="w-5 h-5" />, title: "Est. 1985", desc: "38+ years of trusted catering experience in Chidambaram and across Tamil Nadu." },
  { icon: <Leaf className="w-5 h-5" />, title: "100% Pure Veg", desc: "Strictly Saatvik, no onion-garlic options available on request. We never compromise." },
  { icon: <ChefHat className="w-5 h-5" />, title: "Expert Chefs", desc: "Our trained kitchen team uses traditional recipes passed down through generations." },
  { icon: <Star className="w-5 h-5" />, title: "Premium Quality", desc: "Fresh ingredients sourced daily. Every dish prepared with the same care as our restaurant." },
  { icon: <Users className="w-5 h-5" />, title: "Any Scale", desc: "From intimate 20-person gatherings to 2000+ guest wedding feasts — we handle it all." },
  { icon: <Heart className="w-5 h-5" />, title: "On-Time Delivery", desc: "Reliable logistics and punctual delivery so you never have to worry on your big day." },
];

const PACKAGES = [
  {
    name: "Silver",
    tagline: "Ideal for small gatherings",
    guests: "Up to 50 Guests",
    price: "₹180",
    unit: "per head",
    highlight: false,
    items: [
      "Welcome Sharbat",
      "2 Starters",
      "Rice + 3 Curries",
      "Sambar & Rasam",
      "Papad, Pickle & Curd",
      "1 Dessert",
      "Buttermilk",
    ],
  },
  {
    name: "Gold",
    tagline: "Perfect for weddings & ceremonies",
    guests: "51 – 500 Guests",
    price: "₹280",
    unit: "per head",
    highlight: true,
    items: [
      "Welcome Drink + Mocktail",
      "4 Starters (incl. Live Counter)",
      "Rice + 5 Curries",
      "Sambar, Rasam & Kootu",
      "Papad, Pickle, Curd & Raita",
      "2 Desserts + Payasam",
      "Paani Puri Counter",
      "Buttermilk & Filter Coffee",
    ],
  },
  {
    name: "Platinum",
    tagline: "Grand celebrations & large events",
    guests: "500+ Guests",
    price: "Custom",
    unit: "quote",
    highlight: false,
    items: [
      "Everything in Gold",
      "6 Starters + 2 Live Counters",
      "Full Sadhya-style Banana Leaf",
      "Regional Specialty Items",
      "Dedicated On-Site Team",
      "Post-Event Cleanup Support",
      "Custom Menu Design",
      "Priority Booking",
    ],
  },
];

const GALLERY_IMGS = [
  { src: "/hero-bg.png", alt: "Grand Catering Setup", label: "Wedding Feast" },
  { src: "/dosa.png", alt: "Live Dosa Counter", label: "Live Counter" },
  { src: "/kitchen.png", alt: "Kitchen Preparation", label: "Our Kitchen" },
  { src: "/hero-bg.png", alt: "Banana Leaf Sadhya", label: "Sadhya Spread" },
  { src: "/dosa.png", alt: "Breakfast Catering", label: "Breakfast Catering" },
  { src: "/kitchen.png", alt: "Corporate Catering", label: "Corporate Event" },
];

const FAQS = [
  {
    q: "How far in advance should I book catering?",
    a: "We recommend booking at least 2–4 weeks in advance for small events, and 1–3 months ahead for large weddings or corporate events to ensure availability and menu planning.",
  },
  {
    q: "Do you cater outside Chidambaram?",
    a: "Yes! We cater across the Cuddalore district and neighbouring areas. For locations beyond 50 km, transport and logistics charges apply. Contact us for a custom quote.",
  },
  {
    q: "Can the menu be customised?",
    a: "Absolutely. Every menu is tailored to your event, dietary preferences, regional traditions, and guest count. We also offer no-onion-garlic satvik options on request.",
  },
  {
    q: "Do you provide serving staff and equipment?",
    a: "Yes. Our Gold and Platinum packages include trained serving staff, serving vessels, and cleanup support. Silver package can include staff at an additional charge.",
  },
  {
    q: "Is a deposit required to confirm the booking?",
    a: "A 30% advance payment is required to confirm your booking. The balance is settled on or before the event date.",
  },
  {
    q: "Can you handle vegetarian-only requirements?",
    a: "Palagaram is a 100% pure vegetarian restaurant. All our catering is strictly vegetarian, with satvik (no onion/garlic) menus available as required.",
  },
];

export default function CateringPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", eventType: "", date: "", guests: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Catering hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E08]/85 via-[#1A0E08]/75 to-[#1A0E08]/92" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,_#C89B5A10_0%,_transparent_70%)] z-[1]" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[#EADBC8]/60 text-sm mb-6"
          >
            <Link href="/">
              <span className="hover:text-[#C89B5A] transition-colors cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#C89B5A]">Catering Services</span>
          </motion.div>

          <div className="flex items-start gap-4 mb-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-14 h-14 rounded-2xl bg-[#C89B5A]/15 border border-[#C89B5A]/30 flex items-center justify-center flex-shrink-0"
            >
              <ChefHat className="w-7 h-7 text-[#C89B5A]" />
            </motion.div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-center gap-3 mb-3"
              >
                <span className="h-px w-8 bg-[#C89B5A]" />
                <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Since 1985</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F5] mb-3"
              >
                Catering Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[#EADBC8]/70 text-lg max-w-xl leading-relaxed"
              >
                Bringing the authentic flavours of Palagaram to your celebrations. Pure vegetarian catering crafted with tradition.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-10 mt-10"
          >
            {[
              { label: "Events Catered", value: "2000+" },
              { label: "Guest Capacity", value: "5000+" },
              { label: "Years of Trust", value: "38+" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[#C89B5A] font-serif font-bold text-3xl">{s.value}</p>
                <p className="text-[#EADBC8]/50 text-xs uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 bg-[#C89B5A] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg text-sm"
            >
              <Send className="w-4 h-4" /> Enquire Now
            </a>
            <a
              href="tel:+914144224228"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" /> Call Us Directly
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Our Catering Services ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">What We Offer</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">
              Our Catering Services
            </h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto text-base leading-relaxed">
              From intimate family gatherings to grand celebrations — we bring Palagaram's authentic South Indian hospitality to your door.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#EADBC8] p-7 shadow-sm hover:shadow-lg hover:shadow-[#C89B5A]/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F6F0E8] border border-[#EADBC8] flex items-center justify-center mb-5 group-hover:bg-[#C89B5A]/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-[#2D1A10] font-serif font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-[#4B352A]/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Palagaram ── */}
      <section className="py-20 bg-[#4B352A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Our Promise</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] mb-4">
              Why Choose Palagaram?
            </h2>
            <p className="text-[#EADBC8]/60 max-w-xl mx-auto text-base leading-relaxed">
              Trusted by thousands of families across Tamil Nadu for the most important moments in their lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <motion.div
                key={w.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex gap-4 bg-white/[0.06] border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C89B5A]/15 border border-[#C89B5A]/30 flex items-center justify-center flex-shrink-0 text-[#C89B5A]">
                  {w.icon}
                </div>
                <div>
                  <h3 className="text-[#FAF8F5] font-semibold text-base mb-1">{w.title}</h3>
                  <p className="text-[#EADBC8]/55 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catering Packages ── */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Pricing</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">
              Catering Packages
            </h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto text-base leading-relaxed">
              Transparent pricing with no hidden charges. Every package is customisable to suit your event.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative rounded-2xl border p-8 flex flex-col ${
                  pkg.highlight
                    ? "bg-[#2D1A10] border-[#C89B5A] shadow-2xl shadow-[#C89B5A]/15 scale-[1.03]"
                    : "bg-white border-[#EADBC8] shadow-sm"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#C89B5A] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlight ? "text-[#C89B5A]/70" : "text-[#C89B5A]/70"}`}>
                    {pkg.name} Package
                  </p>
                  <h3 className={`font-serif font-bold text-2xl mb-1 ${pkg.highlight ? "text-[#FAF8F5]" : "text-[#2D1A10]"}`}>
                    {pkg.tagline}
                  </h3>
                  <p className={`text-sm ${pkg.highlight ? "text-[#EADBC8]/50" : "text-[#4B352A]/50"}`}>{pkg.guests}</p>
                </div>

                <div className="mb-6">
                  <span className={`text-4xl font-serif font-bold ${pkg.highlight ? "text-[#C89B5A]" : "text-[#2D1A10]"}`}>
                    {pkg.price}
                  </span>
                  {pkg.unit !== "quote" && (
                    <span className={`text-sm ml-1 ${pkg.highlight ? "text-[#EADBC8]/50" : "text-[#4B352A]/50"}`}>
                      / {pkg.unit}
                    </span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.highlight ? "text-[#C89B5A]" : "text-[#C89B5A]"}`} />
                      <span className={`text-sm ${pkg.highlight ? "text-[#EADBC8]/80" : "text-[#4B352A]/70"}`}>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#enquiry"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    pkg.highlight
                      ? "bg-[#C89B5A] text-white hover:bg-[#B88A4A] shadow-md"
                      : "border border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-white"
                  }`}
                >
                  Enquire Now
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-[#4B352A]/45 text-sm mt-8"
          >
            * All prices are indicative. Final pricing depends on menu selection, location, and event requirements.
          </motion.p>
        </div>
      </section>

      {/* ── Catering Gallery ── */}
      <section className="py-20 bg-[#F6F0E8]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Moments We've Created</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Catering Gallery</h2>
            <p className="text-[#4B352A]/60 max-w-xl mx-auto text-base leading-relaxed">
              A glimpse into the events we've proudly catered — each one a memory crafted with love.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY_IMGS.map((img, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden border border-[#EADBC8] shadow-sm hover:shadow-xl hover:shadow-[#C89B5A]/10 transition-all duration-500 h-60"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/75 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[#C89B5A] text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">Palagaram Catering</span>
                  <span className="text-white font-serif font-bold text-base">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catering Enquiry Form ── */}
      <section id="enquiry" className="py-20 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-[#C89B5A]" />
                <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Get In Touch</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">
                Catering Enquiry
              </h2>
              <p className="text-[#4B352A]/60 leading-relaxed mb-8">
                Fill in the form and our catering team will get back to you within 24 hours with a personalised quote for your event.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <Phone className="w-5 h-5 text-[#C89B5A]" />, title: "Call Us", value: "+91 4144 224 228", href: "tel:+914144224228" },
                  { icon: <MapPin className="w-5 h-5 text-[#C89B5A]" />, title: "Visit Us", value: "156 West Car Street, Chidambaram, TN – 608001", href: undefined },
                  { icon: <Clock className="w-5 h-5 text-[#C89B5A]" />, title: "Enquiry Hours", value: "Mon–Sun, 9:00 AM – 8:00 PM", href: undefined },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6F0E8] border border-[#EADBC8] flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#4B352A] font-semibold text-sm mb-0.5">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#4B352A]/60 text-sm hover:text-[#C89B5A] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#4B352A]/60 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              {submitted ? (
                <div className="bg-white rounded-2xl border border-[#EADBC8] shadow-sm p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C89B5A]/15 border border-[#C89B5A]/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#C89B5A]" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#2D1A10] mb-3">Enquiry Received!</h3>
                  <p className="text-[#4B352A]/60 leading-relaxed mb-6">
                    Thank you, <strong className="text-[#2D1A10]">{form.name}</strong>! Our catering team will contact you within 24 hours with a personalised quote.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", eventType: "", date: "", guests: "", message: "" }); }}
                    className="text-sm text-[#C89B5A] border border-[#C89B5A]/40 px-5 py-2 rounded-full hover:bg-[#C89B5A]/10 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl border border-[#EADBC8] shadow-sm p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Full Name *</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] placeholder-[#4B352A]/30 focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Phone *</label>
                      <input
                        required
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] placeholder-[#4B352A]/30 focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] placeholder-[#4B352A]/30 focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Event Type *</label>
                      <select
                        required
                        name="eventType"
                        value={form.eventType}
                        onChange={handleChange}
                        className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5] appearance-none cursor-pointer"
                      >
                        <option value="">Select event type</option>
                        <option>Wedding</option>
                        <option>Corporate Event</option>
                        <option>Birthday Party</option>
                        <option>Temple / Religious Function</option>
                        <option>Anniversary</option>
                        <option>Housewarming</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Event Date *</label>
                      <input
                        required
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        type="date"
                        className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Number of Guests *</label>
                    <input
                      required
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      type="number"
                      min="1"
                      placeholder="e.g. 150"
                      className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] placeholder-[#4B352A]/30 focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#4B352A]/60 block mb-1.5">Additional Requirements</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your event, specific dishes, dietary requirements, venue, etc."
                      className="w-full border border-[#EADBC8] rounded-xl px-4 py-3 text-sm text-[#2D1A10] placeholder-[#4B352A]/30 focus:outline-none focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/10 transition-all bg-[#FAF8F5] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C89B5A] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B88A4A] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Enquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact Information ── */}
      <section className="py-16 bg-[#F6F0E8]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Reach Us</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#2D1A10] mb-3">Contact Information</h2>
            <p className="text-[#4B352A]/60 max-w-md mx-auto">We're always ready to help plan your perfect catered event.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: <Phone className="w-6 h-6 text-[#C89B5A]" />,
                title: "Phone",
                value: "+91 4144 224 228",
                href: "tel:+914144224228",
              },
              {
                icon: <MapPin className="w-6 h-6 text-[#C89B5A]" />,
                title: "Address",
                value: "156 West Car Street, Chidambaram, Tamil Nadu – 608001",
                href: "https://www.google.com/maps/dir/?api=1&destination=156+West+Car+Street+Chidambaram+Tamil+Nadu+608001",
              },
              {
                icon: <Clock className="w-6 h-6 text-[#C89B5A]" />,
                title: "Hours",
                value: "Open Daily: 7:00 AM – 10:45 PM",
                href: undefined,
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#EADBC8] p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F6F0E8] border border-[#EADBC8] flex items-center justify-center mx-auto mb-4">
                  {c.icon}
                </div>
                <p className="text-[#4B352A] font-semibold text-sm mb-1">{c.title}</p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[#4B352A]/60 text-sm hover:text-[#C89B5A] transition-colors flex items-center justify-center gap-1 flex-wrap"
                  >
                    {c.value}
                    {c.href.startsWith("http") && <ExternalLink className="w-3 h-3 inline" />}
                  </a>
                ) : (
                  <p className="text-[#4B352A]/60 text-sm">{c.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">Location</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#2D1A10] mb-3">Find Us Here</h2>
            <p className="text-[#4B352A]/60">Visit our restaurant or use the map to get directions for your catering consultation.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="rounded-2xl overflow-hidden border border-[#EADBC8] shadow-lg"
          >
            <iframe
              title="Palagaram Catering Location"
              src="https://maps.google.com/maps?q=Palagaram+156+West+Car+Street+Chidambaram+Tamil+Nadu+608001&output=embed&z=16"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
            className="text-center mt-5"
          >
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=156+West+Car+Street+Chidambaram+Tamil+Nadu+608001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C89B5A] border border-[#C89B5A]/40 px-6 py-2.5 rounded-full hover:bg-[#C89B5A]/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Get Directions on Google Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#F6F0E8]">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">FAQ</span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D1A10] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#4B352A]/60 leading-relaxed">
              Everything you need to know about Palagaram Catering Services.
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#EADBC8] overflow-hidden shadow-sm"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#2D1A10] text-base group-hover:text-[#C89B5A] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className="text-[#C89B5A] flex-shrink-0 mt-0.5">
                    {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[#4B352A]/65 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={7}
            className="mt-10 text-center"
          >
            <p className="text-[#4B352A]/60 text-sm mb-4">Have more questions? We're here to help.</p>
            <a
              href="tel:+914144224228"
              className="inline-flex items-center gap-2 bg-[#C89B5A] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-md text-sm"
            >
              <MessageSquare className="w-4 h-4" /> Talk to Our Catering Team
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
