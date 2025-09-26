# Jeremy Portfolio Documentation

## Overview

- Next.js 15 (App Router) single-page portfolio for Jeremy Wijaya.
- React 19 + TypeScript with Tailwind CSS for styling and shadcn-inspired UI primitives.
- Focused on immersive-yet-readable presentation: animated hero robot, marquee skill slider, responsive project and contact sections.

## Tech Stack

- **Framework:** Next.js 15.3 (app directory)
- **Runtime:** React 19, TypeScript 5
- **Styling:** Tailwind CSS, tailwind-merge, class-variance-authority
- **3D / Motion:** three.js via @react-three/fiber and @react-three/drei
- **Icons:** lucide-react

## Directory Guide

```text
app/
  layout.tsx                     # Root layout, font setup, metadata
  globals.css                    # Tailwind layers, marquee animation, cursor class
  components/
    animated-background.tsx      # Canvas particle network with cleanup on unmount
    custom-cursor.tsx            # Pointer-following glow cursor + cursor fallback handling
    hero-scene.tsx               # @react-three/fiber scene for the robot hero
    skill-slider.tsx             # Continuous marquee slider for hard skills
  page.tsx                       # Portfolio sections, data arrays, CTA markup
components/ui/                   # Button, card, badge primitives
lib/utils.ts                     # `cn` helper
```

## Page Composition (`app/page.tsx`)

1. Declares arrays for projects, stats, and skills directly inside the component for easy edits.
2. Renders the following sections in order:
   - **Fixed navigation** – Gradient pill on desktop with CTA, compact bar on mobile.
   - **Hero** – Headline, supporting copy, CTA buttons, and the `HeroScene` canvas background.
   - **About** – Stats grid, qualifications card, faux terminal snippet, descriptive copy, hard-skill slider, quick-view badges, and soft-skill bullets.
   - **Projects** – Responsive cards featuring project imagery, tech badges, and links.
   - **Contact** – Clickable cards that open mail, LinkedIn, GitHub, or phone actions.
   - **Footer** – Simple copyright notice.
3. Mounts shared motion layers (`CustomCursor`, `AnimatedBackground`) at the top level.

## Interactive Components

- **CustomCursor**
  - Tracks mouse movement, animates a trailing glow via `requestAnimationFrame`, and toggles the `html.cursor-hidden` class only while the custom cursor is active.
  - Attaches hover listeners to `.cursor-hover` targets, anchors, buttons, and role="button" elements to enlarge the cursor on interaction.
  - Resets visibility when the pointer leaves the document or the page loses visibility.

- **AnimatedBackground**
  - Seeds lightweight particles and connects nearby nodes with lines.
  - Stores the RAF handle and cancels it during cleanup to prevent background CPU usage.
  - Responds to window resize and pointer movement for gentle parallax.

- **HeroScene**
  - Three.js robot built from primitives that follows pointer coordinates.
  - Includes ambient/spot/point lighting and background stars for depth.
  - Applies a dark gradient overlay so hero text stays readable over the canvas.

- **SkillSlider**
  - Duplicates the slides array to create an infinite marquee.
  - Direction buttons flip the animation direction; hover pauses the ticker.
  - Uses Tailwind + CSS custom animation (`skill-marquee`) defined in `globals.css`.

## Styling & UX Notes

- Tailwind tokens keep spacing consistent; gradient borders/glass panels are built with utility classes.
- `html` smooth scrolling enables nav anchors without jump cuts.
- Contact cards use full-card anchors for a larger tap target and accessible link semantics.
- Badges and marquee cards rely on uppercase tracking to match the visual brand.

## Development Tips

- Update imagery in `public/` and adjust metadata in `app/page.tsx` or `app/layout.tsx`.
- When adding new interactive elements, append `.cursor-hover` to opt into custom cursor hover states.
- If you create additional sections, consider wrapping them in cards or gradients consistent with existing components for continuity.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – generate the production bundle
- `npm run start` – serve the production build
- `npm run lint` – run ESLint with the Next.js config

