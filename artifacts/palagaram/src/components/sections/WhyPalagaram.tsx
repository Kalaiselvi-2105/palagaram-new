import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Leaf, ShieldCheck, BookOpen, Sparkles, Zap, Users } from "lucide-react";
import { useRef, useState } from "react";

const reasons = [
  {
    icon: Leaf,
    number: "01",
    title: "Fresh Ingredients",
    desc: "Sourced daily from trusted local farms — no preservatives, ever.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "100% Vegetarian",
    desc: "Pure satvik cuisine — always wholesome, always honest.",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85",
  },
  {
    icon: BookOpen,
    number: "03",
    title: "Traditional Recipes",
    desc: "Passed down through generations — every dish carries a soul.",
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=800&q=85",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Premium Hygiene",
    desc: "FSSAI certified, spotless standards — health is our first ingredient.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=85",
  },
  {
    icon: Zap,
    number: "05",
    title: "Fast Service",
    desc: "Hot food at your table within minutes — no waiting, ever.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85",
  },
  {
    icon: Users,
    number: "06",
    title: "Family Friendly",
    desc: "A warm, welcoming space for every generation at one table.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85",
  },
];

const stats = [
  { value: "38+", label: "Years of Trust" },
  { value: "100%", label: "Vegetarian" },
  { value: "FSSAI", label: "Certified" },
];

function FeatureCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 260,
    damping: 38,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 260,
    damping: 38,
  });

  const Icon = reason.icon;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.09,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "1000px" }}
      className="h-80 md:h-[340px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className="relative w-full h-full rounded-2xl overflow-hidden cursor-default"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? "0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(200,155,90,0.5)"
            : "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
          transition: "box-shadow 0.45s ease",
        }}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={reason.image}
            alt={reason.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Base gradient overlay (always) */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(10,5,2,0.96) 0%, rgba(10,5,2,0.7) 45%, rgba(10,5,2,0.25) 100%)",
            opacity: hovered ? 0.88 : 1,
          }}
        />

        {/* Hover golden tint overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(200,155,90,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Shimmer sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-110%", opacity: 0 }}
          animate={
            hovered ? { x: "110%", opacity: 1 } : { x: "-110%", opacity: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(200,155,90,0.12) 50%, transparent 70%)",
          }}
        />

        {/* Top area: number + icon */}
        <div className="absolute top-5 inset-x-5 flex items-start justify-between">
          {/* Icon badge */}
          <motion.div
            animate={hovered ? { y: -3, scale: 1.1 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: hovered
                ? "rgba(200,155,90,0.25)"
                : "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: hovered
                ? "1px solid rgba(200,155,90,0.5)"
                : "1px solid rgba(255,255,255,0.15)",
              boxShadow: hovered ? "0 0 18px rgba(200,155,90,0.3)" : "none",
              transition: "all 0.4s ease",
            }}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={1.5}
              style={{
                color: hovered ? "#C89B5A" : "rgba(255,255,255,0.75)",
                transition: "color 0.4s ease",
              }}
            />
          </motion.div>

          {/* Decorative number */}
          <span
            className="font-serif font-bold text-4xl leading-none select-none"
            style={{
              color: hovered
                ? "rgba(200,155,90,0.55)"
                : "rgba(255,255,255,0.18)",
              transition: "color 0.45s ease",
              textShadow: hovered ? "0 0 20px rgba(200,155,90,0.3)" : "none",
            }}
          >
            {reason.number}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 inset-x-0 p-6">
          {/* Gold divider — slides in on hover */}
          <motion.div
            className="h-px origin-left mb-4"
            style={{
              background:
                "linear-gradient(90deg, #C89B5A, rgba(200,155,90,0.2))",
            }}
            animate={
              hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.38, ease: "easeOut" }}
          />

          <motion.h3
            className="font-serif font-bold text-xl text-white mb-2 leading-snug"
            animate={hovered ? { y: -2 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
          >
            {reason.title}
          </motion.h3>

          <motion.p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(234,219,200,0.7)" }}
            animate={
              hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
            }
            transition={{ duration: 0.35, delay: hovered ? 0.06 : 0 }}
          >
            {reason.desc}
          </motion.p>
        </div>

        {/* Bottom gold glow line */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-[2px]"
          animate={{
            background: hovered
              ? "linear-gradient(90deg, transparent, rgba(200,155,90,0.8), transparent)"
              : "linear-gradient(90deg, transparent, rgba(200,155,90,0.15), transparent)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function WhyPalagaram() {
  return (
    <section id="why" className="py-28 bg-[#1A0E08] relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,90,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Central radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_40%,_rgba(200,155,90,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/25 to-transparent" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-5"
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.3em] text-xs font-semibold">
              Our Promise
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C89B5A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F5] mb-5 leading-tight"
          >
            Why Choose{" "}
            <span className="text-[#C89B5A]">Palagaram</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.17 }}
            className="text-[#EADBC8]/45 text-base max-w-lg mx-auto leading-relaxed"
          >
            Over 38 years of trust, built one dish at a time — here's what
            makes us different.
          </motion.p>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="text-center px-10 md:px-16 py-6">
                <p className="text-2xl md:text-3xl font-serif font-bold text-[#C89B5A] mb-1">
                  {s.value}
                </p>
                <p className="text-[#EADBC8]/40 text-[10px] uppercase tracking-[0.22em]">
                  {s.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="h-10 w-px bg-[#C89B5A]/20" />
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <FeatureCard key={r.number} reason={r} index={i} />
          ))}
        </div>

        {/* ── Bottom quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="font-serif italic text-[#EADBC8]/25 text-lg tracking-wide select-none">
            "Where every meal is a promise kept."
          </p>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/20 to-transparent" />
    </section>
  );
}
