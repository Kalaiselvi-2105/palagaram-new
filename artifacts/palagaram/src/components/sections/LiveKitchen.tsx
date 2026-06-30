import { motion } from "framer-motion";

const Steam = ({ delay = 0, x = 0 }: { delay?: number; x?: number }) => (
  <motion.div
    className="absolute bottom-0 w-3 rounded-full bg-white/20 blur-md"
    style={{ left: `calc(50% + ${x}px)` }}
    initial={{ height: 0, opacity: 0, y: 0 }}
    animate={{
      height: [0, 60, 80, 40, 0],
      opacity: [0, 0.5, 0.3, 0.1, 0],
      y: [0, -40, -80, -120, -160],
      x: [0, x * 0.1, x * -0.1, x * 0.15, 0],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
);

export function LiveKitchen() {
  return (
    <section
      id="kitchen"
      className="relative py-36 overflow-hidden bg-[#2D1A10]"
    >
      {/* Warm radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_80%,_#C89B5A22_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_50%,_#C89B5A18_0%,_transparent_60%)]" />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Steam effects */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none">
        {[-80, -40, 0, 40, 80, 120, -120].map((x, i) => (
          <Steam key={i} delay={i * 0.5} x={x} />
        ))}
      </div>

      {/* Decorative fire glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-16 bg-[#C89B5A]/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="h-[1px] w-8 bg-[#C89B5A]" />
          <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">
            Our Kitchen
          </span>
          <span className="h-[1px] w-8 bg-[#C89B5A]" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif italic font-bold text-[#FAF8F5] leading-tight max-w-4xl mx-auto mb-10"
        >
          "Every dish begins with fire, tradition, and love."
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#EADBC8]/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          From the first flame lit at dawn to the last idli steamed by evening,
          our kitchen hums with the devotion of chefs who have been perfecting
          the same recipes for decades.
        </motion.p>

        {/* Atmospheric ambient bars */}
        <div className="flex items-end justify-center gap-2 h-16 mb-12">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-[#C89B5A]"
              animate={{
                height: [
                  `${20 + Math.sin(i * 0.8) * 15}px`,
                  `${30 + Math.cos(i * 0.6) * 20}px`,
                  `${20 + Math.sin(i * 0.8) * 15}px`,
                ],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5 + (i % 3) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.06,
              }}
            />
          ))}
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { label: "Dawn", detail: "5:30 AM", desc: "Kitchen fires lit, sambar begins" },
            { label: "Morning", detail: "6:00 AM", desc: "First dosas pressed on iron" },
            { label: "Evening", detail: "10:00 PM", desc: "Last guests served, gratefully" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.7 }}
              className="text-center border-t border-[#C89B5A]/30 pt-8"
            >
              <p className="text-[#C89B5A] text-sm uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-[#FAF8F5] text-3xl font-serif font-bold mb-2">{item.detail}</p>
              <p className="text-[#EADBC8]/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
