import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight, GripVertical,
  Clock, Tag, X, Check, ImageIcon, ChevronUp, ChevronDown,
  UtensilsCrossed, ArrowUp, ArrowDown
} from "lucide-react";
import { useAllCombos } from "@/hooks/useDailyCombos";
import { addCombo, updateCombo, deleteCombo, reorderCombos, type DailyCombo } from "@/data/dailyCombos";

/* ─── Blank form ──────────────────────────────────────────────────────────── */
const BLANK: Omit<DailyCombo, "id" | "createdAt" | "order"> = {
  name: "",
  shortDesc: "",
  dishes: [],
  price: 0,
  originalPrice: undefined,
  offer: "",
  availableTime: "",
  imageUrl: "",
  ctaLabel: "Order Now",
  ctaLink: "/menu",
  badge: "",
  enabled: true,
};

/* ─── Image upload → base64 ──────────────────────────────────────────────── */
function useImageUpload(onResult: (dataUrl: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const trigger = () => inputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onResult(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  return { inputRef, trigger, handleChange };
}

/* ─── Combo Form Modal ───────────────────────────────────────────────────── */
interface FormState {
  name: string;
  shortDesc: string;
  dishInput: string;
  dishes: string[];
  price: string;
  originalPrice: string;
  offer: string;
  availableTime: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  badge: string;
  enabled: boolean;
}

function toFormState(c?: Partial<DailyCombo>): FormState {
  return {
    name: c?.name ?? "",
    shortDesc: c?.shortDesc ?? "",
    dishInput: "",
    dishes: c?.dishes ?? [],
    price: c?.price != null ? String(c.price) : "",
    originalPrice: c?.originalPrice != null ? String(c.originalPrice) : "",
    offer: c?.offer ?? "",
    availableTime: c?.availableTime ?? "",
    imageUrl: c?.imageUrl ?? "",
    ctaLabel: c?.ctaLabel ?? "Order Now",
    ctaLink: c?.ctaLink ?? "/menu",
    badge: c?.badge ?? "",
    enabled: c?.enabled ?? true,
  };
}

interface ModalProps {
  editing?: DailyCombo | null;
  onClose: () => void;
}

function ComboModal({ editing, onClose }: ModalProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(editing ?? BLANK));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (key: keyof FormState, val: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const { inputRef, trigger, handleChange } = useImageUpload(url => set("imageUrl", url));

  const addDish = () => {
    const d = form.dishInput.trim();
    if (!d) return;
    set("dishes", [...form.dishes, d]);
    set("dishInput", "");
  };

  const removeDish = (i: number) => set("dishes", form.dishes.filter((_, idx) => idx !== i));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Combo name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.imageUrl.trim()) e.imageUrl = "Banner image is required";
    if (!form.availableTime.trim()) e.availableTime = "Available time is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      shortDesc: form.shortDesc.trim(),
      dishes: form.dishes,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      offer: form.offer.trim(),
      availableTime: form.availableTime.trim(),
      imageUrl: form.imageUrl.trim(),
      ctaLabel: form.ctaLabel.trim() || "Order Now",
      ctaLink: form.ctaLink.trim() || "/menu",
      badge: form.badge.trim(),
      enabled: form.enabled,
    };
    if (editing) {
      updateCombo(editing.id, payload);
    } else {
      addCombo(payload);
    }
    onClose();
  };

  const field = "rounded-xl text-sm px-3.5 py-2.5 outline-none transition-all w-full";
  const fieldStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", color: "#faf6f0" };
  const focusStyle = { borderColor: "#d4af37" };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{ background: "#180c06", border: "1px solid rgba(212,175,55,0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <h2 className="font-bold text-base" style={{ color: "#d4af37" }}>
            {editing ? "Edit Daily Combo" : "Add New Daily Combo"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "rgba(250,246,240,0.4)" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Banner Image */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
              Banner Image *
            </label>
            <div className="flex gap-3 flex-col sm:flex-row">
              <div className="relative flex-1">
                <input
                  value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl}
                  onChange={e => set("imageUrl", e.target.value)}
                  placeholder="Paste image URL here..."
                  className={field}
                  style={fieldStyle}
                  onFocus={e => Object.assign(e.target.style, focusStyle)}
                  onBlur={e => Object.assign(e.target.style, fieldStyle)}
                />
              </div>
              <button onClick={trigger}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.25)" }}>
                <ImageIcon className="w-3.5 h-3.5" /> Upload Image
              </button>
              <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
            </div>
            {form.imageUrl && (
              <div className="relative h-28 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
                <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <span className="absolute top-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-0.5 rounded">Preview</span>
              </div>
            )}
            {errors.imageUrl && <p className="text-xs text-red-400">{errors.imageUrl}</p>}
          </div>

          {/* Combo Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
              Combo Name *
            </label>
            <input
              value={form.name}
              onChange={e => set("name", e.target.value)}
              placeholder="e.g. South Indian Breakfast Bliss"
              className={field}
              style={fieldStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => Object.assign(e.target.style, fieldStyle)}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
              Short Description
            </label>
            <textarea
              value={form.shortDesc}
              onChange={e => set("shortDesc", e.target.value)}
              placeholder="A brief, enticing description..."
              rows={2}
              className={`${field} resize-none`}
              style={fieldStyle}
              onFocus={e => Object.assign(e.target.style, focusStyle)}
              onBlur={e => Object.assign(e.target.style, fieldStyle)}
            />
          </div>

          {/* Dishes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
              Dishes Included
            </label>
            <div className="flex gap-2">
              <input
                value={form.dishInput}
                onChange={e => set("dishInput", e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addDish())}
                placeholder="Type a dish and press Enter or Add"
                className={`${field} flex-1`}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
              <button onClick={addDish}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.25)" }}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.dishes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.dishes.map((d, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full"
                    style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.2)" }}>
                    {d}
                    <button onClick={() => removeDish(i)} className="hover:text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Price (₹) *
              </label>
              <input
                type="number"
                value={form.price}
                onChange={e => set("price", e.target.value)}
                placeholder="e.g. 199"
                className={field}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
              {errors.price && <p className="text-xs text-red-400">{errors.price}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Original Price (₹)
              </label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={e => set("originalPrice", e.target.value)}
                placeholder="e.g. 320 (for strikethrough)"
                className={field}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
            </div>
          </div>

          {/* Offer + Available Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Offer Text
              </label>
              <input
                value={form.offer}
                onChange={e => set("offer", e.target.value)}
                placeholder="e.g. Buy 1 Get 1 Free"
                className={field}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Available Time *
              </label>
              <input
                value={form.availableTime}
                onChange={e => set("availableTime", e.target.value)}
                placeholder="e.g. 7:00 AM – 11:00 AM"
                className={field}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
              {errors.availableTime && <p className="text-xs text-red-400">{errors.availableTime}</p>}
            </div>
          </div>

          {/* Badge + CTA label */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Badge Label
              </label>
              <input
                value={form.badge}
                onChange={e => set("badge", e.target.value)}
                placeholder="e.g. Today's Special"
                className={field}
                style={fieldStyle}
                onFocus={e => Object.assign(e.target.style, focusStyle)}
                onBlur={e => Object.assign(e.target.style, fieldStyle)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.6)" }}>
                Button Label
              </label>
              <select
                value={form.ctaLabel}
                onChange={e => set("ctaLabel", e.target.value)}
                className={field}
                style={fieldStyle}
              >
                <option value="Order Now">Order Now</option>
                <option value="View Combo">View Combo</option>
                <option value="Grab Offer">Grab Offer</option>
                <option value="Book Table">Book Table</option>
              </select>
            </div>
          </div>

          {/* Enable toggle */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#faf6f0" }}>Enable Banner</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>Show this combo on the homepage</p>
            </div>
            <button onClick={() => set("enabled", !form.enabled)}>
              {form.enabled
                ? <ToggleRight className="w-9 h-9" style={{ color: "#4ade80" }} />
                : <ToggleLeft className="w-9 h-9" style={{ color: "rgba(255,255,255,0.3)" }} />}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t flex-shrink-0"
          style={{ borderColor: "rgba(212,175,55,0.15)" }}>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(250,246,240,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
            Cancel
          </button>
          <button onClick={save}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
            <Check className="w-4 h-4" />
            {editing ? "Save Changes" : "Add Combo"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Combo Card (list item) ─────────────────────────────────────────────── */
function ComboCard({
  combo, index, total,
  onEdit, onDelete, onToggle, onMoveUp, onMoveDown,
}: {
  combo: DailyCombo; index: number; total: number;
  onEdit: () => void; onDelete: () => void; onToggle: () => void;
  onMoveUp: () => void; onMoveDown: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#110806",
        border: `1px solid ${combo.enabled ? "rgba(212,175,55,0.22)" : "rgba(255,255,255,0.06)"}`,
        opacity: combo.enabled ? 1 : 0.65,
      }}>
      <div className="flex gap-0">
        {/* Thumbnail */}
        <div className="relative w-28 md:w-40 flex-shrink-0 overflow-hidden">
          <img src={combo.imageUrl} alt={combo.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#110806]/60" />
          {combo.badge && (
            <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#d4af37", color: "#1a0a04" }}>
              {combo.badge}
            </span>
          )}
          {!combo.enabled && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Disabled</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate" style={{ color: "#faf6f0" }}>{combo.name}</h3>
              <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "rgba(250,246,240,0.45)" }}>{combo.shortDesc}</p>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Order */}
              <div className="flex flex-col gap-0.5">
                <button onClick={onMoveUp} disabled={index === 0}
                  className="p-1 rounded transition-colors hover:bg-white/10 disabled:opacity-30"
                  style={{ color: "rgba(212,175,55,0.5)" }}>
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button onClick={onMoveDown} disabled={index === total - 1}
                  className="p-1 rounded transition-colors hover:bg-white/10 disabled:opacity-30"
                  style={{ color: "rgba(212,175,55,0.5)" }}>
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>
              {/* Toggle */}
              <button onClick={onToggle} title={combo.enabled ? "Disable" : "Enable"}>
                {combo.enabled
                  ? <ToggleRight className="w-8 h-8" style={{ color: "#4ade80" }} />
                  : <ToggleLeft className="w-8 h-8" style={{ color: "rgba(255,255,255,0.3)" }} />}
              </button>
              {/* Edit */}
              <button onClick={onEdit}
                className="p-2 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: "rgba(212,175,55,0.6)" }}>
                <Pencil className="w-3.5 h-3.5" />
              </button>
              {/* Delete */}
              {confirmDelete ? (
                <div className="flex items-center gap-1">
                  <button onClick={onDelete}
                    className="p-1.5 rounded-lg text-[10px] font-bold"
                    style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>
                    Confirm
                  </button>
                  <button onClick={() => setConfirmDelete(false)}
                    className="p-1.5 rounded-lg"
                    style={{ color: "rgba(250,246,240,0.4)" }}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)}
                  className="p-2 rounded-lg transition-colors hover:bg-red-500/10"
                  style={{ color: "rgba(239,68,68,0.5)" }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
              style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>
              ₹{combo.price}
              {combo.originalPrice && <span className="opacity-50 line-through ml-1">₹{combo.originalPrice}</span>}
            </span>
            {combo.offer && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
                style={{ background: "rgba(212,175,55,0.08)", color: "rgba(212,175,55,0.7)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <Tag className="w-2.5 h-2.5" /> {combo.offer}
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(250,246,240,0.45)" }}>
              <Clock className="w-2.5 h-2.5" /> {combo.availableTime}
            </span>
            <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(250,246,240,0.35)" }}>
              <UtensilsCrossed className="w-2.5 h-2.5" /> {combo.dishes.length} dishes
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function DailyCombosManagement() {
  const combos = useAllCombos();
  const [modal, setModal] = useState<"add" | DailyCombo | null>(null);

  const sorted = [...combos].sort((a, b) => a.order - b.order);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const ids = sorted.map(c => c.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    reorderCombos(ids);
  };

  const moveDown = (index: number) => {
    if (index === sorted.length - 1) return;
    const ids = sorted.map(c => c.id);
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    reorderCombos(ids);
  };

  const activeCount = combos.filter(c => c.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#faf6f0" }}>Daily Food Combos</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(250,246,240,0.35)" }}>
            Manage the homepage combo banner slider — changes apply instantly.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
          onClick={() => setModal("add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg"
          style={{ background: "linear-gradient(135deg, #d4af37, #f0c040)", color: "#1a0f0a" }}>
          <Plus className="w-4 h-4" /> Add New Combo
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Banners", val: combos.length, color: "#d4af37" },
          { label: "Active (Live)", val: activeCount, color: "#4ade80" },
          { label: "Disabled", val: combos.length - activeCount, color: "rgba(250,246,240,0.4)" },
          { label: "Slides Rotating", val: activeCount > 1 ? "Yes" : activeCount === 1 ? "Static" : "—", color: "#60a5fa" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 border"
            style={{ background: "#110806", borderColor: "rgba(212,175,55,0.12)" }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(250,246,240,0.4)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live preview link */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
        <p className="text-xs" style={{ color: "rgba(250,246,240,0.55)" }}>
          Changes are <strong style={{ color: "#d4af37" }}>live instantly</strong> — open the homepage to see them without refreshing.
        </p>
      </div>

      {/* Combo list */}
      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 gap-4"
          style={{ border: "2px dashed rgba(212,175,55,0.15)", borderRadius: "1rem" }}>
          <UtensilsCrossed className="w-10 h-10" style={{ color: "rgba(212,175,55,0.25)" }} />
          <div className="text-center">
            <p className="text-sm font-semibold" style={{ color: "rgba(250,246,240,0.4)" }}>No combos yet</p>
            <p className="text-xs mt-1" style={{ color: "rgba(250,246,240,0.25)" }}>Click "Add New Combo" to create your first daily special</p>
          </div>
          <button onClick={() => setModal("add")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
            style={{ background: "rgba(212,175,55,0.15)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.25)" }}>
            <Plus className="w-3.5 h-3.5" /> Add First Combo
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.4)" }}>
              Slider Order — use arrows to rearrange
            </p>
          </div>
          <AnimatePresence>
            {sorted.map((combo, i) => (
              <ComboCard
                key={combo.id}
                combo={combo}
                index={i}
                total={sorted.length}
                onEdit={() => setModal(combo)}
                onDelete={() => deleteCombo(combo.id)}
                onToggle={() => updateCombo(combo.id, { enabled: !combo.enabled })}
                onMoveUp={() => moveUp(i)}
                onMoveDown={() => moveDown(i)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <ComboModal
            editing={modal === "add" ? null : modal}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
