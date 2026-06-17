# Energizing Maluku

Platform kolaboratif untuk memperkenalkan potensi alam, manusia, budaya, dan masa depan Maluku kepada Indonesia dan dunia.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations & scroll reveals)
- **lucide-react** (icons)
- **Radix UI** (Tabs, Dialog primitives)
- **recharts** (charts)

## Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, Why Maluku, Explore, Events, Stories, CTA |
| `/about` | About Maluku — History timeline, Geography, Demographics, Traditions, Religion |
| `/ambon` | Ambon City — City profile, City of Music, Creative Economy |
| `/nature` | Nature & Tourism — Filterable destination grid with modal details |
| `/culture` | Culture & Heritage — Tari, Musik (audio player), Bahasa, Kain, Cerita Rakyat |
| `/culinary` | Culinary — Featured dishes with recipes, restaurants, food history |
| `/people` | People & Community — Filterable profiles, documentaries, podcast |
| `/economy` | Economy & Opportunity — 6 sectors, infographics, investor form |
| `/youth` | Youth & Future — Programs, registration, countdown, changemakers |
| `/events` | Events — 3-phase timeline, schedule, guests, registration |
| `/media` | Media & Stories — Articles, videos, photo gallery with lightbox |
| `/collaboration` | Collaboration — Partnership tiers, benefits, inquiry form |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Brand Identity

- **Primary**: Deep Navy `#1B2A4A`
- **Accent 1**: Warm Red/Crimson `#B22222`
- **Accent 2**: Golden Yellow `#C9A84C`
- **Font**: Playfair Display (headings) + Inter (body)

## Project Structure

```
src/
├── app/           # App Router pages
│   ├── about/
│   ├── ambon/
│   ├── nature/
│   ├── culture/
│   ├── culinary/
│   ├── people/
│   ├── economy/
│   ├── youth/
│   ├── events/
│   ├── media/
│   └── collaboration/
├── components/    # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FloatingElements.tsx
│   ├── SectionWrapper.tsx
│   ├── AnimatedCounter.tsx
│   ├── ScrollIndicator.tsx
│   └── FormToast.tsx
└── lib/
    └── utils.ts
```

© 2026 Energizing Maluku. All Rights Reserved.
