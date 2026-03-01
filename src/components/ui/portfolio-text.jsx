import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function AnimatedLetterText({
  text,
  className = "",
  delay = 0,
}) {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <span className={cn("inline-flex flex-wrap justify-center", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.23, 0.86, 0.39, 0.96],
          }}
          style={{ 
            display: "inline-block",
            whiteSpace: letter === " " ? "pre" : "normal" 
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default AnimatedLetterText;
