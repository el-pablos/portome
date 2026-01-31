import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, Send, Twitter } from 'lucide-react';
import { BackgroundBeams } from '../ui/background-beams';
import { MetalButton } from '../ui/liquid-glass-button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ---------- CTA Section ----------
const CTA = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  
  const content = (
    <div 
      className="text-center py-20 md:py-28 px-8 md:px-12 relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'transparent',
        boxShadow: `0 10px 25px var(--shadow-color)`
      }}
    >
      {/* Background Beams Effect */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[var(--bg-primary)]/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          style={{
            color: 'var(--text-primary)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          Ready to Start Your Project?
        </h2>
        <p 
          className="mb-10 max-w-2xl mx-auto text-lg"
          style={{
            color: 'var(--text-secondary)',
            textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
          }}
        >
          Let's discuss your backend needs and build something amazing together. 
          I'm available for freelance work and open to collaboration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a href="https://t.me/ImTamaa" target="_blank" rel="noreferrer">
            <MetalButton variant="violet" className="w-full sm:w-auto">
              <Send className="size-5 mr-2 inline" />
              Contact via Telegram
            </MetalButton>
          </a>
          <a href="https://github.com/el-pablos" target="_blank" rel="noreferrer">
            <MetalButton variant="default" className="w-full sm:w-auto">
              <Github className="size-5 mr-2 inline" />
              View GitHub
            </MetalButton>
          </a>
        </div>
        <div className="flex justify-center gap-6">
          <a 
            href="https://github.com/el-pablos" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:scale-110 transition-transform"
            style={{color: 'var(--text-secondary)'}}
          >
            <Github className="size-6" />
          </a>
          <a 
            href="https://github.com/dasaraul" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:scale-110 transition-transform"
            style={{color: 'var(--text-secondary)'}}
          >
            <Github className="size-6" />
          </a>
          <a 
            href="https://t.me/ImTamaa" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:scale-110 transition-transform"
            style={{color: 'var(--text-secondary)'}}
          >
            <Send className="size-6" />
          </a>
          <span 
            className="cursor-pointer hover:scale-110 transition-transform"
            style={{color: 'var(--text-secondary)'}}
          >
            <Twitter className="size-6" />
          </span>
        </div>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return <div className="relative">{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      {content}
    </motion.div>
  );
});

// ---------- Contact Section ----------
const Contact = memo(() => {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <CTA />
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
CTA.displayName = 'CTA';

export default Contact;
