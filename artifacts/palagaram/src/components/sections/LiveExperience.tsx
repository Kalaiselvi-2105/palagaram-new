import { motion } from "framer-motion";
import { Flame, Coffee, Sandwich, Sparkles, Users, PartyPopper } from "lucide-react";

const img = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

const CARDS = [
  {
    key: "dosa",
    title: "Live Dosa",
    desc: "Iron-hot freshness — crispy edges, soft centre, served instantly.",
    icon: <Flame className="w-5 h-5" />,
    imageUrl: img("1565299624946-b28f40a0ae38"),
    accent: "rgba(200,155,90,0.35)",
  },
  {
    key: "filter",
    title: "Filter Coffee",
    desc: "South Indian aroma in every sip — brewed with patience.",
    icon: <Coffee className="w-5 h-5" />,
    imageUrl: img("1511920170033-f8396924c348"),
    accent: "rgba(200,155,90,0.25)",
  },
  {
    key: "juice",
    title: "Fresh Juice",
    desc: "Bright, chilled and naturally refreshing — made for warm days.",
    icon: <Sparkles className="w-5 h-5" />,
    imageUrl: img("1556679343-c7306c1976bc"),
    accent: "rgba(200,155,90,0.25)",
  },
  {
    key: "festival",
    title: "Festival Specials",
    desc: "Seasonal favourites prepared with festive joy.",
    icon: <PartyPopper className="w-5 h-5" />,
    imageUrl: img("1514933651103-005eec06c04b"),
    accent: "rgba(200,155,90,0.35)",
  },
  {
    key: "family",
    title: "Family Dining",
    desc: "Comfort & conversation — premium thalis built for sharing.",
    icon: <Users className="w-5 h-5" />,
    imageUrl: img("1578604478063-1b5a7fb5a62d"),
    accent: "rgba(200,155,90,0.25)",
  },
  {
    key: "party",
    title: "Party Orders",
    desc: "Elegant catering — consistent flavours at celebration scale.",
    icon: <Sandwich className="w-5 h-5" />,
    imageUrl: img("1589302168068-964664d93dc0"),
    accent: "rgba(200,155,90,0.35)",
  },
] as const;

function SteamDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-24 rounded-full bg-white/20 blur-md pointer-events-none"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: [0, 0.35, 0.15, 0], height: [0, 80, 40, 0], y: [0, -30, -60, -90] }}
      transition={{ duration: 3.6, repeat: Infinity, delay, ease: "easeOut" }}
    />
  );
}

export function LiveExperience() {
  return (
    <section id="live-experience" className="py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,_#C89B5A1A_0%,_transparent_55%)]" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-5 justify-center"
          >
            <span className="h-px w-10 bg-[#C89B5A]" />
            <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">Live Experience</span>
            <span className="h-px w-10 bg-[#C89B5A]" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#4B352A]">Feel the warmth. Taste the moment.</h2>
          <p className="text-[#4B352A]/60 max-w-2xl mx-auto mt-4">Premium showcases with smooth motion and subtle atmosphere.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-[#EADBC8] bg-white shadow-sm hover:shadow-md"
            >
              <img
                src={c.imageUrl}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top, ${c.accent}, transparent 55%)` }} />

              {/* Steam on first card */}
              {c.key === "dosa" && <SteamDot delay={0.2} />}

              <div className="relative p-6 min-h-[180px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-[#FAF8F5]">
                    {c.icon}
                  </div>
                  <div className="h-px w-16 bg-white/20" />
                </div>
                <div>
                  <h3 className="text-white font-serif text-2xl font-bold mb-2 drop-shadow">{c.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2">{c.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-white/90 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B5A]" />
                    Explore
                    <span className="text-[#C89B5A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

