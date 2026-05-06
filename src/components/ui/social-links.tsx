import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";

const links = [
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/in/sugidev", variant: "primary" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/sugidev", variant: "primary" },
  { icon: FaXTwitter, label: "X / Twitter", href: "https://x.com/sugidev", variant: "primary" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/sugidev", variant: "accent" },
  { icon: FaEnvelope, label: "Email", href: "mailto:sugi@sugi.dev", variant: "accent" },
];

export function SocialLinks() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop — fixed left sidebar */}
      <div className="hidden md:flex fixed top-[35%] left-0 z-40 flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 w-44 py-3 px-4 rounded-r-xl text-sm font-semibold transition-all duration-300 -ml-[120px] hover:ml-[-10px]"
            style={{
              background: link.variant === "primary"
                ? "linear-gradient(135deg, #0038FF, #0066FF)"
                : "linear-gradient(135deg, #CCFF00, #AAEE00)",
              color: link.variant === "primary" ? "#fff" : "#000",
            }}
          >
            <link.icon className="text-lg shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Mobile — fixed bottom right toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              {/* Links */}
              <motion.div
                key="links"
                className="absolute bottom-16 right-0 flex flex-col gap-2 items-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold shadow-lg"
                    style={{
                      background: link.variant === "primary"
                        ? "linear-gradient(135deg, #0038FF, #0066FF)"
                        : "linear-gradient(135deg, #CCFF00, #AAEE00)",
                      color: link.variant === "primary" ? "#fff" : "#000",
                    }}
                  >
                    <link.icon className="text-sm" />
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white text-xl"
          style={{ background: "var(--clr-primary)" }}
        >
          {mobileOpen ? "✕" : "☰"}
        </motion.button>
      </div>
    </>
  );
}
