import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Priya Rajagopal",
    city: "Chennai",
    initials: "PR",
    rating: 5,
    text: "The masala dosa here is unlike anything I've had anywhere else. Crispy, golden, and filled with the most flavorful potato masala. The filter coffee sealed the deal — absolutely world-class.",
  },
  {
    name: "Karthik Subramanian",
    city: "Coimbatore",
    initials: "KS",
    rating: 5,
    text: "We've been visiting Palagaram for over a decade whenever we're in Chidambaram. The consistency is remarkable. Same taste, same warmth, same love. That's rare.",
  },
  {
    name: "Meenakshi Iyer",
    city: "Bengaluru",
    initials: "MI",
    rating: 5,
    text: "Brought my entire family — three generations — and everyone left satisfied. The thali was abundant and authentic. The staff treated us like regulars from the first minute.",
  },
  {
    name: "Arjun Venkatesh",
    city: "Puducherry",
    initials: "AV",
    rating: 5,
    text: "Stopped here on a road trip and it turned into a two-hour stay. Pongal with ghee, vada with coconut chutney — I kept ordering. Exceptional value, exceptional food.",
  },
  {
    name: "Lakshmi Narayanan",
    city: "Mumbai",
    initials: "LN",
    rating: 5,
    text: "Whenever I visit Tamil Nadu, Palagaram is a must. The ambiance feels traditional yet clean and comfortable. Real South Indian hospitality that you don't find everywhere.",
  },
  {
    name: "Srinivasan R.",
    city: "Chidambaram",
    initials: "SR",
    rating: 5,
    text: "Local here and I've been eating breakfast at Palagaram for 20 years. The quality never drops. The idlis are always soft, the sambar always perfect. It's home.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: -dir * 60, opacity: 0 }),
  };

  const visible = [
    reviews[current],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  return (
    <section id="reviews" className="py-24 bg-[#4B352A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,_#C89B5A0D_0%,_transparent_70%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">
              Guest Stories
            </span>
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5]"
          >
            What Our Guests Say
          </motion.h2>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-10">
          {visible.map((review, i) => (
            <motion.div
              key={`${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#FAF8F5]/8 backdrop-blur-sm border border-[#FAF8F5]/15 rounded-2xl p-8 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#C89B5A] text-[#C89B5A]" />
                ))}
              </div>
              <p className="text-[#EADBC8]/80 text-base leading-relaxed flex-1 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#FAF8F5]/10">
                <div className="w-10 h-10 rounded-full bg-[#C89B5A]/20 flex items-center justify-center text-[#C89B5A] font-bold text-sm">
                  {review.initials}
                </div>
                <div>
                  <p className="text-[#FAF8F5] font-semibold text-sm">{review.name}</p>
                  <p className="text-[#EADBC8]/50 text-xs">{review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="lg:hidden mb-10 relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="bg-[#FAF8F5]/8 border border-[#FAF8F5]/15 rounded-2xl p-8 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: reviews[current].rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#C89B5A] text-[#C89B5A]" />
                ))}
              </div>
              <p className="text-[#EADBC8]/80 text-base leading-relaxed italic">
                "{reviews[current].text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#FAF8F5]/10">
                <div className="w-10 h-10 rounded-full bg-[#C89B5A]/20 flex items-center justify-center text-[#C89B5A] font-bold text-sm">
                  {reviews[current].initials}
                </div>
                <div>
                  <p className="text-[#FAF8F5] font-semibold text-sm">{reviews[current].name}</p>
                  <p className="text-[#EADBC8]/50 text-xs">{reviews[current].city}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center text-[#EADBC8] hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
            data-testid="button-prev-review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-[#C89B5A]" : "w-2 h-2 bg-[#FAF8F5]/30"}`}
                data-testid={`button-review-dot-${i}`}
              />
            ))}
          </div>
          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center text-[#EADBC8] hover:border-[#C89B5A] hover:text-[#C89B5A] transition-colors"
            data-testid="button-next-review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
