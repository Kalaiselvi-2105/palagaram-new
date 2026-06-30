/**
 * InstagramSection — Production-Ready Instagram Gallery
 *
 * Current State: Uses temporary Unsplash food photography as stand-ins.
 *
 * To connect your real Instagram content, replace INSTAGRAM_POSTS with data
 * from the Instagram Graph API:
 *
 *   GET https://graph.instagram.com/me/media
 *     ?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count
 *     &access_token=YOUR_LONG_LIVED_TOKEN
 *
 * Each post object maps 1:1 to the InstagramPost interface below.
 * The UI does NOT need to change — just swap the data source.
 *
 * Recommended: store the token in an env var (VITE_INSTAGRAM_TOKEN) and
 * fetch on the backend to keep it private.
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { Instagram, Heart, MessageCircle, Play, ExternalLink, X } from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────────
// DATA — Replace with Instagram Graph API response or CMS data
// ──────────────────────────────────────────────────────────────────────────────

export interface InstagramPost {
  id: string;
  /** Full image URL — from media_url in Graph API */
  imageUrl: string;
  /** "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" — from media_type in Graph API */
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  caption: string;
  likes: number;
  comments: number;
  /** ISO 8601 timestamp — from timestamp in Graph API */
  timestamp: string;
  /** For VIDEO posts, a thumbnail_url separate from media_url */
  thumbnailUrl?: string;
}

