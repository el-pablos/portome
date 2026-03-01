import React, { memo } from 'react';
import { LogoCarousel } from '../ui/logo-carousel';
import { GradientHeading } from '../ui/gradient-heading';
import { 
  Code2, 
  Database, 
  Shield, 
  Server, 
  Layers, 
  Terminal,
  Globe,
  Cpu,
  Lock,
  Zap
} from 'lucide-react';

// ---------- Tech Stack Logos ----------
const techLogos = [
  { name: "Laravel", icon: <Code2 className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "PHP", icon: <Terminal className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "MySQL", icon: <Database className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "PostgreSQL", icon: <Database className="size-6" style={{ color: 'var(--violet-secondary)' }} /> },
  { name: "Docker", icon: <Layers className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "Node.js", icon: <Server className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "React", icon: <Globe className="size-6" style={{ color: 'var(--violet-secondary)' }} /> },
  { name: "Tailwind", icon: <Zap className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "OSINT", icon: <Shield className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "Linux", icon: <Cpu className="size-6" style={{ color: 'var(--violet-secondary)' }} /> },
  { name: "CI/CD", icon: <Zap className="size-6" style={{ color: 'var(--violet-primary)' }} /> },
  { name: "Security", icon: <Lock className="size-6" style={{ color: 'var(--violet-secondary)' }} /> },
];

// ---------- TechStack Section ----------
const TechStack = memo(() => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <div 
            className="text-sm uppercase tracking-[0.3em] mb-4" 
            style={{ color: 'var(--violet-secondary)' }}
          >
            Tech Stack
          </div>
          <GradientHeading className="text-3xl sm:text-4xl">
            Tools & Technologies
          </GradientHeading>
          <p 
            className="mt-4 text-base sm:text-lg max-w-3xl mx-auto" 
            style={{ color: 'var(--text-secondary)' }}
          >
            Teknologi yang biasa gue pake buat ngerjain project — dari backend sampe deployment.
          </p>
        </div>
        <LogoCarousel logos={techLogos} speed={25} />
      </div>
    </section>
  );
});

TechStack.displayName = 'TechStack';

export default TechStack;
