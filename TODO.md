# TODO — Palagaram Premium Sections + Cleanup

## Implementation Steps (approved)

1. Create new premium sections/components:
   - `WhatWeOffer` (Premium Service Experience)
   - `FoodFinder` (Interactive multi-step recommendation)
   - `FoodGallery` (Masonry gallery + lightbox)
   - `CustomerTimeline` (Scroll-animated timeline)
   - `LiveExperience` (Live showcase cards)

2. Integrate new sections into homepage:
   - Update `artifacts/palagaram/src/pages/Home.tsx` to render new components without removing existing sections.

3. Enhance existing components to match requirements:
   - `MenuCategories.tsx` (premium interactive category cards & correct category labeling if needed)
   - `ChefSignature.tsx` (ensure content matches requested Chef’s Signature items and includes chef story + recommendation label)
   - `MenuCategory.tsx` (ensure “View Details” button exists/behaves; confirm badges and veg badge)

4. Premium micro-interactions & mobile performance:
   - Add/adjust reusable utility styles for hover lift, glass effects, button ripple, and cursor interactions (if necessary)
   - Ensure images lazy load in new components
   - Ensure animations are performant and responsive on mobile

5. Final cleanup & optimization (post-build):
   - Remove unused files/assets safely (only after verifying no references)
   - Update imports/types
   - Ensure no broken imports, no missing assets
   - Run build/dev checks and route verification

## Progress Tracking
- [ ] Step 1: Create new components
- [ ] Step 2: Update Home.tsx
- [ ] Step 3: Enhance existing components
- [ ] Step 4: Micro-interactions + mobile
- [ ] Step 5: Cleanup + production verification

