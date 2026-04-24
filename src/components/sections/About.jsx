import React, { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ExternalLink,
  GitBranch,
  Github,
  MapPin,
  Send,
  ShieldCheck,
  Star,
  Workflow,
} from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const profileImage = "/assets/me/IMG-20251010-WA0024.jpg";

const profileCards = [
  { title: "Primary role", value: "Backend Developer", icon: Workflow },
  { title: "Home base", value: "Jakarta Selatan", icon: MapPin },
  { title: "Build style", value: "Fast, tested, security-aware", icon: ShieldCheck },
];

const useGitHubStats = () => {
  const [stats, setStats] = useState({
    elPablos: { repos: 0, events: 0, lastCommit: null, loading: true },
    dasaraul: { repos: 0, events: 0, lastCommit: null, loading: true },
  });

  useEffect(() => {
    const cacheDuration = 15 * 60 * 1000;
    const controller = new AbortController();

    const fetchStats = async () => {
      const now = Date.now();
      const cachedData = localStorage.getItem("github_stats");
      const cacheTime = localStorage.getItem("github_stats_time");

      if (cachedData && cacheTime && now - Number.parseInt(cacheTime, 10) < cacheDuration) {
        try {
          setStats(JSON.parse(cachedData));
          return;
        } catch (error) {
          localStorage.removeItem("github_stats");
          localStorage.removeItem("github_stats_time");
        }
      }

      const accounts = ["el-pablos", "dasaraul"];
      const nextStats = {};

      for (const account of accounts) {
        const key = account === "el-pablos" ? "elPablos" : "dasaraul";
        try {
          const [reposResponse, eventsResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${account}/repos?per_page=100&type=owner`, { signal: controller.signal }),
            fetch(`https://api.github.com/users/${account}/events?per_page=100`, { signal: controller.signal }),
          ]);

          if (!reposResponse.ok || !eventsResponse.ok) {
            throw new Error(`GitHub API request failed for ${account}`);
          }

          const repos = await reposResponse.json();
          const events = await eventsResponse.json();
          const publicRepos = repos.filter((repo) => !repo.private && !repo.fork).length;
          const pushEvents = events.filter((event) => event.type === "PushEvent");
          const lastCommit = pushEvents.length > 0 ? pushEvents[0].created_at : null;

          nextStats[key] = {
            repos: publicRepos,
            events: pushEvents.length,
            lastCommit: lastCommit ? new Date(lastCommit).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "N/A",
            loading: false,
          };
        } catch (error) {
          if (error.name === "AbortError") return;
          nextStats[key] = {
            repos: 0,
            events: 0,
            lastCommit: "Unavailable",
            loading: false,
            error: true,
          };
        }
      }

      setStats(nextStats);
      localStorage.setItem("github_stats", JSON.stringify(nextStats));
      localStorage.setItem("github_stats_time", String(now));
    };

    fetchStats();
    return () => controller.abort();
  }, []);

  return stats;
};

const GitHubStats = memo(() => {
  const stats = useGitHubStats();

  const StatCard = useCallback(({ title, data }) => (
    <div className="kinetic-card rounded-[1.35rem] p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-display text-lg font-black" style={{ color: "var(--text-primary)" }}>
          {title}
        </h4>
        <Github className="size-5" style={{ color: "var(--accent)" }} />
      </div>
      {data.loading ? (
        <div className="mt-5 h-20 animate-pulse rounded-2xl" style={{ background: "var(--bg-button)" }} />
      ) : data.error ? (
        <p className="mt-5 text-sm" style={{ color: "var(--text-muted)" }}>
          Stats unavailable
        </p>
      ) : (
        <div className="mt-5 grid gap-3 text-sm">
          <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <GitBranch className="size-4" style={{ color: "var(--accent-2)" }} />
            <span>{data.repos} public repos</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Star className="size-4" style={{ color: "var(--accent-2)" }} />
            <span>{data.events}+ recent push events</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Calendar className="size-4" style={{ color: "var(--accent-2)" }} />
            <span>Last signal: {data.lastCommit}</span>
          </div>
        </div>
      )}
    </div>
  ), []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard title="@el-pablos" data={stats.elPablos} />
      <StatCard title="@dasaraul" data={stats.dasaraul} />
    </div>
  );
});

const About = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const wrapper = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7 },
      };

  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch" {...wrapper}>
          <div className="kinetic-card relative min-h-[520px] overflow-hidden rounded-[1.8rem]">
            <img src={profileImage} alt="Tama EL Pablo" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(17,16,13,0.84), rgba(17,16,13,0.18) 52%, rgba(17,16,13,0.04))" }} />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="section-kicker">profile dossier</div>
              <h2 className="mt-3 font-display text-4xl font-black leading-none text-white sm:text-5xl">
                Field notes from a builder.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/74">
                Portfolio ini dibuat untuk nunjukin sisi engineering yang rapi tanpa kehilangan personality: cepat, visual, mobile-first, dan tetap gampang discan.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="glass-panel rounded-[1.8rem] p-6 sm:p-8">
              <div className="section-kicker">About</div>
              <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
                Backend logic, product sense, and interface drama in one place.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
                Hi, gue Tama EL Pablo. Fokus utama gue ada di Laravel, API, integrasi sistem, database, deployment, dan flow security yang masuk akal. Website ini tetap membawa modul lama seperti portfolio, gallery, testimonial, showcase, contact, dan service lab, tapi dibungkus ulang dengan desain yang jauh lebih elegan dan beda dari versi sebelumnya.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="https://github.com/el-pablos" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-black transition-transform magnetic-link" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-primary)" }}>
                  <Github className="mr-2 size-4" /> GitHub <ExternalLink className="ml-2 size-4" />
                </a>
                <a href="https://t.me/ImTamaa" target="_blank" rel="noreferrer" className="shine-sweep relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-4 py-3 text-sm font-black transition-transform magnetic-link" style={{ background: "var(--accent)", color: "#11100d" }}>
                  <Send className="mr-2 size-4" /> Telegram
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {profileCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="kinetic-card rounded-[1.35rem] p-5">
                    <Icon className="size-6" style={{ color: "var(--accent-2)" }} />
                    <p className="mt-4 text-xs font-bold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                      {card.title}
                    </p>
                    <p className="mt-2 font-display text-xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>
                      {card.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="section-kicker">GitHub</div>
                  <h3 className="mt-2 font-display text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                    Live development signals
                  </h3>
                </div>
                <div className="hidden h-px flex-1 sm:block" style={{ background: "var(--border-color)" }} />
              </div>
              <GitHubStats />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

About.displayName = "About";
GitHubStats.displayName = "GitHubStats";

export default About;
