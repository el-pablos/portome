import React, { memo, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Send, 
  ExternalLink,
  GitBranch,
  Star,
  Calendar
} from 'lucide-react';
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

// ---------- Hero Terminal (untuk About section) ----------
const HeroTerminal = memo(({ theme = 'dark' }) => {
  const lines = [
    { prompt: "~$", text: " whoami" },
    { prompt: "tamas@tamshub:$", text: " echo \"Backend Developer | Open Source Enthusiast\"" },
    { prompt: "tamas@tamshub:$", text: " gh profile view el-pablos" },
    { prompt: "tamas@tamshub:$", text: " telegram open @ImTamaa" },
  ];

  const prefersReducedMotion = useReducedMotion();
  const [cursorOn, setCursorOn] = useState(true);
  const [i, setI] = useState(prefersReducedMotion ? lines.length - 1 : 0);
  const [typed, setTyped] = useState(prefersReducedMotion ? lines[lines.length - 1].text.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const blink = setInterval(() => setCursorOn((c) => !c), 350);
    return () => clearInterval(blink);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const current = lines[i];
    if (!current) return;

    let timeoutId;
    if (typed <= current.text.length) {
      timeoutId = setTimeout(() => setTyped((v) => v + 1), 25);
    } else {
      timeoutId = setTimeout(() => {
        setI((v) => Math.min(v + 1, lines.length - 1));
        setTyped(0);
      }, 600);
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, i, prefersReducedMotion]);

  return (
    <Card className="relative overflow-hidden glow-purple">
      <div 
        className="flex items-center gap-2 px-4 py-3 border-b" 
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)'
        }}
      >
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-400/90 inline-block" />
          <span className="size-3 rounded-full bg-yellow-400/90 inline-block" />
          <span className="size-3 rounded-full bg-green-400/90 inline-block" />
        </div>
        <div className="ml-3 text-xs" style={{color: 'var(--text-muted)'}}>tamas@tamshub</div>
      </div>
      <div 
        className="p-6 text-sm font-mono leading-7" 
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)'
        }}
      >
        {lines.slice(0, i).map((l, idx) => (
          <div key={idx} style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{l.prompt}</span>
            <span>{l.text}</span>
          </div>
        ))}
        {i < lines.length && (
          <div style={{color: theme === 'dark' ? 'rgba(196, 181, 253, 0.9)' : 'rgba(88, 28, 135, 0.8)'}}>
            <span style={{color: theme === 'dark' ? '#6ee7b7' : '#059669'}}>{lines[i].prompt}</span>
            <span>{lines[i].text.slice(0, typed)}</span>
            {!prefersReducedMotion && (
              <span 
                className={`ml-0.5 ${cursorOn ? "opacity-100" : "opacity-0"}`} 
                style={{color: 'var(--violet-primary)', transition: 'opacity 0.2s'}}
              >
                ▮
              </span>
            )}
          </div>
        )}
        {i >= lines.length - 1 && (
          <div className="mt-4" style={{color: 'var(--text-secondary)'}}>
            $ Done. Type <span style={{color: 'var(--text-primary)'}}>help</span> to explore.
          </div>
        )}
      </div>
    </Card>
  );
});

// ---------- GitHub Stats Hook with proper caching ----------
const useGitHubStats = () => {
  const [stats, setStats] = useState({
    elPablos: { repos: 0, commits: 0, lastCommit: null, loading: true },
    dasaraul: { repos: 0, commits: 0, lastCommit: null, loading: true }
  });

  useEffect(() => {
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
    const controller = new AbortController();

    const fetchStats = async () => {
      const now = Date.now();
      const cachedData = localStorage.getItem('github_stats');
      const cacheTime = localStorage.getItem('github_stats_time');

      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < CACHE_DURATION) {
        try {
          setStats(JSON.parse(cachedData));
          return;
        } catch (e) {
          // Invalid cache, continue to fetch
        }
      }

      const accounts = ['el-pablos', 'dasaraul'];
      const newStats = { elPablos: {}, dasaraul: {} };

      for (const account of accounts) {
        try {
          if (account === 'dasaraul') {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

          const [reposResponse, eventsResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${account}/repos?per_page=100&type=owner`, {
              signal: controller.signal
            }),
            fetch(`https://api.github.com/users/${account}/events?per_page=100`, {
              signal: controller.signal
            })
          ]);

          if (!reposResponse.ok || !eventsResponse.ok) {
            throw new Error(`API request failed for ${account}`);
          }

          const repos = await reposResponse.json();
          const events = await eventsResponse.json();

          const publicRepos = repos.filter(repo => !repo.private && !repo.fork).length;
          const pushEvents = events.filter(event => event.type === 'PushEvent');
          const lastCommit = pushEvents.length > 0 ? pushEvents[0].created_at : null;

          const key = account === 'el-pablos' ? 'elPablos' : 'dasaraul';
          newStats[key] = {
            repos: publicRepos,
            commits: pushEvents.length,
            lastCommit: lastCommit ? new Date(lastCommit).toLocaleDateString() : 'N/A',
            loading: false
          };
        } catch (error) {
          if (error.name === 'AbortError') return;
          
          const key = account === 'el-pablos' ? 'elPablos' : 'dasaraul';
          newStats[key] = {
            repos: 0,
            commits: 0,
            lastCommit: 'Unavailable',
            loading: false,
            error: true
          };
        }
      }

      setStats(newStats);
      localStorage.setItem('github_stats', JSON.stringify(newStats));
      localStorage.setItem('github_stats_time', now.toString());
    };

    fetchStats();

    return () => controller.abort();
  }, []);

  return stats;
};

