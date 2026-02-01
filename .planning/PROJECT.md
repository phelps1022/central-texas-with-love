# Central Texas with Love

## What This Is

A distinctive, modern website for Central Texas with Love — Evan's handcrafted organic sculpture business in Austin, TX. Each piece features natural driftwood, coral stone, and living air plants that transform under UV light to reveal hidden fluorescent colors. The site showcases products by category (Under $50, Lamps, Table Decor, Other), tells Evan's story, and enables customer inquiries.

## Core Value

**Visitors must immediately understand this is unique, handcrafted art that transforms under UV light, and feel compelled to contact Evan about purchasing a piece.**

The one thing that must work: beautiful product showcase with clear call-to-action to contact.

## Requirements

### Validated

- ✓ React 19 + TypeScript stack — existing
- ✓ Vite 7 build tooling — existing
- ✓ Tailwind CSS 4 styling — existing
- ✓ Framer Motion animations — existing
- ✓ Product images in public/images/hero/ — existing

### Active

**Design System:**
- [ ] Distinctive earthy green/cream color palette (not generic)
- [ ] Modern serif headlines (Fraunces) with accent color on key words
- [ ] Clean sans-serif body text (DM Sans)
- [ ] Bracketed section labels `[ ABOUT ]` style
- [ ] Tag-style category badges on product cards
- [ ] Generous whitespace and asymmetric layouts

**Navigation:**
- [ ] Fixed header with logo and nav links
- [ ] Links: About Me, Under $50, Lamps, Table Decor, Other
- [ ] Contact Us button (CTA style, stands out)
- [ ] Mobile responsive hamburger menu
- [ ] Smooth scroll to sections

**Hero Section:**
- [ ] Large headline with brand message
- [ ] Accent color on key words
- [ ] Subheadline explaining UV transformation feature
- [ ] Hero image or image collage showcasing products
- [ ] CTA buttons: Shop Now, Learn More

**About Section:**
- [ ] Evan's story with family photo
- [ ] Feature grid: Handcrafted, Austin Local, UV Reactive
- [ ] Personal, warm tone

**Product Sections (by category):**
- [ ] Under $50 section with products under $50
- [ ] Lamps section with lamp products
- [ ] Table Decor section with decor products
- [ ] Other section (coming soon placeholder)
- [ ] Product cards with image, name, price, category tags
- [ ] Hover effects and click to view details
- [ ] Product modal with full details, dimensions, weight
- [ ] Natural/UV image toggle in modal

**Contact Section:**
- [ ] Contact form (name, email, subject, message)
- [ ] Delivery options: $20 Austin delivery, free studio pickup
- [ ] Direct contact info

**Footer:**
- [ ] Logo and brand description
- [ ] Quick links to shop categories
- [ ] Contact info and social links
- [ ] Copyright

**Quality:**
- [ ] All product images load properly
- [ ] Single source of truth for product data
- [ ] Clean, consolidated component architecture
- [ ] Responsive across devices

### Out of Scope

- E-commerce/payment processing — contact-first sales model, v2+
- User accounts/authentication — not needed for showcase site
- CMS/admin interface — manual product updates via code
- Backend API — static client-side site
- Analytics — can add later

## Context

**Business Context:**
- Evan is a local Austin artisan creating unique organic sculptures
- Products combine natural materials (driftwood, coral stone, air plants)
- Key differentiator: pieces transform under UV/blacklight to reveal fluorescent colors
- Target: Austin locals, home decor enthusiasts, unique gift seekers
- Sales model: Contact via form/email, local delivery or studio pickup

**Technical Context:**
- Existing React 19 + Vite 7 + Tailwind 4 stack should be preserved
- Framer Motion already available for animations
- Product images already in public/images/hero/
- Current code has duplicate data, unused components — needs consolidation

**Design Direction:**
- Inspired by landscape/garden design sites (reference shared)
- Earthy, organic feel with modern clean execution
- `[ BRACKETED LABELS ]` for sections
- Accent color words in headlines
- Category tags on product cards
- Feature grids with icons
- Generous whitespace, asymmetric layouts

**Skills Being Applied:**
- antigravity/frontend-design — distinctive, non-generic aesthetics
- antigravity/frontend-dev-guidelines — React patterns and organization
- antigravity/canvas-design — design philosophy thinking

## Constraints

- **Stack**: Keep React 19, Vite 7, Tailwind 4, Framer Motion — already configured
- **Deployment**: Static site, no backend required
- **Images**: Use existing images in public/images/hero/
- **Timeline**: Complete rebuild, but leverage existing infrastructure
- **Design**: Must feel handcrafted and unique, NOT generic AI/template aesthetic

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep existing stack | React 19, Vite 7, Tailwind 4 already configured and working | — Pending |
| Earthy green/cream palette | Matches organic nature theme and reference designs | — Pending |
| Bracketed section labels | Creates distinctive, editorial feel from reference | — Pending |
| Single product data source | Eliminates current duplication bug | — Pending |
| Contact-first sales model | No e-commerce complexity, direct relationship with customers | — Pending |

---
*Last updated: 2026-01-31 after initialization*
