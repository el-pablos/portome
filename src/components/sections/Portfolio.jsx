import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, Bot, ShoppingCart, FileText, Building2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ---------- Card Component ----------
const Card = memo(({ children, className = "" }) => (
  <div 
    className={`rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg hoverlift hoverpulse ${className}`} 
    style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--bg-card)',
      boxShadow: `0 10px 25px var(--shadow-color)`
    }}
  >
    {children}
  </div>
));

// ---------- Section Title ----------
const SectionTitle = memo(({ pre, title, desc }) => (
  <div className="mx-auto max-w-4xl text-center mb-12">
    <div className="text-sm uppercase tracking-[0.3em] mb-4" style={{color: 'var(--violet-secondary)'}}>
      {pre}
    </div>
    <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{color: 'var(--text-primary)'}}>
      {title}
    </h2>
    {desc && (
      <p className="mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" style={{color: 'var(--text-secondary)'}}>
        {desc}
      </p>
    )}
  </div>
));

// ---------- Portfolio Grid ----------
const Portfolio = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const projects = [
    {
      title: "TelegramME - Server Manager Bot",
      desc: "Bot Telegram untuk kontrol panel Pterodactyl dengan API yang aman dan mudah digunakan",
      tech: ["Node.js", "Telegram API", "Pterodactyl", "Security"],
      link: "#",
      github: "https://github.com/el-pablos/TelegramME",
      icon: Bot
    },
    {
      title: "Komoditas Desa - CRUD System",
      desc: "Laravel-based web application untuk manage komoditi di desa dalam bentuk admin dashboard",
      tech: ["Laravel", "PHP", "MySQL", "Blade"],
      link: "#",
      github: "https://github.com/dasaraul/komoditas-desa",
      icon: Building2
    },
    {
      title: "Shopping List Manager",
      desc: "Aplikasi Flutter untuk todo/checklist daftar belanjaan via mobile Android dengan animasi smooth",
      tech: ["Flutter", "Provider", "SQLite", "Android"],
      link: "#",
      github: "https://github.com/dasaraul/daftar_belanjaan_new",
      icon: ShoppingCart
    },
    {
      title: "Daily Note - Personal Journal",
      desc: "Aplikasi Flutter untuk daily note dengan design yang elegant dan functionality yang comprehensive",
      tech: ["Flutter", "SQLite", "Material Design", "Android"],
      link: "#",
      github: "https://github.com/dasaraul/Daily-Note-Flutter",
      icon: FileText
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, index) => {
        const ProjectIcon = project.icon;
        
        const content = (
          <Card className="overflow-hidden hover:scale-105 transition-transform duration-200">
            <div className="h-48 bg-gradient-to-br from-violet-600/20 to-purple-600/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ProjectIcon 
                  className="size-16" 
                  style={{color: 'var(--violet-secondary)', opacity: 0.6}} 
                />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-black/40 rounded-lg hover:bg-violet-600/60 transition-colors"
                >
                  <Github className="size-4" style={{color: 'white'}} />
                </a>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>
                {project.title}
              </h3>
              <p className="text-sm mb-4" style={{color: 'var(--text-secondary)'}}>
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 rounded text-xs" 
                    style={{backgroundColor: 'var(--violet-bg)', color: 'var(--violet-secondary)'}}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        );

        if (prefersReducedMotion) {
          return <div key={index}>{content}</div>;
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
});

// ---------- Main Portfolio Section ----------
const PortfolioSection = memo(() => {
  return (
    <section id="portfolio" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle 
          pre="Portfolio" 
          title="Selected Works" 
          desc="Repository pilihan dari GitHub saya." 
        />
        <Portfolio />
      </div>
    </section>
  );
});

PortfolioSection.displayName = 'PortfolioSection';
Portfolio.displayName = 'Portfolio';
SectionTitle.displayName = 'SectionTitle';
Card.displayName = 'Card';

export default PortfolioSection;
