import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Send,
  TerminalSquare,
  Code2,
  ShieldCheck,
  PlugZap,
  Layers,
  Sun,
  Moon,
  ChevronRight,
  ExternalLink,
  Mail,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Check,
  Zap,
  Bot,
  ShoppingCart,
  FileText,
  Building2,
  Eye,
  GitBranch,
  Star,
  Calendar,
  Play,
  X,
  Filter,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";

// ---------- Inline Styles (keyframes & global helpers) ----------
const GlobalStyles = () => (
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

    /* Glow for purple vibes */
    .glow-purple { box-shadow: 0 0 40px rgba(167, 139, 250, 0.25); }

    /* Faulty Terminal-esque background */
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
    }

    html:not(.dark) .faulty-terminal-bg::after {
      background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
      opacity: .08;
    }

    /* Subtle animated border for footer */
    .animated-border { background: linear-gradient(90deg, #581c87, #7c3aed, #a78bfa, #7c3aed, #581c87); background-size: 300% 100%; animation: gradientShift 14s ease infinite; }

    /* Responsive-hover helpers */
    @media (hover:hover) {
      .hoverlift { transition: transform .15s ease, filter .15s ease, box-shadow .15s ease; will-change: transform; }
      .hoverlift:hover { transform: translateY(-4px); filter: brightness(1.05); }
      .hoverpulse:hover { box-shadow: 0 10px 30px rgba(167,139,250,.25); }
    }
  `}</style>
);

// ---------- Reusable UI atoms ----------
const Button = ({ as: Tag = "a", href, onClick, children, className = "", target, rel, type }) => (
  <Tag
    href={href}
    onClick={onClick}
    target={target}
    rel={rel}
    type={type}
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-[transform,background,opacity] duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400/60 active:scale-[0.99] ${className}`}
  >
    {children}
  </Tag>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg hoverlift hoverpulse ${className}`} style={{
    borderColor: 'var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    boxShadow: `0 10px 25px var(--shadow-color)`
  }}>
    {children}
  </div>
);

const SectionTitle = ({ pre, title, desc }) => (
  <div className="mx-auto max-w-3xl text-center mb-10">
    <div className="text-sm uppercase tracking-[0.3em] transition-colors duration-200" style={{color: 'var(--violet-secondary)'}}>{pre}</div>
    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{title}</h2>
    {desc && <p className="mt-3 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{desc}</p>}
  </div>
);

// ---------- Lazy Load Image Component ----------
const LazyImage = ({ src, alt, className, onClick, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className} onClick={onClick} style={style}>
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center" style={{backgroundColor: 'var(--bg-card)'}}>
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--violet-primary)', borderTopColor: 'transparent'}}></div>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
};

// ---------- Lazy Load Video Component ----------
const LazyVideo = ({ src, className, onClick, style }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className={className} onClick={onClick} style={style}>
      {isInView ? (
        <video
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: 'var(--bg-card)'}}>
          <Play className="size-12" style={{color: 'var(--violet-secondary)', opacity: 0.5}} />
        </div>
      )}
    </div>
  );
};

// ---------- Background ----------
const Background = () => <div className="pointer-events-none fixed inset-0 -z-10 faulty-terminal-bg" />;

// ---------- Navbar ----------
function useActiveSection(ids) {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { if (entry.isIntersecting) setActive(id); });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      obs.observe(el); observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

const Navbar = ({ onToggleTheme, theme }) => {
  const sections = ["home", "about", "services", "stressing", "portfolio", "contact"];
  const active = useActiveSection(sections);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed top-3 inset-x-0 z-50 transition-all ${scrolled ? "scale-[.98]" : ""}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative rounded-3xl backdrop-blur-xl p-2.5 flex items-center justify-between glow-purple transition-all duration-200" style={{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--bg-button)'
        }}>
          <a href="#home" className="flex items-center gap-2 font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
            <TerminalSquare className="size-5" style={{color: 'var(--violet-primary)'}} />
            <span className="hidden sm:block">Tama EL Pablo</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`px-3 py-2 rounded-2xl text-sm capitalize transition-all duration-200 ${
                  active === id
                    ? "border"
                    : "hover:bg-opacity-20"
                }`}
                style={active === id ? {
                  backgroundColor: 'var(--violet-bg)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--violet-secondary)'
                } : {
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={active !== id ? (e) => {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.backgroundColor = 'var(--bg-button)';
                } : undefined}
                onMouseLeave={active !== id ? (e) => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.backgroundColor = 'transparent';
                } : undefined}
              >
                {id}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button as="button" onClick={onToggleTheme} className="transition-all duration-200" style={{
              backgroundColor: 'var(--bg-button)',
              color: 'var(--text-primary)'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-button-hover)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-button)';
            }}>
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </Button>
            <Button href="#contact" className="transition-all duration-200" style={{
              backgroundColor: 'var(--violet-primary)',
              color: 'white'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--violet-secondary)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--violet-primary)';
            }}>
              Contact <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Hero Terminal (MagicUI-inspired custom) ----------
const HeroTerminal = ({ theme = 'dark' }) => {
  const lines = useMemo(() => [
    { prompt: "~$", text: " whoami" },
    { prompt: "tamas@tamshub:$", text: " echo \"Backend Developer | Open Source Enthusiast\"" },
    { prompt: "tamas@tamshub:$", text: " gh profile view el-pablos" },
    { prompt: "tamas@tamshub:$", text: " telegram open @ImTamaa" },
  ], []);

  const [cursorOn, setCursorOn] = useState(true);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => { const blink = setInterval(() => setCursorOn((c) => !c), 350); return () => clearInterval(blink); }, []);
  useEffect(() => {
    const current = lines[i]; if (!current) return;
    if (typed <= current.text.length) { const t = setTimeout(() => setTyped((v) => v + 1), 25); return () => clearTimeout(t); }
    else { const pause = setTimeout(() => { setI((v) => Math.min(v + 1, lines.length - 1)); setTyped(0); }, 600); return () => clearTimeout(pause); }
  }, [typed, i, lines]);

  return (
    <Card className="relative overflow-hidden glow-purple">
      <div className="flex items-center gap-2 px-4 py-3 border-b transition-colors duration-200" style={{
        borderColor: 'var(--border-color)',
        backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)'
      }}>
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400/90 inline-block" />
          <span className="size-3 rounded-full bg-yellow-400/90 inline-block" />
          <span className="size-3 rounded-full bg-green-400/90 inline-block" />
        </div>
        <div className="ml-3 text-xs transition-colors duration-200" style={{color: 'var(--text-muted)'}}>tamas@tamshub</div>
      </div>
      <div className="p-6 text-sm font-mono leading-7 transition-colors duration-200" style={{
        background: theme === 'dark' ? 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' : 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)'
      }}>
        {lines.slice(0, i).map((l, idx) => (
          <div key={idx} className="transition-colors duration-200" style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span className="transition-colors duration-200" style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{l.prompt}</span>
            <span>{l.text}</span>
          </div>
        ))}
        {i < lines.length && (
          <div className="transition-colors duration-200" style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span className="transition-colors duration-200" style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{lines[i].prompt}</span>
            <span>{lines[i].text.slice(0, typed)}</span>
            <span className={`ml-0.5 transition-opacity duration-200 ${cursorOn ? "opacity-100" : "opacity-0"}`} style={{color: 'var(--violet-primary)'}}>▮</span>
          </div>
        )}
        {i >= lines.length - 1 && (
          <div className="mt-4 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>$ Done. Type <span style={{color: 'var(--text-primary)'}}>help</span> to explore.</div>
        )}
      </div>
    </Card>
  );
};

// ---------- About ----------
const About = ({ theme }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card className="p-6">
      <h3 className="text-xl font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>About Me</h3>
      <p className="mt-3 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Hi! I'm <span className="font-medium transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Tama EL Pablo</span>, a <span className="transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Backend Developer</span> who loves building reliable APIs and scalable services with <span className="transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Laravel</span> as my primary stack.</p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <a className="inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200" style={{
          backgroundColor: 'var(--bg-button)',
          color: 'var(--text-primary)'
        }} href="https://github.com/el-pablos" target="_blank" rel="noreferrer"
        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-button-hover)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--bg-button)'}>
          <Github className="size-4" /> el-pablos <ExternalLink className="size-4" />
        </a>
        <Button href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" className="transition-all duration-200" style={{
          backgroundColor: 'var(--violet-primary)',
          color: 'white'
        }} onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--violet-secondary)';
        }} onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'var(--violet-primary)';
        }}>
          <Send className="size-4"/> @ImTamaa
        </Button>
      </div>
    </Card>

    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <HeroTerminal theme={theme} />
    </motion.div>
  </div>
);

// ---------- Stats Section ----------
const StatsSection = () => {
  const successRate = useCountUp(99.9, 2500, 1);
  const websites = useCountUp(150, 2000);
  const uptime = useCountUp(24, 1500);

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-4 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-medium lg:text-5xl transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Proven Performance</h2>
          <p className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal seperti Akamai, Cloudflare, Fastly, dan lainnya. Track record yang membuktikan kualitas dan keandalan tools yang saya kembangkan.</p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0 md:divide-white/10">
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{successRate}%</div>
            <p className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Success Rate</p>
          </motion.div>
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-5xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{websites}+</div>
            <p className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Websites Tested</p>
          </motion.div>
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-5xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{uptime}/7</div>
            <p className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Available</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---------- Services ----------
const Services = () => {
  const services = [
    {
      icon: Code2,
      title: "Backend Development",
      desc: "Laravel, PHP, MySQL, PostgreSQL - Building robust APIs and web services.",
      tech: ["Laravel", "PHP", "MySQL", "PostgreSQL"]
    },
    {
      icon: ShieldCheck,
      title: "OSINT & Security",
      desc: "Open source intelligence gathering and security research.",
      tech: ["OSINT", "Security Research", "Data Analysis"]
    },
    {
      icon: PlugZap,
      title: "API Integration",
      desc: "Third-party integrations, RESTful APIs, and microservices architecture.",
      tech: ["REST APIs", "GraphQL", "Webhooks", "Microservices"]
    },
    {
      icon: Layers,
      title: "DevOps & Infrastructure",
      desc: "Docker, CI/CD pipelines, and cloud deployment solutions.",
      tech: ["Docker", "CI/CD", "AWS", "Linux"]
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 hover:scale-105 transition-transform duration-200">
            <service.icon className="size-12 mb-4" style={{color: 'var(--violet-primary)'}} />
            <h3 className="text-xl font-semibold mb-3 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{service.title}</h3>
            <p className="mb-4 text-sm transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{service.desc}</p>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 rounded text-xs transition-colors duration-200" style={{backgroundColor: 'var(--violet-bg)', color: 'var(--violet-secondary)'}}>
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// ---------- Web Stressing Service ----------
const WebStressingService = () => {
  const [currency, setCurrency] = useState('IDR');

  const pricing = {
    IDR: [
      { duration: '1 Hours', price: '250,000', popular: false },
      { duration: '2 Hours', price: '400,000', popular: true },
      { duration: '3 Hours', price: '500,000', popular: false },
      { duration: '1 Days', price: '1,200,000', popular: false },
      { duration: '2 Days', price: '2,400,000', popular: false }
    ],
    USD: [
      { duration: '1 Hours', price: '17', popular: false },
      { duration: '2 Hours', price: '27', popular: true },
      { duration: '3 Hours', price: '33', popular: false },
      { duration: '1 Days', price: '80', popular: false },
      { duration: '2 Days', price: '160', popular: false }
    ]
  };

  const features = [
    'Jasa Takedown Website Slot',
    'Jasa Takedown Website Phising',
    'Jasa Takedown Website Pemerintah',
    'Jasa Takedown Website Store/E-commerce',
    'Custom Target Analysis',
    'CDN Bypass (Akamai, Cloudflare, Fastly)',
    'Real-time Monitoring',
    'Detailed Attack Report',
    '24/7 Support & Consultation'
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl space-y-6 text-center mb-16">
          <h2 className="text-4xl font-semibold lg:text-5xl transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Web Stress Testing Services</h2>
          <p className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Professional web stress testing and security analysis services. Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal seperti Akamai, Cloudflare, Fastly, dan lainnya.</p>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-sm transition-colors duration-200" style={{color: currency === 'IDR' ? 'var(--text-primary)' : 'var(--text-secondary)'}}>IDR</span>
            <button
              onClick={() => setCurrency(currency === 'IDR' ? 'USD' : 'IDR')}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2"
              style={{backgroundColor: 'var(--card-bg)', '--tw-ring-color': 'var(--violet-primary)'}}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${currency === 'USD' ? 'translate-x-6' : 'translate-x-1'}`} style={{backgroundColor: 'var(--violet-primary)'}} />
            </button>
            <span className="text-sm transition-colors duration-200" style={{color: currency === 'USD' ? 'var(--text-primary)' : 'var(--text-secondary)'}}>USD</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {pricing[currency].map((plan, index) => (
            <Card key={index} className={`flex flex-col relative min-h-[420px] hover:scale-105 transition-transform duration-200 ${plan.popular ? 'ring-2 ring-violet-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Popular
                  </span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-3 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{plan.duration}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{currency === 'IDR' ? 'IDR' : '$'} {plan.price}</span>
                  </div>
                  <span className="text-sm transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>per session</span>
                </div>

                <hr className="border-dashed mb-6" style={{borderColor: 'var(--border-color)'}} />

                <ul className="space-y-3 text-sm mb-6 flex-1">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
                      <Check className="size-4 flex-shrink-0 mt-0.5" style={{color: 'var(--violet-secondary)'}} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="https://t.me/ImTamaa"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full mt-auto ${plan.popular ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                >
                  <Send className="size-4" />
                  Order via Telegram
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

// ---------- Modern Gallery Showcase ----------
const WebStresserShowcase = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const proofItems = useMemo(() => [
    {
      title: "DPR RI Website Takedown",
      description: "Successfully brought down DPR RI website showing 'Under Maintenance PAGE NOT FOUND' status",
      mediaUrl: "/photo_4913463250167902324_w.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "Stress Test", "Verified"]
    },
    {
      title: "Tax Office Server Disruption",
      description: "coretaxdjp.pajak.go.id rendered unreachable with global connection timeouts from multiple locations",
      mediaUrl: "/photo_4913463250167902361_y.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "Multi-Location", "Connection Timeout"]
    },
    {
      title: "UGM University Portal Down",
      description: "ugm.ac.id successfully targeted with connection timeouts verified from international test points",
      mediaUrl: "/photo_4915715049981588609_y.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "Global Testing"]
    },
    {
      title: "POLICETUBE Down IPOS",
      description: "Complete server disruption of POLICETUBE platform with comprehensive takedown verification",
      mediaUrl: "/document_4906738443322655853.mp4",
      mediaType: "video",
      category: "Law Enforcement",
      tags: ["Law Enforcement", "Platform Down", "Verified"]
    },
    {
      title: "KEJAGUNG RI Down IPOS",
      description: "Attorney General's office website successfully targeted with complete system disruption",
      mediaUrl: "/document_4913463249711662401.mp4",
      mediaType: "video",
      category: "Government",
      tags: ["Government", "Attorney General", "System Down"]
    },
    {
      title: "Indonesia.go.id Down IPOS",
      description: "Main Indonesian government portal successfully disrupted with complete system takedown",
      mediaUrl: "/indogoid.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "National Portal", "IPOS"]
    },
    {
      title: "BPJS Kesehatan Down IPOS",
      description: "National health insurance system successfully disrupted with connection timeouts globally",
      mediaUrl: "/bpjsgoid.jpg",
      mediaType: "image",
      category: "Healthcare",
      tags: ["Healthcare", "Government", "IPOS"]
    },
    {
      title: "UPN Yogyakarta Down IPOS",
      description: "National university TCP connection completely disrupted across all VPS servers",
      mediaUrl: "/upnyogyakarta.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "IPOS"]
    },
    {
      title: "Mobile JKN Down IPOS",
      description: "National health insurance mobile platform rendered completely inaccessible",
      mediaUrl: "/jkn.jpg",
      mediaType: "image",
      category: "Healthcare",
      tags: ["Healthcare", "Mobile App", "IPOS"]
    },
    {
      title: "Universitas Indonesia Down IPOS",
      description: "Premier Indonesian university website successfully taken offline",
      mediaUrl: "/universitasindonesia.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "IPOS"]
    },
    {
      title: "MyTelkomsel Down IPOS",
      description: "Major telecommunications provider platform disrupted with full system takedown",
      mediaUrl: "/mytelkomsel.mp4",
      mediaType: "video",
      category: "Telecommunications",
      tags: ["Telco", "Mobile Platform", "IPOS"]
    }
  ], []);

  const categories = useMemo(() => ['All', ...new Set(proofItems.map(item => item.category))], [proofItems]);
  const filteredItems = useMemo(() =>
    filterCategory === 'All'
      ? proofItems
      : proofItems.filter(item => item.category === filterCategory),
    [filterCategory, proofItems]
  );

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle
          pre="Showcase Gallery"
          title="Proven Attack Results"
          desc="Real proof of successful IPOS operations. Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal seperti Akamai, Cloudflare, Fastly, dan lainnya."
        />

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
            <Filter className="size-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterCategory === cat ? 'shadow-lg' : 'hover:scale-105'
              }`}
              style={filterCategory === cat ? {
                backgroundColor: 'var(--violet-primary)',
                color: 'white'
              } : {
                backgroundColor: 'var(--bg-button)',
                color: 'var(--text-secondary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((proof, index) => (
            <motion.div
              key={proof.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
              className="group cursor-pointer lazy-content"
              onClick={() => setSelectedMedia(proof)}
            >
              <Card className="overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-2xl">
                <div className="relative h-56 bg-gradient-to-br from-violet-600/20 to-purple-600/20 overflow-hidden">
                  {proof.mediaType === 'video' ? (
                    <>
                      <LazyVideo
                        src={proof.mediaUrl}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-200 flex items-center justify-center pointer-events-none">
                        <div className="bg-violet-600/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                          <Play className="size-8 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <LazyImage
                        src={proof.mediaUrl}
                        alt={proof.title}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <ImageIcon className="size-12 text-white" />
                      </div>
                    </>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      {proof.mediaType === 'video' ? <VideoIcon className="size-3" /> : <ImageIcon className="size-3" />}
                      {proof.mediaType === 'video' ? 'VIDEO' : 'IMAGE'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-600/90 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                      ✓ VERIFIED
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 line-clamp-1 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{proof.title}</h3>
                  <p className="text-xs mb-3 line-clamp-2 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{proof.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proof.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs transition-colors duration-200" style={{
                        backgroundColor: 'var(--violet-bg)',
                        color: 'var(--violet-primary)'
                      }}>
                        {tag}
                      </span>
                    ))}
                    {proof.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded text-xs transition-colors duration-200" style={{
                        backgroundColor: 'var(--bg-button)',
                        color: 'var(--text-muted)'
                      }}>
                        +{proof.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{backgroundColor: 'rgba(0,0,0,0.95)'}}
            onClick={() => setSelectedMedia(null)}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{backgroundColor: 'var(--bg-button)', color: 'var(--text-primary)'}}
              >
                <X className="size-6" />
              </button>

              <div className="rounded-2xl overflow-hidden shadow-2xl">
                {selectedMedia.mediaType === 'video' ? (
                  <video
                    src={selectedMedia.mediaUrl}
                    className="w-full max-h-[70vh] object-contain bg-black"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedMedia.mediaUrl}
                    alt={selectedMedia.title}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )}
              </div>

              <div className="mt-4 p-6 rounded-2xl transition-all duration-200" style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                border: '1px solid'
              }}>
                <h2 className="text-2xl font-bold mb-2 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{selectedMedia.title}</h2>
                <p className="mb-4 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{selectedMedia.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200" style={{
                      backgroundColor: 'var(--violet-bg)',
                      color: 'var(--violet-primary)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Counter */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-violet-600/10 to-purple-600/10 border border-violet-500/20 rounded-3xl px-8 py-6">
            <div className="flex items-center gap-3">
              <Zap className="size-6" style={{color: 'var(--violet-secondary)'}} />
              <span className="text-xl font-bold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Managed by myself | TamsHub Stresser</span>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-3xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{proofItems.length}</div>
                <div className="text-xs uppercase tracking-wider transition-colors duration-200" style={{color: 'var(--text-muted)'}}>Total Attacks</div>
              </div>
              <div>
                <div className="text-3xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>100%</div>
                <div className="text-xs uppercase tracking-wider transition-colors duration-200" style={{color: 'var(--text-muted)'}}>Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>{categories.length - 1}</div>
                <div className="text-xs uppercase tracking-wider transition-colors duration-200" style={{color: 'var(--text-muted)'}}>Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Portfolio ----------
const Portfolio = () => {
  const projects = [
    {
      title: "TelegramME - Server Manager Bot",
      desc: "Bot Telegram untuk kontrol panel Pterodactyl dengan API yang aman dan mudah digunakan",
      tech: ["Node.js", "Telegram API", "Pterodactyl", "Security"],
      link: "#",
      github: "https://github.com/el-pablos/TelegramME",
      icon: Bot
    },
    {
      title: "Komoditas Desa - CRUD System",
      desc: "Laravel-based web application untuk manage komoditi di desa dalam bentuk admin dashboard",
      tech: ["Laravel", "PHP", "MySQL", "Blade"],
      link: "#",
      github: "https://github.com/dasaraul/komoditas-desa",
      icon: Building2
    },
    {
      title: "Shopping List Manager",
      desc: "Aplikasi Flutter untuk todo/checklist daftar belanjaan via mobile Android dengan animasi smooth",
      tech: ["Flutter", "Provider", "SQLite", "Android"],
      link: "#",
      github: "https://github.com/dasaraul/daftar_belanjaan_new",
      icon: ShoppingCart
    },
    {
      title: "Daily Note - Personal Journal",
      desc: "Aplikasi Flutter untuk daily note dengan design yang elegant dan functionality yang comprehensive",
      tech: ["Flutter", "SQLite", "Material Design", "Android"],
      link: "#",
      github: "https://github.com/dasaraul/Daily-Note-Flutter",
      icon: FileText
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden hover:scale-105 transition-transform duration-200">
            <div className="h-48 bg-gradient-to-br from-violet-600/20 to-purple-600/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <project.icon className="size-16" style={{color: 'var(--violet-secondary)', opacity: 0.6}} />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-black/40 rounded-lg transition-colors" style={{'--hover-bg': 'var(--violet-primary)'}}>
                  <Github className="size-4 transition-colors duration-200" style={{color: 'var(--text-primary)'}} />
                </a>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{project.title}</h3>
              <p className="text-sm mb-4 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs transition-colors duration-200" style={{backgroundColor: 'var(--violet-bg)', color: 'var(--violet-secondary)'}}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// ---------- CTA ----------
const CTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Card className="text-center p-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
        Ready to Start Your Project?
      </h2>
      <p className="mb-8 max-w-2xl mx-auto transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
        Let's discuss your backend needs and build something amazing together. I'm available for freelance work and open to collaboration.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" className="bg-violet-600 text-white hover:bg-violet-500">
          <Send className="size-5" />
          Contact via Telegram
        </Button>
        <Button href="https://github.com/el-pablos" target="_blank" rel="noreferrer" className="bg-white/10 text-white hover:bg-white/20">
          <Github className="size-5" />
          View GitHub
        </Button>
      </div>
      <div className="flex justify-center gap-6">
        <a href="https://github.com/el-pablos" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
          <Github className="size-6" />
        </a>
        <a href="https://github.com/dasaraul" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
          <Github className="size-6" />
        </a>
        <a href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
          <Send className="size-6" />
        </a>
        <button className="transition-colors duration-200" style={{color: 'var(--text-secondary)'}} onClick={() => console.log('Twitter link placeholder')}>
          <Twitter className="size-6" />
        </button>
      </div>
    </Card>
  </motion.div>
);

// ---------- Footer (expanded) ----------
const Footer = () => {
  const chips = ["Laravel", "PHP", "MySQL", "PostgreSQL", "Docker", "CI/CD", "OSINT", "Next.js", "Tailwind", "Framer Motion"];
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Stressing", href: "#stressing" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="mt-16">
      <div className="h-[2px] w-full animated-border rounded-full" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
              <TerminalSquare className="size-5" style={{color: 'var(--violet-secondary)'}} /> Tama EL Pablo
            </div>
            <p className="mt-3 text-sm transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Backend Developer berfokus pada Laravel. Mengutamakan performa, keamanan, dan integrasi yang rapi.</p>
            <div className="mt-4 flex items-center gap-3">
              <a className="p-2 rounded-xl bg-white/10 hover:bg-white/20" href="https://github.com/el-pablos" target="_blank" rel="noreferrer"><Github className="size-5"/></a>
              <a className="p-2 rounded-xl bg-white/10 hover:bg-white/20" href="https://github.com/dasaraul" target="_blank" rel="noreferrer"><Github className="size-5"/></a>
              <a className="p-2 rounded-xl bg-white/10 hover:bg-white/20" href="https://t.me/ImTamaa" target="_blank" rel="noreferrer"><Send className="size-5"/></a>
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20" onClick={() => console.log('Twitter link placeholder')}><Twitter className="size-5"/></button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}><a className="inline-flex items-center gap-2 transition-colors duration-200 hover:opacity-100" style={{color: 'var(--text-secondary)'}} href={l.href}><LinkIcon className="size-4" style={{color: 'var(--violet-secondary)'}}/>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Tech Stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="text-xs px-3 py-1 rounded-full transition-colors duration-200" style={{backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)'}}>{c}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Contact</h4>
            <ul className="mt-3 space-y-2 text-sm transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
              <li className="flex items-center gap-2"><Mail className="size-4" style={{color: 'var(--violet-secondary)'}}/> admin@tams.my.id</li>
              <li className="flex items-center gap-2"><Send className="size-4" style={{color: 'var(--violet-secondary)'}}/> t.me/ImTamaa</li>
              <li className="flex items-center gap-2"><MapPin className="size-4" style={{color: 'var(--violet-secondary)'}}/> Jakarta Selatan, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="py-6 text-center text-xs transition-colors duration-200" style={{borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)'}}>
          <p>© {new Date().getFullYear()} Tama EL Pablo • Code That Matters, Security That Protects • Jakarta Selatan</p>
          <p className="mt-1">Open to freelance & collaboration. <a className="underline transition-colors duration-200 hover:opacity-100" style={{color: 'var(--text-secondary)'}} href="https://github.com/el-pablos" target="_blank" rel="noreferrer">el-pablos</a> • <a className="underline transition-colors duration-200 hover:opacity-100" style={{color: 'var(--text-secondary)'}} href="https://github.com/dasaraul" target="_blank" rel="noreferrer">dasaraul</a> • <a className="underline transition-colors duration-200 hover:opacity-100" style={{color: 'var(--text-secondary)'}} href="https://t.me/ImTamaa" target="_blank" rel="noreferrer">Telegram</a></p>
        </div>
      </div>
    </footer>
  );
};

// ---------- GitHub Stats Hook ----------
const useGitHubStats = () => {
  const [stats, setStats] = useState({
    elPablos: { repos: 0, commits: 0, lastCommit: null, loading: true },
    dasaraul: { repos: 0, commits: 0, lastCommit: null, loading: true }
  });

  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  useEffect(() => {
    const fetchStats = async () => {
      const now = Date.now();

      // Check cache
      const cachedData = localStorage.getItem('github_stats');
      const cacheTime = localStorage.getItem('github_stats_time');

      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < CACHE_DURATION) {
        setStats(JSON.parse(cachedData));
        return;
      }

      try {
        const accounts = ['el-pablos', 'dasaraul'];
        const newStats = { elPablos: {}, dasaraul: {} };

        for (const account of accounts) {
          try {
            // Rate limiting with delay
            if (account === 'dasaraul') {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const [reposResponse, eventsResponse] = await Promise.all([
              fetch(`https://api.github.com/users/${account}/repos?per_page=100&type=owner`),
              fetch(`https://api.github.com/users/${account}/events?per_page=100`)
            ]);

            if (!reposResponse.ok || !eventsResponse.ok) {
              throw new Error(`API request failed for ${account}`);
            }

            const repos = await reposResponse.json();
            const events = await eventsResponse.json();

            // Count public repos
            const publicRepos = repos.filter(repo => !repo.private && !repo.fork).length;

            // Find last push event
            const pushEvents = events.filter(event => event.type === 'PushEvent');
            const lastCommit = pushEvents.length > 0 ? pushEvents[0].created_at : null;

            const key = account === 'el-pablos' ? 'elPablos' : 'dasaraul';
            newStats[key] = {
              repos: publicRepos,
              commits: pushEvents.length, // Approximate from recent events
              lastCommit: lastCommit ? new Date(lastCommit).toLocaleDateString() : 'N/A',
              loading: false
            };
          } catch (error) {
            console.warn(`Failed to fetch stats for ${account}:`, error);
            const key = account === 'el-pablos' ? 'elPablos' : 'dasaraul';
            newStats[key] = {
              repos: 0,
              commits: 0,
              lastCommit: 'Unavailable',
              loading: false,
              error: true
            };
          }
        }

        setStats(newStats);
        localStorage.setItem('github_stats', JSON.stringify(newStats));
        localStorage.setItem('github_stats_time', now.toString());

      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setStats({
          elPablos: { repos: 0, commits: 0, lastCommit: 'Error', loading: false, error: true },
          dasaraul: { repos: 0, commits: 0, lastCommit: 'Error', loading: false, error: true }
        });
      }
    };

    fetchStats();
  }, [CACHE_DURATION]);

  return stats;
};

// ---------- GitHub Stats Component ----------
const GitHubStats = () => {
  const stats = useGitHubStats();

  const StatCard = ({ title, data }) => (
    <div className="p-4 rounded-xl transition-all duration-200" style={{
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-color)',
      border: '1px solid'
    }}>
      <h4 className="font-semibold mb-3 transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
        {title}
      </h4>
      {data.loading ? (
        <div className="text-sm transition-colors duration-200" style={{color: 'var(--text-muted)'}}>
          Loading stats...
        </div>
      ) : data.error ? (
        <div className="text-sm transition-colors duration-200" style={{color: 'var(--text-muted)'}}>
          Stats unavailable
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
            <GitBranch className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Repos: {data.repos}</span>
          </div>
          <div className="flex items-center gap-2 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
            <Star className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Activity: {data.commits}+ events</span>
          </div>
          <div className="flex items-center gap-2 transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
            <Calendar className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Last: {data.lastCommit}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <StatCard title="@el-pablos" data={stats.elPablos} />
      <StatCard title="@dasaraul" data={stats.dasaraul} />
    </div>
  );
};

// ---------- Count-Up Animation Hook ----------
const useCountUp = (end, duration = 2000, decimals = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = easeOutQuart * end;

      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, decimals]);

  return count;
};

// ---------- Visitor Counter Hook ----------
const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const sessionKey = 'tamshub_visitor_session';
    const countKey = 'tamshub_visitor_count';

    // Check if this is a new session
    const hasVisited = sessionStorage.getItem(sessionKey);
    const currentCount = parseInt(localStorage.getItem(countKey)) || 0;

    if (!hasVisited) {
      // New session - increment counter
      const newCount = currentCount + 1;
      localStorage.setItem(countKey, newCount.toString());
      sessionStorage.setItem(sessionKey, 'visited');
      setVisitorCount(newCount);
    } else {
      // Existing session - just display current count
      setVisitorCount(currentCount);
    }

    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === countKey) {
        setVisitorCount(parseInt(e.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return visitorCount;
};

// ---------- Visitor Counter Component ----------
const VisitorCounter = () => {
  const count = useVisitorCounter();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-200" style={{
      backgroundColor: 'var(--violet-bg)',
      color: 'var(--text-primary)',
      fontSize: '0.875rem'
    }}>
      <Eye className="size-4" style={{color: 'var(--violet-primary)'}} />
      <span className="font-medium">Visitors: {count.toLocaleString()}</span>
    </div>
  );
};

// ---------- Enhanced Animated URL Hash Hook ----------
const useAnimatedHash = () => {
  useEffect(() => {
    const baseHashes = ['tamshub', 'code', 'your', 'dream'];
    const glitchChars = ['░', '▒', '▓', '█', '◆', '◇', '★', '▲', '▼', '◄', '►'];
    const cursorChars = ['_', '▮', '│', '|'];
    let currentIndex = 0;
    let isAnimating = false;
    let currentHash = '';
    let cursorVisible = true;
    let cursorIndex = 0;

    const getRandomGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];
    const getCurrentCursor = () => cursorChars[cursorIndex % cursorChars.length];

    const animateHashTransition = async (newHash) => {
      if (isAnimating) return;
      isAnimating = true;

      // Phase 1: Glitch effect with random characters
      for (let i = 0; i < 3; i++) {
        const glitchHash = '#' + Array.from({length: newHash.length}, () => getRandomGlitchChar()).join('');
        window.history.replaceState(null, null, glitchHash);
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      // Phase 2: Typing animation with cursor
      currentHash = '';
      for (let i = 0; i <= newHash.length; i++) {
        currentHash = newHash.substring(0, i);
        const displayHash = '#' + currentHash + (i < newHash.length ? getCurrentCursor() : '');
        window.history.replaceState(null, null, displayHash);

        // Occasionally insert random glitch characters during typing
        if (Math.random() < 0.3 && i < newHash.length) {
          const glitchPos = Math.floor(Math.random() * currentHash.length);
          const glitchedHash = '#' + currentHash.substring(0, glitchPos) + getRandomGlitchChar() + currentHash.substring(glitchPos + 1) + getCurrentCursor();
          window.history.replaceState(null, null, glitchedHash);
          await new Promise(resolve => setTimeout(resolve, 50));
          window.history.replaceState(null, null, displayHash);
        }

        await new Promise(resolve => setTimeout(resolve, 120));
        cursorIndex++;
      }

      // Phase 3: Final hash with blinking cursor for a moment
      for (let i = 0; i < 4; i++) {
        cursorVisible = !cursorVisible;
        const finalHash = '#' + newHash + (cursorVisible ? getCurrentCursor() : '');
        window.history.replaceState(null, null, finalHash);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Set final clean hash
      window.history.replaceState(null, null, '#' + newHash);
      isAnimating = false;
    };

    const updateHash = () => {
      const newHash = baseHashes[currentIndex];
      animateHashTransition(newHash);
      currentIndex = (currentIndex + 1) % baseHashes.length;
    };

    // Set initial hash
    updateHash();
    const interval = setInterval(updateHash, 4000); // Longer interval to accommodate animation

    // Prevent page jumping on hash changes
    const preventJump = (e) => {
      const targetHash = e.target.hash || window.location.hash;
      if (targetHash && baseHashes.some(hash => targetHash.includes(hash))) {
        e.preventDefault();
      }
    };

    window.addEventListener('hashchange', preventJump);

    return () => {
      clearInterval(interval);
      window.removeEventListener('hashchange', preventJump);
      window.history.replaceState(null, null, window.location.pathname);
    };
  }, []);
};

// ---------- Animated Favicon Hook ----------
const useAnimatedFavicon = () => {
  useEffect(() => {
    const symbols = ['</>', '{}', '()'];
    let currentIndex = 0;

    const createFavicon = (symbol) => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(0, 0, 32, 32);

      // Symbol
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

    updateFavicon(); // Set initial favicon
    const interval = setInterval(updateFavicon, 1000);

    return () => {
      clearInterval(interval);
      // Reset to default favicon
      let link = document.querySelector("link[rel*='icon']");
      if (link) {
        link.href = '/favicon.ico';
      }
    };
  }, []);
};

// ---------- Animated Title Hook ----------
const useAnimatedTitle = () => {
  useEffect(() => {
    const titleText = "tamshub | code your dream";
    const cursorSymbol = "_";
    let currentText = "";
    let isTyping = true;
    let charIndex = 0;
    let isBlinking = false;

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

    const typeInterval = setInterval(typewriter, 100);
    const blinkInterval = setInterval(cursorBlink, 350);

    return () => {
      clearInterval(typeInterval);
      clearInterval(blinkInterval);
      document.title = "Tama EL Pablo | Portfolio";
    };
  }, []);
};

// ---------- Main App ----------
export default function PortfolioTamaELPabloV2() {
  const [theme, setTheme] = useState("dark");
  useAnimatedTitle();
  useAnimatedFavicon();
  useAnimatedHash();

  useEffect(() => { const root = document.documentElement; if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark"); }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-200" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <GlobalStyles />
      <Background />

      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      {/* HERO */}
      <section id="home" className="pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-6xl font-extrabold tracking-tight transition-colors duration-200" style={{color: 'var(--text-primary)'}}>Tama EL Pablo</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-3 text-lg transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>Backend Developer <span style={{color: 'var(--text-muted)'}}>|</span> Open Source Enthusiast</motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-8">
            <HeroTerminal theme={theme} />
          </motion.div>

          <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <Button href="#portfolio" className="transition-all duration-200" style={{
              backgroundColor: 'var(--violet-primary)',
              color: 'white'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--violet-secondary)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--violet-primary)';
            }}>View Portfolio <ChevronRight className="size-4"/></Button>
            <Button href="#contact" className="transition-all duration-200" style={{
              backgroundColor: 'var(--bg-button)',
              color: 'var(--text-primary)'
            }} onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-button-hover)';
            }} onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-button)';
            }}>Get in Touch</Button>
          </div>
          <VisitorCounter />
        </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle pre="About" title="A Little About Me" desc="Tama EL Pablo — Backend Developer focused on Laravel." />
          <About theme={theme} />

          {/* GitHub Stats Section */}
          <div className="mt-12">
            <SectionTitle pre="GitHub" title="Development Statistics" desc="Real-time statistics from my GitHub accounts" />
            <GitHubStats />
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsSection />

      {/* SERVICES */}
      <section id="services" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle pre="Services" title="What I Do" desc="Ready to Work / Freelance • OSINT • API Integrations • Cross-Stack" />
          <Services />
        </div>
      </section>

      {/* WEB STRESSING SERVICE */}
      <section id="stressing">
        <WebStressingService />
      </section>

      {/* WEB STRESSER SHOWCASE */}
      <WebStresserShowcase />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle pre="Portfolio" title="Selected Works" desc="Repository pilihan dari GitHub saya." />
          <Portfolio />
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <CTA />
        </div>
      </section>

      {/* FOOTER */}
      <div className="mx-auto max-w-6xl px-4">
        <Footer />
      </div>
    </div>
  );
}