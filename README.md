# BharatOS AI Academy — Cinematic Website

An immersive, production-ready cinematic website for **BharatOS AI Academy** in Shahdol, Madhya Pradesh, India.

## Experience

This is not a normal landing page. It is an immersive storytelling experience that feels like entering the future — inspired by Apple Vision Pro, Tesla, OpenAI, Neuralink, Nothing, SpaceX, and Google I/O.

### Website Flow

1. **Boot Sequence** — Terminal-style initialization with animated loading
2. **3D Earth** — Realistic rotating Earth with network lines and AI nodes
3. **Global to India** — Cinematic fly from Earth to Shahdol
4. **Shahdol Marker** — Futuristic glowing marker with academy info
5. **Transition** — Earth dissolves into particles
6. **3D Campus** — Cyberpunk educational campus with glass buildings, holograms, drones
7. **UI Overlay** — Glassmorphism panel with academy branding
8. **Course Modules** — Floating 3D cards for AI courses
9. **Statistics** — Animated counters with impact numbers
10. **Timeline** — Student journey from beginner to AI entrepreneur
11. **Footer** — Night cyber city with glowing BharatOS logo

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Three.js + React Three Fiber + Drei
- GSAP
- Framer Motion
- React Globe GL
- Lenis Smooth Scroll
- Post Processing
- React Icons + Lucide React

## Installation

```bash
# Clone or extract the project
cd bharatos-ai-academy

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Earth/
│   │   └── EarthScene.jsx          # 3D Earth with fly-to animation
│   ├── Campus/
│   │   └── CampusScene.jsx          # Cyberpunk 3D campus
│   ├── Hero/
│   │   └── HeroSection.jsx          # Navbar + scroll indicator
│   ├── Loader/
│   │   └── BootSequence.jsx         # Terminal boot animation
│   ├── Stats/
│   │   └── Statistics.jsx           # Animated counters
│   ├── Timeline/
│   │   └── Timeline.jsx             # Student journey timeline
│   ├── Courses/
│   │   └── CourseModules.jsx        # Floating 3D course cards
│   └── Footer/
│       └── Footer.jsx               # Cyber city footer
├── animations/
│   └── gsapConfig.js                # GSAP animation utilities
├── hooks/
│   ├── useLenis.js                  # Smooth scroll hook
│   ├── useScrollAnimation.js        # Scroll-triggered animations
│   └── useMousePosition.js          # Mouse tracking hook
├── App.jsx                          # Main app orchestrator
├── main.jsx                         # Entry point
└── index.css                        # Global styles + Tailwind
```

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#050505` | Primary dark background |
| Glass | `rgba(255,255,255,0.08)` | Glassmorphism panels |
| Neon Cyan | `#00F5FF` | Primary accent, highlights |
| Neon Purple | `#8A2EFF` | Secondary accent |
| White | `#FFFFFF` | Text, borders |

## Typography

- **Space Grotesk** — Headlines, display text
- **Sora** — UI elements, buttons
- **Inter** — Body text, descriptions

## Performance Features

- Lazy loading with React Suspense
- Code splitting by route/scene
- LOD optimization for 3D assets
- Compressed textures
- 60 FPS target
- Mobile-optimized

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2026 BharatOS AI Academy. All rights reserved.
