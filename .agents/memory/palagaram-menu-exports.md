---
name: menu.ts exports required
description: All functions/constants that must be exported from menu.ts for the app to compile
---

## Required exports from src/data/menu.ts
- `MENU` — MenuCategory[] array
- `getCategoryBySlug(slug)` — used by MenuCategoryPage
- `getAllDishes()` — general utility
- `searchDishes(query)` — used by Menu.tsx for global search
- `FEATURED_DISHES` — Dish[] array used by ChefSignature.tsx
- Types: `Dish`, `MenuCategory`, `SpiceLevel`

**Why:** Multiple components import from menu.ts; if any export is missing, Vite throws HMR error for ALL files that import from menu.ts (not just the one that needs the missing export).
