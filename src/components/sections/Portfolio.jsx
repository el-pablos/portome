import React, { memo, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Filter, GitFork, Github, Star } from "lucide-react";
import { GlowCard } from "../ui/spotlight-card";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import projects from "../../data/projects.generated.json";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00add8",
  PHP: "#4f5d95",
  Blade: "#f7523f",
  GDScript: "#355570",
  Python: "#3572a5",
  Unknown: "#8b8b8b",
};

const prettyName = (name) => name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const shortDate = (iso) => {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const allLanguages = ["All", ...Array.from(new Set(projects.map((project) => project.language)))];

const ProjectCard = memo(({ project, index, prefersReducedMotion }) => {
  const langColor = LANG_COLORS[project.language] || LANG_COLORS.Unknown;
  const initials = project.name
    .split("-")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const card = (
    <GlowCard className="group h-full rounded-lg" spotlightColor="rgba(115, 241, 213, 0.12)">
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-lg border font-display text-xl font-black" style={{ borderColor: "var(--border-color)", background: "var(--accent-soft)", color: "var(--accent-strong)" }}>
            {initials}
          </div>
          <div className="flex gap-2">
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`GitHub repo: ${project.name}`} className="grid size-10 place-items-center rounded-lg border transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
              <Github className="size-4" />
            </a>
            {project.homepage && (
              <a href={project.homepage} target="_blank" rel="noreferrer" aria-label={`Live demo: ${project.name}`} className="grid size-10 place-items-center rounded-lg border transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
          <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: langColor }} />
          {project.language}
        </div>

        <h3 className="mt-3 font-display text-2xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>
          {prettyName(project.name)}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
          {project.description || "Project ini belum punya deskripsi publik, tapi tetap masuk daftar curated repository."}
        </p>

        {project.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: "var(--accent-2-soft)", color: "var(--accent-2)" }}>
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: "var(--bg-button)", color: "var(--text-muted)" }}>
                +{project.topics.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center gap-4 border-t pt-4 text-xs" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
          <span className="flex items-center gap-1">
            <Star className="size-3.5" /> {project.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3.5" /> {project.forks}
          </span>
          <span className="ml-auto">{shortDate(project.updatedAt)}</span>
        </div>
      </div>
    </GlowCard>
  );

  if (prefersReducedMotion) return <div className="h-full">{card}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, delay: index * 0.05 }}
      className="h-full"
    >
      {card}
    </motion.div>
  );
});

const PortfolioGrid = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLang, setActiveLang] = useState("All");

  const filtered = useMemo(
    () => (activeLang === "All" ? projects : projects.filter((project) => project.language === activeLang)),
    [activeLang]
  );

  const handleFilter = useCallback((lang) => setActiveLang(lang), []);

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap sm:justify-center" role="radiogroup" aria-label="Filter by language">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-black uppercase" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
          <Filter className="size-4" /> Filter
        </span>
        {allLanguages.map((lang) => {
          const isActive = activeLang === lang;
          return (
            <button
              key={lang}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => handleFilter(lang)}
              className="shrink-0 rounded-lg border px-4 py-2 text-xs font-black transition-colors"
              style={{
                background: isActive ? "var(--accent)" : "var(--bg-button)",
                color: isActive ? "#11100d" : "var(--text-secondary)",
                borderColor: isActive ? "var(--accent)" : "var(--border-color)",
              }}
            >
              {lang}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="portfolio-grid">
        {filtered.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center" style={{ color: "var(--text-muted)" }}>
          No projects match this filter.
        </p>
      )}
    </>
  );
});

const PortfolioSection = memo(() => (
  <section id="portfolio" className="py-16 sm:py-24" aria-label="Portfolio">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <div className="section-kicker">Portfolio</div>
          <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
            Curated repos with sharper presence.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
            Data project tetap ditarik dari curated GitHub metadata, lalu ditampilkan sebagai case-file card yang gampang discan di mobile maupun desktop.
          </p>
        </div>
        <a href="https://github.com/el-pablos" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center rounded-lg border px-4 py-3 text-sm font-black transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
          Open GitHub <ArrowUpRight className="ml-2 size-4" />
        </a>
      </div>
      <PortfolioGrid />
    </div>
  </section>
));

ProjectCard.displayName = "ProjectCard";
PortfolioGrid.displayName = "PortfolioGrid";
PortfolioSection.displayName = "PortfolioSection";

export default PortfolioSection;
