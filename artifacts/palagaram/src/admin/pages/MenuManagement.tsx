import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, Star, Flame, Tag, ChevronDown } from "lucide-react";

const CATEGORIES = ["All", "Biryani", "Starters", "Curries", "Breads", "Desserts", "Beverages"];

const MENU_ITEMS = [
  { id: 1, name: "Chicken Biryani", category: "Biryani", price: 280, available: true, chefSpecial: true, bestSeller: true, todaySpecial: false, image: "🍛", desc: "Aromatic basmati rice cooked with tender chicken pieces and whole spices" },
  { id: 2, name: "Mutton Biryani", category: "Biryani", price: 380, available: true, chefSpecial: true, bestSeller: true, todaySpecial: true, image: "🍲", desc: "Slow-cooked dum biryani with premium mutton and saffron" },
  { id: 3, name: "Veg Biryani", category: "Biryani", price: 220, available: true, chefSpecial: false, bestSeller: false, todaySpecial: false, image: "🥘", desc: "Fragrant basmati rice with fresh vegetables and herbs" },
  { id: 4, name: "Chicken 65", category: "Starters", price: 180, available: true, chefSpecial: false, bestSeller: true, todaySpecial: false, image: "🍗", desc: "Crispy deep-fried chicken with signature spices" },
  { id: 5, name: "Prawn Fry", category: "Starters", price: 260, available: true, chefSpecial: true, bestSeller: false, todaySpecial: false, image: "🦐", desc: "Masala-coated tiger prawns, shallow fried to perfection" },
  { id: 6, name: "Paneer Butter Masala", category: "Curries", price: 260, available: true, chefSpecial: false, bestSeller: true, todaySpecial: false, image: "🧀", desc: "Cottage cheese in rich, creamy tomato gravy" },
  { id: 7, name: "Fish Curry", category: "Curries", price: 320, available: true, chefSpecial: true, bestSeller: true, todaySpecial: true, image: "🐟", desc: "Traditional Chettinad fish curry with bold spices" },
  { id: 8, name: "Butter Naan", category: "Breads", price: 45, available: true, chefSpecial: false, bestSeller: false, todaySpecial: false, image: "🫓", desc: "Soft leavened bread baked in tandoor with butter" },
  { id: 9, name: "Gulab Jamun", category: "Desserts", price: 80, available: true, chefSpecial: false, bestSeller: false, todaySpecial: false, image: "🟤", desc: "Soft milk solids dumplings soaked in rose-flavored sugar syrup" },
  { id: 10, name: "Payasam", category: "Desserts", price: 90, available: false, chefSpecial: true, bestSeller: false, todaySpecial: false, image: "🍮", desc: "Traditional sweet milk pudding with vermicelli and nuts" },
  { id: 11, name: "Mango Lassi", category: "Beverages", price: 80, available: true, chefSpecial: false, bestSeller: true, todaySpecial: true, image: "🥤", desc: "Chilled yogurt drink blended with fresh Alphonso mangoes" },
];

function ItemCard({ item, onToggle }: { item: typeof MENU_ITEMS[0]; onToggle: (id: number) => void }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: "#110806", borderColor: item.available ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.06)" }}>
      {/* Image area */}
      <div className="h-24 flex items-center justify-center text-5xl relative" style={{ background: "rgba(212,175,55,0.05)" }}>
        {item.image}
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
            <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.3)", color: "#f87171" }}>Unavailable</span>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.todaySpecial && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#d4af37", color: "#1a0f0a" }}>Today</span>}
          {item.bestSeller && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>🔥</span>}
        </div>
        {item.chefSpecial && (
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4" style={{ color: "#d4af37" }} fill="#d4af37" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="font-semibold text-sm" style={{ color: "#faf6f0" }}>{item.name}</div>
        <div className="text-xs mt-0.5 line-clamp-1" style={{ color: "rgba(250,246,240,0.4)" }}>{item.desc}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-bold" style={{ color: "#d4af37" }}>₹{item.price}</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(212,175,55,0.1)", color: "rgba(212,175,55,0.7)" }}>{item.category}</span>
        </div>

        {/* Toggle available */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <div onClick={() => onToggle(item.id)} className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
              style={{ background: item.available ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.12)" }}>
              <motion.div animate={{ x: item.available ? 16 : 2 }} className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow" />
            </div>
            <span className="text-xs" style={{ color: item.available ? "#4ade80" : "rgba(250,246,240,0.3)" }}>
              {item.available ? "Available" : "Off"}
            </span>
          </label>
          <div className="flex gap-1">
            <button className="p-1.5 rounded-lg transition-colors" style={{ color: "rgba(212,175,55,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg transition-colors" style={{ color: "rgba(239,68,68,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuManagement() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAvailability = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, available: !item.available } : item));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Menu Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>{items.length} items · {items.filter(i => i.available).length} available</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border" style={{ background: "rgba(212,175,55,0.08)", color: "#d4af37", borderColor: "rgba(212,175,55,0.2)" }}>
            Bulk Edit
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold" style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
            <Plus className="w-3.5 h-3.5" /> Add Item
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(212,175,55,0.4)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "#110806", border: "1px solid rgba(212,175,55,0.15)", color: "#faf6f0" }}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? items.length : items.filter((i) => i.category === cat).length;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
              style={{ background: activeCategory === cat ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: activeCategory === cat ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${activeCategory === cat ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
              {cat} <span className="opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 text-xs">
        {[
          { label: "Chef Specials", count: items.filter(i => i.chefSpecial).length, color: "#d4af37" },
          { label: "Best Sellers", count: items.filter(i => i.bestSeller).length, color: "#f87171" },
          { label: "Today's Specials", count: items.filter(i => i.todaySpecial).length, color: "#4ade80" },
          { label: "Unavailable", count: items.filter(i => !i.available).length, color: "rgba(250,246,240,0.35)" },
        ].map((s) => (
          <span key={s.label} style={{ color: s.color }}>{s.label}: <strong>{s.count}</strong></span>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} onToggle={toggleAvailability} />
          ))}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16" style={{ color: "rgba(250,246,240,0.3)" }}>
          <Tag className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No items found</p>
        </div>
      )}
    </div>
  );
}
