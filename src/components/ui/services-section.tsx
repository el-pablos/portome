import { motion } from "motion/react";
import { RevealImageList } from "./reveal-images";

const techStack = [
  { name: "Laravel", variant: "primary" },
  { name: "PHP", variant: "accent" },
  { name: "MySQL", variant: "primary" },
  { name: "Docker", variant: "accent" },
  { name: "Node.js", variant: "primary" },
  { name: "React", variant: "accent" },
  { name: "Linux", variant: "primary" },
  { name: "Security", variant: "accent" },
];

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left — Reveal Image List */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <RevealImageList />
        </motion.div>

        {/* Right — Content */}
        <div className="flex flex-col gap-8">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 border"
            style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-card)" }}
          >
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full animate-ping opacity-70" style={{ background: "var(--clr-accent)" }} />
              <span className="relative block w-2 h-2 rounded-full" style={{ background: "var(--clr-accent)" }} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--clr-text-muted)" }}>
              Open to work
            </span>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              Building reliable<br />backend systems
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>
              I build reliable APIs, scalable services & security-first solutions
              with Laravel, PHP, and modern DevOps. From architecture to deployment,
              every endpoint is intentional.
            </p>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                variants={pillVariants}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-4 py-2 rounded-full text-xs font-bold"
                style={{
                  background: tech.variant === "primary" ? "var(--clr-primary)" : "var(--clr-accent)",
                  color: tech.variant === "primary" ? "#fff" : "#000",
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, rotate: 8, scale: 0.85 }}
            whileInView={{ opacity: 1, rotate: 3, scale: 1 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="rounded-2xl p-6 border shadow-lg self-start"
            style={{ background: "var(--clr-bg-card)", borderColor: "var(--clr-border)" }}
          >
            <p className="text-4xl font-black" style={{ color: "var(--clr-primary)" }}>3+</p>
            <p className="text-sm font-semibold mt-1" style={{ color: "var(--clr-text-muted)" }}>
              Years of Experience
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
