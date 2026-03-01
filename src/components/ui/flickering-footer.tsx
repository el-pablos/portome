import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

// ---------- Flickering Grid Background ----------
interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  className?: string;
}

function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(124, 58, 237)",
  className = "",
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let isRunning = true;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      if (!isRunning) return;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > flickerChance) continue;
          const opacity = Math.random() * 0.5 + 0.1;
          ctx.fillStyle = color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize
          );
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="w-full h-full opacity-30" />
    </div>
  );
}

// ---------- FlickeringFooter ----------
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FlickeringFooterProps {
  brand: {
    name: string;
    description: string;
    icon?: React.ReactNode;
  };
  sections: FooterSection[];
  socials: SocialLink[];
  copyright?: string;
  className?: string;
}

export function FlickeringFooter({
  brand,
  sections,
  socials,
  copyright,
  className = "",
}: FlickeringFooterProps) {
  return (
    <footer className={cn("relative overflow-hidden", className)}>
      {/* Flickering background */}
      <FlickeringGrid
        squareSize={3}
        gridGap={8}
        flickerChance={0.15}
        color="rgb(124, 58, 237)"
      />

      {/* Top line */}
      <div className="h-[2px] w-full animated-border rounded-full relative z-10" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--text-primary)" }}>
              {brand.icon}
              {brand.name}
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              {brand.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl transition-colors"
                  style={{
                    backgroundColor: "var(--bg-button)",
                    color: "var(--text-secondary)",
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-opacity hover:opacity-80"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid var(--border-color)",
            color: "var(--text-muted)",
          }}
        >
          {copyright || `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}

export default FlickeringFooter;
