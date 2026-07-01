/**
 * PALAGARAM — Daily Food Combos Data Layer
 * Stored in localStorage, synced via custom events for real-time admin → homepage updates.
 */

export interface DailyCombo {
  id: string;
  name: string;
  shortDesc: string;
  dishes: string[];
  price: number;
  originalPrice?: number;
  offer: string;
  availableTime: string;
  imageUrl: string;
  ctaLabel: string;
  ctaLink: string;
  badge: string;
  enabled: boolean;
  order: number;
  createdAt: string;
}

const STORAGE_KEY = "palagaram_daily_combos";
export const COMBOS_UPDATE_EVENT = "palagaram_combos_update";

const DEFAULT_COMBOS: DailyCombo[] = [
  {
    id: "combo-001",
    name: "South Indian Breakfast Bliss",
    shortDesc: "Start your morning with an authentic Chettinad spread — freshly steamed, stone-ground, and served with love.",
    dishes: ["Soft Idli (4 pcs)", "Crispy Masala Dosa", "Vada (2 pcs)", "Sambar", "3 Chutneys", "Filter Coffee"],
    price: 199,
    originalPrice: 320,
    offer: "Buy 1 Get 1 Free",
    availableTime: "7:00 AM – 11:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1630409351241-e90e7f6a2f82?w=1200&q=85&auto=format&fit=crop",
    ctaLabel: "Order Now",
    ctaLink: "/menu",
    badge: "Today's Special",
    enabled: true,
    order: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "combo-002",
    name: "Royal Lunch Thali",
    shortDesc: "A wholesome feast with unlimited rice, freshly made curries, and a dessert — just like home.",
    dishes: ["Steamed Rice (Unlimited)", "Dal Makhani", "Paneer Butter Masala", "Roti (3 pcs)", "Papad", "Pickle", "Gulab Jamun"],
    price: 279,
    originalPrice: 450,
    offer: "38% Off Today",
    availableTime: "12:00 PM – 3:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=85&auto=format&fit=crop",
    ctaLabel: "View Combo",
    ctaLink: "/menu",
    badge: "Chef's Pick",
    enabled: true,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "combo-003",
    name: "Evening Snack Extravaganza",
    shortDesc: "Golden hour calls for golden bites — crispy, spicy, and freshly fried to perfection.",
    dishes: ["Gobi 65", "Paneer Tikka (4 pcs)", "Masala Chai (2 cups)", "Onion Pakoda", "Mint Chutney"],
    price: 249,
    originalPrice: 380,
    offer: "Combo Saver Deal",
    availableTime: "4:00 PM – 7:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&q=85&auto=format&fit=crop",
    ctaLabel: "Order Now",
    ctaLink: "/menu",
    badge: "Most Popular",
    enabled: true,
    order: 2,
    createdAt: new Date().toISOString(),
  },
];

/** Read all combos from localStorage, falling back to defaults */
export function loadCombos(): DailyCombo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveCombos(DEFAULT_COMBOS);
      return DEFAULT_COMBOS;
    }
    return JSON.parse(raw) as DailyCombo[];
  } catch {
    return DEFAULT_COMBOS;
  }
}

/** Persist combos and dispatch a real-time update event */
export function saveCombos(combos: DailyCombo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combos));
  } catch (e) {
    // Storage quota exceeded — strip base64 images to URL-only and retry
    const slim = combos.map(c => ({
      ...c,
      imageUrl: c.imageUrl.startsWith("data:") ? "" : c.imageUrl,
    }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
      console.warn("[Palagaram] localStorage quota reached — base64 images were cleared. Use image URLs instead.");
    } catch {
      console.error("[Palagaram] Unable to save combos — storage is full.");
    }
  }
  window.dispatchEvent(new CustomEvent(COMBOS_UPDATE_EVENT, { detail: combos }));
}

export function addCombo(combo: Omit<DailyCombo, "id" | "createdAt" | "order">): DailyCombo {
  const combos = loadCombos();
  const newCombo: DailyCombo = {
    ...combo,
    id: `combo-${Date.now()}`,
    order: combos.length,
    createdAt: new Date().toISOString(),
  };
  saveCombos([...combos, newCombo]);
  return newCombo;
}

export function updateCombo(id: string, updates: Partial<DailyCombo>): void {
  const combos = loadCombos().map(c => c.id === id ? { ...c, ...updates } : c);
  saveCombos(combos);
}

export function deleteCombo(id: string): void {
  saveCombos(loadCombos().filter(c => c.id !== id));
}

export function reorderCombos(ids: string[]): void {
  const map = new Map(loadCombos().map(c => [c.id, c]));
  saveCombos(ids.map((id, i) => ({ ...map.get(id)!, order: i })));
}

export function getActiveCombos(): DailyCombo[] {
  return loadCombos()
    .filter(c => c.enabled)
    .sort((a, b) => a.order - b.order);
}
