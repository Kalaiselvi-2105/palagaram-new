import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { MENU } from "@/data/menu";

export function MenuCategories() {
  return (
    <section id="menu" className="py-28 bg-[#FAF8F5] relative">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">
              Explore Our Menu
            </span>
            <span className="h-px w-10 bg-[#C89B5A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#4B352A] mb-4"
          >
            A World of Flavours
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.13 }}
            className="text-[#4B352A]/60 max-w-xl mx-auto text-lg"
          >
            From morning starters to indulgent desserts — every category crafted with pure ingredients
            and generations of tradition.
          </motion.p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MENU.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link href={`/menu/${cat.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-56 shadow-md hover:shadow-xl transition-all duration-500">
                  {/* Real food photograph */}
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Gradient overlay — stronger at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Dish count badge */}
                  <div className="absolute top-3 right-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3 py-1">
                    <span className="text-white/90 text-xs font-medium">{cat.dishes.length} dishes</span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="text-xl font-serif font-bold text-white mb-1 drop-shadow">{cat.name}</h3>
                    <p className="text-white/65 text-xs leading-relaxed mb-3 line-clamp-2">{cat.shortDesc}</p>
                    <div className="flex items-center gap-2 text-white/85 text-xs font-semibold group-hover:text-[#C89B5A] transition-colors">
                      <span>Explore Menu</span>
                      <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom gold accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C89B5A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/menu">
            <button className="inline-flex items-center gap-2 px-8 py-4 border border-[#C89B5A] text-[#C89B5A] rounded-full font-medium hover:bg-[#C89B5A] hover:text-white transition-all duration-300 text-sm shadow-md hover:shadow-[#C89B5A]/30 hover:shadow-lg">
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
