import React, { memo, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Filter } from 'lucide-react';
import { GlowCard } from '../ui/spotlight-card';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import projects from '../../data/projects.generated.json';

/* ------------------------------------------------------------------ */
/*  Language → colour map                                              */
/* ------------------------------------------------------------------ */
const LANG_COLORS = {
  JavaScript:  '#f1e05a',
  TypeScript:  '#3178c6',
  Go:          '#00add8',
  PHP:         '#4f5d95',
  Blade:       '#f7523f',
  GDScript:    '#355570',
  Python:      '#3572a5',
  Unknown:     '#8b8b8b',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const prettyName = (name) =>
  name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const shortDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const allLanguages = ['All', ...Array.from(new Set(projects.map((p) => p.language)))];

/* ------------------------------------------------------------------ */
/*  Section Title                                                      */
/* ------------------------------------------------------------------ */
const SectionTitle = memo(({ pre, title, desc }) => (
  <div className="mx-auto max-w-4xl text-center mb-12">
    <div className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--violet-secondary)' }}>
      {pre}
    </div>
    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
      {title}
    </h2>
    {desc && (
      <p className="mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </p>
    )}
  </div>
));
SectionTitle.displayName = 'SectionTitle';

/* ------------------------------------------------------------------ */
/*  Single Project Card                                                */
/* ------------------------------------------------------------------ */
const ProjectCard = memo(({ project, index, prefersReducedMotion }) => {
  const langColor = LANG_COLORS[project.language] || LANG_COLORS.Unknown;

  const card = (
    <GlowCard className="h-full flex flex-col">
      {/* Gradient header */}
      <div className="h-36 bg-gradient-to-br from-violet-600/20 to-purple-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub repo: ${project.name}`}
            className="p-2 bg-black/40 rounded-lg hover:bg-violet-600/60 transition-colors"
          >
            <Github className="size-4 text-white" />
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              aria-label={`Live demo: ${project.name}`}
              className="p-2 bg-black/40 rounded-lg hover:bg-violet-600/60 transition-colors"
            >
              <ExternalLink className="size-4 text-white" />
            </a>
          )}
        </div>
        {/* Language badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="inline-block size-3 rounded-full" style={{ backgroundColor: langColor }} />
          <span className="text-xs font-medium text-white/90">{project.language}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1" style={{ color: 'var(--text-primary)' }}>
          {prettyName(project.name)}
        </h3>
        <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description || 'No description provided.'}
        </p>

        {/* Topics */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.topics.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[11px]"
                style={{ backgroundColor: 'var(--violet-bg)', color: 'var(--violet-secondary)' }}
              >
                {t}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                +{project.topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <span className="flex items-center gap-1"><Star className="size-3" /> {project.stars}</span>
          <span className="flex items-center gap-1"><GitFork className="size-3" /> {project.forks}</span>
          <span className="ml-auto">{shortDate(project.updatedAt)}</span>
        </div>
      </div>
    </GlowCard>
  );

  if (prefersReducedMotion) return <div className="h-full">{card}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="h-full"
    >
      {card}
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

/* ------------------------------------------------------------------ */
/*  Portfolio Grid with filter                                         */
/* ------------------------------------------------------------------ */
const PortfolioGrid = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLang, setActiveLang] = useState('All');

  const filtered = useMemo(
    () => (activeLang === 'All' ? projects : projects.filter((p) => p.language === activeLang)),
    [activeLang]
  );

  const handleFilter = useCallback((lang) => setActiveLang(lang), []);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8" role="radiogroup" aria-label="Filter by language">
        <Filter className="size-4 mr-1" style={{ color: 'var(--text-tertiary)' }} />
        {allLanguages.map((lang) => (
          <button
            key={lang}
            role="radio"
            aria-checked={activeLang === lang}
            onClick={() => handleFilter(lang)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: activeLang === lang ? 'var(--violet-primary)' : 'var(--bg-card)',
              color: activeLang === lang ? '#ffffff' : 'var(--text-secondary)',
              border: `1px solid ${activeLang === lang ? 'var(--violet-primary)' : 'var(--border-color)'}`,
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="portfolio-grid">
        {filtered.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center mt-8" style={{ color: 'var(--text-tertiary)' }}>
          No projects match this filter.
        </p>
      )}
    </>
  );
});
PortfolioGrid.displayName = 'PortfolioGrid';

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
const PortfolioSection = memo(() => (
  <section id="portfolio" className="py-16" aria-label="Portfolio">
    <div className="mx-auto max-w-6xl px-4">
      <SectionTitle
        pre="Portfolio"
        title="Selected Works"
        desc="Curated repositories from my GitHub, sorted by most recently updated."
      />
      <PortfolioGrid />
    </div>
  </section>
));

PortfolioSection.displayName = 'PortfolioSection';

export default PortfolioSection;
