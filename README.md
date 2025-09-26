# Jeremy Wijaya Portfolio

A single-page portfolio site built with Next.js and Tailwind CSS to highlight Jeremy Wijaya's engineering journey. The landing page blends a responsive UI with a three.js hero scene so the robot guide follows your pointer without obscuring the copy.

## Features

- **Immersive hero** – A custom three.js robot (`HeroScene`) tracks the visitor's cursor, paired with a dark glassmorphism layout for readable hero messaging.
- **Gradient navigation** – Fixed pill navigation emphasises "Let's collaborate" while collapsing into a compact mobile bar.
- **Hard-skill marquee** – `SkillSlider` renders a continuous ticker with direction controls so every featured technology gets time in view.
- **Projects & contact grid** – Project cards surface live demos and GitHub links; contact methods become full-card links that adapt from grid to stack layouts.
- **Cursor & particle effects** – A trailing-glow cursor activates only when scripts load, while `AnimatedBackground` draws lightweight connective particles behind the content.

## Getting Started

### Prerequisites

- Node.js 18.18 or newer (Next.js 15 requirement)
- npm 9+ (bundled with the recommended Node.js version)

### Installation

```bash
npm install
```

### Local development

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the site. Edits to files under `app/` trigger hot reloads.

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```text
app/
  components/
    animated-background.tsx  # Canvas particle network with requestAnimationFrame cleanup
    custom-cursor.tsx        # Pointer-following glow cursor with class-based cursor fallback
    hero-scene.tsx           # @react-three/fiber robot that looks toward the visitor
    skill-slider.tsx         # Continuous marquee for hard skills with direction controls
  globals.css                # Tailwind layers, scroll behaviour, marquee keyframes
  layout.tsx                 # Root layout and font wiring
  page.tsx                   # Portfolio content, sections, and data arrays
components/ui/               # Reusable button, card, badge primitives
lib/utils.ts                 # `cn` helper for conditional Tailwind classes
```

## Customising Content

- **Hero copy & stats** – Update hero text, stats, project listings, and contact links directly inside `app/page.tsx`.
- **Skills** – Add or remove entries in the `hardSkillSlides`, `quickSkills`, and `softSkills` arrays.
- **Assets** – Place images in `public/` and reference them from the `projects` array for automatic optimisation via `next/image`.
- **Cursor appearance** – Tweak colours, shadows, and animation speeds inside `app/components/custom-cursor.tsx`. The cursor only hides the native pointer while `isVisible` is true.

## Accessibility Notes

- The animated background stops its `requestAnimationFrame` loop when the component unmounts to avoid background CPU usage.
- The custom cursor toggles an `html.cursor-hidden` class so the system cursor remains available if JavaScript fails or visitors disable effects.
- Section headings use semantic HTML and responsive typography for legibility across devices.

