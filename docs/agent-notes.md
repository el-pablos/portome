# Agent Notes - portome Portfolio

## Audit Summary
- **Framework**: Create React App (react-scripts 5.0.1)
- **React**: 18.2.0
- **Styling**: Tailwind CSS 3.4.17, dark mode via `.dark` class
- **Animation**: framer-motion 10.18.0 + motion 12.23.24
- **TypeScript**: 5.9.3 (tsconfig with `allowJs: true`, `strict: false`)
- **Node**: v22.12.0, npm 10.9.0

## Theme (DO NOT CHANGE)
- `--violet-primary: #7c3aed / #a78bfa`
- `--violet-secondary: #8b5cf6 / #c4b5fd`
- `--bg-primary: #ffffff / #0b0414` (light/dark)

## Section Order (App.js)
1. Hero (eager)
2. About (lazy)
3. TechStack (lazy)
4. Services (lazy)
5. StressingService + Showcase (lazy)
6. **Portfolio** - GlowCard grid, 10 repos from `projects.generated.json`, language filter
7. **Gallery** - ZoomParallax intro + FocusCards grid, 12 personal photos
8. Testimonials (lazy)
9. Contact (lazy)
10. Footer (lazy)

## Component Inventory (src/components/ui/)
| Component | File | Status |
|---|---|---|
| ShapeLandingHero | shape-landing-hero.jsx | Integrated |
| PortfolioText | portfolio-text.jsx | Integrated |
| GlowCard | spotlight-card.tsx | Used in Portfolio |
| CyberneticBentoGrid | cybernetic-bento-grid.tsx | Integrated |
| GradientHeading | gradient-heading.tsx | Integrated |
| LogoCarousel | logo-carousel.tsx | Used in TechStack |
| CircularTestimonials | circular-testimonials.jsx | Used in Testimonials |
| TubelightNavbar | tubelight-navbar.jsx | Used in Navbar |
| ZoomParallax | zoom-parallax.jsx | Used in Gallery |
| FlickeringFooter | flickering-footer.tsx | Used in Footer |

## Data Pipeline
- `scripts/sync-projects.mjs` fetches 10 curated repos via `gh repo view`
- Output: `src/data/projects.generated.json`
- Re-run: `node scripts/sync-projects.mjs`

## CI/CD
- `ci.yml` - lint, test, build on push/PR to main (Node 18/20/22)
- `release.yml` - auto-tag on every push to main
- `deploy.yml` - SCP deploy (requires secrets)

## Tests
- 3 suites, 23 tests, all passing
- Portfolio tests: grid render, filter buttons, card count
- Gallery test: #gallery id
- Mocks: @tsparticles/*, @number-flow/react

## Risks
- framer-motion v10 types don't support className on motion.* - motion-heavy files must stay .jsx
- projects.generated.json is committed; run sync script to refresh data
- ZoomParallax uses position: sticky - may clip on older browsers
