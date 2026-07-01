import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, ArrowRight, Flame, Star } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MENU, searchDishes } from "@/data/menu";

function SpiceMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame key={i} className={`w-3 h-3 ${i < level ? "text-orange-500" : "text-[#4B352A]/20"}`} fill={i < level ? "#f97316" : "none"} />
      ))}
    </div>
  );
}

const FILTERS = ["All", "Best Seller", "Chef's Pick", "New"] as const;
type Filter = typeof FILTERS[number];

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const dishCategoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    MENU.forEach(cat => cat.dishes.forEach(d => { map[d.id] = cat.name; }));
    return map;
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    let dishes = searchDishes(query);
    if (activeFilter === "Best Seller") dishes = dishes.filter(d => d.isBestSeller);
    if (activeFilter === "Chef's Pick") dishes = dishes.filter(d => d.isChefPick);
    if (activeFilter === "New") dishes = dishes.filter(d => d.isNew);
    return dishes;
  }, [query, activeFilter]);

  const totalDishes = MENU.reduce((acc, cat) => acc + cat.dishes.length, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-[#4B352A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,_#C89B5A15_0%,_transparent_70%)]" />
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-2 text-[#EADBC8]/60 text-sm mb-6">
            <Link href="/">
              <span className="hover:text-[#C89B5A] transition-colors cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#C89B5A]">Menu</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F5] mb-4">Our Menu</h1>
          <p className="text-[#EADBC8]/70 text-lg max-w-xl mb-6">
            {totalDishes} dishes across {MENU.length} categories — browse, discover, and order your favourites.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Categories", value: MENU.length },
              { label: "Total Dishes", value: totalDishes },
              { label: "100% Vegetarian", value: "✓" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[#C89B5A] font-serif font-bold text-2xl">{s.value}</p>
                <p className="text-[#EADBC8]/50 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky search bar */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#EADBC8] shadow-sm py-4">
        <div className="container mx-auto px-6 md:px-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B352A]/40" />
            <input
              type="text"
              placeholder="Search any dish, ingredient, or category..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[#EADBC8] focus:border-[#C89B5A] focus:ring-2 focus:ring-[#C89B5A]/15 outline-none text-[#4B352A] text-sm bg-[#FAF8F5]"
              data-testid="input-menu-search"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === f
                    ? "bg-[#4B352A] text-white"
                    : "border border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A]"
                }`}
                data-testid={`button-filter-${f.toLowerCase().replace(/[\s']/g, "-")}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search results */}
      {query && (
        <section className="py-10 bg-[#F6F0E8] border-b border-[#EADBC8]">
          <div className="container mx-auto px-6 md:px-10">
            <p className="text-[#4B352A]/60 text-sm mb-6">
              {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
            </p>
            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map((dish, i) => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white border border-[#EADBC8] rounded-2xl overflow-hidden hover:shadow-md hover:border-[#C89B5A]/30 transition-all"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-2 left-2 flex gap-1">
                        {dish.isBestSeller && (
                          <span className="bg-[#C89B5A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-white" /> Best Seller
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[#C89B5A] text-[10px] uppercase tracking-wider mb-1">{dishCategoryMap[dish.id]}</p>
                      <h3 className="font-serif font-bold text-[#4B352A] mb-1 text-sm">{dish.name}</h3>
                      <p className="text-[#4B352A]/55 text-xs line-clamp-2 mb-3">{dish.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#C89B5A] font-bold">₹{dish.price}</span>
                        <SpiceMeter level={dish.spice} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-[#4B352A]/40 text-center py-8 italic">No dishes match "{query}"</p>
            )}
          </div>
        </section>
      )}

      {/* Category grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-serif font-bold text-[#4B352A] mb-10">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MENU.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/menu/${cat.slug}`}>
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-48 shadow hover:shadow-xl transition-shadow">
                    <img
                      src={cat.bannerImage}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute top-3 right-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-0.5 text-white/90 text-xs">
                      {cat.dishes.length} dishes
                    </div>
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <h3 className="text-xl font-serif font-bold text-white mb-1">{cat.name}</h3>
                      <p className="text-white/60 text-xs mb-3 line-clamp-1">{cat.shortDesc}</p>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium group-hover:text-[#C89B5A] transition-colors">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
