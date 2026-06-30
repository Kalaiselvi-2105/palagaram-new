import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Star, Image, Grid, Tag } from "lucide-react";

const GALLERY_CATEGORIES = ["All", "Food", "Ambiance", "Events", "Team", "Specials"];

const GALLERY_ITEMS = [
  { id: 1, emoji: "🍛", title: "Chicken Biryani", category: "Food", featured: true, cover: false, size: "large" },
  { id: 2, emoji: "🏛️", title: "Main Dining Hall", category: "Ambiance", featured: true, cover: true, size: "large" },
  { id: 3, emoji: "🦐", title: "Prawn Fry Platter", category: "Food", featured: false, cover: false, size: "medium" },
  { id: 4, emoji: "🎂", title: "Birthday Celebration", category: "Events", featured: false, cover: false, size: "medium" },
  { id: 5, emoji: "👨‍🍳", title: "Our Head Chef", category: "Team", featured: true, cover: false, size: "medium" },
  { id: 6, emoji: "🍲", title: "Mutton Biryani", category: "Food", featured: true, cover: false, size: "small" },
  { id: 7, emoji: "🌟", title: "Chef's Special", category: "Specials", featured: false, cover: false, size: "small" },
  { id: 8, emoji: "🏮", title: "Festival Decor", category: "Events", featured: true, cover: false, size: "small" },
  { id: 9, emoji: "🥂", title: "Private Dining", category: "Ambiance", featured: false, cover: false, size: "small" },
  { id: 10, emoji: "🐟", title: "Fish Curry", category: "Food", featured: false, cover: false, size: "small" },
  { id: 11, emoji: "🍮", title: "Payasam Dessert", category: "Food", featured: false, cover: false, size: "small" },
  { id: 12, emoji: "👥", title: "Kitchen Team", category: "Team", featured: false, cover: false, size: "small" },
];

export default function GalleryManagement() {
  const [items, setItems] = useState(GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = items.filter((item) => activeCategory === "All" || item.category === activeCategory);

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleFeatured = (id: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, featured: !item.featured } : item));
  };

  const setCover = (id: number) => {
    setItems((prev) => prev.map((item) => ({ ...item, cover: item.id === id })));
  };

  const deleteSelected = () => {
    setItems((prev) => prev.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Gallery Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>{items.length} photos · {items.filter(i => i.featured).length} featured</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button onClick={deleteSelected}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
              <Trash2 className="w-3.5 h-3.5" /> Delete {selected.length}
            </button>
          )}
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
            <Upload className="w-3.5 h-3.5" /> Upload Photos
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Photos", val: items.length, color: "#d4af37" },
          { label: "Featured", val: items.filter(i => i.featured).length, color: "#facc15" },
          { label: "Food Photos", val: items.filter(i => i.category === "Food").length, color: "#4ade80" },
          { label: "Events", val: items.filter(i => i.category === "Events").length, color: "#c084fc" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {GALLERY_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
            style={{ background: activeCategory === cat ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: activeCategory === cat ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${activeCategory === cat ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Upload Drop Zone */}
      <motion.div
        whileHover={{ borderColor: "rgba(212,175,55,0.5)" }}
        className="rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer"
        style={{ borderColor: "rgba(212,175,55,0.2)", background: "rgba(212,175,55,0.02)" }}>
        <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "rgba(212,175,55,0.4)" }} />
        <p className="text-sm font-medium" style={{ color: "rgba(212,175,55,0.6)" }}>Drop photos here or click to upload</p>
        <p className="text-xs mt-1" style={{ color: "rgba(250,246,240,0.3)" }}>PNG, JPG, WebP up to 10MB each</p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group border"
              style={{ background: "#110806", borderColor: selected.includes(item.id) ? "rgba(212,175,55,0.6)" : "rgba(212,175,55,0.1)", aspectRatio: "1" }}
              onClick={() => toggleSelect(item.id)}
            >
              {/* Photo */}
              <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: "rgba(212,175,55,0.04)" }}>
                {item.emoji}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"
                style={{ background: "rgba(13,6,4,0.7)" }}>
                <div className="flex justify-between">
                  <button onClick={(e) => { e.stopPropagation(); toggleFeatured(item.id); }}
                    className="p-1.5 rounded-lg transition-colors" style={{ background: item.featured ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.1)", color: item.featured ? "#d4af37" : "rgba(255,255,255,0.6)" }}>
                    <Star className="w-3.5 h-3.5" fill={item.featured ? "#d4af37" : "none"} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setCover(item.id); }}
                    className="p-1.5 rounded-lg text-xs font-bold transition-colors"
                    style={{ background: item.cover ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.1)", color: item.cover ? "#d4af37" : "rgba(255,255,255,0.6)" }}>
                    {item.cover ? "✓" : "C"}
                  </button>
                </div>
                <div>
                  <div className="text-xs font-medium truncate" style={{ color: "#faf6f0" }}>{item.title}</div>
                  <div className="text-xs" style={{ color: "rgba(212,175,55,0.6)" }}>{item.category}</div>
                </div>
              </div>

              {/* Selected indicator */}
              {selected.includes(item.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#d4af37", color: "#1a0f0a" }}>✓</div>
              )}

              {/* Badges */}
              {item.featured && !selected.includes(item.id) && (
                <div className="absolute top-2 left-2">
                  <Star className="w-4 h-4" style={{ color: "#d4af37" }} fill="#d4af37" />
                </div>
              )}
              {item.cover && (
                <div className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: "#d4af37", color: "#1a0f0a" }}>Cover</div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
