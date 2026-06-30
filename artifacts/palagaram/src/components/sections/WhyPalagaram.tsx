import { motion } from "framer-motion";
import { Leaf, ShieldCheck, BookOpen, Sparkles, Heart, Users, Zap, Smartphone, ChefHat, Wind, Star, Clock } from "lucide-react";

const values = [
  { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily from trusted local farms" },
  { icon: ShieldCheck, title: "100% Vegetarian", desc: "Pure, satvik meals — always" },
  { icon: BookOpen, title: "Traditional Recipes", desc: "Passed down through generations" },
  { icon: Sparkles, title: "Modern Kitchen", desc: "Hygienic and equipped for precision" },
  { icon: ShieldCheck, title: "Premium Hygiene", desc: "FSSAI certified, spotless standards" },
  { icon: Users, title: "Family Friendly", desc: "A space for every generation" },
  { icon: Zap, title: "Fast Service", desc: "Hot food served within minutes" },
  { icon: Smartphone, title: "Online Ordering", desc: "Order ahead for dine-in or takeaway" },
  { icon: ChefHat, title: "Experienced Chefs", desc: "Over 20 years in South Indian cuisine" },
  { icon: Wind, title: "Air Conditioned", desc: "Cool, comfortable dining all year" },
  { icon: Heart, title: "Warm Hospitality", desc: "You are family from the first visit" },
  { icon: Star, title: "Since 1985", desc: "38 years of trust and tradition" },
];

export function WhyPalagaram() {
  return (
    <section id="why" className="py-24 bg-[#F6F0E8] relative overflow-hidden">
      {/* Subtle top pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C89B5A]/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">
              Our Promise
            </span>
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#4B352A]"
          >
            Why Choose Palagaram
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(200,155,90,0.15)" }}
              className="bg-white/70 backdrop-blur-sm border border-[#EADBC8] rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-shadow cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-[#C89B5A]/10 flex items-center justify-center">
                <v.icon className="w-6 h-6 text-[#C89B5A]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#4B352A] mb-1">{v.title}</h3>
                <p className="text-[#4B352A]/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
