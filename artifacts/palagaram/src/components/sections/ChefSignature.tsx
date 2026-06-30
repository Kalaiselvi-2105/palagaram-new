import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { FEATURED_DISHES } from "@/data/menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function SpiceMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame
          key={i}
          className={`w-3.5 h-3.5 ${i < level ? "text-[#E0724A]" : "text-[#FAF8F5]/20"}`}
          fill={i < level ? "#E0724A" : "none"}
        />
      ))}
    </div>
  );
}

export function ChefSignature() {
  const [selected, setSelected] = useState<typeof FEATURED_DISHES[0] | null>(null);

  return (
    <section id="specials" className="py-28 bg-[#4B352A] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,_#C89B5A0D_0%,_transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">
                Chef's Signature & Best Sellers
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5]"
            >
              Dishes We're Known For
            </motion.h2>
          </div>
          <motion.a
            href="/menu"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#C89B5A] border border-[#C89B5A]/40 hover:border-[#C89B5A] hover:bg-[#C89B5A]/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all"
          >
            View All
          </motion.a>
        </div>

        {/* Dishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_DISHES.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(dish)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#FAF8F5]/6 border border-[#FAF8F5]/10 hover:border-[#C89B5A]/50 transition-all duration-400 shadow-md hover:shadow-xl"
            >
              {/* Food image */}
              <div className="h-44 overflow-hidden relative">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {dish.isBestSeller && (
                    <span className="bg-[#C89B5A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" /> Best Seller
                    </span>
                  )}
                  {dish.isChefPick && (
                    <span className="bg-[#4B352A] border border-[#C89B5A]/40 text-[#C89B5A] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Chef's Pick
                    </span>
                  )}
                </div>
                {/* Veg badge */}
                <div className="absolute top-3 right-3 w-5 h-5 border-2 border-green-500 rounded bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif font-bold text-[#FAF8F5] text-lg mb-1.5 leading-snug">{dish.name}</h3>
                <p className="text-[#EADBC8]/60 text-xs leading-relaxed mb-4 line-clamp-2">{dish.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#C89B5A] font-bold text-xl">₹{dish.price}</span>
                  <SpiceMeter level={dish.spice} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dish detail dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-[#FAF8F5] border-[#EADBC8] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Dish Details</DialogTitle>
          <DialogDescription className="sr-only">Detailed dish information</DialogDescription>
          {selected && (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-5/12 h-56 md:h-auto relative flex-shrink-0">
                <img src={selected.imageUrl} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 w-6 h-6 border-2 border-green-500 rounded bg-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="md:w-7/12 p-8 flex flex-col justify-center">
                {(selected.isBestSeller || selected.isChefPick) && (
                  <div className="flex gap-2 mb-3">
                    {selected.isBestSeller && <span className="text-xs bg-[#C89B5A] text-white font-bold px-3 py-1 rounded-full">Best Seller</span>}
                    {selected.isChefPick && <span className="text-xs bg-[#4B352A] text-[#C89B5A] font-bold px-3 py-1 rounded-full border border-[#C89B5A]/30">Chef's Pick</span>}
                  </div>
                )}
                <h3 className="text-3xl font-serif font-bold text-[#4B352A] mb-2">{selected.name}</h3>
                <span className="text-[#C89B5A] font-bold text-2xl mb-4">₹{selected.price}</span>
                <p className="text-[#4B352A]/75 text-sm leading-relaxed mb-5">{selected.desc}</p>
                <div className="flex items-center gap-6 mb-6 py-4 border-t border-b border-[#EADBC8]">
                  <div>
                    <p className="text-[#4B352A]/40 text-[10px] uppercase tracking-widest mb-1">Spice</p>
                    <SpiceMeter level={selected.spice} />
                  </div>
                  <div>
                    <p className="text-[#4B352A]/40 text-[10px] uppercase tracking-widest mb-1">Prep Time</p>
                    <p className="text-[#4B352A] text-sm font-medium">{selected.prepTime}</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-[#C89B5A] hover:bg-[#B88A4A] text-white rounded-full py-6 font-semibold"
                  onClick={() => setSelected(null)}
                >
                  Add to Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
