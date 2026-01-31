import React, { useEffect, useState, useRef, lazy, Suspense, memo, useCallback } from "react";
import { 
  TerminalSquare, 
  Sun, 
  Moon, 
  ChevronRight 
} from "lucide-react";

// ---------- Hooks ----------
import { useReducedMotion } from "./hooks/useReducedMotion";
import { usePageVisibility } from "./hooks/usePageVisibility";

// ---------- Critical Above-the-fold imports (NOT lazy loaded) ----------
import Hero from "./components/sections/Hero";
import { LoadingSpinner, SectionLoader } from "./components/LoadingSpinner";

// ---------- Lazy loaded components (Below the fold) ----------
const About = lazy(() => import("./components/sections/About"));
const Services = lazy(() => import("./components/sections/Services"));
const Portfolio = lazy(() => import("./components/sections/Portfolio"));
const Contact = lazy(() => import("./components/sections/Contact"));
const Footer = lazy(() => import("./components/sections/Footer"));

// Heavy UI components - lazy loaded
const WebStressingService = lazy(() => import("./components/sections/StressingService"));
const WebStresserShowcase = lazy(() => import("./components/sections/Showcase"));
const PhotoGallery = lazy(() => import("./components/sections/Gallery"));
const TestimonialsSection = lazy(() => import("./components/sections/Testimonials"));

// ---------- Inline Styles (keyframes & global helpers) ----------
const GlobalStyles = memo(() => (
  <style>{`
    :root {
      color-scheme: light;
      --bg-primary: #ffffff;
      --bg-secondary: #f8fafc;
      --bg-card: rgba(255, 255, 255, 0.8);
      --bg-button: rgba(0, 0, 0, 0.05);
      --bg-button-hover: rgba(0, 0, 0, 0.1);
      --text-primary: #1a1a1a;
      --text-secondary: #4a5568;
      --text-muted: #718096;
      --border-color: rgba(0, 0, 0, 0.15);
      --shadow-color: rgba(0, 0, 0, 0.1);
      --violet-primary: #7c3aed;
      --violet-secondary: #8b5cf6;
      --violet-bg: rgba(124, 58, 237, 0.1);
    }

    .dark {
      color-scheme: dark;
      --bg-primary: #0b0414;
      --bg-secondary: #1a0b2e;
      --bg-card: rgba(255, 255, 255, 0.05);
      --bg-button: rgba(255, 255, 255, 0.1);
      --bg-button-hover: rgba(255, 255, 255, 0.2);
      --text-primary: #ffffff;
      --text-secondary: rgba(255, 255, 255, 0.7);
      --text-muted: rgba(255, 255, 255, 0.5);
      --border-color: rgba(255, 255, 255, 0.1);
      --shadow-color: rgba(0, 0, 0, 0.5);
      --violet-primary: #a78bfa;
      --violet-secondary: #c4b5fd;
      --violet-bg: rgba(167, 139, 250, 0.2);
    }

    html, body, #root { height: 100%; }
    html { scroll-behavior: smooth; }

    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .glow-purple { box-shadow: 0 0 40px rgba(167, 139, 250, 0.25); }

    @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
    @keyframes drift { 0% { transform: translate3d(0, 0, 0) scale(1); opacity: .55; } 50% { transform: translate3d(0, -10px, 0) scale(1.02); opacity: .7; } 100% { transform: translate3d(0, 0, 0) scale(1); opacity: .55; } }
    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

    .faulty-terminal-bg::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(1200px 600px at 50% -10%, rgba(139,92,246,.18), transparent 60%),
                  radial-gradient(1000px 500px at 80% 120%, rgba(76,29,149,.25), transparent 60%);
      filter: blur(0.5px);
      animation: drift 10s ease-in-out infinite;
      will-change: transform, opacity;
    }

    .dark .faulty-terminal-bg::before {
      background: radial-gradient(1200px 600px at 50% -10%, rgba(139,92,246,.18), transparent 60%),
                  radial-gradient(1000px 500px at 80% 120%, rgba(76,29,149,.25), transparent 60%);
    }

    html:not(.dark) .faulty-terminal-bg::before {
      background: radial-gradient(1200px 600px at 50% -10%, rgba(139,92,246,.08), transparent 60%),
                  radial-gradient(1000px 500px at 80% 120%, rgba(76,29,149,.12), transparent 60%);
    }

    .faulty-terminal-bg::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 100% 4px;
      opacity: .15;
      transform: translateY(-100%);
      animation: scan 6s linear infinite;
      will-change: transform;
    }

    html:not(.dark) .faulty-terminal-bg::after {
      background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
      opacity: .08;
    }

    .animated-border { 
      background: linear-gradient(90deg, #581c87, #7c3aed, #a78bfa, #7c3aed, #581c87); 
      background-size: 300% 100%; 
      animation: gradientShift 14s ease infinite; 
    }

    @media (hover:hover) {
      .hoverlift { transition: transform .15s ease, filter .15s ease, box-shadow .15s ease; will-change: transform; }
      .hoverlift:hover { transform: translateY(-4px); filter: brightness(1.05); }
      .hoverpulse:hover { box-shadow: 0 10px 30px rgba(167,139,250,.25); }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      .faulty-terminal-bg::before,
      .faulty-terminal-bg::after {
        animation: none !important;
      }
    }
  `}</style>
));

