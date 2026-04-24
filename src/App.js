import React, { lazy, Suspense, memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronRight,
  GalleryHorizontalEnd,
  Home,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  TerminalSquare,
  UserRound,
} from "lucide-react";

import { useReducedMotion } from "./hooks/useReducedMotion";
import { usePageVisibility } from "./hooks/usePageVisibility";
import Hero from "./components/sections/Hero";
import { SectionLoader } from "./components/LoadingSpinner";
import { TubelightNavbar } from "./components/ui/tubelight-navbar";

const About = lazy(() => import("./components/sections/About"));
const Services = lazy(() => import("./components/sections/Services"));
const TechStack = lazy(() => import("./components/sections/TechStack"));
const Portfolio = lazy(() => import("./components/sections/Portfolio"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));
const WebStressingService = lazy(() => import("./components/sections/StressingService"));
const WebStresserShowcase = lazy(() => import("./components/sections/Showcase"));
const PhotoGallery = lazy(() => import("./components/sections/Gallery"));
const TestimonialsSection = lazy(() => import("./components/sections/Testimonials"));

const navItems = [
  { id: "home", label: "Home", icon: <Home className="size-4" /> },
  { id: "about", label: "About", icon: <UserRound className="size-4" /> },
  { id: "services", label: "Studio", icon: <BriefcaseBusiness className="size-4" /> },
  { id: "stressing", label: "Lab", icon: <ShieldCheck className="size-4" /> },
  { id: "portfolio", label: "Work", icon: <Sparkles className="size-4" /> },
  { id: "gallery", label: "Gallery", icon: <GalleryHorizontalEnd className="size-4" /> },
  { id: "contact", label: "Contact", icon: <MessageCircle className="size-4" /> },
];

