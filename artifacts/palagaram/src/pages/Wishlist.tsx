import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { Link } from "wouter";
import { MOCK_WISHLIST, WishlistItem } from "@/data/accountData";
import { useCart } from "@/context/CartContext";

export default function Wishlist() {
  const [items, setItems] = useState(MOCK_WISHLIST);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [removedId, setRemovedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleRemove = (id: string) => {
    setRemovedId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setRemovedId(null);
    }, 350);
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.available) return;
    addItem(
      { id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl, description: item.description, category: item.category } as any,
      item.category
    );
    setAddedIds((prev) => new Set([...prev, item.id]));
    setTimeout(() => setAddedIds((prev) => { const s = new Set(prev); s.delete(item.id); return s; }), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D1A10] via-[#3D2215] to-[#4B2E1A] pt-24 pb-10 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #C89B5A 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/"><span className="text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors">Home</span></Link>
            <span className="text-white/20">›</span>
            <span className="text-[#C89B5A] text-sm font-medium">Wishlist</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-400 fill-rose-400" />
            <div>
              <h1 className="text-white font-black text-3xl">My Wishlist</h1>
              <p className="text-white/50 text-sm mt-0.5">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-4 pb-16">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-rose-50 border-2 border-rose-100 flex items-center justify-center mb-5">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h3 className="text-xl font-bold text-[#2D1A10]">Your wishlist is empty</h3>
            <p className="text-gray-500 text-sm mt-2">Save your favourite dishes here</p>
            <Link href="/menu">
              <button className="mt-6 px-8 py-3 rounded-2xl bg-[#C89B5A] text-white font-bold text-sm hover:bg-[#B88A4A] transition-colors">
                Explore Menu
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => {
                const isAdded = addedIds.has(item.id);
                const isRemoving = removedId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1, x: isRemoving ? 40 : 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(45,26,16,0.14)" }}
                    className="bg-white rounded-3xl border border-[#EADBC8] overflow-hidden transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-white/90 text-[#2D1A10] text-xs font-bold px-4 py-2 rounded-full">Currently Unavailable</span>
                        </div>
                      )}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-red-50 transition-colors group"
                      >
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-[#2D1A10] text-base">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="font-black text-[#2D1A10] text-xl">₹{item.price}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:border-red-200 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.available}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              isAdded
                                ? "bg-emerald-500 text-white"
                                : item.available
                                  ? "bg-[#C89B5A] text-white hover:bg-[#B88A4A]"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            {isAdded ? "Added!" : "Add to Cart"}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
