# Nija City Club

Members-only private club website for the NIJA brand. Built with Next.js App Router, TypeScript, and Tailwind CSS v4.

Shares a design-token foundation with **NIJA Luxury Wellness** (`../NIJA Luxury Wellness Website`) so shared UI can later be extracted into a common package without a rewrite.

## Architecture

| Layer | Path | Purpose |
| --- | --- | --- |
| Design tokens | `app/globals.css`, `tailwind.config.ts` | Shared NIJA palette/type (ink, cream, sand, line) + City Club accent |
| UI primitives | `components/ui/` | Portable: Section, Button, AmbianceHero, ImageBlock, Pricing-ready Card, CTABanner, Reveal |
| Club compositions | `components/club/` | MegaMenu, PricingCard / MembershipTierCard, ServiceCard, ContactForm, SiteFooter |
| Config | `config/` | Navigation, site constants, content/pricing — mega menu is data-driven |

Wellness deep-link uses `NEXT_PUBLIC_WELLNESS_SITE_URL` (see `.env.example`).

## Routes

- `/` — Home
- `/wellness` — Bridge to Luxury Wellness (external)
- `/fitness` — Single page with anchors (`#gym`, `#personal-trainer`, `#yoga`, `#pilates`, `#recovery`)
- `/swimming` — Pool, training, recovery
- `/cafe`
- `/event-space` — Meetings, treatment, events, private dining
- `/membership`
- `/contact`

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev
```

Images are hard-linked from `../Images` into `public/images/<section>/` to avoid duplicating large assets on disk. Re-run a copy/link script if you refresh source imagery.

## Design notes

- Look: Aman-inspired — full-bleed heroes, whitespace, restrained type, scroll reveals.
- Distinct from Wellness: City Club accent (`--color-accent`), cooler stone bands, amenity/membership rhythm vs treatment-menu rhythm.
- Tokens intentionally mirror Wellness `:root` values for future package extraction.
