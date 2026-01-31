import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ShieldCheck, PlugZap, Layers } from 'lucide-react';
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

// ---------- Count-Up Animation Hook ----------
const useCountUp = (end, duration = 2000, decimals = 0) => {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion, just show final value
    if (prefersReducedMotion) {
      setCount(decimals > 0 ? end.toFixed(decimals) : end);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = easeOutQuart * end;

      setCount(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, decimals, prefersReducedMotion]);

  return count;
};

// ---------- Stats Section ----------
const StatsSection = memo(() => {
  const successRate = useCountUp(99.9, 2500, 1);
  const websites = useCountUp(150, 2000);
  const uptime = useCountUp(24, 1500);
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true }
      };

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-4 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 
            className="text-4xl font-medium lg:text-5xl" 
            style={{color: 'var(--text-primary)'}}
          >
            Proven Performance
          </h2>
          <p style={{color: 'var(--text-secondary)'}}>
            Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal seperti Akamai, Cloudflare, Fastly, dan lainnya.
          </p>
        </div>

        <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0 md:divide-white/10">
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            {...motionProps}
            transition={{ duration: 0.6 }}
          >
            <div className="text-5xl font-bold" style={{color: 'var(--violet-primary)'}}>
              {successRate}%
            </div>
            <p style={{color: 'var(--text-secondary)'}}>Success Rate</p>
          </motion.div>
          
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            {...motionProps}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <div className="text-5xl font-bold" style={{color: 'var(--violet-primary)'}}>
              {websites}+
            </div>
            <p style={{color: 'var(--text-secondary)'}}>Websites Tested</p>
          </motion.div>
          
          <motion.div
            className="space-y-4 pt-6 md:pt-0"
            {...motionProps}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
          >
            <div className="text-5xl font-bold" style={{color: 'var(--violet-primary)'}}>
              {uptime}/7
            </div>
            <p style={{color: 'var(--text-secondary)'}}>Available</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// ---------- Services Section ----------
const Services = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const services = [
    {
      icon: Code2,
      title: "Backend Development",
      desc: "Laravel, PHP, MySQL, PostgreSQL - Building robust APIs and web services.",
      tech: ["Laravel", "PHP", "MySQL", "PostgreSQL"]
    },
    {
      icon: ShieldCheck,
      title: "OSINT & Security",
      desc: "Open source intelligence gathering and security research.",
      tech: ["OSINT", "Security Research", "Data Analysis"]
    },
    {
      icon: PlugZap,
      title: "API Integration",
      desc: "Third-party integrations, RESTful APIs, and microservices architecture.",
      tech: ["REST APIs", "GraphQL", "Webhooks", "Microservices"]
    },
    {
      icon: Layers,
      title: "DevOps & Infrastructure",
      desc: "Docker, CI/CD pipelines, and cloud deployment solutions.",
      tech: ["Docker", "CI/CD", "AWS", "Linux"]
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => {
        const ServiceIcon = service.icon;
        
        const content = (
          <Card className="p-6 hover:scale-105 transition-transform duration-200">
            <ServiceIcon className="size-12 mb-4" style={{color: 'var(--violet-primary)'}} />
            <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
              {service.title}
            </h3>
            <p className="mb-4 text-sm" style={{color: 'var(--text-secondary)'}}>
              {service.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tech.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-2 py-1 rounded text-xs" 
                  style={{backgroundColor: 'var(--violet-bg)', color: 'var(--violet-secondary)'}}
                >
                  {tech}
                </span>
              ))}
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

// ---------- Main Services Export ----------
const ServicesSection = memo(() => {
  return (
    <>
      {/* STATS */}
      <StatsSection />

      {/* SERVICES */}
      <section id="services" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle 
            pre="Services" 
            title="What I Do" 
            desc="Ready to Work / Freelance • OSINT • API Integrations • Cross-Stack" 
          />
          <Services />
        </div>
      </section>
    </>
  );
});

ServicesSection.displayName = 'ServicesSection';
Services.displayName = 'Services';
StatsSection.displayName = 'StatsSection';
SectionTitle.displayName = 'SectionTitle';
Card.displayName = 'Card';

export default ServicesSection;
