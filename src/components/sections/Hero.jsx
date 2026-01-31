import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { SparklesCore } from '../ui/sparkles';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ---------- Reusable UI atoms ----------
const Button = memo(({ as: Tag = "a", href, onClick, children, className = "", target, rel, type, style, onMouseEnter, onMouseLeave }) => (
  <Tag
    href={href}
    onClick={onClick}
    target={target}
    rel={rel}
    type={type}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-[transform,background,opacity] duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400/60 active:scale-[0.99] ${className}`}
  >
    {children}
  </Tag>
));

const Card = memo(({ children, className = "" }) => (
  <div 
    className={`rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg hoverlift hoverpulse ${className}`} 
    style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--bg-card)',
      boxShadow: `0 10px 25px var(--shadow-color)`
    }}
  >
    {children}
  </div>
));

// ---------- Hero Terminal (MagicUI-inspired custom) ----------
const HeroTerminal = memo(({ theme = 'dark' }) => {
  const lines = useMemo(() => [
    { prompt: "~$", text: " whoami" },
    { prompt: "tamas@tamshub:$", text: " echo \"Backend Developer | Open Source Enthusiast\"" },
    { prompt: "tamas@tamshub:$", text: " gh profile view el-pablos" },
    { prompt: "tamas@tamshub:$", text: " telegram open @ImTamaa" },
  ], []);

  const prefersReducedMotion = useReducedMotion();
  const [cursorOn, setCursorOn] = useState(true);
  const [i, setI] = useState(prefersReducedMotion ? lines.length - 1 : 0);
  const [typed, setTyped] = useState(prefersReducedMotion ? lines[lines.length - 1].text.length : 0);

  // Cursor blink effect - optimized
  useEffect(() => {
    if (prefersReducedMotion) return;
    const blink = setInterval(() => setCursorOn((c) => !c), 350);
    return () => clearInterval(blink);
  }, [prefersReducedMotion]);

  // Typing effect - optimized with proper cleanup
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const current = lines[i];
    if (!current) return;

    let timeoutId;
    
    if (typed <= current.text.length) {
      timeoutId = setTimeout(() => setTyped((v) => v + 1), 25);
    } else {
      timeoutId = setTimeout(() => {
        setI((v) => Math.min(v + 1, lines.length - 1));
        setTyped(0);
      }, 600);
    }

    return () => clearTimeout(timeoutId);
  }, [typed, i, lines, prefersReducedMotion]);

  return (
    <Card className="relative overflow-hidden glow-purple">
      <div 
        className="flex items-center gap-2 px-4 py-3 border-b transition-colors duration-200" 
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)'
        }}
      >
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400/90 inline-block" />
          <span className="size-3 rounded-full bg-yellow-400/90 inline-block" />
          <span className="size-3 rounded-full bg-green-400/90 inline-block" />
        </div>
        <div className="ml-3 text-xs transition-colors duration-200" style={{color: 'var(--text-muted)'}}>
          tamas@tamshub
        </div>
      </div>
      <div 
        className="p-6 text-sm font-mono leading-7 transition-colors duration-200" 
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)'
        }}
      >
        {lines.slice(0, i).map((l, idx) => (
          <div key={idx} style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{l.prompt}</span>
            <span>{l.text}</span>
          </div>
        ))}
        {i < lines.length && (
          <div style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{lines[i].prompt}</span>
            <span>{lines[i].text.slice(0, typed)}</span>
            {!prefersReducedMotion && (
              <span 
                className={`ml-0.5 transition-opacity duration-200 ${cursorOn ? "opacity-100" : "opacity-0"}`} 
                style={{color: 'var(--violet-primary)'}}
              >
                ▮
              </span>
            )}
          </div>
        )}
        {i >= lines.length - 1 && (
          <div className="mt-4" style={{color: 'var(--text-secondary)'}}>
            $ Done. Type <span style={{color: 'var(--text-primary)'}}>help</span> to explore.
          </div>
        )}
      </div>
    </Card>
  );
});

// ---------- Visitor Counter Component ----------
const VisitorCounter = memo(() => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sessionKey = 'tamshub_visitor_session';
    const countKey = 'tamshub_visitor_count';

    const hasVisited = sessionStorage.getItem(sessionKey);
    const currentCount = parseInt(localStorage.getItem(countKey)) || 0;

    if (!hasVisited) {
      const newCount = currentCount + 1;
      localStorage.setItem(countKey, newCount.toString());
      sessionStorage.setItem(sessionKey, 'visited');
      setCount(newCount);
    } else {
      setCount(currentCount);
    }

    const handleStorageChange = (e) => {
      if (e.key === countKey) {
        setCount(parseInt(e.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200" 
      style={{
        backgroundColor: 'var(--violet-bg)',
        color: 'var(--text-primary)',
        fontSize: '0.875rem'
      }}
    >
      <svg className="size-4" style={{color: 'var(--violet-primary)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span className="font-medium">Visitors: {count.toLocaleString()}</span>
    </div>
  );
});

// ---------- Hero Section Main Component ----------
const Hero = memo(({ theme }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const motionProps = prefersReducedMotion 
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section id="home" className="pt-28 pb-16 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center relative">
          <motion.h1 
            {...motionProps}
            transition={{ duration: 0.6 }} 
            className="text-4xl sm:text-6xl font-extrabold tracking-tight transition-colors duration-200 relative z-10" 
            style={{color: 'var(--text-primary)'}}
          >
            Tama EL Pablo
          </motion.h1>
          
          <motion.p 
            {...motionProps}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.1 }} 
            className="mt-3 text-lg transition-colors duration-200 relative z-10" 
            style={{color: 'var(--text-secondary)'}}
          >
            Backend Developer <span style={{color: 'var(--text-muted)'}}>|</span> Open Source Enthusiast
          </motion.p>

          {/* Sparkles Effect - Only render if not reduced motion */}
          {!prefersReducedMotion && (
            <div className="w-full max-w-2xl mx-auto h-32 relative mt-4">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[2px] w-3/4 blur-sm mx-auto" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-3/4 mx-auto" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-[5px] w-1/4 blur-sm mx-auto" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent h-px w-1/4 mx-auto" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={400} // Reduced from 800 for better performance
                className="w-full h-full"
                particleColor={theme === 'dark' ? '#a78bfa' : '#7c3aed'}
                speed={0.3} // Reduced speed
              />

              <div 
                className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" 
                style={{backgroundColor: 'var(--bg-primary)'}}
              />
            </div>
          )}
        </div>

        <motion.div 
          {...motionProps}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.15 }} 
          className="mt-8"
        >
          <HeroTerminal theme={theme} />
        </motion.div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <Button 
              href="#portfolio" 
              className="transition-all duration-200" 
              style={{ backgroundColor: 'var(--violet-primary)', color: 'white' }}
            >
              View Portfolio <ChevronRight className="size-4"/>
            </Button>
            <Button 
              href="#contact" 
              className="transition-all duration-200" 
              style={{ backgroundColor: 'var(--bg-button)', color: 'var(--text-primary)' }}
            >
              Get in Touch
            </Button>
          </div>
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
HeroTerminal.displayName = 'HeroTerminal';
VisitorCounter.displayName = 'VisitorCounter';
Button.displayName = 'Button';
Card.displayName = 'Card';

export default Hero;