const GlobalStyles = memo(() => (
  <style>{`
    :root {
      color-scheme: light;
      --bg-primary: #f8f4ea;
      --bg-secondary: #ede5d6;
      --bg-elevated: rgba(255, 252, 243, 0.78);
      --bg-card: rgba(255, 252, 243, 0.70);
      --bg-button: rgba(36, 31, 23, 0.075);
      --bg-button-hover: rgba(36, 31, 23, 0.13);
      --text-primary: #201b12;
      --text-secondary: #625746;
      --text-muted: #8d806b;
      --text-tertiary: #a59b8a;
      --border-color: rgba(32, 27, 18, 0.14);
      --shadow-color: rgba(57, 43, 21, 0.16);
      --accent: #966f1f;
      --accent-strong: #62450b;
      --accent-soft: rgba(150, 111, 31, 0.13);
      --accent-2: #167f70;
      --accent-2-soft: rgba(22, 127, 112, 0.14);
      --accent-3: #c84f35;
      --accent-3-soft: rgba(200, 79, 53, 0.13);
      --line-glow: rgba(150, 111, 31, 0.45);
      --violet-primary: var(--accent);
      --violet-secondary: var(--accent-2);
      --violet-bg: var(--accent-soft);
    }

    .dark {
      color-scheme: dark;
      --bg-primary: #11100d;
      --bg-secondary: #191611;
      --bg-elevated: rgba(34, 30, 23, 0.76);
      --bg-card: rgba(255, 247, 226, 0.075);
      --bg-button: rgba(255, 247, 226, 0.10);
      --bg-button-hover: rgba(255, 247, 226, 0.17);
      --text-primary: #fff7e6;
      --text-secondary: rgba(255, 247, 226, 0.74);
      --text-muted: rgba(255, 247, 226, 0.52);
      --text-tertiary: rgba(255, 247, 226, 0.38);
      --border-color: rgba(255, 247, 226, 0.13);
      --shadow-color: rgba(0, 0, 0, 0.42);
      --accent: #f0c45b;
      --accent-strong: #ffe08a;
      --accent-soft: rgba(240, 196, 91, 0.14);
      --accent-2: #73f1d5;
      --accent-2-soft: rgba(115, 241, 213, 0.12);
      --accent-3: #ff7b5f;
      --accent-3-soft: rgba(255, 123, 95, 0.13);
      --line-glow: rgba(240, 196, 91, 0.58);
    }

    html, body, #root { min-height: 100%; }
    html { scroll-behavior: smooth; background: var(--bg-primary); }
    body {
      margin: 0;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: "Aptos", "Avenir Next", "Segoe UI", sans-serif;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    ::selection {
      color: #11100d;
      background: var(--accent);
    }

    .font-display {
      font-family: "Clash Display", "Aptos Display", "Avenir Next", "Segoe UI", sans-serif;
      letter-spacing: 0;
    }

    .portfolio-app {
      position: relative;
      background:
        linear-gradient(115deg, rgba(255,255,255,0.08), transparent 28%, rgba(22,127,112,0.06) 52%, transparent 72%),
        repeating-linear-gradient(90deg, rgba(150,111,31,0.045) 0 1px, transparent 1px 72px),
        repeating-linear-gradient(0deg, rgba(150,111,31,0.035) 0 1px, transparent 1px 72px),
        var(--bg-primary);
    }

    .dark .portfolio-app {
      background:
        linear-gradient(115deg, rgba(240,196,91,0.07), transparent 27%, rgba(115,241,213,0.045) 48%, transparent 72%),
        repeating-linear-gradient(90deg, rgba(255,247,226,0.035) 0 1px, transparent 1px 76px),
        repeating-linear-gradient(0deg, rgba(255,247,226,0.026) 0 1px, transparent 1px 76px),
        var(--bg-primary);
    }

    .portfolio-app::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.46;
      background-image:
        linear-gradient(120deg, transparent 0 38%, var(--line-glow) 39%, transparent 40% 100%),
        linear-gradient(60deg, transparent 0 72%, rgba(22,127,112,0.24) 73%, transparent 74% 100%);
      background-size: 680px 680px, 520px 520px;
      animation: gridTravel 34s linear infinite;
    }

    .portfolio-app::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.12;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    .content-layer { position: relative; z-index: 1; }

    .glass-panel {
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      box-shadow: 0 24px 70px var(--shadow-color);
      backdrop-filter: blur(22px);
    }

    .kinetic-card {
      border: 1px solid var(--border-color);
      background: linear-gradient(145deg, var(--bg-card), rgba(255,255,255,0.02));
      box-shadow: 0 22px 64px var(--shadow-color);
      backdrop-filter: blur(18px);
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    @media (hover: hover) {
      .kinetic-card:hover {
        transform: translateY(-6px);
        border-color: color-mix(in srgb, var(--accent) 55%, var(--border-color));
        box-shadow: 0 30px 90px var(--shadow-color);
      }
      .magnetic-link:hover { transform: translateY(-2px); }
    }

    .section-kicker {
      color: var(--accent-2);
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .section-title {
      color: var(--text-primary);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: 0;
    }

    .text-balance { text-wrap: balance; }

    .accent-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent);
    }

    @keyframes gridTravel {
      from { background-position: 0 0, 0 0; }
      to { background-position: 680px 680px, -520px 520px; }
    }

    @keyframes floatPanel {
      0%, 100% { transform: translate3d(0, 0, 0); }
      50% { transform: translate3d(0, -10px, 0); }
    }

    @keyframes shineSweep {
      from { transform: translateX(-110%); }
      to { transform: translateX(110%); }
    }

    .shine-sweep::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(110deg, transparent 0 35%, rgba(255,255,255,0.24) 48%, transparent 62% 100%);
      transform: translateX(-110%);
      animation: shineSweep 5.2s ease-in-out infinite;
      pointer-events: none;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
));

function useActiveSection(ids) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-38% 0px -54% 0px", threshold: 0.01 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [ids]);

  return active;
}

const useAnimatedFavicon = () => {
  const isVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const symbols = ["TEP", "API", "</>"];
    let currentIndex = 0;
    let intervalId = null;

    const createFavicon = (symbol) => {
      const canvas = document.createElement("canvas");
      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "";

      ctx.fillStyle = "#11100d";
      ctx.fillRect(0, 0, 48, 48);
      ctx.strokeStyle = "#f0c45b";
      ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, 40, 40);
      ctx.fillStyle = "#73f1d5";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, 24, 25);
      return canvas.toDataURL();
    };

    const updateFavicon = () => {
      const faviconUrl = createFavicon(symbols[currentIndex]);
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
      currentIndex = (currentIndex + 1) % symbols.length;
    };

    if (isVisible) {
      updateFavicon();
      intervalId = setInterval(updateFavicon, 1400);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible, prefersReducedMotion]);
};

const useAnimatedTitle = () => {
  const isVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fallback = "Tama EL Pablo | Portfolio";
    if (prefersReducedMotion || !isVisible) {
      document.title = fallback;
      return undefined;
    }

    const frames = [
      "Tama EL Pablo | API Studio",
      "Tama EL Pablo | Security Lab",
      "Tama EL Pablo | Portfolio",
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      document.title = frames[index];
      index = (index + 1) % frames.length;
    }, 1800);

    return () => {
      clearInterval(intervalId);
      document.title = fallback;
    };
  }, [isVisible, prefersReducedMotion]);
};

const Navbar = memo(({ active, onToggleTheme, theme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
      ticking = true;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-300 ${scrolled ? "translate-y-0" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-[1.35rem] p-2">
          <div className="flex items-center justify-between gap-3">
            <a href="#home" className="group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-2 sm:px-3">
              <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)" }}>
                <TerminalSquare className="size-5" style={{ color: "var(--accent)" }} />
                <span className="absolute inset-x-1 bottom-1 h-px" style={{ background: "var(--accent-2)" }} />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-black sm:text-base" style={{ color: "var(--text-primary)" }}>
                  Tama EL Pablo
                </span>
                <span className="hidden text-xs sm:block" style={{ color: "var(--text-muted)" }}>
                  API / Security / Product craft
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="relative rounded-2xl px-3 py-2 text-sm font-semibold transition-colors"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                      background: isActive ? "var(--accent-soft)" : "transparent",
                      border: isActive ? "1px solid var(--border-color)" : "1px solid transparent",
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                className="magnetic-link inline-flex size-11 items-center justify-center rounded-2xl border transition-transform"
                style={{
                  background: "var(--bg-button)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <a
                href="#contact"
                className="magnetic-link shine-sweep relative hidden overflow-hidden rounded-2xl px-4 py-3 text-sm font-black transition-transform sm:inline-flex"
                style={{ background: "var(--accent)", color: "#11100d" }}
              >
                Contact <ChevronRight className="ml-1 size-4" />
              </a>
            </div>
          </div>
          <div className="mt-1 h-px overflow-hidden rounded-full" style={{ background: "var(--border-color)" }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${Math.max(12, ((navItems.findIndex((item) => item.id === active) + 1) / navItems.length) * 100)}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default function PortfolioTamaELPabloV3() {
  const [theme, setTheme] = useState("dark");
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(sectionIds);

  useAnimatedTitle();
  useAnimatedFavicon();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div className="portfolio-app min-h-screen overflow-x-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <GlobalStyles />

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:px-4 focus:py-2 focus:font-semibold"
        style={{ background: "var(--accent)", color: "#11100d" }}
      >
        Skip to content
      </a>

      <header className="content-layer" role="banner">
        <Navbar active={active} theme={theme} onToggleTheme={handleToggleTheme} />
      </header>

      <TubelightNavbar
        items={navItems.filter((item) => ["home", "about", "services", "portfolio", "contact"].includes(item.id)).map((item) => ({
          label: item.label === "Studio" ? "Work" : item.label,
          href: `#${item.id}`,
          icon: item.icon,
        }))}
        activeSection={active}
      />

      <main id="main-content" className="content-layer" role="main">
        <Hero theme={theme} />

        <Suspense fallback={<SectionLoader />}>
          <About theme={theme} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TechStack />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionLoader height="h-[600px]" />}>
          <section id="stressing">
            <WebStressingService />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader height="h-[800px]" />}>
          <WebStresserShowcase />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PhotoGallery />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

Navbar.displayName = "Navbar";
GlobalStyles.displayName = "GlobalStyles";
