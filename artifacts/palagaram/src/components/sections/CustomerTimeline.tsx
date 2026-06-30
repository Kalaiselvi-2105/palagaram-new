import { motion } from "framer-motion";

const steps = [
  { title: "Customer Arrives", desc: "A warm welcome as you step into PALAGARAM." },
  { title: "Welcome", desc: "Sincere hospitality with premium attention." },
  { title: "Choose Table", desc: "Pick your ambience — comfortable, elegant, calm." },
  { title: "Order Food", desc: "Tell your taste — our team recommends delights." },
  { title: "Fresh Preparation", desc: "Prepared fresh to order with traditional care." },
  { title: "Served Hot", desc: "Arrives hot, fragrant and beautifully plated." },
  { title: "Enjoy Together", desc: "Share the experience — every bite, together." },
  { title: "Come Again", desc: "Your next favourite starts the moment you leave." },
];

export function CustomerTimeline() {
  return (
    <section id="timeline" className="py-28 bg-[#2D1A10] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_#C89B5A33_0%,_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-5 justify-center"
          >
            <span className="h-px w-10 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">Customer Experience</span>
            <span className="h-px w-10 bg-[#C89B5A]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5]">Storytelling, step by step</h2>
          <p className="text-[#EADBC8]/70 max-w-2xl mx-auto mt-4">Scroll to experience the premium flow — from arrival to come-again moments.</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C89B5A] via-white/10 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {steps.map((s, idx) => {
              const left = idx % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`relative ${left ? "md:pr-10" : "md:pl-10"}`}
                >
                  <div
                    className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg`}
                  >
                    <div className="absolute -top-3 right-6 md:right-auto md:-left-3 w-10 h-10 rounded-full bg-[#C89B5A] flex items-center justify-center border border-white/20">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div className="h-px w-14 bg-[#C89B5A] mb-4" />
                    <h3 className="text-2xl font-serif font-bold text-[#FAF8F5] mb-2">{s.title}</h3>
                    <p className="text-[#EADBC8]/70 leading-relaxed text-sm">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-white/60 text-sm">Every step animates smoothly as you scroll.</div>
        </div>
      </div>
    </section>
  );
}

