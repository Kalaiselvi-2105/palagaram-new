---
name: Palagaram Admin Panel
description: Enterprise admin panel structure, credentials, and routing for the Palagaram restaurant site
---

## Admin Panel

- Route: `/admin` → `src/admin/AdminApp.tsx`
- Login credentials: `admin` / `palagaram@2024`
- Auth stored in `localStorage` key `palagaram_admin_auth`
- All admin code lives in `src/admin/` — never touches customer pages

## Structure

```
src/admin/
  AdminApp.tsx         — Router + AuthContext
  AdminLogin.tsx       — Luxury glassmorphism login
  AdminLayout.tsx      — Sidebar + Header wrapper
  components/
    Sidebar.tsx        — Collapsible nav with badge counts
    AdminHeader.tsx    — Breadcrumb, search, clock, user
  pages/
    Dashboard.tsx      — Live KPIs, charts, recent orders
    Analytics.tsx      — Revenue, peak hours, payment breakdown
    Orders.tsx         — Expandable order cards, status updates
    Kitchen.tsx        — Live kitchen display with timers
    Reservations.tsx   — Calendar + table layout map
    CateringManagement.tsx — CRM for catering enquiries
    MenuManagement.tsx — Toggle availability, badges
    GalleryManagement.tsx  — Photo grid with featured/cover
    Customers.tsx      — VIP/blacklist, expand for history
    Reviews.tsx        — Approve/pin/reply/spam workflow
    AdminNotifications.tsx — Category-filtered notifications
    Offers.tsx         — Coupons with usage bars + offers
    Settings.tsx       — Hours, branding, tax, social links
    Reports.tsx        — Charts + CSV/Excel/PDF export
```

## Design System

- Dark Brown (#0d0604, #110806, #1a0f0a) background
- Gold (#d4af37, #f0c040) primary accent
- Glassmorphism cards with `rgba` borders
- Framer Motion animations throughout
- Recharts for all data visualizations
- All mock data (no backend calls required)

**Why:** Admin is completely decoupled so customer pages are never affected; any future backend integration only touches admin files.

**How to apply:** Add new admin pages to `src/admin/pages/`, import in `AdminApp.tsx` Switch, add nav item to `Sidebar.tsx` NAV_ITEMS array.
