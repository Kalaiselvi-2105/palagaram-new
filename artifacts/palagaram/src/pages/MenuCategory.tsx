import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import { useState, useMemo } from "react";
import { ArrowLeft, Flame, Leaf, Search, Star, Clock, X, ShoppingBag, Check } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, MENU, type Dish } from "@/data/menu";
import { useCart } from "@/context/CartContext";

function SpiceMeter({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame key={i} className={`w-3.5 h-3.5 ${i < level ? "text-orange-500" : "text-[#4B352A]/20"}`} fill={i < level ? "#f97316" : "none"} />
      ))}
    </div>
  );
}

function VegBadge() {
  return (
    <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center bg-white flex-shrink-0" title="Pure Vegetarian">
      <div className="w-2 h-2 rounded-full bg-green-500" />
    </div>
  );
}

// ─── Dish Detail Drawer ──────────────────────────────────────────────────────
function DishDrawer({ dish, categoryName, onClose }: {
  dish: Dish;
  categoryName: string;
  bannerImage: string;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(dish, categoryName);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 350 }}
        className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col overflow-y-auto"
      >
        {/* Hero image */}
        <div className="relative h-64 flex-shrink-0">
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Elegant close — simple inline arrow */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
            data-testid="button-drawer-close"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Back</span>
          </button>
          {/* Badges */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            {dish.isBestSeller && (
              <span className="bg-[#C89B5A] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Best Seller
              </span>
            )}
            {dish.isChefPick && (
              <span className="bg-[#4B352A] text-[#C89B5A] text-xs font-bold px-3 py-1 rounded-full border border-[#C89B5A]/30">
                Chef's Pick
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category + Veg */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold">{categoryName}</span>
            <span className="text-[#4B352A]/30">·</span>
            <VegBadge />
            <span className="text-green-600 text-xs font-medium">Pure Veg</span>
          </div>

          <h2 className="text-3xl font-serif font-bold text-[#4B352A] mb-2">{dish.name}</h2>
          <span className="text-[#C89B5A] font-bold text-2xl mb-4">₹{dish.price}</span>
          <p className="text-[#4B352A]/70 leading-relaxed mb-6">{dish.desc}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#F6F0E8] rounded-xl">
            <div>
              <p className="text-[#4B352A]/40 text-[10px] uppercase tracking-widest mb-1.5">Spice Level</p>
              <SpiceMeter level={dish.spice} />
            </div>
            <div>
              <p className="text-[#4B352A]/40 text-[10px] uppercase tracking-widest mb-1.5">Prep Time</p>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C89B5A]" />
                <span className="text-[#4B352A] text-sm font-medium">{dish.prepTime}</span>
              </div>
            </div>
            {dish.tags && dish.tags.length > 0 && (
              <div className="col-span-2">
                <p className="text-[#4B352A]/40 text-[10px] uppercase tracking-widest mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {dish.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-[#EADBC8] text-[#4B352A] text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chef notes */}
          <div className="mb-6 p-4 border-l-4 border-[#C89B5A] bg-[#C89B5A]/5 rounded-r-xl">
            <p className="text-[#C89B5A] text-xs uppercase tracking-wider font-semibold mb-1">Chef's Note</p>
            <p className="text-[#4B352A]/70 text-sm italic leading-relaxed">
              Prepared fresh to order using traditional techniques and pure, locally sourced ingredients. No artificial additives.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-auto">
            <Button
              onClick={handleAdd}
              className={`flex-1 rounded-full py-6 font-semibold text-base shadow-md flex items-center justify-center gap-2 transition-all ${added ? "bg-green-600 hover:bg-green-700" : "bg-[#C89B5A] hover:bg-[#B88A4A]"} text-white`}
            >
              {added ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingBag className="w-4 h-4" /> Add to Order</>}
            </Button>
            <Link href="/reservation">
              <Button variant="outline" className="border-[#4B352A] text-[#4B352A] hover:bg-[#4B352A] hover:text-white rounded-full py-6 px-5" onClick={onClose}>
                Reserve
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function MenuCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);
  const { addItem, openCart } = useCart();

  const category = getCategoryBySlug(slug ?? "");
  const otherCategories = MENU.filter(c => c.slug !== slug).slice(0, 6);

  const filtered = useMemo(() => {
    if (!search) return category?.dishes ?? [];
    const q = search.toLowerCase();
    return (category?.dishes ?? []).filter(
      d => d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) ||
        (d.tags ?? []).some(t => t.toLowerCase().includes(q))
    );
  }, [category, search]);

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-[#4B352A] mb-4">Category not found</h1>
          <Link href="/menu"><span className="text-[#C89B5A] hover:underline cursor-pointer">Back to Menu</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.bannerImage} alt={category.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/"><span className="hover:text-white transition-colors cursor-pointer">Home</span></Link>
            <span>/</span>
            <Link href="/menu"><span className="hover:text-white transition-colors cursor-pointer">Menu</span></Link>
            <span>/</span>
            <span className="text-[#C89B5A]">{category.name}</span>
          </div>
          {/* Elegant back arrow */}
          <Link href="/menu">
            <button className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Menu
            </button>
          </Link>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">{category.name}</h1>
          <p className="text-white/70 text-lg max-w-xl mb-5">{category.shortDesc}</p>
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <span>100% Pure Vegetarian</span>
            </div>
            <span>·</span>
            <span>{category.dishes.length} dishes available</span>
          </div>
        </div>
      </section>

      {/* Sticky search */}
      <div className="sticky top-[64px] z-40 bg-white border-b border-[#EADBC8] shadow-sm py-4">
        <div className="container mx-auto px-6 md:px-10 flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B352A]/40" />
            <input
              type="text"
              placeholder={`Search in ${category.name}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#EADBC8] focus:border-[#C89B5A] outline-none text-sm text-[#4B352A] bg-[#FAF8F5]"
              data-testid="input-category-search"
            />
          </div>
          {search && (
            <p className="text-[#4B352A]/50 text-sm">
              {filtered.length} of {category.dishes.length} dishes
            </p>
          )}
        </div>
      </div>

      {/* Dish Grid */}
      <section className="py-14">
        <div className="container mx-auto px-6 md:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#4B352A]/40 text-lg italic">No dishes found for &quot;{search}&quot;</p>
              <button onClick={() => setSearch("")} className="mt-4 text-[#C89B5A] text-sm hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((dish, i) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.45 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white border border-[#EADBC8] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#C89B5A]/40 transition-all duration-300"
                  data-testid={`card-dish-${dish.id}`}
                >
                  {/* Image */}
                  <div
                    className="h-44 overflow-hidden relative cursor-pointer"
                    onClick={() => setSelected(dish)}
                  >
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
                      {dish.isBestSeller && (
                        <span className="bg-[#C89B5A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-white" /> Best Seller
                        </span>
                      )}
                      {dish.isChefPick && (
                        <span className="bg-[#4B352A] text-[#C89B5A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Chef's Pick
                        </span>
                      )}
                      {dish.isNew && (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
                      )}
                    </div>

                    {/* Veg icon */}
                    <div className="absolute top-3 right-3">
                      <VegBadge />
                    </div>

                    {/* View details on hover */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white/20 backdrop-blur-sm border border-white/40 text-white text-xs font-medium px-4 py-1.5 rounded-full">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div
                      className="flex justify-between items-start mb-1.5 cursor-pointer"
                      onClick={() => setSelected(dish)}
                    >
                      <h3 className="font-serif font-bold text-[#4B352A] text-base leading-snug pr-2">{dish.name}</h3>
                      <span className="text-[#C89B5A] font-bold text-base flex-shrink-0">₹{dish.price}</span>
                    </div>
                    <p className="text-[#4B352A]/60 text-xs leading-relaxed mb-3 line-clamp-2">{dish.desc}</p>
                    <div className="flex items-center justify-between">
                      <SpiceMeter level={dish.spice} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(dish, category.name);
                          openCart();
                        }}
                        className="flex items-center gap-1.5 bg-[#C89B5A] hover:bg-[#B88A4A] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" /> Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="py-14 bg-[#F6F0E8] border-t border-[#EADBC8]">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-2xl font-serif font-bold text-[#4B352A] mb-8">Explore Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {otherCategories.map(cat => (
              <Link key={cat.slug} href={`/menu/${cat.slug}`}>
                <div className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <p className="text-white text-xs font-semibold text-center leading-tight drop-shadow">{cat.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Dish detail drawer */}
      {selected && (
        <DishDrawer
          dish={selected}
          categoryName={category.name}
          bannerImage={category.bannerImage}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
