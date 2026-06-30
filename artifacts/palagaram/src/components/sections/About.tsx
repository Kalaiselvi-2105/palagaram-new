import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import restaurantPhoto from "@assets/image_1782825302920.png";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let start = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">Our Heritage</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4B352A] leading-tight">
              A Legacy of Taste,<br/>Preserved Since 1985
            </h2>

            <blockquote className="border-l-4 border-[#C89B5A] pl-6 text-xl md:text-2xl font-serif italic text-[#4B352A]/80 leading-relaxed">
              "We don't just cook food; we recreate the warmth of a grandmother's kitchen for every guest who walks through our doors."
            </blockquote>

            <p className="text-[#4B352A]/70 text-lg leading-relaxed">
              Palagaram began as a modest eatery in the temple town of Chidambaram with a simple philosophy: pure ingredients, unhurried preparation, and heartfelt hospitality. Today, we remain true to those roots. Every idli is steamed to perfection, every dosa crisp and golden, and every cup of filter coffee brewed to awaken the senses.
            </p>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#E8DFD4]">
              {[
                { number: 38, suffix: "+", label: "Years" },
                { number: 100, suffix: "+", label: "Dishes" },
                { number: 1000, suffix: "+", label: "Daily Guests" },
                { number: 4, suffix: ".8", label: "Stars" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-[#4B352A] mb-1">
                    <Counter from={0} to={stat.number} duration={2} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-[#4B352A]/60 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] rounded-t-full overflow-hidden shadow-2xl"
          >
            {/* Real restaurant photo */}
            <img
              src={restaurantPhoto}
              alt="Palagaram Restaurant — welcoming guests"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            {/* Premium overlay to match brand feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A10]/70 via-transparent to-[#2D1A10]/10" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
              <p className="text-[#C89B5A] font-serif italic text-sm tracking-wide">
                Our guests — our greatest pride
              </p>
              <p className="text-[#FAF8F5]/70 text-xs mt-1">
                Palagaram.com, Chidambaram
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
