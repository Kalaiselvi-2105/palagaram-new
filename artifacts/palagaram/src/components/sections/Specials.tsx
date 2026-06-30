import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const specials = [
  { name: "Breakfast Combo", desc: "Idli, Dosa, Vada & Filter Coffee", price: 180, badge: "Morning Special" },
  { name: "Family Meals", desc: "6 Dishes Full Thali for sharing", price: 350, badge: "Lunch Exclusive" },
  { name: "Weekend Special", desc: "Special Chettinad Feast", price: 220, badge: "Sat-Sun Only" },
  { name: "Chef's Recommendation", desc: "Podi Dosa & Sweet Kesari", price: 260, badge: "Must Try" },
];

export function Specials() {
  return (
    <section id="specials" className="py-24 bg-[#4B352A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C89B5A] via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="h-[1px] w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">Today's Highlights</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5]"
            >
              Curated Combos
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="border-[#C89B5A] text-[#C89B5A] hover:bg-[#C89B5A] hover:text-[#4B352A] rounded-full">
              View All Specials
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.map((special, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gradient-to-b from-[#FAF8F5]/10 to-transparent border border-[#FAF8F5]/20 rounded-2xl p-8 relative group hover:border-[#C89B5A]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 bg-[#C89B5A] text-[#4B352A] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                {special.badge}
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#FAF8F5] mb-2 pr-4">{special.name}</h3>
              <p className="text-[#EADBC8]/70 mb-6 text-sm">{special.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[#C89B5A] font-bold text-xl">₹{special.price}</span>
                <Button size="sm" className="bg-[#FAF8F5] text-[#4B352A] hover:bg-[#C89B5A] rounded-full">
                  Order
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
