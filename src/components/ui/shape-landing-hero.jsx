import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// ---------- Animated Shape ----------
function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-violet-500/[0.15]",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      style={{ position: "absolute" }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height, position: "relative" }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "blur-[2px]"
          )}
        />
        <div
          className={cn(
            "absolute inset-[1px] rounded-full",
            "backdrop-blur-sm"
          )}
          style={{ backgroundColor: "var(--bg-primary)", opacity: 0.9 }}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------- HeroGeometric ----------
export function HeroGeometric({
  badge = "Tama EL Pablo",
  title1 = "Backend Developer",
  title2 = "Open Source Enthusiast",
  subtitle,
  children,
}) {
  const shapes = useMemo(
    () => [
      {
        delay: 0.3,
        width: 600,
        height: 140,
        rotate: 12,
        gradient: "from-violet-500/[0.15]",
        className: "left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]",
      },
      {
        delay: 0.5,
        width: 500,
        height: 120,
        rotate: -15,
        gradient: "from-purple-500/[0.15]",
        className: "right-[-5%] md:right-[0%] top-[70%] md:top-[75%]",
      },
      {
        delay: 0.4,
        width: 300,
        height: 80,
        rotate: -8,
        gradient: "from-violet-300/[0.1]",
        className: "left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]",
      },
      {
        delay: 0.6,
        width: 200,
        height: 60,
        rotate: 20,
        gradient: "from-purple-400/[0.1]",
        className: "right-[15%] md:right-[20%] top-[10%] md:top-[15%]",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-[80vh] md:min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape, i) => (
          <ElegantShape key={i} {...shape} />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-purple-500/[0.05] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "9999px",
            border: "1px solid var(--border-color)",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            backgroundColor: "var(--violet-bg)",
            color: "var(--violet-secondary)",
            marginBottom: "2rem",
          }}
        >
          <span className="inline-block size-2 rounded-full bg-violet-400 animate-pulse" />
          {badge}
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
            style={{ display: "block", color: "var(--text-primary)" }}
          >
            {title1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
            className="block bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 bg-clip-text text-transparent"
          >
            {title2}
          </motion.span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-xl mx-auto text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Children slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HeroGeometric;
