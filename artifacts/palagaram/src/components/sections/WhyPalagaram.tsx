import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Leaf, ShieldCheck, BookOpen, Sparkles, Zap, Users } from "lucide-react";
import { useRef, useState } from "react";

const reasons = [
  {
    icon: Leaf,
    number: "01",
    title: "Fresh Ingredients",
    desc: "Sourced daily from trusted local farms — no preservatives, no compromise on quality.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "100% Vegetarian",
    desc: "Pure, satvik cuisine crafted with devotion — always wholesome, always honest.",
  },
  {
    icon: BookOpen,
    number: "03",
    title: "Traditional Recipes",
    desc: "Recipes passed down through generations — each dish carries a story and a soul.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Premium Hygiene",
    desc: "FSSAI certified with spotless standards — your health is our first ingredient.",
  },
  {
    icon: Zap,
    number: "05",
    title: "Fast Service",
    desc: "Hot food served within minutes — great food should never make you wait.",
  },
  {
    icon: Users,
    number: "06",
    title: "Family Friendly",
    desc: "A warm, welcoming space for every generation — from elders to little ones.",
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
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 280,
    damping: 35,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
    stiffness: 280,
    damping: 35,
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
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "1100px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className="relative rounded-2xl p-7 h-full overflow-hidden cursor-default"
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          background: hovered
            ? "rgba(200,155,90,0.045)"
            : "rgba(255,255,255,0.025)",
          border: hovered
            ? "1px solid rgba(200,155,90,0.42)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: hovered
            ? "0 24px 64px rgba(200,155,90,0.13), 0 0 0 1px rgba(200,155,90,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "none",
          transition:
            "background 0.45s ease, border 0.45s ease, box-shadow 0.45s ease",
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-110%", opacity: 0 }}
          animate={
            hovered
              ? { x: "110%", opacity: 1 }
              : { x: "-110%", opacity: 0 }
          }
          transition={{ duration: 0.65, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(200,155,90,0.07) 40%, rgba(200,155,90,0.14) 50%, rgba(200,155,90,0.07) 60%, transparent 100%)",
          }}
        />

        {/* Decorative number */}
        <span
          className="absolute -right-1 -top-3 text-[6.5rem] font-serif font-bold leading-none select-none pointer-events-none"
          style={{
            color: hovered
              ? "rgba(200,155,90,0.14)"
              : "rgba(200,155,90,0.05)",
            transition: "color 0.5s ease",
          }}
        >
          {reason.number}
        </span>

        {/* Content z layer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon container */}
          <motion.div
            animate={hovered ? { y: -5, scale: 1.08 } : { y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="mb-6"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: hovered
                  ? "rgba(200,155,90,0.18)"
                  : "rgba(255,255,255,0.05)",
                boxShadow: hovered
                  ? "0 0 24px rgba(200,155,90,0.22), inset 0 1px 0 rgba(200,155,90,0.15)"
                  : "none",
                transition: "background 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              <Icon
                className="w-6 h-6 transition-colors duration-400"
                strokeWidth={1.5}
                style={{ color: hovered ? "#C89B5A" : "rgba(234,219,200,0.5)" }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h3
            className="font-serif font-bold text-xl mb-3 transition-colors duration-350"
            style={{ color: hovered ? "#FAF8F5" : "rgba(234,219,200,0.85)" }}
          >
            {reason.title}
          </h3>

          {/* Animated gold divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-[#C89B5A] to-transparent mb-4 origin-left"
            animate={
              hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.35, delay: hovered ? 0.04 : 0 }}
          />

          {/* Description */}
          <p
            className="text-sm leading-relaxed transition-colors duration-350"
            style={{ color: hovered ? "rgba(234,219,200,0.75)" : "rgba(234,219,200,0.35)" }}
          >
            {reason.desc}
          </p>
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(90deg, transparent, rgba(200,155,90,0.65), transparent)"
              : "linear-gradient(90deg, transparent, rgba(200,155,90,0.1), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function WhyPalagaram() {
  return (
    <section id="why" className="py-28 bg-[#1A0E08] relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,90,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Central radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,_rgba(200,155,90,0.055)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/25 to-transparent" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* ── Header ───────────────────────────────────── */}
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

        {/* ── Stats strip ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-0 mb-16"
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

        {/* ── Cards grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <FeatureCard key={r.number} reason={r} index={i} />
          ))}
        </div>

        {/* ── Bottom quote ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center mt-16"
        >
          <p className="font-serif italic text-[#EADBC8]/22 text-lg tracking-wide select-none">
            "Where every meal is a promise kept."
          </p>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/20 to-transparent" />
    </section>
  );
}
