import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, XCircle, Pin, EyeOff, MessageSquare, Flag, ThumbsUp } from "lucide-react";

const REVIEWS = [
  { id: 1, customer: "Rajesh Kumar", rating: 5, text: "Best biryani in Chennai! The Chicken Biryani was absolutely amazing. Will definitely order again. Staff was also very friendly and delivery was super fast.", item: "Chicken Biryani", date: "30 Jun 2026", status: "approved", pinned: true, likes: 24, reply: "Thank you so much for your kind words, Rajesh! We're thrilled you enjoyed our signature Chicken Biryani. See you soon! 🙏" },
  { id: 2, customer: "Priya Sharma", rating: 4, text: "Great food and ambiance. Paneer Butter Masala was creamy and delicious. The naan was a bit too soft for my liking, but overall a great experience.", item: "Paneer Butter Masala", date: "29 Jun 2026", status: "approved", pinned: false, likes: 8, reply: "" },
  { id: 3, customer: "Arjun Nair", rating: 5, text: "Exceptional quality and taste! The Mutton Biryani was cooked to perfection. Every grain of rice was flavorful. This is now my go-to restaurant!", item: "Mutton Biryani", date: "29 Jun 2026", status: "pending", pinned: false, likes: 0, reply: "" },
  { id: 4, customer: "Anonymous User", rating: 2, text: "Delivery was very late. Ordered at 7pm, food arrived at 9:30pm. The food was cold and not fresh. Very disappointing experience.", item: "Fish Curry", date: "28 Jun 2026", status: "pending", pinned: false, likes: 0, reply: "" },
  { id: 5, customer: "Meera Iyer", rating: 5, text: "The best South Indian restaurant experience! Authentic flavors, generous portions. The Fish Curry was absolutely divine. 10/10 would recommend!", item: "Veg Thali", date: "27 Jun 2026", status: "approved", pinned: false, likes: 15, reply: "" },
  { id: 6, customer: "Spammer123", rating: 1, text: "WORST FOOD EVER!! SCAM!! DO NOT ORDER!! THEY STOLE MY MONEY!!", item: "", date: "27 Jun 2026", status: "spam", pinned: false, likes: 0, reply: "" },
  { id: 7, customer: "Karthik R.", rating: 4, text: "Good food, reasonable prices. The prawn fry starter was crispy and well-seasoned. Would love to see more South Indian breakfast options on the menu.", item: "Prawn Fry", date: "26 Jun 2026", status: "approved", pinned: false, likes: 6, reply: "" },
];

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-3.5 h-3.5" style={{ color: i <= rating ? "#d4af37" : "rgba(212,175,55,0.2)" }} fill={i <= rating ? "#d4af37" : "none"} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const [status, setStatus] = useState(review.status);
  const [pinned, setPinned] = useState(review.pinned);
  const [replyText, setReplyText] = useState(review.reply || "");
  const [showReply, setShowReply] = useState(false);
  const [savedReply, setSavedReply] = useState(review.reply || "");

  const statusStyle: Record<string, { bg: string; text: string; border: string }> = {
    approved: { bg: "rgba(34,197,94,0.1)", text: "#4ade80", border: "rgba(34,197,94,0.25)" },
    pending: { bg: "rgba(234,179,8,0.1)", text: "#facc15", border: "rgba(234,179,8,0.25)" },
    hidden: { bg: "rgba(255,255,255,0.06)", text: "rgba(250,246,240,0.4)", border: "rgba(255,255,255,0.1)" },
    spam: { bg: "rgba(239,68,68,0.1)", text: "#f87171", border: "rgba(239,68,68,0.25)" },
  };

  const cfg = statusStyle[status];

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="rounded-2xl border p-4 space-y-3"
      style={{ background: "#110806", borderColor: pinned ? "rgba(212,175,55,0.3)" : status === "spam" ? "rgba(239,68,68,0.2)" : "rgba(212,175,55,0.12)" }}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37" }}>
          {review.customer.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: "#faf6f0" }}>{review.customer}</span>
            {pinned && <Pin className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />}
            <span className="text-xs px-1.5 py-0.5 rounded-full border" style={{ background: cfg?.bg, color: cfg?.text, borderColor: cfg?.border }}>{status}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <StarDisplay rating={review.rating} />
            {review.item && <span className="text-xs" style={{ color: "rgba(212,175,55,0.5)" }}>{review.item}</span>}
            <span className="text-xs" style={{ color: "rgba(250,246,240,0.3)" }}>{review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(250,246,240,0.35)" }}>
          <ThumbsUp className="w-3.5 h-3.5" />
          {review.likes}
        </div>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: "rgba(250,246,240,0.7)" }}>{review.text}</p>

      {/* Saved reply */}
      {savedReply && (
        <div className="ml-4 flex items-start gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)" }}>
          <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#d4af37" }} />
          <div>
            <div className="text-xs font-semibold mb-0.5" style={{ color: "#d4af37" }}>Restaurant Reply</div>
            <span style={{ color: "rgba(250,246,240,0.65)" }}>{savedReply}</span>
          </div>
        </div>
      )}

      {/* Reply input */}
      {showReply && (
        <div className="ml-4 space-y-2">
          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply to this review..."
            rows={3}
            className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "#faf6f0" }}
          />
          <div className="flex gap-2">
            <button onClick={() => { setSavedReply(replyText); setShowReply(false); }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
              Post Reply
            </button>
            <button onClick={() => setShowReply(false)} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.5)" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-1">
        {status === "pending" && (
          <>
            <button onClick={() => setStatus("approved")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}>
              <CheckCircle className="w-3.5 h-3.5" /> Approve
            </button>
            <button onClick={() => setStatus("spam")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
              style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
              <Flag className="w-3.5 h-3.5" /> Spam
            </button>
          </>
        )}
        {status !== "spam" && (
          <>
            <button onClick={() => setPinned(!pinned)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: pinned ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)", color: pinned ? "#d4af37" : "rgba(250,246,240,0.5)", border: `1px solid ${pinned ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.08)"}` }}>
              <Pin className="w-3.5 h-3.5" />{pinned ? "Unpin" : "Pin"}
            </button>
            <button onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <MessageSquare className="w-3.5 h-3.5" /> Reply
            </button>
            <button onClick={() => setStatus(status === "hidden" ? "approved" : "hidden")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,246,240,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <EyeOff className="w-3.5 h-3.5" />{status === "hidden" ? "Show" : "Hide"}
            </button>
          </>
        )}
        {status === "spam" && (
          <button onClick={() => setStatus("approved")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
            style={{ background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }}>
            <CheckCircle className="w-3.5 h-3.5" /> Not Spam
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Pending", "Approved", "Hidden", "Spam"];
  const avgRating = (REVIEWS.filter(r => r.status !== "spam").reduce((s, r) => s + r.rating, 0) / REVIEWS.filter(r => r.status !== "spam").length).toFixed(1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Review Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>Moderate and respond to customer reviews</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="col-span-2 md:col-span-1 rounded-xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.2)" }}>
          <div className="text-3xl font-bold" style={{ color: "#d4af37" }}>{avgRating}★</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>Avg Rating</div>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3" style={{ color: i <= Math.round(+avgRating) ? "#d4af37" : "rgba(212,175,55,0.2)" }} fill={i <= Math.round(+avgRating) ? "#d4af37" : "none"} />)}
          </div>
        </div>
        {[
          { label: "Pending", count: REVIEWS.filter(r => r.status === "pending").length, color: "#facc15" },
          { label: "Approved", count: REVIEWS.filter(r => r.status === "approved").length, color: "#4ade80" },
          { label: "Hidden", count: REVIEWS.filter(r => r.status === "hidden").length, color: "rgba(250,246,240,0.4)" },
          { label: "Spam", count: REVIEWS.filter(r => r.status === "spam").length, color: "#f87171" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4 border" style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
            style={{ background: filter === f ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.04)", color: filter === f ? "#d4af37" : "rgba(250,246,240,0.45)", border: `1px solid ${filter === f ? "rgba(212,175,55,0.3)" : "transparent"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {REVIEWS.filter(r => filter === "All" || r.status.toLowerCase() === filter.toLowerCase()).map(r => <ReviewCard key={r.id} review={r} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}
