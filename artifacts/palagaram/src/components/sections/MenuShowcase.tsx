import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ["South Indian Breakfast", "Mini Tiffin", "Meals", "Biryani", "Beverages"];

const menuData = [
  { id: 1, name: "Ghee Roast Masala Dosa", price: 120, desc: "Crispy golden crepe roasted in pure ghee, stuffed with spiced potato masala.", category: "South Indian Breakfast", image: "/dosa.png" },
  { id: 2, name: "Kanchipuram Idli", price: 80, desc: "Steamed rice cakes spiced with pepper, cumin, and ginger, wrapped in mandharai leaves.", category: "South Indian Breakfast", image: "https://images.unsplash.com/photo-1630409351241-e90e7f6a2f82?w=600&h=400&q=80&auto=format&fit=crop" },
  { id: 3, name: "Ven Pongal", price: 70, desc: "Comforting rice and lentil porridge tempered with black pepper, cumin, and cashews.", category: "South Indian Breakfast", image: "https://images.unsplash.com/photo-1723721891613-e6ce2c2c5219?w=600&h=400&q=80&auto=format&fit=crop" },
  { id: 4, name: "Mini Tiffin", price: 150, desc: "A delightful combination of miniature dosa, idli, vada, pongal, and sweet.", category: "Mini Tiffin", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&q=80&auto=format&fit=crop" },
  { id: 5, name: "Palagaram Special Thali", price: 250, desc: "Authentic South Indian full meal served on a banana leaf with 10+ delicacies.", category: "Meals", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&h=400&q=80&auto=format&fit=crop" },
  { id: 6, name: "Chettinad Veg Biryani", price: 180, desc: "Aromatic basmati rice cooked with fresh vegetables and secret Chettinad spices.", category: "Biryani", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&q=80&auto=format&fit=crop" },
  { id: 7, name: "Degree Filter Coffee", price: 40, desc: "Freshly brewed traditional Kumbakonam degree coffee served in brass dabarah.", category: "Beverages", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&q=80&auto=format&fit=crop" },
];

export function MenuShowcase() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [selectedDish, setSelectedDish] = useState<any>(null);

  const filteredMenu = menuData.filter((item) => item.category === activeCat);

  return (
    <section id="menu" className="py-24 bg-[#F6F0E8] relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">Our Offerings</span>
            <span className="h-[1px] w-8 bg-[#C89B5A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#4B352A]"
          >
            A Symphony of Spices
          </motion.h2>
        </div>

        {/* Categories */}
        <motion.div 
          className="flex overflow-x-auto pb-6 mb-8 gap-4 no-scrollbar justify-start md:justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCat === cat 
                  ? "bg-[#4B352A] text-[#FAF8F5] shadow-md" 
                  : "bg-white text-[#4B352A] hover:bg-[#EADBC8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((dish) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dish.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#E8DFD4] hover:border-[#C89B5A]"
                onClick={() => setSelectedDish(dish)}
              >
                <div className="h-48 bg-[#EADBC8] overflow-hidden relative">
                  {dish.image ? (
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#EADBC8] to-[#C89B5A]/20 flex items-center justify-center">
                      <span className="text-[#4B352A]/20 font-serif italic text-2xl">Palagaram</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium px-6 py-2 border border-white rounded-full">View Details</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-[#4B352A]">{dish.name}</h3>
                    <span className="text-[#C89B5A] font-bold text-lg">₹{dish.price}</span>
                  </div>
                  <p className="text-[#4B352A]/70 text-sm line-clamp-2 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={!!selectedDish} onOpenChange={() => setSelectedDish(null)}>
        <DialogContent className="max-w-2xl bg-[#FAF8F5] border-[#EADBC8] overflow-hidden p-0">
          <DialogTitle className="sr-only">Dish Details</DialogTitle>
          <DialogDescription className="sr-only">Detailed view of the selected dish</DialogDescription>
          {selectedDish && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 h-64 md:h-auto bg-[#EADBC8] relative">
                {selectedDish.image ? (
                  <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EADBC8] to-[#C89B5A]/20 flex items-center justify-center">
                    <span className="text-[#4B352A]/20 font-serif italic text-3xl">Palagaram</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <Badge className="bg-[#EADBC8] text-[#4B352A] w-fit hover:bg-[#EADBC8] mb-4">{selectedDish.category}</Badge>
                <h3 className="text-3xl font-serif font-bold text-[#4B352A] mb-2">{selectedDish.name}</h3>
                <span className="text-[#C89B5A] font-bold text-2xl mb-6">₹{selectedDish.price}</span>
                <p className="text-[#4B352A]/80 text-base mb-8 leading-relaxed">
                  {selectedDish.desc}
                  <br/><br/>
                  Prepared fresh to order using traditional methods and pure ingredients.
                </p>
                <Button className="w-full bg-[#4B352A] text-white hover:bg-[#4B352A]/90 py-6 text-lg rounded-full">
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
