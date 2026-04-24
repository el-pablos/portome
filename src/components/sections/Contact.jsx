import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const contactCards = [
  {
    label: "Telegram",
    value: "@ImTamaa",
    href: "https://t.me/ImTamaa",
    icon: Send,
    primary: true,
  },
  {
    label: "GitHub",
    value: "el-pablos",
    href: "https://github.com/el-pablos",
    icon: Github,
  },
  {
    label: "Email",
    value: "admin@porto.tams.codes",
    href: "mailto:admin@porto.tams.codes",
    icon: Mail,
  },
];

const Contact = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7 },
      };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="relative overflow-hidden rounded-[1.8rem] border p-5 sm:p-8 lg:p-10" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)", boxShadow: "0 30px 90px var(--shadow-color)" }} {...motionProps}>
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent)" }} />
            <div className="absolute -right-24 top-10 h-72 w-72 rotate-45 border" style={{ borderColor: "var(--border-color)" }} />
            <div className="absolute -bottom-24 left-10 h-64 w-64 rotate-12 border" style={{ borderColor: "var(--border-color)" }} />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <div className="section-kicker">Contact</div>
              <h2 className="section-title mt-4 font-display text-4xl sm:text-6xl lg:text-7xl">
                Bring the brief. I will bring the system.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
                Paling cepat lewat Telegram. Bisa bahas backend, integrasi API, portfolio/web redesign, repo polish, CI/CD, atau review flow sebelum launch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" className="shine-sweep relative inline-flex items-center justify-center overflow-hidden rounded-lg px-5 py-4 text-sm font-black transition-transform magnetic-link" style={{ background: "var(--accent)", color: "#11100d" }}>
                  <MessageCircle className="mr-2 size-5" /> Start Telegram chat
                </a>
                <a href="https://github.com/el-pablos/portome" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg border px-5 py-4 text-sm font-black transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
                  View source <ArrowUpRight className="ml-2 size-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border p-4 transition-transform magnetic-link"
                    style={{
                      borderColor: card.primary ? "var(--accent)" : "var(--border-color)",
                      background: card.primary ? "var(--accent-soft)" : "var(--bg-button)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="grid size-12 place-items-center rounded-lg" style={{ background: "var(--bg-card)", color: card.primary ? "var(--accent)" : "var(--accent-2)" }}>
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-black uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                        {card.label}
                      </span>
                      <span className="mt-1 block font-display text-xl font-black">{card.value}</span>
                    </span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--accent)" }} />
                  </a>
                );
              })}
              <div className="rounded-lg border p-4 text-sm leading-7" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-secondary)" }}>
                <Sparkles className="mb-3 size-5" style={{ color: "var(--accent)" }} />
                Brief yang jelas mempercepat estimate: tujuan, stack, deadline, akses repo, dan masalah utama yang mau dibereskan.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";

export default Contact;