// ---------- Background ----------
const Background = memo(() => (
  <div className="pointer-events-none fixed inset-0 -z-10 faulty-terminal-bg" />
));

// ---------- Button Component ----------
const Button = memo(({ as: Tag = "a", href, onClick, children, className = "", target, rel, type, style }) => (
  <Tag
    href={href}
    onClick={onClick}
    target={target}
    rel={rel}
    type={type}
    style={style}
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-[transform,background,opacity] duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400/60 active:scale-[0.99] ${className}`}
  >
    {children}
  </Tag>
));

// ---------- useActiveSection Hook (optimized) ----------
function useActiveSection(ids) {
  const [active, setActive] = useState("home");
  
  useEffect(() => {
    const observers = [];
    
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { 
            if (entry.isIntersecting) setActive(id); 
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      
      obs.observe(el);
      observers.push(obs);
    });
    
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  
  return active;
}

// ---------- Navbar (Optimized) ----------
const Navbar = memo(({ onToggleTheme, theme }) => {
  const sections = ["home", "about", "services", "stressing", "portfolio", "gallery", "contact"];
  const active = useActiveSection(sections);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed top-3 inset-x-0 z-50 transition-transform duration-200 ${scrolled ? "scale-[.98]" : ""}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div 
          className="relative rounded-3xl backdrop-blur-xl p-2.5 flex items-center justify-between glow-purple" 
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-button)'
          }}
        >
          <a href="#home" className="flex items-center gap-2 font-semibold" style={{color: 'var(--text-primary)'}}>
            <TerminalSquare className="size-5" style={{color: 'var(--violet-primary)'}} />
            <span className="hidden sm:block">Tama EL Pablo</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-3 py-2 rounded-2xl text-sm capitalize transition-all duration-200 ${
                  active === id ? "border" : ""
                }`}
                style={active === id ? {
                  backgroundColor: 'var(--violet-bg)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--violet-secondary)'
                } : {
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
              >
                {id}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <Button 
              as="button" 
              onClick={onToggleTheme} 
              style={{ backgroundColor: 'var(--bg-button)', color: 'var(--text-primary)' }}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </Button>
            <Button 
              href="#contact" 
              style={{ backgroundColor: 'var(--violet-primary)', color: 'white' }}
            >
              Contact <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ---------- Animated Favicon Hook (with Page Visibility) ----------
const useAnimatedFavicon = () => {
  const isVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const symbols = ['</>', '{}', '()'];
    let currentIndex = 0;
    let intervalId = null;

    const createFavicon = (symbol) => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(0, 0, 32, 32);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, 16, 16);

      return canvas.toDataURL();
    };

    const updateFavicon = () => {
      const symbol = symbols[currentIndex];
      const faviconUrl = createFavicon(symbol);

      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;

      currentIndex = (currentIndex + 1) % symbols.length;
    };

    // Only animate when tab is visible
    if (isVisible) {
      updateFavicon();
      intervalId = setInterval(updateFavicon, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible, prefersReducedMotion]);
};

// ---------- Animated Title Hook (with Page Visibility) ----------
const useAnimatedTitle = () => {
  const isVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) {
      document.title = "Tama EL Pablo | Portfolio";
      return;
    }
    
    const titleText = "tamshub | code your dream";
    const cursorSymbol = "_";
    let currentText = "";
    let isTyping = true;
    let charIndex = 0;
    let isBlinking = false;
    let typeInterval = null;
    let blinkInterval = null;

    const typewriter = () => {
      if (isTyping) {
        if (charIndex < titleText.length) {
          currentText = titleText.substring(0, charIndex + 1);
          document.title = currentText + (isBlinking ? cursorSymbol : "");
          charIndex++;
        } else {
          setTimeout(() => {
            isTyping = false;
            charIndex = titleText.length - 1;
          }, 2000);
        }
      } else {
        if (charIndex >= 0) {
          currentText = titleText.substring(0, charIndex);
          document.title = currentText + (isBlinking ? cursorSymbol : "");
          charIndex--;
        } else {
          setTimeout(() => {
            isTyping = true;
            charIndex = 0;
          }, 2000);
        }
      }
    };

    const cursorBlink = () => {
      isBlinking = !isBlinking;
      if (!isTyping && charIndex < 0) return;
      document.title = currentText + (isBlinking ? cursorSymbol : "");
    };

    // Only animate when tab is visible
    if (isVisible) {
      typeInterval = setInterval(typewriter, 100);
      blinkInterval = setInterval(cursorBlink, 350);
    } else {
      document.title = "Tama EL Pablo | Portfolio";
    }

    return () => {
      if (typeInterval) clearInterval(typeInterval);
      if (blinkInterval) clearInterval(blinkInterval);
      document.title = "Tama EL Pablo | Portfolio";
    };
  }, [isVisible, prefersReducedMotion]);
};

