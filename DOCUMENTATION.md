# Jeremy Portfolio Documentation

## Overview

- Single-page portfolio built with Next.js App Router (React 19 + TypeScript) showcasing Jeremy Wijaya's academic background and project work.
- Optional motion layer (aurora particles + custom cursor) can be toggled off by visitors and respects `prefers-reduced-motion`.
- Portfolio copy and metadata live in `app/content/portfolio-data.ts`, keeping the layout component slim.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript + JSX
- **Styling:** Tailwind CSS + class-variance-authority + tailwind-merge + tailwindcss-animate
- **Icons:** lucide-react
- **Font:** Inter via `next/font`

## Key Files

```
app/
  page.tsx                        # Hero, about, projects, contact sections with motion toggle
  content/portfolio-data.ts       # Projects, stats, skills, contact data
  components/
    animated-background.tsx       # Canvas particle field (accepts `enabled`)
    custom-cursor.tsx             # Trailing cursor with ripple feedback (accepts `enabled`)
    reveal.tsx                    # Intersection-observer reveal wrapper
  globals.css                     # Tailwind base + aurora styling + mobile adjustments
components/ui/                    # shadcn-inspired UI primitives
lib/utils.ts                      # `cn` helper
```

## Page Flow (`app/page.tsx`)

1. Reads data from `portfolio-data.ts` and maps icon strings to lucide components.
2. Stores a persisted `effectsEnabled` flag (localStorage) that controls `AnimatedBackground` and `CustomCursor`.
3. Renders four narrative sections:
   - **Hero:** introduction, current areas of focus, CTA buttons.
   - **About:** stats, education highlight, technical toolkit, collaboration style.
   - **Projects:** equal-height cards with tags and external links.
   - **Contact:** contact methods with icons and hover states.
4. Footer prints the current year dynamically.

## Interactive Components

- **AnimatedBackground**
  - Seeds particles based on viewport size, handles window resize/mouse/scroll, and pauses when disabled or when `prefers-reduced-motion` is true.
- **CustomCursor**
  - Lerps toward the pointer, changes glow states on hover/press, emits ripple effects on clicks, and disconnects listeners when disabled.
- **Reveal**
  - Adds `reveal-visible` when elements intersect ~18% of the viewport (optional delay support) for subtle fade-up motion.

## Styling Notes

- CSS custom properties define the dark palette; mobile breakpoint softens the background gradient.
- Utility helpers like `.bg-glass` and aurora classes provide reusable visual elements.
- Tailwind config extends keyframes (aurora, float, fade-up, ripple, etc.) and glow shadows to keep motion language consistent.

## Accessibility & Performance

- Motion toggle allows visitors to disable cursor + particles; preference is remembered across sessions.
- Components guard against SSR/hydration issues by checking `window` and clearing listeners on cleanup.
- Hero uses balanced typography and compact copy for readability on smaller screens.

## Scripts

- `npm run dev` � start development server
- `npm run build` � production build
- `npm run start` � serve production build
- `npm run lint` � ESLint with Next.js configuration

## Future Ideas

- Plug the data module into a CMS or JSON feed for easier updates.
- Add automated visual/UI smoke tests (Playwright/Cypress) for the motion toggle and section reveals.
- Introduce lightweight case-study subpages for deeper dives into individual projects if needed.
