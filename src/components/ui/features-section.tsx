import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function FeatureCard({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-8 flex flex-col gap-6"
      style={{ background: "var(--clr-bg-card)" }}
    >
      <h3 className="text-sm font-black uppercase tracking-wider opacity-60">{title}</h3>
      {children}
    </motion.div>
  );
}

function BuildFastBubble() {
  const [ripple, setRipple] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        whileHover={{ scale: 1.04, rotate: 1, y: -2 }}
        whileTap={{ scale: 0.96, rotate: -1 }}
        onClick={() => { setRipple(true); setTimeout(() => setRipple(false), 600); }}
        className="relative cursor-pointer rounded-2xl px-5 py-4 flex items-center gap-3 overflow-hidden"
        style={{ background: "var(--clr-primary)" }}
      >
        <AnimatePresence>
          {ripple && (
            <motion.span
              key="ripple"
              className="absolute inset-0 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.2)" }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/50 shrink-0">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sugi" alt="" className="w-full h-full" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">sugi.dev</p>
          <p className="text-white/70 text-xs">React · Next.js</p>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.06, rotate: 2, y: -2 }}
        whileTap={{ scale: 0.94, rotate: -2 }}
        className="self-start cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
        style={{ background: "var(--clr-accent)", color: "#000" }}
      >
        TypeScript
      </motion.div>
    </div>
  );
}

function CleanCodeBubble() {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="rounded-2xl px-5 py-4 text-white text-sm font-semibold"
        style={{ background: "var(--clr-primary)" }}
      >
        shadcn/ui · Tailwind
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1, rotate: -45 }}
        whileTap={{ scale: 0.9, rotate: -30 }}
        className="self-end cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
        style={{ background: "var(--clr-primary)" }}
      >
        ↗
      </motion.div>
    </div>
  );
}

function ShipOnTimeBubble() {
  return (
    <motion.div
      whileHover={{ scale: 1.04, rotate: -2 }}
      className="rounded-2xl px-6 py-5 cursor-pointer"
      style={{ background: "var(--clr-accent)" }}
    >
      <motion.span
        whileHover={{ scale: 1.2 }}
        className="block text-3xl font-black text-black"
      >
        42+
      </motion.span>
      <span className="text-xs font-bold text-black/70 uppercase tracking-wider">Projects Done</span>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard title="BUILD FAST UIs" delay={0}>
        <BuildFastBubble />
      </FeatureCard>
      <FeatureCard title="CLEAN CODEBASE" delay={0.1}>
        <CleanCodeBubble />
      </FeatureCard>
      <FeatureCard title="SHIP ON TIME" delay={0.2}>
        <ShipOnTimeBubble />
      </FeatureCard>
    </section>
  );
}