const u = (id: string, w = 600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ""}&q=85&auto=format&fit=crop`;

/**
 * TEMPORARY STAND-IN DATA
 * Replace this array with live Instagram Graph API data.
 * The imageUrl values below are royalty-free Unsplash food photos.
 */
const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig01",
    imageUrl: u("1585937421612-70a008356c36", 600, 750),
    mediaType: "IMAGE",
    caption: "Rich & creamy Paneer Butter Masala — our most-ordered dish, every single day. 🧡 #PalagaramChidambaram #PaneerButterMasala",
    likes: 842,
    comments: 37,
    timestamp: "2024-11-20T12:00:00+0000",
  },
  {
    id: "ig02",
    imageUrl: u("1596797038530-2c107229654b", 600, 500),
    mediaType: "IMAGE",
    caption: "Veg Dum Biryani — layered, sealed, slow-cooked. Every grain tells a story. 🍛 #VegBiryani #PalagaramMenu",
    likes: 1205,
    comments: 64,
    timestamp: "2024-11-18T09:30:00+0000",
  },
  {
    id: "ig03",
    imageUrl: u("1565557623262-b51c2513a641", 600, 600),
    mediaType: "VIDEO",
    caption: "Watch our chef craft the perfect Paneer Tikka — straight from the tandoor 🔥 #Tandoor #ChefStories #PalagaramKitchen",
    likes: 2310,
    comments: 118,
    timestamp: "2024-11-15T18:00:00+0000",
    thumbnailUrl: u("1567188040759-fb8a883dc6d8", 600, 600),
  },
  {
    id: "ig04",
    imageUrl: u("1589301760014-d929f3979dbc", 600, 800),
    mediaType: "IMAGE",
    caption: "Our legendary South Indian Veg Meals — served on fresh banana leaf every day from 12 PM 🌿 #ThaliLife #SouthIndianFood",
    likes: 1876,
    comments: 93,
    timestamp: "2024-11-13T11:00:00+0000",
  },
  {
    id: "ig05",
    imageUrl: u("1556679343-c7306c1976bc", 600, 550),
    mediaType: "IMAGE",
    caption: "Our Fresh Lime Soda — pressed to order, every time. The perfect companion for every meal. 🍋 #FreshLime #Refreshing",
    likes: 634,
    comments: 28,
    timestamp: "2024-11-10T14:00:00+0000",
  },
  {
    id: "ig06",
    imageUrl: u("1574894709920-11b28e7367e3", 600, 600),
    mediaType: "CAROUSEL_ALBUM",
    caption: "Butter Naan basket — freshly baked in the tandoor. Swipe to see the full bread spread 🫓 #IndianBread #ButterNaan",
    likes: 957,
    comments: 41,
    timestamp: "2024-11-08T19:00:00+0000",
  },
  {
    id: "ig07",
    imageUrl: u("1547592166-23ac45744acd", 600, 700),
    mediaType: "VIDEO",
    caption: "Rainy evening? Our Manchow Soup with crispy noodles will fix everything ☔🍲 #SoupSeason #PalagaramCafe",
    likes: 1423,
    comments: 76,
    timestamp: "2024-11-05T17:30:00+0000",
    thumbnailUrl: u("1547592166-23ac45744acd", 600, 700),
  },
  {
    id: "ig08",
    imageUrl: u("1601050690597-df0568f70950", 600, 500),
    mediaType: "IMAGE",
    caption: "Warm Gulab Jamun — soft, syrup-soaked, straight from the kitchen. The perfect ending. 🍮 #GulabJamun #IndianDesserts",
    likes: 1689,
    comments: 89,
    timestamp: "2024-11-02T16:00:00+0000",
  },
  {
    id: "ig09",
    imageUrl: u("1646481745893-cdf57abc31a5", 600, 650),
    mediaType: "IMAGE",
    caption: "A morning in the Palagaram kitchen — the aroma you wish you could bottle. 🌅 #MorningKitchen #BehindTheScenes",
    likes: 2054,
    comments: 132,
    timestamp: "2024-10-30T08:00:00+0000",
  },
  {
    id: "ig10",
    imageUrl: u("1563245372-f21724e3856d", 600, 600),
    mediaType: "CAROUSEL_ALBUM",
    caption: "Hakka Noodles + Gobi Manchurian — the duo Chidambaram has been ordering all month. 🌶️ #IndoChinese #HakkaNoodles",
    likes: 743,
    comments: 33,
    timestamp: "2024-10-27T13:00:00+0000",
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// PROFILE CONFIG — replace with your real profile data or Graph API /me response
// ──────────────────────────────────────────────────────────────────────────────
const PROFILE = {
  handle: "@palagaram.com_",
  url: "https://instagram.com/palagaram.com_",
  bio: ["🌿 Pure Vegetarian Multi-Cuisine", "🍛 Rich Flavours • Freshly Cooked", "📍 Chidambaram | Near Nataraja Temple"],
  followers: "10.3K+",
  posts: "1,600+",
  reels: "120+",
};

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────
function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

function MediaBadge({ type }: { type: InstagramPost["mediaType"] }) {
  if (type === "VIDEO") return (
    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm rounded-full p-1.5">
      <Play className="w-3 h-3 text-white fill-white" />
    </div>
  );
  if (type === "CAROUSEL_ALBUM") return (
    <div className="absolute top-2.5 right-2.5 flex gap-0.5">
      {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80" />)}
    </div>
  );
  return null;
}

// ──────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ──────────────────────────────────────────────────────────────────────────────
function Lightbox({ post, onClose }: { post: InstagramPost; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        className="relative bg-[#1A0E08] rounded-2xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="md:w-1/2 aspect-square bg-[#2D1A10] relative flex-shrink-0">
          <img
            src={post.thumbnailUrl ?? post.imageUrl}
            alt={post.caption.slice(0, 60)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {post.mediaType === "VIDEO" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#EADBC8]/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1306C] via-[#F77737] to-[#FCAF45] flex items-center justify-center flex-shrink-0">
              <Instagram className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{PROFILE.handle}</p>
              <p className="text-[#EADBC8]/50 text-xs">Palagaram Restaurant</p>
            </div>
          </div>

          {/* Caption */}
          <p className="text-[#EADBC8]/80 text-sm leading-relaxed flex-1 overflow-y-auto max-h-40">
            {post.caption}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-5 mt-5 pt-4 border-t border-[#EADBC8]/10">
            <div className="flex items-center gap-1.5 text-[#EADBC8]/60 text-sm">
              <Heart className="w-4 h-4" />
              <span>{formatCount(post.likes)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#EADBC8]/60 text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>{formatCount(post.comments)}</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href={PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#E1306C] via-[#F77737] to-[#FCAF45] text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            View on Instagram
          </a>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          data-testid="button-lightbox-close"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────
export function InstagramSection() {
  const [lightbox, setLightbox] = useState<InstagramPost | null>(null);

  // Split into two columns for masonry effect
  const col1 = INSTAGRAM_POSTS.filter((_, i) => i % 2 === 0);
  const col2 = INSTAGRAM_POSTS.filter((_, i) => i % 2 === 1);

  return (
    <section className="py-28 bg-[#1A0E08] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,_#C89B5A08_0%,_transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B5A]/25 to-transparent" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* ── Profile Header ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-[#C89B5A]" />
              <span className="text-[#C89B5A] uppercase tracking-[0.25em] text-xs font-semibold">
                Instagram
              </span>
              <span className="h-px w-8 bg-[#C89B5A]" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] mb-3"
            >
              Life at Palagaram
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-[#EADBC8]/60 text-base max-w-md leading-relaxed"
            >
              Daily specials, kitchen stories, and the warmth you'll find when you walk through our doors.
            </motion.p>
          </div>

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0"
          >
            <a
              href={PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/6 backdrop-blur-sm border border-white/12 rounded-2xl px-6 py-5 hover:border-[#C89B5A]/50 transition-all hover:bg-white/10"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E1306C] via-[#F77737] to-[#FCAF45] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="mr-4">
                <p className="text-[#FAF8F5] font-bold text-base">{PROFILE.handle}</p>
                {PROFILE.bio.map((line, i) => (
                  <p key={i} className="text-[#EADBC8]/55 text-xs leading-relaxed">{line}</p>
                ))}
              </div>
              <ExternalLink className="w-4 h-4 text-[#EADBC8]/30 group-hover:text-[#C89B5A] transition-colors flex-shrink-0" />
            </a>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-8 md:gap-14 mb-12 pb-8 border-b border-[#EADBC8]/8"
        >
          {[
            { label: "Followers", value: PROFILE.followers },
            { label: "Posts", value: PROFILE.posts },
            { label: "Reels", value: PROFILE.reels },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[#C89B5A] font-serif font-bold text-3xl md:text-4xl leading-none">{s.value}</p>
              <p className="text-[#EADBC8]/45 text-xs uppercase tracking-widest mt-1.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Masonry Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 items-start mb-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-2.5 md:col-span-1 lg:col-span-1">
            {col1.map((post, i) => (
              <PostTile key={post.id} post={post} delay={i * 0.06} onClick={() => setLightbox(post)} />
            ))}
          </div>

          {/* Featured centre post (desktop: spans 2 cols) */}
          <div className="hidden md:block md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Large featured */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                onClick={() => setLightbox(INSTAGRAM_POSTS[0])}
                className="col-span-2 group relative overflow-hidden rounded-xl cursor-pointer"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={INSTAGRAM_POSTS[0].imageUrl}
                  alt={INSTAGRAM_POSTS[0].caption.slice(0, 60)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <MediaBadge type={INSTAGRAM_POSTS[0].mediaType} />
                <PostOverlay post={INSTAGRAM_POSTS[0]} />
              </motion.div>

              {/* Row of 2 below */}
              {INSTAGRAM_POSTS.slice(3, 5).map((post, i) => (
                <PostTile key={post.id} post={post} delay={0.15 + i * 0.06} onClick={() => setLightbox(post)} />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2.5 md:col-span-1 lg:col-span-1">
            {col2.map((post, i) => (
              <PostTile key={post.id} post={post} delay={0.05 + i * 0.06} onClick={() => setLightbox(post)} />
            ))}
          </div>
        </div>

        {/* ── Follow CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#EADBC8]/50 text-sm mb-5">
            Follow us for daily specials, kitchen moments, and exclusive previews
          </p>
          <a
            href={PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram-follow"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E1306C] via-[#F77737] to-[#FCAF45] text-white px-9 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-[#E1306C]/20"
          >
            <Instagram className="w-4 h-4" />
            Follow {PROFILE.handle}
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox post={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ──────────────────────────────────────────────────────────────────────────────

function PostOverlay({ post }: { post: InstagramPost }) {
  return (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">
      <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
        <Heart className="w-4 h-4 fill-white" />
        {formatCount(post.likes)}
      </div>
      <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
        <MessageCircle className="w-4 h-4" />
        {formatCount(post.comments)}
      </div>
    </div>
  );
}

function PostTile({
  post,
  delay,
  onClick,
}: {
  post: InstagramPost;
  delay: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl cursor-pointer bg-[#2D1A10]"
    >
      <img
        src={post.imageUrl}
        alt={post.caption.slice(0, 60)}
        className="w-full h-auto object-cover transition-transform duration-600 group-hover:scale-105"
        loading="lazy"
        style={{ display: "block" }}
      />
      <MediaBadge type={post.mediaType} />
      <PostOverlay post={post} />
    </motion.div>
  );
}
