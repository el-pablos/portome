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

/* ── Stats Section ── */
export function StatsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
        {[
          { value: "99.9%", label: "Success Rate" },
          { value: "150+", label: "Websites Tested" },
          { value: "24/7", label: "Available" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-3xl md:text-4xl font-black" style={{ color: "var(--clr-primary)" }}>
              {stat.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--clr-text-muted)" }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Why Work With Me Bento ── */
const bentoItems = [
  { icon: "⚡", title: "High Performance", desc: "Optimized APIs with sub-100ms response times and efficient database queries." },
  { icon: "🌐", title: "Global Scale", desc: "Infrastructure ready for millions of requests across multiple regions." },
  { icon: "🗄️", title: "Data Integrity", desc: "Robust database design with proper indexing, caching, and backup strategies." },
  { icon: "🔒", title: "Security First", desc: "OWASP-compliant security practices, encryption, and vulnerability assessments." },
  { icon: "🏗️", title: "Clean Architecture", desc: "Maintainable, testable code following SOLID principles and design patterns." },
  { icon: "🚀", title: "Rapid Delivery", desc: "CI/CD pipelines, automated testing, and agile development workflow." },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-24 px-6 border-t" style={{ borderColor: "var(--clr-border)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--clr-primary)" }}>
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3">Why Work With Me</h2>
          <p className="mt-3 text-base" style={{ color: "var(--clr-text-muted)" }}>
            Keunggulan yang bikin project kamu beda dari yang lain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl p-6 border"
              style={{ background: "var(--clr-bg-card)", borderColor: "var(--clr-border)" }}
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tama" alt="" className="w-full h-full" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">el-pablos</p>
          <p className="text-white/70 text-xs">Laravel · PHP</p>
        </div>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.06, rotate: 2, y: -2 }}
        whileTap={{ scale: 0.94, rotate: -2 }}
        className="self-start cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
        style={{ background: "var(--clr-accent)", color: "#000" }}
      >
        PHP
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
        10+
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
