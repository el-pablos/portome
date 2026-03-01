import React, { useMemo } from "react";
import { cn } from "../../lib/utils";

// ---------- Logo data (teknologi) ----------
export interface LogoItem {
  name: string;
  icon: React.ReactNode;
}

interface LogoCarouselProps {
  logos: LogoItem[];
  className?: string;
  speed?: number;
}

export function LogoCarousel({
  logos,
  className = "",
  speed = 30,
}: LogoCarouselProps) {
  // Duplicate for infinite scroll illusion
  const duplicated = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className={cn("relative overflow-hidden py-6", className)}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none" />

      <div
        className="flex gap-8 animate-marquee"
        style={{
          ["--duration" as any]: `${speed}s`,
          ["--gap" as any]: "2rem",
        }}
      >
        {duplicated.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex flex-col items-center gap-2 min-w-[80px] shrink-0"
          >
            <div
              className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              {logo.icon}
            </div>
            <span
              className="text-[10px] font-medium text-center"
              style={{ color: "var(--text-muted)" }}
            >
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoCarousel;
