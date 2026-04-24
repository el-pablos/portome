import React, { memo } from "react";
import {
  Boxes,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Server,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import { LogoCarousel } from "../ui/logo-carousel";

const techLogos = [
  { name: "Laravel", icon: <Code2 className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "PHP", icon: <Terminal className="size-6" style={{ color: "var(--accent-2)" }} /> },
  { name: "MySQL", icon: <Database className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "PostgreSQL", icon: <Database className="size-6" style={{ color: "var(--accent-2)" }} /> },
  { name: "Docker", icon: <Boxes className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "Node.js", icon: <Server className="size-6" style={{ color: "var(--accent-2)" }} /> },
  { name: "React", icon: <Globe className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "Tailwind", icon: <Zap className="size-6" style={{ color: "var(--accent-2)" }} /> },
  { name: "OSINT", icon: <Shield className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "Linux", icon: <Cpu className="size-6" style={{ color: "var(--accent-2)" }} /> },
  { name: "CI/CD", icon: <Layers className="size-6" style={{ color: "var(--accent)" }} /> },
  { name: "Security", icon: <Lock className="size-6" style={{ color: "var(--accent-2)" }} /> },
];

const TechStack = memo(() => (
  <section className="py-12 sm:py-20" aria-label="Tech stack">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel overflow-hidden rounded-[1.8rem] py-8">
        <div className="mx-auto mb-8 max-w-3xl px-5 text-center">
          <div className="section-kicker">Tech Stack</div>
          <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl">
            Tools that keep the build sharp.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
            Stack yang sering gue pakai buat nyambungin backend, interface, security checks, deployment, dan automation tanpa bikin workflow ribet.
          </p>
        </div>
        <LogoCarousel logos={techLogos} speed={28} />
      </div>
    </div>
  </section>
));

TechStack.displayName = "TechStack";

export default TechStack;
