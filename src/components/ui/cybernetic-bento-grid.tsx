import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  bgAccent?: string;
}

interface CyberneticBentoGridProps {
  items: BentoItem[];
  className?: string;
}

function BentoCard({ item, index }: { item: BentoItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl border overflow-hidden transition-all duration-500 backdrop-blur-md",
        "hover:scale-[1.02] hover:shadow-xl",
        item.className,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-card)",
      }}
    >
      {/* Cybernetic grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--violet-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--violet-primary) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: "var(--violet-primary)" }}
      />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl opacity-30 transition-opacity group-hover:opacity-60"
        style={{ borderColor: "var(--violet-primary)" }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {item.icon && (
          <div
            className="mb-4 p-3 rounded-xl w-fit transition-colors duration-200"
            style={{
              backgroundColor: "var(--violet-bg)",
              color: "var(--violet-primary)",
            }}
          >
            {item.icon}
          </div>
        )}
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {item.description}
        </p>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, var(--violet-bg), transparent 70%)`,
        }}
      />
    </div>
  );
}

export function CyberneticBentoGrid({
  items,
  className = "",
}: CyberneticBentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]",
        className
      )}
    >
      {items.map((item, index) => (
        <BentoCard key={index} item={item} index={index} />
      ))}
    </div>
  );
}

export default CyberneticBentoGrid;
