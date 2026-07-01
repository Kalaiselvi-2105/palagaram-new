import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Tag, Star, ArrowRight, UtensilsCrossed } from "lucide-react";
import { Link } from "wouter";
import { useActiveCombos } from "@/hooks/useDailyCombos";
import type { DailyCombo } from "@/data/dailyCombos";

const SLIDE_INTERVAL = 5000;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function ComboSlide({ combo }: { combo: DailyCombo }) {
  return (
    <div className="relative w-full h-full flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={combo.imageUrl}
          alt={combo.name}
          className="w-full h-full object-cover scale-105"
          style={{ animation: "slowZoom 12s ease-in-out infinite alternate" }}
        />
        {/* Multi-layer gradient: dark on left for readability, warm gold tint overall */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0a04]/92 via-[#1a0a04]/70 to-[#1a0a04]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0402]/80 via-transparent to-[#0d0402]/30" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 75% 50%, rgba(200,155,90,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-14 py-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Text content */}
        <div className="space-y-5">
          {/* Badge */}
          <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible" className="flex items-center gap-2 flex-wrap">
            {combo.badge && (
              <span className="inline-flex items-center gap-1.5 bg-[#C89B5A] text-[#1a0a04] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                <Star className="w-3 h-3 fill-current" /> {combo.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
              <Clock className="w-3 h-3" /> {combo.availableTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 custom={1} variants={contentVariants} initial="hidden" animate="visible"
            className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg">
            {combo.name}
          </motion.h2>

          {/* Description */}
          <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible"
            className="text-white/65 text-sm md:text-base leading-relaxed max-w-md">
            {combo.shortDesc}
          </motion.p>

          {/* Dishes */}
          <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible" className="space-y-2">
            <p className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <UtensilsCrossed className="w-3.5 h-3.5" /> What's included
            </p>
            <div className="flex flex-wrap gap-1.5">
              {combo.dishes.map((dish, i) => (
                <span key={i}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "rgba(200,155,90,0.15)", color: "#EADBC8", border: "1px solid rgba(200,155,90,0.25)" }}>
                  {dish}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Price + Offer */}
          <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="flex items-end gap-4 flex-wrap">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-bold text-white">₹{combo.price}</span>
                {combo.originalPrice && (
                  <span className="text-lg text-white/35 line-through">₹{combo.originalPrice}</span>
                )}
              </div>
              {combo.originalPrice && (
                <p className="text-[#4ade80] text-xs font-semibold mt-0.5">
                  You save ₹{combo.originalPrice - combo.price}
                </p>
              )}
            </div>
            {combo.offer && (
              <span className="inline-flex items-center gap-1.5 bg-[#C89B5A]/20 border border-[#C89B5A]/40 text-[#C89B5A] text-xs font-bold px-3 py-2 rounded-xl uppercase tracking-wide">
                <Tag className="w-3 h-3" /> {combo.offer}
              </span>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
            <Link href={combo.ctaLink || "/menu"}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(200,155,90,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-[#1a0a04] shadow-xl"
                style={{ background: "linear-gradient(135deg, #C89B5A, #E8B87A)" }}>
                {combo.ctaLabel || "Order Now"}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right: decorative floating price card (desktop only) */}
        <motion.div custom={6} variants={contentVariants} initial="hidden" animate="visible"
          className="hidden md:flex flex-col items-center justify-center">
          <div className="relative">
            {/* Glowing orb behind */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, #C89B5A 0%, transparent 70%)", transform: "scale(1.5)" }} />
            {/* Card */}
            <div className="relative backdrop-blur-xl rounded-3xl p-7 text-center shadow-2xl"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,155,90,0.3)" }}>
              <div className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold mb-3">Daily Combo</div>
              <div className="text-6xl font-bold text-white mb-1">₹{combo.price}</div>
              {combo.originalPrice && (
                <div className="text-white/40 text-sm line-through mb-3">₹{combo.originalPrice}</div>
              )}
              <div className="w-12 h-px bg-[#C89B5A]/40 mx-auto mb-3" />
              <div className="space-y-1.5 text-left">
                {combo.dishes.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C89B5A] flex-shrink-0" />
                    {d}
                  </div>
                ))}
                {combo.dishes.length > 4 && (
                  <div className="text-xs text-[#C89B5A] pl-3.5">+{combo.dishes.length - 4} more</div>
                )}
              </div>
              {combo.offer && (
                <div className="mt-4 bg-[#C89B5A]/15 rounded-xl py-2 px-3 text-[#C89B5A] text-xs font-bold border border-[#C89B5A]/25">
                  🎉 {combo.offer}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DailyFoodCombos() {
  const combos = useActiveCombos();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex(next);
  }, []);

  const prev = () => {
    if (!combos.length) return;
    go((index - 1 + combos.length) % combos.length, -1);
  };

  const next = useCallback(() => {
    if (!combos.length) return;
    go((index + 1) % combos.length, 1);
  }, [combos.length, go, index]);

  // Clamp index whenever the combo list shrinks
  const safeIndex = combos.length ? Math.min(index, combos.length - 1) : 0;
  useEffect(() => {
    if (combos.length && index >= combos.length) setIndex(combos.length - 1);
  }, [combos.length, index]);

  // Auto-slide
  useEffect(() => {
    if (paused || combos.length <= 1) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, paused, combos.length]);

  if (!combos.length) return null;

  const current = combos[safeIndex];
  if (!current) return null;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0d0402" }}>
      {/* Section label ribbon */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-center py-2.5"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,155,90,0.18), transparent)" }}>
        <div className="flex items-center gap-2.5">
          <span className="h-px w-10 bg-[#C89B5A]/40" />
          <span className="text-[#C89B5A] text-xs font-semibold uppercase tracking-[0.3em]">Daily Food Combos</span>
          <span className="h-px w-10 bg-[#C89B5A]/40" />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative h-[540px] md:h-[600px] lg:h-[640px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={dir} mode="sync">
          <motion.div
            key={current.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <ComboSlide combo={current} />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        {combos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all group"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              aria-label="Previous combo"
            >
              <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all group"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              aria-label="Next combo"
            >
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {combos.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {combos.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to combo ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === index ? "28px" : "8px",
                  height: "8px",
                  background: i === index ? "#C89B5A" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        )}

        {/* Auto-play progress bar */}
        {combos.length > 1 && !paused && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] z-20" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              key={`${current.id}-progress`}
              className="h-full"
              style={{ background: "linear-gradient(90deg, #C89B5A, #E8B87A)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
            />
          </div>
        )}
      </div>

      {/* Slow zoom keyframe */}
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
}
