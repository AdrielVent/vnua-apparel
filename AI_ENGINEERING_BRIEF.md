# Engineering Brief: VNUR E-Commerce System Overhaul

This document serves as the ground-truth technical spec sheet for the **VNUR Apparel** website. It provides a precise blueprint for future AI development sessions to cleanly scale, debug, and perfect the store without introducing floating elements or "vibe-coded" layout configurations.

---

## 1. Technical Stack & Architecture

- **Framework:** Next.js (Page Routing, Static HTML Export config `output: 'export'`).
- **Base Style System:** Vanilla CSS with Tailwind CSS bridge mappings, configured via `src/app/globals.css`.
- **Global State Store:** Zustand (`src/store/cartStore.ts`) managing checkout state logic.
- **Fulfillment Pipeline:** Integrated with Printful APIs via custom middleware route configurations (`src/app/api/webhooks/stripe/route.ts`).
- **Target Deployment Platform:** GitHub Pages (Static site path matches base prefix `/vnua-apparel`).

---

## 2. Directory Layout & Routing Blueprint

Future code modifications must strictly respect this file structure. Do not place ad-hoc files outside designated zones:

```
├── public/                     # Static media, icons, and vector SVGs
├── src/
│   ├── app/
│   │   ├── globals.css         # Ground-truth stylesheet (Neo-brutalist variables & tokens)
│   │   ├── layout.tsx          # HTML shell, metadata configuration, font injections
│   │   ├── page.tsx            # Main Hero section matrix, telemetry dashboard, catalog section
│   │   └── api/
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts # Fulfilment middleware (Stripe Webhook -> Printful Order API)
│   ├── components/
│   │   ├── CartHUD.tsx         # Sidebar Cart modal (with items listing, quantifiers, checkout)
│   │   ├── Footer.tsx          # Technical systems index index bar
│   │   └── clothing/
│   │       ├── ClothingNav.tsx # Snapped dashboard navigation header
│   │       ├── ProductCubeCard.tsx # Solid 4px radius cards with depress active triggers
│   │       ├── ScrollProductSpotlight.tsx # Spotlight image viewer modules
│   │       ├── AssemblingCubeGrid.tsx # 3x3 layout color-swatch coordinates block
│   │       ├── LookbookPanel.tsx # Snapped grid-style lookbook outfit combos
│   │       └── SizeFitPanel.tsx # Precision specs, measurement charts, fit notes
│   ├── data/
│   │   └── clothingProducts.ts # Core Product Database schemas
│   └── store/
│       └── cartStore.ts        # Cart CRUD state management (Zustand store)
```

---

## 3. Strict UI Design System Constraints

To maintain a professional, high-fidelity geometric aesthetic, ensure all newly introduced UI components adhere to these variables:

### 3.1 Color Palette
Restricted to a premium primary high-contrast palette. Do not inject soft gradients, glows, or intermediate tints:
- **Crimson:** `#D00000`
- **Cobalt Blue:** `#0046AD`
- **Forest Green:** `#009B48`
- **Vibrant Amber:** `#FFD500`
- **Charcoal Black:** `#1A1A1A` (Used for text, borders, and dark elements)
- **Base Background:** `#FCFCFC`
- **Technical Grid Lines:** `#E5E5E5`

### 3.2 Border & Shadow System (Neo-Geometric)
All items must look like flat physical tiles.
- **Borders:** Must be solid, sharp borders (`2px solid #1A1A1A` or `3px solid #1A1A1A` for active items).
- **Rounding:** Strictly `border-radius: 4px` (or `2px` for subelements). Avoid pill shapes (`rounded-full`) or large roundings (`rounded-2xl`).
- **Shadows:** Hard-edged, flat offsets. Use `box-shadow: 4px 4px 0px #1A1A1A`. Do not use soft drop shadows or blur-radius filters (`box-shadow: 0 4px 20px ...`).

### 3.3 Tactile Hover & Depress Interactions
When a user hovers over an interactive block (such as a card, select button, or check-out CTA), it must depress inward rather than scaling or shifting smoothly:
```css
/* Interactive states */
.interactive-module {
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.interactive-module:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #1A1A1A;
}
.interactive-module:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px #1A1A1A;
}
```

---

## 4. Ground-Truth Data Schemas

The product configuration database inside `src/data/clothingProducts.ts` models product items via the following TypeScript interface structure:

```typescript
export interface ClothingProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  category: 'tee' | 'hoodie' | 'shorts' | 'cap' | 'longsleeve' | 'sweatpants';
  color: string;
  cubeColor: string; // Hex representation of the color module
  material: string;
  fit: 'relaxed' | 'oversized' | 'regular' | 'slim';
  sizes: string[];
  specs: Record<string, string>; // e.g. { GSM: '380 g/m²', Material: '100% Cotton' }
  status: 'active' | 'coming-soon' | 'sold-out';
}
```

---

## 5. Development Workflow Commands

To safely build, test, and deploy code changes:

1. **Verify TypeScript & Turbopack Compilations:**
   ```bash
   npm run build
   ```
2. **Deploy Code Updates to GitHub Pages:**
   Staging and pushing changes to `origin main` triggers a Git repository runner action to compile the code and copy files to the static site root:
   ```bash
   git add .
   git commit -m "Refactor notes and update layouts"
   git push origin main
   ```
