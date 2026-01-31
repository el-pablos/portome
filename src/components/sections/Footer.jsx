import React, { memo } from 'react';
import { 
  TerminalSquare, 
  Github, 
  Send, 
  Twitter, 
  Link as LinkIcon,
  Mail,
  MapPin
} from 'lucide-react';

// ---------- Footer Component ----------
const Footer = memo(() => {
  const chips = [
    "Laravel", "PHP", "MySQL", "PostgreSQL", "Docker", 
    "CI/CD", "OSINT", "Next.js", "Tailwind", "Framer Motion"
  ];
  
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Stressing", href: "#stressing" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="mt-16">
      <div className="h-[2px] w-full animated-border rounded-full" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div 
              className="flex items-center gap-2 font-semibold" 
              style={{color: 'var(--text-primary)'}}
            >
              <TerminalSquare className="size-5" style={{color: 'var(--violet-secondary)'}} /> 
              Tama EL Pablo
            </div>
            <p 
              className="mt-3 text-sm" 
              style={{color: 'var(--text-secondary)'}}
            >
              Backend Developer berfokus pada Laravel. Mengutamakan performa, keamanan, dan integrasi yang rapi.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a 
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" 
                href="https://github.com/el-pablos" 
                target="_blank" 
                rel="noreferrer"
              >
                <Github className="size-5"/>
              </a>
              <a 
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" 
                href="https://github.com/dasaraul" 
                target="_blank" 
                rel="noreferrer"
              >
                <Github className="size-5"/>
              </a>
              <a 
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" 
                href="https://t.me/ImTamaa" 
                target="_blank" 
                rel="noreferrer"
              >
                <Send className="size-5"/>
              </a>
              <span className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <Twitter className="size-5"/>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a 
                    className="inline-flex items-center gap-2 hover:opacity-100 transition-opacity" 
                    style={{color: 'var(--text-secondary)'}} 
                    href={l.href}
                  >
                    <LinkIcon className="size-4" style={{color: 'var(--violet-secondary)'}}/>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>
              Tech Stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span 
                  key={c} 
                  className="text-xs px-3 py-1 rounded-full" 
                  style={{backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)'}}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>
              Contact
            </h4>
            <ul 
              className="mt-3 space-y-2 text-sm" 
              style={{color: 'var(--text-secondary)'}}
            >
              <li className="flex items-center gap-2">
                <Mail className="size-4" style={{color: 'var(--violet-secondary)'}}/>
                admin@porto.tams.codes
              </li>
              <li className="flex items-center gap-2">
                <Send className="size-4" style={{color: 'var(--violet-secondary)'}}/>
                t.me/ImTamaa
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4" style={{color: 'var(--violet-secondary)'}}/>
                Jakarta Selatan, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="py-6 text-center text-xs" 
          style={{
            borderTop: '1px solid var(--border-color)', 
            color: 'var(--text-secondary)'
          }}
        >
          <p>
            © {new Date().getFullYear()} Tama EL Pablo • Code That Matters, Security That Protects • Jakarta Selatan
          </p>
          <p className="mt-1">
            Open to freelance & collaboration.{' '}
            <a 
              className="underline hover:opacity-100 transition-opacity" 
              style={{color: 'var(--text-secondary)'}} 
              href="https://github.com/el-pablos" 
              target="_blank" 
              rel="noreferrer"
            >
              el-pablos
            </a>
            {' • '}
            <a 
              className="underline hover:opacity-100 transition-opacity" 
              style={{color: 'var(--text-secondary)'}} 
              href="https://github.com/dasaraul" 
              target="_blank" 
              rel="noreferrer"
            >
              dasaraul
            </a>
            {' • '}
            <a 
              className="underline hover:opacity-100 transition-opacity" 
              style={{color: 'var(--text-secondary)'}} 
              href="https://t.me/ImTamaa" 
              target="_blank" 
              rel="noreferrer"
            >
              Telegram
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
