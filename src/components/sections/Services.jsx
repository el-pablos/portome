import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Code2,
  Database,
  Gauge,
  Layers,
  Lock,
  PlugZap,
  Rocket,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { GlowCard } from "../ui/spotlight-card";
import { CyberneticBentoGrid } from "../ui/cybernetic-bento-grid";

const useCountUp = (end, duration = 1800, decimals = 0) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(decimals > 0 ? end.toFixed(decimals) : end);
      return undefined;
    }

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * end;
      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [decimals, duration, end, prefersReducedMotion]);

  return count;
};

const StatsSection = memo(() => {
  const response = useCountUp(100, 2000);
  const delivery = useCountUp(24, 1700);
  const quality = useCountUp(99.8, 2200, 1);

  return (
    <section className="py-12 sm:py-20" aria-label="Delivery metrics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[1.8rem] border p-4 sm:grid-cols-3 sm:p-6" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
          {[
            { value: `${response}+`, label: "API and integration patterns mapped", icon: Activity },
            { value: `${delivery}/7`, label: "async collaboration channel", icon: Gauge },
            { value: `${quality}%`, label: "quality-first delivery target", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="kinetic-card rounded-[1.35rem] p-5 text-center">
                <Icon className="mx-auto size-7" style={{ color: "var(--accent-2)" }} />
                <div className="mt-4 font-display text-4xl font-black" style={{ color: "var(--accent)" }}>
                  {item.value}
                </div>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const serviceItems = [
  {
    icon: Code2,
    title: "Backend Development",
    desc: "Laravel, PHP, Node.js, database design, API contracts, queue jobs, auth, and admin flows.",
    tech: ["Laravel", "REST API", "Queues", "Auth"],
  },
  {
    icon: PlugZap,
    title: "API Integration",
    desc: "Payment gateway, dashboard, automation, webhook, third-party API, and data sync work.",
    tech: ["Webhooks", "Gateway", "Automation", "Sync"],
  },
  {
    icon: ShieldCheck,
    title: "Security-Minded Review",
    desc: "Pragmatic review for input validation, auth boundaries, exposed secrets, and risky flows.",
    tech: ["OWASP", "Secrets", "Validation", "Audit"],
  },
  {
    icon: Layers,
    title: "Deploy & CI/CD",
    desc: "Build pipeline, release tagging, GitHub Actions, production build, and repo hygiene.",
    tech: ["GitHub Actions", "Build", "Release", "Docs"],
  },
];

const ServicesGrid = memo(() => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {serviceItems.map((service, index) => {
        const Icon = service.icon;
        const content = (
          <GlowCard className="h-full rounded-[1.35rem] p-5" spotlightColor="rgba(240, 196, 91, 0.16)">
            <Icon className="size-9" style={{ color: "var(--accent)" }} />
            <h3 className="mt-5 font-display text-xl font-black" style={{ color: "var(--text-primary)" }}>
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              {service.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.tech.map((tech) => (
                <span key={tech} className="rounded-full px-2.5 py-1 text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </GlowCard>
        );

        if (prefersReducedMotion) return <div key={service.title}>{content}</div>;

        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
});

const ServicesSection = memo(() => {
  const bentoItems = [
    {
      title: "Contract-first API thinking",
      description: "Routes, responses, validation, and integration assumptions are shaped before code gets messy.",
      icon: <Workflow className="size-6" />,
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Database clarity",
      description: "Schema choices, indexes, relationships, and query behavior stay visible during implementation.",
      icon: <Database className="size-6" />,
    },
    {
      title: "Launch-ready motion",
      description: "Portfolio UI is expressive, but still respects accessibility, mobile constraints, and build output.",
      icon: <Rocket className="size-6" />,
    },
    {
      title: "Security review habit",
      description: "No hardcoded secrets, no sloppy public config, and no accidental credential leaks.",
      icon: <Lock className="size-6" />,
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Release discipline",
      description: "Granular commits, CI checks, release workflow, and repo metadata are part of the delivery.",
      icon: <Layers className="size-6" />,
    },
    {
      title: "Performance budget",
      description: "Lazy sections, reduced-motion support, public assets, and responsive layouts keep the page usable.",
      icon: <Gauge className="size-6" />,
    },
  ];

  return (
    <>
      <StatsSection />
      <section id="services" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <div className="section-kicker">Services</div>
            <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
              Practical engineering with a premium surface.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
              Fokusnya bukan cuma bikin halaman cantik. Semua flow penting tetap kelihatan: backend, integrasi, security review, CI/CD, portfolio data, contact, dan pembuktian visual.
            </p>
          </div>

          <ServicesGrid />

          <div className="mt-16">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="section-kicker">Operating system</div>
                <h3 className="mt-3 font-display text-3xl font-black sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                  How the work stays sharp
                </h3>
              </div>
              <div className="hidden h-px flex-1 sm:block" style={{ background: "var(--border-color)" }} />
            </div>
            <CyberneticBentoGrid items={bentoItems} />
          </div>
        </div>
      </section>
    </>
  );
});

StatsSection.displayName = "StatsSection";
ServicesGrid.displayName = "ServicesGrid";
ServicesSection.displayName = "ServicesSection";

export default ServicesSection;
