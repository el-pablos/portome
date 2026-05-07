"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function PageLoader({ duration = 3000 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => { el.style.overflow = prev; };
  }, []);

  useEffect(() => {
    if (exit) document.documentElement.style.overflow = "";
  }, [exit]);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(1 - Math.pow(1 - pct, 3));
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setExit(true), 400);
      }
    };
    requestAnimationFrame(tick);
  }, [duration]);

  const percent = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center h-dvh overflow-hidden"
          style={{ background: "var(--clr-primary)" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative flex flex-col items-center gap-10 z-10">
            {/* Logo */}
            <motion.div className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="bg-white text-black font-black tracking-tight text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm">
                TAMA
                <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              </div>
              <div className="text-black font-black text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm"
                style={{ background: "var(--clr-accent)" }}>DEV</div>
            </motion.div>

            {/* Orbiting ring + spinning diamond */}
            <motion.div className="relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <svg width="120" height="120" viewBox="0 0 120 120" className="absolute">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <motion.circle cx="60" cy="60" r="52" fill="none"
                  stroke="var(--clr-accent)" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - progress)}
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 0.05s linear" }} />
              </svg>
              <motion.div className="absolute w-3 h-3 rounded-full shadow-lg"
                style={{ background: "var(--clr-accent)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                transformTemplate={(_, t) => `${t} translate(0px, -52px)`} />
              <motion.div animate={{ rotate: [0, 360] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
                  <path d="M20 3 L37 20 L20 37 L3 20 Z" fill="var(--clr-accent)" />
                  <path d="M20 3 L3 20 L20 20 Z" fill="rgba(255,255,255,0.3)" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Percent counter */}
            <motion.div className="flex flex-col items-center gap-1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="font-black tabular-nums leading-none"
                style={{
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  color: "var(--clr-accent)",
                  textShadow: "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99",
                }}>
                {percent}<span className="text-white/60 text-2xl">%</span>
              </span>
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">
                {done ? "Ready" : "Loading"}
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div className="w-48 h-[3px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}
              initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.25 }}>
              <motion.div className="h-full rounded-full"
                style={{
                  background: "linear-gradient(to right, var(--clr-accent), #fff)",
                  width: `${percent}%`,
                  transition: "width 0.05s linear",
                }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
