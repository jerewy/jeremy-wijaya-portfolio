# Jeremy Wijaya Portfolio

A clean, modern portfolio website built with Next.js 15, featuring Claude AI-inspired design aesthetics, interactive animations, and a focus on typography and user experience.

## Features

### 🎨 Design System
- **Claude AI aesthetic** - Clean pastel color palette with warm accents
- **Typography focus** - Elegant typography with glitch effects and animations
- **Light/Dark mode** - Smooth theme switching with system preference detection
- **Responsive design** - Mobile-first approach with adaptive layouts

### ✨ Interactive Elements
- **Faulty Terminal Background** - Interactive particle system with cursor reaction and terminal-like glitch effects
- **Target Cursor** - Custom animated cursor that follows mouse movement
- **Scroll Reveal Animations** - Smooth scroll-triggered animations with Framer Motion
- **Logo Loop** - Infinite scrolling technology showcase with hover effects

### 📱 Sections
- **Hero** - Typography-focused introduction with animated glitch text
- **About** - Profile picture with detailed personal story and achievements
- **Skills** - Animated technology logos in an infinite loop
- **Projects** - Enhanced project cards with scroll animations and hover effects
- **Experience Timeline** - Interactive horizontal timeline with detailed journey
- **Certifications** - Preview cards with modal view and CV download
- **Contact** - Clean contact methods with interactive cards

### 🚀 Performance & Accessibility
- **Optimized animations** - Hardware-accelerated CSS and respect for prefers-reduced-motion
- **Mobile responsive** - Touch-friendly interfaces and adaptive animations
- **Semantic HTML** - Proper accessibility structure and ARIA support

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

