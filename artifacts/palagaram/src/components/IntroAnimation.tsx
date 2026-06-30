import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const SPICE_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.3) % 90}%`,
  size: 2 + (i % 4),
  delay: (i * 0.22) % 3.5,
  duration: 4 + (i % 3),
  color: i % 3 === 0 ? "#C89B5A" : i % 3 === 1 ? "#E8CFA0" : "#FAF8F5",
}));

const STEAM_WISPS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${38 + i * 4}%`,
  delay: i * 0.5,
  width: 3 + i,
}));

function BananaLeafPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="leaf-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 10 Q60 40 40 70 Q20 40 40 10Z" fill="#C89B5A" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#C89B5A" strokeWidth="0.8" />
          <line x1="40" y1="25" x2="55" y2="35" stroke="#C89B5A" strokeWidth="0.4" />
          <line x1="40" y1="35" x2="57" y2="42" stroke="#C89B5A" strokeWidth="0.4" />
          <line x1="40" y1="45" x2="55" y2="52" stroke="#C89B5A" strokeWidth="0.4" />
          <line x1="40" y1="25" x2="25" y2="35" stroke="#C89B5A" strokeWidth="0.4" />
          <line x1="40" y1="35" x2="23" y2="42" stroke="#C89B5A" strokeWidth="0.4" />
          <line x1="40" y1="45" x2="25" y2="52" stroke="#C89B5A" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-grid)" />
    </svg>
  );
}

function FillingPlate({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - progress);
  return (
    <div className="relative w-20 h-20 flex items-center justify-center mt-8">
      <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#C89B5A20" strokeWidth="3" />
        <circle
          cx="40" cy="40" r="36"
          fill="none"
          stroke="#C89B5A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.15s ease" }}
        />
        <circle cx="40" cy="40" r="26" fill="none" stroke="#C89B5A10" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#C89B5A]/15 flex items-center justify-center">
          <span className="text-[#C89B5A] text-lg font-serif">ப</span>
        </div>
      </div>
    </div>
  );
}

type Phase = "init" | "particles" | "logo" | "tagline" | "tamil" | "loader" | "exit";

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>("init");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("particles"), 100));
    timers.push(setTimeout(() => setPhase("logo"), 500));
    timers.push(setTimeout(() => setPhase("tagline"), 1500));
    timers.push(setTimeout(() => setPhase("tamil"), 2400));
    timers.push(setTimeout(() => setPhase("loader"), 3000));
    timers.push(setTimeout(() => setPhase("exit"), 5200));
    timers.push(setTimeout(() => onComplete(), 5800));

    let raf: number;
    let start: number | null = null;
    const FILL_DURATION = 2000;
    const animateProgress = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      setProgress(Math.min(elapsed / FILL_DURATION, 1));
      if (elapsed < FILL_DURATION) raf = requestAnimationFrame(animateProgress);
    };
    timers.push(setTimeout(() => { raf = requestAnimationFrame(animateProgress); }, 3100));

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  const show = phase !== "exit";
  const showParticles = ["particles", "logo", "tagline", "tamil", "loader"].includes(phase);
  const showLogo = ["logo", "tagline", "tamil", "loader"].includes(phase);
  const showTagline = ["tagline", "tamil", "loader"].includes(phase);
  const showTamil = ["tamil", "loader"].includes(phase);
  const showLoader = phase === "loader";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1A0E08 0%, #2D1510 50%, #1A0E08 100%)" }}
        >
          {/* Banana leaf pattern */}
          <BananaLeafPattern />

          {/* Radial glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,155,90,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Spice particles rising */}
          <AnimatePresence>
            {showParticles && SPICE_PARTICLES.map(p => (
              <motion.div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: p.left,
                  bottom: 0,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  filter: "blur(0.5px)",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, -200 - Math.random() * 300],
                  opacity: [0, 0.6, 0.4, 0],
                  x: [0, (Math.random() - 0.5) * 40],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </AnimatePresence>

          {/* Steam wisps */}
          <AnimatePresence>
            {showLogo && STEAM_WISPS.map(w => (
              <motion.div
                key={w.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: w.left,
                  bottom: "52%",
                  width: w.width,
                  background: "rgba(255,255,255,0.06)",
                  filter: "blur(4px)",
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: [0, 60 + w.id * 12, 0],
                  opacity: [0, 0.4, 0],
                  y: [0, -40, -80],
                }}
                transition={{
                  duration: 3 + w.id * 0.3,
                  repeat: Infinity,
                  delay: w.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </AnimatePresence>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo section */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  key="logo-block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Top rule */}
                  <motion.div
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C89B5A]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C89B5A]" />
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C89B5A]" />
                  </motion.div>

                  {/* Logo glow behind text */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 blur-2xl rounded-full"
                      style={{ background: "rgba(200,155,90,0.2)" }}
                      animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <h1 className="relative text-6xl md:text-8xl font-serif font-bold tracking-[0.15em] text-[#FAF8F5] drop-shadow-lg">
                      PALAGARAM
                    </h1>
                  </div>

                  {/* Bottom rule */}
                  <motion.div
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#C89B5A]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C89B5A]" />
                    <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#C89B5A]" />
                  </motion.div>

                  {/* English tagline */}
                  <AnimatePresence>
                    {showTagline && (
                      <motion.p
                        key="en-tag"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-[#C89B5A] text-sm md:text-base uppercase tracking-[0.35em] font-medium mt-2"
                      >
                        Serving Tradition Since 1985
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Tamil tagline */}
                  <AnimatePresence>
                    {showTamil && (
                      <motion.p
                        key="tamil-tag"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[#EADBC8]/60 text-base md:text-lg font-medium mt-1 tracking-wide"
                        style={{ fontFamily: "'Noto Sans Tamil', serif" }}
                      >
                        நம்பி வாங்க... திருப்தியா சாப்பிட்டு போங்க.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom loader: filling brass plate */}
            <AnimatePresence>
              {showLoader && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-2"
                >
                  <FillingPlate progress={progress} />
                  <motion.p
                    className="text-[#C89B5A]/50 text-xs uppercase tracking-[0.3em]"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Preparing your experience…
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom decorative border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/30 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
