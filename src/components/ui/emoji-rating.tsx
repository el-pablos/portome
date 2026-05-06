import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const emojis = ["😔", "😕", "😐", "🙂", "😍"];
const labels = ["Terrible", "Bad", "Okay", "Good", "Amazing"];

interface EmojiRatingProps {
  onRate: (rating: number) => void;
}

export function EmojiRating({ onRate }: EmojiRatingProps) {
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActive(index);
    onRate(index + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        {emojis.map((emoji, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            animate={active === i ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative text-3xl md:text-4xl cursor-pointer select-none"
          >
            {/* Glow ring */}
            <AnimatePresence>
              {active === i && (
                <motion.span
                  key="glow"
                  className="absolute inset-0 -m-2 rounded-full"
                  style={{ background: "var(--clr-accent)", filter: "blur(12px)" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.4, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                />
              )}
            </AnimatePresence>
            {/* Burst ring on click */}
            <AnimatePresence>
              {active === i && (
                <motion.span
                  key="burst"
                  className="absolute inset-0 -m-3 rounded-full border-2"
                  style={{ borderColor: "var(--clr-accent)" }}
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">{emoji}</span>
          </motion.button>
        ))}
      </div>

      {/* Label */}
      <div className="h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold"
              style={{ color: "var(--clr-text-muted)" }}
            >
              {labels[active]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
