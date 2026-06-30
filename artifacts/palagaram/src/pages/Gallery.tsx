import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Instagram, Camera } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Link } from "wouter";
import restaurantPhoto from "@assets/image_1782825302920.png";

const GALLERY_ITEMS = [
  {
    id: 1,
    src: restaurantPhoto,
    alt: "Palagaram Restaurant — Our Family",
    category: "Experience",
    caption: "Guests from across the world visit Palagaram for an authentic South Indian experience.",
    tall: true,
  },
  {
    id: 2,
    src: "/dosa.png",
    alt: "Crispy Masala Dosa",
    category: "Breakfast",
    caption: "Our signature crispy dosa — golden, paper-thin, served with three chutneys and sambar.",
    tall: false,
  },
  {
    id: 3,
    src: "/kitchen.png",
    alt: "Our Live Kitchen",
    category: "Kitchen",
    caption: "Prepared fresh, every single time. Our kitchen is the heart of Palagaram.",
    tall: false,
  },
  {
    id: 4,
    src: "/hero-bg.png",
    alt: "Premium South Indian Cuisine",
    category: "Signature",
    caption: "Every plate is a work of tradition — crafted with recipes passed down since 1985.",
    tall: true,
  },
  {
    id: 5,
    src: restaurantPhoto,
    alt: "International Guests at Palagaram",
    category: "Experience",
    caption: "Welcoming guests from across the globe — hospitality is our first ingredient.",
    tall: false,
    objectPosition: "top",
  },
  {
    id: 6,
    src: "/dosa.png",
    alt: "Morning Breakfast Spread",
    category: "Breakfast",
    caption: "Start your day the Palagaram way — idli, vada, dosa, and our famous filter coffee.",
    tall: false,
    objectPosition: "center",
  },
  {
    id: 7,
    src: "/kitchen.png",
    alt: "Chef at Work",
    category: "Kitchen",
    caption: "Over 20 years of culinary expertise — every dish made with precision and love.",
    tall: true,
    objectPosition: "center",
  },
  {
    id: 8,
    src: restaurantPhoto,
    alt: "The Palagaram Building",
    category: "Venue",
    caption: "Our iconic restaurant in the heart of Chidambaram — a landmark since 1985.",
    tall: false,
    objectPosition: "bottom",
  },
  {
    id: 9,
    src: "/hero-bg.png",
    alt: "Festive Feast",
    category: "Signature",
    caption: "Special festive thalis prepared with care for every celebration.",
    tall: false,
  },
  {
    id: 10,
    src: "/dosa.png",
    alt: "Ghee Roast Dosa",
    category: "Breakfast",
    caption: "A generous drizzle of pure ghee transforms our dosa into an unforgettable experience.",
    tall: true,
    objectPosition: "right",
  },
  {
    id: 11,
    src: restaurantPhoto,
    alt: "Happy Diners",
    category: "Experience",
    caption: "Joy at every table — the true measure of a great meal.",
    tall: false,
    objectPosition: "center",
  },
  {
    id: 12,
    src: "/kitchen.png",
    alt: "Fresh Ingredients Daily",
    category: "Kitchen",
    caption: "We source the freshest local produce every single morning — no compromises.",
    tall: false,
  },
];

const CATEGORIES = ["All", "Experience", "Breakfast", "Kitchen", "Signature", "Venue"];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === active);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero — real restaurant photo as background */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={restaurantPhoto}
            alt="Palagaram Restaurant"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E08]/80 via-[#1A0E08]/75 to-[#1A0E08]/90" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,_#C89B5A10_0%,_transparent_70%)] z-[1]" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center gap-2 text-[#EADBC8]/60 text-sm mb-6">
            <Link href="/">
              <span className="hover:text-[#C89B5A] transition-colors cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#C89B5A]">Gallery</span>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C89B5A]/15 border border-[#C89B5A]/30 flex items-center justify-center flex-shrink-0">
              <Camera className="w-7 h-7 text-[#C89B5A]" />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#FAF8F5] mb-3">Gallery</h1>
              <p className="text-[#EADBC8]/70 text-lg max-w-xl">
                Real moments, real people, real food. Every frame tells the Palagaram story.
              </p>
            </div>
          </div>

          <div className="flex gap-10 mt-10">
            {[
              { label: "Photos", value: `${GALLERY_ITEMS.length}` },
              { label: "Categories", value: `${CATEGORIES.length - 1}` },
              { label: "Years of Tradition", value: "38+" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[#C89B5A] font-serif font-bold text-3xl">{s.value}</p>
                <p className="text-[#EADBC8]/50 text-xs uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-[#EADBC8] shadow-sm py-4">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  active === cat
                    ? "bg-[#4B352A] text-white shadow-sm"
                    : "border border-[#EADBC8] text-[#4B352A] hover:border-[#C89B5A] hover:text-[#C89B5A]"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer border border-[#EADBC8] shadow-sm hover:shadow-2xl hover:shadow-[#C89B5A]/10 transition-all duration-500 mb-4"
                  onClick={() => setLightbox(item)}
                >
                  <div className={`overflow-hidden ${item.tall ? "h-80 sm:h-96" : "h-56 sm:h-64"}`}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ objectPosition: (item as any).objectPosition || "center" }}
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E08]/80 via-[#1A0E08]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="text-[#C89B5A] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{item.category}</span>
                    <h3 className="text-white font-serif font-bold text-base leading-snug mb-1">{item.alt}</h3>
                    <p className="text-[#EADBC8]/70 text-xs leading-relaxed line-clamp-2">{item.caption}</p>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                  {/* Category badge always visible */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[#C89B5A] text-[10px] font-semibold uppercase tracking-wider border border-white/10">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-[#4B352A]/40 py-20 italic text-lg">No photos in this category yet.</p>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-[#4B352A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-widest text-sm font-semibold">Follow Our Journey</span>
            <span className="h-px w-8 bg-[#C89B5A]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#FAF8F5] mb-4">Share Your Palagaram Moment</h2>
          <p className="text-[#EADBC8]/70 mb-8 max-w-md mx-auto">
            Tag us on Instagram with <span className="text-[#C89B5A] font-semibold">#Palagaram1985</span> and be featured in our gallery.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C89B5A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B88A4A] transition-colors shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow @PalagaramRestaurant
          </a>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/94 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full rounded-2xl object-cover max-h-[78vh] shadow-2xl"
                style={{ objectPosition: (lightbox as any).objectPosition || "center" }}
              />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[#C89B5A] text-xs uppercase tracking-widest font-semibold mb-1">{lightbox.category}</p>
                  <h3 className="text-white font-serif font-bold text-xl mb-1">{lightbox.alt}</h3>
                  <p className="text-[#EADBC8]/60 text-sm leading-relaxed max-w-xl">{lightbox.caption}</p>
                </div>
                <span className="text-white/30 text-sm whitespace-nowrap mt-1">Palagaram.com</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