// ---------- GitHub Stats Component ----------
const GitHubStats = memo(() => {
  const stats = useGitHubStats();

  const StatCard = useCallback(({ title, data }) => (
    <div 
      className="p-4 rounded-xl" 
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        border: '1px solid'
      }}
    >
      <h4 className="font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
        {title}
      </h4>
      {data.loading ? (
        <div className="text-sm" style={{color: 'var(--text-muted)'}}>
          Loading stats...
        </div>
      ) : data.error ? (
        <div className="text-sm" style={{color: 'var(--text-muted)'}}>
          Stats unavailable
        </div>
      ) : (
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2" style={{color: 'var(--text-secondary)'}}>
            <GitBranch className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Repos: {data.repos}</span>
          </div>
          <div className="flex items-center gap-2" style={{color: 'var(--text-secondary)'}}>
            <Star className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Activity: {data.commits}+ events</span>
          </div>
          <div className="flex items-center gap-2" style={{color: 'var(--text-secondary)'}}>
            <Calendar className="size-4" style={{color: 'var(--violet-primary)'}} />
            <span>Last: {data.lastCommit}</span>
          </div>
        </div>
      )}
    </div>
  ), []);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <StatCard title="@el-pablos" data={stats.elPablos} />
      <StatCard title="@dasaraul" data={stats.dasaraul} />
    </div>
  );
});

// ---------- About Section Content ----------
const AboutContent = memo(({ theme }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold" style={{color: 'var(--text-primary)'}}>About Me</h3>
        <p className="mt-3" style={{color: 'var(--text-secondary)'}}>
          Hi! I'm <span className="font-medium" style={{color: 'var(--text-primary)'}}>Tama EL Pablo</span>, 
          a <span style={{color: 'var(--text-primary)'}}>Backend Developer</span> who loves building reliable 
          APIs and scalable services with <span style={{color: 'var(--text-primary)'}}>Laravel</span> as my primary stack.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <a 
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200" 
            style={{ backgroundColor: 'var(--bg-button)', color: 'var(--text-primary)' }} 
            href="https://github.com/el-pablos" 
            target="_blank" 
            rel="noreferrer"
          >
            <Github className="size-4" /> el-pablos <ExternalLink className="size-4" />
          </a>
          <a 
            href="https://t.me/ImTamaa" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-all duration-200"
            style={{ backgroundColor: 'var(--violet-primary)', color: 'white' }}
          >
            <Send className="size-4"/> @ImTamaa
          </a>
        </div>
      </Card>

      {prefersReducedMotion ? (
        <div className="relative">
          <HeroTerminal theme={theme} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <HeroTerminal theme={theme} />
        </motion.div>
      )}
    </div>
  );
});

// ---------- Section Title ----------
const SectionTitle = memo(({ pre, title, desc }) => (
  <div className="mx-auto max-w-4xl text-center mb-12">
    <div 
      className="text-sm uppercase tracking-[0.3em] mb-4" 
      style={{color: 'var(--violet-secondary)'}}
    >
      {pre}
    </div>
    <h2 
      className="mt-2 text-3xl sm:text-4xl font-semibold" 
      style={{color: 'var(--text-primary)'}}
    >
      {title}
    </h2>
    {desc && (
      <p 
        className="mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" 
        style={{color: 'var(--text-secondary)'}}
      >
        {desc}
      </p>
    )}
  </div>
));

// ---------- Main About Section ----------
const About = memo(({ theme }) => {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle 
          pre="About" 
          title="A Little About Me" 
          desc="Tama EL Pablo — Backend Developer focused on Laravel." 
        />
        <AboutContent theme={theme} />

        {/* GitHub Stats Section */}
        <div className="mt-12">
          <SectionTitle 
            pre="GitHub" 
            title="Development Statistics" 
            desc="Real-time statistics from my GitHub accounts" 
          />
          <GitHubStats />
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
AboutContent.displayName = 'AboutContent';
GitHubStats.displayName = 'GitHubStats';
SectionTitle.displayName = 'SectionTitle';
Card.displayName = 'Card';
HeroTerminal.displayName = 'HeroTerminal';

export default About;
