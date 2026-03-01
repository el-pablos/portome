import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface TubelightNavbarProps {
  items: NavItem[];
  activeSection?: string;
  className?: string;
}

export function TubelightNavbar({
  items,
  activeSection = "",
  className = "",
}: TubelightNavbarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // Sync activeSection with items
  useEffect(() => {
    const idx = items.findIndex(
      (item) => item.href.replace("#", "") === activeSection
    );
    if (idx >= 0) setActiveIndex(idx);
  }, [activeSection, items]);

  const handleClick = useCallback(
    (e: React.MouseEvent, href: string, index: number) => {
      e.preventDefault();
      setActiveIndex(index);
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden",
        "flex items-center gap-1 rounded-full p-1.5",
        "backdrop-blur-xl border shadow-xl",
        className
      )}
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-button)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href, index)}
            className={cn(
              "relative flex items-center justify-center px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200",
              isActive ? "" : "hover:opacity-80"
            )}
            style={{
              color: isActive
                ? "var(--text-primary)"
                : "var(--text-muted)",
            }}
            aria-label={`Navigate to ${item.label}`}
          >
            {isActive && (
              <motion.div
                layoutId="tubelight-active"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: "var(--violet-bg)",
                  border: "1px solid var(--violet-secondary)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {/* Tubelight glow effect */}
            {isActive && (
              <motion.div
                layoutId="tubelight-glow"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--violet-primary), transparent)",
                  filter: "blur(2px)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {item.icon}
              <span className="hidden min-[400px]:inline">{item.label}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default TubelightNavbar;
