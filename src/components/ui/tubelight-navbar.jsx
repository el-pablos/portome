import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function TubelightNavbar({
  items,
  activeSection = "",
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const idx = items.findIndex(
      (item) => item.href.replace("#", "") === activeSection
    );
    if (idx >= 0) setActiveIndex(idx);
  }, [activeSection, items]);

  const handleClick = useCallback(
    (e, href, index) => {
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
              "relative flex items-center justify-center px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200"
            )}
            style={{
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
            }}
            aria-label={`Navigate to ${item.label}`}
          >
            {isActive && (
              <motion.div
                layoutId="tubelight-active"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "9999px",
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
                style={{
                  position: "absolute",
                  top: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "2rem",
                  height: "4px",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, transparent, var(--violet-primary), transparent)",
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
