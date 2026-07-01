import { useState, useEffect } from "react";
import { type DailyCombo, loadCombos, getActiveCombos, COMBOS_UPDATE_EVENT } from "@/data/dailyCombos";

/** Returns ALL combos (for admin panel) with live updates */
export function useAllCombos() {
  const [combos, setCombos] = useState<DailyCombo[]>(() => loadCombos());

  useEffect(() => {
    const handler = (e: Event) => {
      setCombos((e as CustomEvent<DailyCombo[]>).detail);
    };
    window.addEventListener(COMBOS_UPDATE_EVENT, handler);
    // Also catch cross-tab updates
    const storageHandler = () => setCombos(loadCombos());
    window.addEventListener("storage", storageHandler);
    return () => {
      window.removeEventListener(COMBOS_UPDATE_EVENT, handler);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  return combos;
}

/** Returns only ENABLED combos sorted by order (for homepage) */
export function useActiveCombos() {
  const [combos, setCombos] = useState<DailyCombo[]>(() => getActiveCombos());

  useEffect(() => {
    const update = (e: Event) => {
      const all = (e as CustomEvent<DailyCombo[]>).detail;
      setCombos(all.filter(c => c.enabled).sort((a, b) => a.order - b.order));
    };
    window.addEventListener(COMBOS_UPDATE_EVENT, update);
    const storageHandler = () => setCombos(getActiveCombos());
    window.addEventListener("storage", storageHandler);
    return () => {
      window.removeEventListener(COMBOS_UPDATE_EVENT, update);
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  return combos;
}