// ---------- Animated Hash Hook (with Page Visibility) ----------
const useAnimatedHash = () => {
  const isVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const baseHashes = ['tamshub', 'code', 'your', 'dream'];
    let currentIndex = 0;
    let intervalId = null;
    let isAnimating = false;

    const animateHashTransition = async (newHash) => {
      if (isAnimating || !isVisible) return;
      isAnimating = true;

      // Simplified animation for better performance
      for (let i = 0; i <= newHash.length; i++) {
        if (!isVisible) break;
        const displayHash = '#' + newHash.substring(0, i) + (i < newHash.length ? '_' : '');
        window.history.replaceState(null, null, displayHash);
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      window.history.replaceState(null, null, '#' + newHash);
      isAnimating = false;
    };

    const updateHash = () => {
      if (!isVisible) return;
      const newHash = baseHashes[currentIndex];
      animateHashTransition(newHash);
      currentIndex = (currentIndex + 1) % baseHashes.length;
    };

    if (isVisible) {
      updateHash();
      intervalId = setInterval(updateHash, 4000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      window.history.replaceState(null, null, window.location.pathname);
    };
  }, [isVisible, prefersReducedMotion]);
};

// ---------- Section Title Component ----------
const SectionTitle = memo(({ pre, title, desc }) => (
  <div className="mx-auto max-w-4xl text-center mb-12">
    <div className="text-sm uppercase tracking-[0.3em] mb-4" style={{color: 'var(--violet-secondary)'}}>
      {pre}
    </div>
    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{color: 'var(--text-primary)'}}>
      {title}
    </h2>
    {desc && (
      <p className="mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" style={{color: 'var(--text-secondary)'}}>
        {desc}
      </p>
    )}
  </div>
));

// ---------- Main App ----------
export default function PortfolioTamaELPabloV2() {
  const [theme, setTheme] = useState("dark");
  const prefersReducedMotion = useReducedMotion();
  
  // Only run animations if user doesn't prefer reduced motion
  useAnimatedTitle();
  useAnimatedFavicon();
  useAnimatedHash();

  // Theme effect
  useEffect(() => { 
    const root = document.documentElement; 
    if (theme === "dark") root.classList.add("dark"); 
    else root.classList.remove("dark"); 
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div 
      className="min-h-screen" 
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <GlobalStyles />
      <Background />
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      {/* HERO - Critical, NOT lazy loaded */}
      <Hero theme={theme} />

      {/* Below the fold content - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        <About theme={theme} />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>

      {/* WEB STRESSING SERVICE */}
      <Suspense fallback={<SectionLoader height="h-[600px]" />}>
        <section id="stressing">
          <WebStressingService />
        </section>
      </Suspense>

      {/* WEB STRESSER SHOWCASE */}
      <Suspense fallback={<SectionLoader height="h-[800px]" />}>
        <WebStresserShowcase />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>

      {/* PHOTO GALLERY */}
      <Suspense fallback={<SectionLoader />}>
        <section id="gallery" className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle pre="Gallery" title="My Moments" desc="Koleksi foto-foto pribadi dan momen awikwok." />
            <PhotoGallery />
          </div>
        </section>
      </Suspense>

      {/* TESTIMONIALS */}
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<div className="h-64" />}>
        <div className="mx-auto max-w-6xl px-4">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
