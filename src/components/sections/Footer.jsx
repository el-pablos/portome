import React, { memo } from 'react';
import { 
  TerminalSquare, 
  Github, 
  Send, 
  Twitter
} from 'lucide-react';
import { FlickeringFooter } from '../ui/flickering-footer';

// ---------- Footer Component ----------
const Footer = memo(() => {
  const brand = {
    name: "Tama EL Pablo",
    description: "Backend Developer berfokus pada Laravel. Mengutamakan performa, keamanan, dan integrasi yang rapi.",
    icon: <TerminalSquare className="size-5" style={{ color: 'var(--violet-secondary)' }} />,
  };

  const sections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Stressing", href: "#stressing" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Tech Stack",
      links: [
        { label: "Laravel & PHP", href: "#services" },
        { label: "MySQL & PostgreSQL", href: "#services" },
        { label: "Docker & CI/CD", href: "#services" },
        { label: "OSINT & Security", href: "#services" },
        { label: "React & Tailwind", href: "#services" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "admin@porto.tams.codes", href: "mailto:admin@porto.tams.codes" },
        { label: "t.me/ImTamaa", href: "https://t.me/ImTamaa" },
        { label: "Jakarta Selatan, Indonesia", href: "#" },
      ],
    },
  ];

  const socials = [
    {
      label: "GitHub (el-pablos)",
      href: "https://github.com/el-pablos",
      icon: <Github className="size-5" />,
    },
    {
      label: "GitHub (dasaraul)",
      href: "https://github.com/dasaraul",
      icon: <Github className="size-5" />,
    },
    {
      label: "Telegram",
      href: "https://t.me/ImTamaa",
      icon: <Send className="size-5" />,
    },
    {
      label: "Twitter",
      href: "#",
      icon: <Twitter className="size-5" />,
    },
  ];

  return (
    <FlickeringFooter
      brand={brand}
      sections={sections}
      socials={socials}
      copyright={`© ${new Date().getFullYear()} Tama EL Pablo • Code That Matters, Security That Protects • Jakarta Selatan`}
    />
  );
});

Footer.displayName = 'Footer';

export default Footer;
