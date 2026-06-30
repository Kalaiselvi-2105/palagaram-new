---
name: Palagaram stack & routes
description: Core architecture decisions for the Palagaram restaurant web app
---

## Stack
- React + Vite + TypeScript + Tailwind CSS v4
- framer-motion, wouter (routing), react-hook-form, shadcn/ui, TanStack Query

## Colors
- Gold: #C89B5A | Dark Brown: #4B352A | Cream: #FAF8F5 | Deep: #2D1A10

## Routing (wouter, base = import.meta.env.BASE_URL)
- / → Home
- /menu → MenuPage
- /menu/:slug → MenuCategoryPage
- /gallery → GalleryPage
- /reservation → ReservationPage (4-step: When/Where/Details/Confirmed)
- /checkout → Checkout
- /order-confirmation?id=&total=&type= → OrderConfirmation

## Cart
- CartProvider wraps entire app in App.tsx
- CartDrawer is rendered globally at App level
- useCart() hook: addItem(dish, category), removeItem, updateQty, openCart, closeCart, itemCount, total

**Why:** CartProvider must be outside Router so CartDrawer (which is rendered at app level) can access cart state regardless of current route.
