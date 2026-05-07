import { useState } from "react";
import { motion } from "motion/react";

interface Project {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00add8",
  PHP: "#4f5d95",
  Blade: "#f7523f",
  GDScript: "#355570",
  Python: "#3572a5",
  Unknown: "#8b8b8b",
};

const projects: Project[] = [
  { name: "ai-whatsapp-chatbot", description: "AI-powered WhatsApp chatbot dengan integrasi OpenAI", url: "https://github.com/el-pablos/ai-whatsapp-chatbot", homepage: "", language: "JavaScript", topics: ["ai", "whatsapp", "chatbot", "nodejs"], stars: 0, forks: 0 },
  { name: "pentest-for-qa", description: "All-in-One Pentest Toolkit - 20+ security tools recoded By Tama | Recon, SQLi, XSS, OSINT, RAT & more", url: "https://github.com/el-pablos/pentest-for-qa", homepage: "", language: "Go", topics: ["hacking", "penetration-testing", "pentest", "security", "osint", "rat", "recon", "sqlinjection", "vulnerability-scanner", "xss"], stars: 0, forks: 0 },
  { name: "tamshub-store", description: "TamsHub Store - Platform Top Up Game & Online Service (Laravel + Next.js)", url: "https://github.com/el-pablos/tamshub-store", homepage: "", language: "TypeScript", topics: ["laravel", "nextjs", "ecommerce", "topup"], stars: 0, forks: 0 },
  { name: "simulasi-atm-udin", description: "Simulasi Antrian ATM - Laravel 11 queuing theory simulator (M/M/1 & M/M/c) dengan dashboard interaktif & role-based auth", url: "https://github.com/el-pablos/simulasi-atm-udin", homepage: "", language: "Blade", topics: ["atm", "dashboard", "laravel", "php", "queuing-theory", "simulation", "tailwindcss", "university-project"], stars: 0, forks: 0 },
  { name: "unfollow-tools", description: "Instagram automation tool - mass unfollow, delete media & highlights. Built with Playwright & Node.js", url: "https://github.com/el-pablos/unfollow-tools", homepage: "", language: "JavaScript", topics: ["automation", "bot", "instagram", "javascript", "nodejs", "playwright", "social-media", "unfollow"], stars: 0, forks: 0 },
  { name: "valentine", description: "Surat digital dari Tama untuk Vida - Happy Valentine's Day", url: "https://github.com/el-pablos/valentine", homepage: "https://valentine-five-gold-81.vercel.app", language: "TypeScript", topics: ["framer-motion", "love-letter", "nextjs", "react", "tailwindcss", "typescript", "valentine", "webapp"], stars: 0, forks: 0 },
  { name: "reboot-godot-uas-projek", description: "Project: REBOOT 2D Action Platformer (Godot 4.x) | 188 Tests | CI/CD | CC0 Assets", url: "https://github.com/el-pablos/reboot-godot-uas-projek", homepage: "", language: "GDScript", topics: ["2d-game", "ci-cd", "game-dev", "godot", "godot4", "platformer"], stars: 0, forks: 0 },
  { name: "caturnawa-uf-2025", description: "University project — Laravel fullstack application", url: "https://github.com/el-pablos/caturnawa-uf-2025", homepage: "", language: "Blade", topics: ["laravel", "university-project"], stars: 2, forks: 0 },
  { name: "rpl-digital-library", description: "Digital library management system — RPL course project", url: "https://github.com/el-pablos/rpl-digital-library", homepage: "", language: "PHP", topics: ["php", "library", "university-project"], stars: 0, forks: 0 },
  { name: "platform-aduan-masyarakat", description: "Platform pengaduan masyarakat — Laravel civic tech", url: "https://github.com/el-pablos/platform-aduan-masyarakat", homepage: "", language: "Blade", topics: ["laravel", "civic-tech", "php"], stars: 0, forks: 0 },
];

const allLanguages = ["All", ...Array.from(new Set(projects.map((p) => p.language)))];

function prettyName(name: string) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PortfolioGrid() {
  const [activeLang, setActiveLang] = useState("All");

  const filtered = activeLang === "All" ? projects : projects.filter((p) => p.language === activeLang);

  return (
    <section id="portfolio" className="py-24 px-6 border-t" style={{ borderColor: "var(--clr-border)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--clr-primary)" }}>
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3">Selected Works</h2>
          <p className="mt-3 text-base" style={{ color: "var(--clr-text-muted)" }}>
            Curated repositories from my GitHub, sorted by most recently updated.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {allLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors border"
              style={{
                background: activeLang === lang ? "var(--clr-primary)" : "var(--clr-bg-card)",
                color: activeLang === lang ? "#fff" : "var(--clr-text-muted)",
                borderColor: activeLang === lang ? "var(--clr-primary)" : "var(--clr-border)",
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border overflow-hidden flex flex-col group"
              style={{ background: "var(--clr-bg-card)", borderColor: "var(--clr-border)" }}
            >
              {/* Header gradient */}
              <div className="h-32 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--clr-primary), #6366f1)" }}>
                <div className="absolute inset-0 bg-black/10" />
                {/* Language badge */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: LANG_COLORS[project.language] || LANG_COLORS.Unknown }} />
                  <span className="text-xs font-medium text-white/90">{project.language}</span>
                </div>
                {/* Links */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="p-2 bg-black/40 rounded-lg text-white text-xs">↗</span>
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-black/40 rounded-lg text-white text-xs hover:bg-white/20"
                      onClick={(e) => e.stopPropagation()}>
                      🌐
                    </a>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold mb-1 line-clamp-1 group-hover:text-[var(--clr-primary)] transition-colors">
                  {prettyName(project.name)}
                </h3>
                <p className="text-xs mb-4 line-clamp-2 flex-1" style={{ color: "var(--clr-text-muted)" }}>
                  {project.description}
                </p>

                {/* Topics */}
                {project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.topics.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{ background: "rgba(0,56,255,0.08)", color: "var(--clr-primary)" }}>
                        {t}
                      </span>
                    ))}
                    {project.topics.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-[10px]" style={{ color: "var(--clr-text-muted)" }}>
                        +{project.topics.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px]" style={{ color: "var(--clr-text-muted)" }}>
                  {project.stars > 0 && <span>⭐ {project.stars}</span>}
                  {project.forks > 0 && <span>🍴 {project.forks}</span>}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
