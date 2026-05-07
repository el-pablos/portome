import { motion } from "motion/react";
import { FaGithub, FaTelegram, FaInstagram } from "react-icons/fa6";

function AnimatedContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const footerLinks = {
  Navigation: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ],
  Contact: [
    { label: "admin@porto.tams.codes", href: "mailto:admin@porto.tams.codes" },
    { label: "t.me/ImTamaa", href: "https://t.me/ImTamaa" },
    { label: "GitHub (el-pablos)", href: "https://github.com/el-pablos" },
    { label: "GitHub (dasaraul)", href: "https://github.com/dasaraul" },
  ],
};

const socialIcons = [
  { icon: FaGithub, href: "https://github.com/el-pablos" },
  { icon: FaGithub, href: "https://github.com/dasaraul" },
  { icon: FaTelegram, href: "https://t.me/ImTamaa" },
  { icon: FaInstagram, href: "https://instagram.com/imtamaa" },
];

export function Footer() {
  return (
    <footer
      className="relative max-w-6xl mx-auto px-6 pt-20 pb-10 rounded-t-[2rem] md:rounded-t-[4rem] border-t"
      style={{
        background: "radial-gradient(35% 128px at 50% 0%, color-mix(in srgb, var(--clr-primary) 6%, transparent), transparent)",
        borderColor: "var(--clr-border)",
      }}
    >
      {/* Top glow line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{ background: "linear-gradient(90deg, transparent, var(--clr-accent), transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Logo */}
        <AnimatedContainer className="md:col-span-2">
          <motion.a
            href="#top"
            className="inline-flex items-center gap-1.5 mb-4"
            whileHover="hover"
          >
            <motion.div
              variants={{ hover: { x: -2 } }}
              className="bg-black text-white font-black tracking-tight text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative"
            >
              TAMA
              <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-black"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
            </motion.div>
            <motion.div
              variants={{ hover: { scale: 1.05, rotate: 3 } }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-black font-black text-sm px-3 py-1.5 rounded-full border-[1.5px] border-black"
              style={{ background: "var(--clr-accent)" }}
            >
              DEV
            </motion.div>
          </motion.a>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--clr-text-muted)" }}>
            Backend Developer berfokus pada Laravel. Mengutamakan performa, keamanan, dan integrasi yang rapi.
          </p>
          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {socialIcons.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:bg-black hover:text-white"
                style={{ borderColor: "var(--clr-border)" }}
              >
                <social.icon className="text-sm" />
              </motion.a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <AnimatedContainer key={title}>
            <h4 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: "var(--clr-text-muted)" }}>
              {title}
            </h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4, color: "var(--clr-primary)" }}
                    className="text-sm transition-colors"
                    style={{ color: "var(--clr-text-muted)" }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </AnimatedContainer>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: "var(--clr-border)" }}>
        <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>
          © {new Date().getFullYear()} Tama EL Pablo — All rights reserved.
        </p>
        <a href="#top" className="text-xs font-semibold hover:underline" style={{ color: "var(--clr-primary)" }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
