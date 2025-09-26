# Home Page (`app/page.tsx`)

## Purpose
- Acts as the single landing page for Jeremy Wijaya's portfolio.
- Introduces Jeremy, highlights core skills, showcases recent projects, and provides contact entry points.

## High-Level Flow
1. **Shared UI Layers** – Mounts the animated background and custom cursor once to cover the full viewport.
2. **Navigation** – Displays a floating desktop navigation pill and a compact mobile bar that link to the major sections.
3. **Hero Section** – Combines introductory copy, call-to-action buttons, and the interactive `HeroScene` 3D canvas.
4. **About Section** – Presents statistics, certifications, a faux terminal snippet, and the marquee-style `SkillSlider`.
5. **Projects Section** – Maps over the `projects` array to render responsive cards with imagery, description, and tech badges.
6. **Contact Section** – Renders cards that deep-link to email, LinkedIn, GitHub, and phone actions for quick outreach.
7. **Footer** – Concludes with a copyright notice.

## Key Data Structures
- `stats`: Array of label/value pairs rendered in the About section's grid.
- `qualifications`: Array of certification strings displayed beside the faux terminal block.
- `projects`: Array of portfolio items (title, description, image, tech list, links) used to build the project cards.
- `contactLinks`: Array of contact methods (icon, label, href) rendered as interactive cards.

## Important Components
- `CustomCursor`: Replaces the native pointer with a glowing cursor that reacts to hover targets.
- `AnimatedBackground`: Draws a canvas particle network that subtly reacts to pointer movement.
- `HeroScene`: Three.js scene featuring a robot model and animated lighting.
- `SkillSlider`: Infinite marquee showcasing hard skills, with hover-to-pause and direction buttons.

## Styling Notes
- Tailwind CSS utility classes provide spacing, gradients, and responsive behavior.
- Uses `className` conditions to tweak layouts for mobile vs. desktop breakpoints.
- Badge and button styles come from shared primitives in `components/ui`.

## Extending the Page
- Add new sections by updating the arrays (e.g., push new entries into `projects` or `stats`).
- Reuse existing UI primitives (cards, badges, buttons) for visual consistency.
- When adding new interactive elements, add the `.cursor-hover` class to leverage the custom cursor hover state.
- Remember to supply descriptive alt text for any new imagery in `public/`.

## Related Files
- `app/layout.tsx`: Root layout, metadata, and font configuration.
- `app/components/hero-scene.tsx`: Implementation of the Three.js hero canvas.
- `app/components/skill-slider.tsx`: Logic for the marquee-style skill ticker.
- `app/components/custom-cursor.tsx`: Cursor tracking and trailing glow animation.
- `app/components/animated-background.tsx`: Canvas-based animated particle background.
