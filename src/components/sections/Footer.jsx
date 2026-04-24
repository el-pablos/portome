import React, { memo } from "react";
import { Github, Send, TerminalSquare } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Lab", href: "#stressing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Footer = memo(() => (
  <footer className="content-layer pb-24 pt-10 sm:pb-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_0.6fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg border" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)" }}>
                <TerminalSquare className="size-5" style={{ color: "var(--accent)" }} />
              </span>
              <div>
                <h2 className="font-display text-xl font-black" style={{ color: "var(--text-primary)" }}>
                  Tama EL Pablo
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Backend developer / portfolio system
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              Website portfolio yang dibangun ulang dengan mobile-first layout, motion aktif, asset asli, testing, CI/CD, dan dokumentasi repo yang lebih siap dipublikasi.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Footer navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-lg border px-3 py-2 text-sm font-bold transition-colors" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-secondary)" }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3 lg:justify-end">
            <a href="https://github.com/el-pablos" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-lg border transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
              <Github className="size-5" />
            </a>
            <a href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" aria-label="Telegram" className="grid size-11 place-items-center rounded-lg border transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--accent)", color: "#11100d" }}>
              <Send className="size-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
          <span>© {new Date().getFullYear()} Tama EL Pablo. Built for porto.tams.codes.</span>
          <span>React / Tailwind / Motion / GitHub Actions</span>
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = "Footer";

export default Footer;
