import React, { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Github,
  RadioTower,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const heroImage = "/assets/me/IMG-20251010-WA0021.jpg";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const commandLines = [
  { label: "identity", value: "Tama EL Pablo - Backend Developer" },
  { label: "stack", value: "Laravel / React / API Integration / DevOps" },
  { label: "mode", value: "security-minded product engineering" },
  { label: "status", value: "available for selected freelance work" },
];

const HeroTerminal = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const interval = setInterval(() => {
      setActiveLine((current) => (current + 1) % commandLines.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="kinetic-card min-w-0 overflow-hidden rounded-[1.35rem]">
      <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ background: "var(--accent-3)" }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="size-2.5 rounded-full" style={{ background: "var(--accent-2)" }} />
        </div>
        <span className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.14em" }}>
          live brief
        </span>
      </div>
      <div className="space-y-3 p-4 font-mono text-xs sm:text-sm">
        {commandLines.map((line, index) => {
          const isActive = activeLine === index;
          return (
            <div
              key={line.label}
              className="rounded-2xl border px-3 py-2 transition-all"
              style={{
                borderColor: isActive ? "var(--accent)" : "var(--border-color)",
                background: isActive ? "var(--accent-soft)" : "transparent",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--accent-2)" }}>tep://{line.label}</span>
              <span className="mx-2" style={{ color: "var(--text-tertiary)" }}>
                -
              </span>
          <span className="break-words">{line.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

const VisitorCounter = memo(() => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sessionKey = "tamshub_visitor_session";
    const countKey = "tamshub_visitor_count";
    const currentCount = Number.parseInt(localStorage.getItem(countKey) || "0", 10);

    if (!sessionStorage.getItem(sessionKey)) {
      const nextCount = currentCount + 1;
      localStorage.setItem(countKey, String(nextCount));
      sessionStorage.setItem(sessionKey, "visited");
      setCount(nextCount);
      return;
    }

    setCount(currentCount);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-secondary)" }}>
      <RadioTower className="size-4" style={{ color: "var(--accent-2)" }} />
      Visitors: {count.toLocaleString()}
    </div>
  );
});

const Hero = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden",
        animate: "show",
        transition: { staggerChildren: 0.11, delayChildren: 0.1 },
      };

  const stats = useMemo(
    () => [
      { value: "API", label: "backend-first craft" },
      { value: "CI", label: "tested delivery flow" },
      { value: "UX", label: "motion-led portfolio" },
    ],
    []
  );

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt=""
          className="absolute right-0 top-0 h-full w-full object-cover opacity-30 sm:opacity-36 lg:w-[58%] lg:opacity-72"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 34%, black 100%)",
            maskImage: "linear-gradient(90deg, transparent 0%, black 34%, black 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 82%, transparent) 48%, color-mix(in srgb, var(--bg-primary) 36%, transparent) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(0deg, var(--bg-primary), transparent)" }} />
      </div>

      <motion.div className="mx-auto grid max-w-7xl min-w-0 gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.78fr] lg:items-end lg:px-8" {...motionProps}>
        <div className="min-w-0 max-w-4xl">
          <motion.div variants={reveal} className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--accent-2)", letterSpacing: "0.14em" }}>
              <span className="size-2 rounded-full animate-pulse" style={{ background: "var(--accent-2)" }} />
              Available for freelance
            </span>
            <VisitorCounter />
          </motion.div>

          <motion.h1 variants={reveal} className="font-display text-[2.75rem] font-black leading-[0.9] text-balance min-[420px]:text-[3.15rem] sm:text-[5.4rem] lg:text-[7.2rem]" style={{ color: "var(--text-primary)" }}>
            Tama EL Pablo
            <span className="block" style={{ color: "var(--accent)" }}>
              builds systems
            </span>
            that feel alive.
          </motion.h1>

          <motion.p variants={reveal} className="mt-6 max-w-[min(42rem,calc(100vw-2rem))] break-words text-sm leading-7 sm:text-lg sm:leading-8" style={{ color: "var(--text-secondary)" }}>
            Portfolio baru untuk backend developer yang fokus ke API, Laravel, integrasi, automation, dan security-minded delivery. Dibuat mobile-first dengan visual editorial, motion halus, asset real, dan komponen yang tetap aktif.
          </motion.p>

          <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#portfolio" className="shine-sweep relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-5 py-4 text-sm font-black transition-transform magnetic-link sm:w-auto" style={{ background: "var(--accent)", color: "#11100d" }}>
              Lihat karya <ChevronRight className="ml-2 size-4" />
            </a>
            <a href="#contact" className="inline-flex w-full items-center justify-center rounded-2xl border px-5 py-4 text-sm font-black transition-transform magnetic-link sm:w-auto" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
              Bahas project <ArrowUpRight className="ml-2 size-4" />
            </a>
          </motion.div>

          <motion.div variants={reveal} className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="min-w-0 rounded-2xl border p-4" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
                <div className="font-display text-2xl font-black" style={{ color: "var(--accent-2)" }}>
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={reveal} className="grid min-w-0 gap-4 lg:pb-4">
          <div className="kinetic-card relative overflow-hidden rounded-[1.6rem] p-4">
            <div className="absolute inset-x-6 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent)" }} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="section-kicker">signal profile</div>
                <h2 className="mt-3 font-display text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                  Backend craft with cinematic interface energy.
                </h2>
              </div>
              <TerminalSquare className="size-9 shrink-0" style={{ color: "var(--accent)" }} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <a className="rounded-2xl border p-4 transition-transform magnetic-link" href="https://github.com/el-pablos" target="_blank" rel="noreferrer" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
                <Github className="mb-3 size-5" style={{ color: "var(--accent-2)" }} />
                GitHub
              </a>
              <a className="rounded-2xl border p-4 transition-transform magnetic-link" href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
                <Send className="mb-3 size-5" style={{ color: "var(--accent-2)" }} />
                Telegram
              </a>
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border-color)", background: "var(--accent-soft)" }}>
                <ShieldCheck className="mb-3 size-5" style={{ color: "var(--accent)" }} />
                Secure flow
              </div>
              <div className="rounded-2xl border p-4" style={{ borderColor: "var(--border-color)", background: "var(--accent-2-soft)" }}>
                <Code2 className="mb-3 size-5" style={{ color: "var(--accent-2)" }} />
                Clean APIs
              </div>
            </div>
          </div>

          <HeroTerminal />

          <div className="flex items-center gap-3 rounded-[1.35rem] border px-4 py-3 text-sm" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-secondary)" }}>
            <Sparkles className="size-5" style={{ color: "var(--accent)" }} />
            Motion respects reduced-motion preference and keeps the page usable on mobile.
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";
HeroTerminal.displayName = "HeroTerminal";
VisitorCounter.displayName = "VisitorCounter";

export default Hero;
