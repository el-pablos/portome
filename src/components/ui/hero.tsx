import { motion } from "motion/react";

export function Hero() {
  return (
    <div className="relative min-h-screen md:h-[120vh] flex flex-col font-sans overflow-hidden w-full"
      style={{ background: "var(--clr-primary)" }}>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-1">
          <div className="bg-white text-black font-black tracking-tight text-xs md:text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm">
            SUGI
            <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
          </div>
          <div className="text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm"
            style={{ background: "var(--clr-accent)" }}>DEV</div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          {["Work", "About", "Stack", "Blog"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
              {item}
            </a>
          ))}
        </div>
        <a href="mailto:sugi@sugi.dev"
          className="px-6 py-2 rounded-full border border-white text-white text-xs md:text-sm font-semibold transition-colors"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--clr-primary)";
            (e.currentTarget as HTMLElement).style.background = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}>
          Hire me
        </a>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 relative z-10 pt-8 pb-40 md:pt-12 md:pb-64 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-20 mt-4 mb-16">

          {/* Card 1 — Bottom Left (desktop only) */}
          <motion.div animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute -bottom-16 -left-20 z-10 pointer-events-auto">
            <div className="w-52 aspect-[3/3.5] backdrop-blur-md border border-white/40 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[-12deg] shadow-2xl hover:rotate-0 transition-transform duration-500"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white/50 overflow-hidden"
                style={{ background: "#D2B48C" }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sugi&backgroundColor=D2B48C" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold text-lg text-white">sugi.dev</p>
                <p className="text-xs text-white/80 mt-1">42+ projects</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Top Right (desktop only) */}
          <motion.div animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:block absolute -top-10 -right-20 z-10 pointer-events-auto">
            <div className="w-52 aspect-[3/3.5] backdrop-blur-md border border-white/40 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[12deg] shadow-2xl hover:rotate-0 transition-transform duration-500"
              style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white/50 overflow-hidden"
                style={{ background: "#2C3E50" }}>
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Frontend" alt="Avatar" className="w-full h-full object-cover scale-150" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold text-lg text-white">React Dev</p>
                <p className="text-xs text-white/80 mt-1">3+ yrs experience</p>
              </div>
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-10 border"
            style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}>
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full animate-ping opacity-70" style={{ background: "var(--clr-accent)" }} />
              <span className="relative block w-2 h-2 rounded-full" style={{ background: "var(--clr-accent)" }} />
            </span>
            <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">Available for freelance</span>
          </motion.div>

          {/* Text Stack */}
          <div className="w-full flex flex-col items-center space-y-2 md:space-y-4">
            <div className="w-full flex justify-start pl-[10%] md:pl-[25%]">
              <h1 className="text-[clamp(4.5rem,12vw,160px)] font-black leading-[0.85] tracking-tighter m-0 p-0 uppercase"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif', color: "var(--clr-accent)",
                  textShadow: "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99" }}>
                SUGI
              </h1>
            </div>
            <div className="w-full flex justify-start md:justify-center overflow-hidden md:overflow-visible">
              <h1 className="text-[clamp(4.5rem,15vw,220px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99" }}>
                FRONTEND
              </h1>
            </div>
            <div className="w-full flex justify-start pl-[15%] md:pl-[30%]">
              <h1 className="text-[clamp(4.5rem,12vw,160px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{ fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: "1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99" }}>
                DEV
              </h1>
            </div>
          </div>

          {/* Mobile pill cards — md:hidden, in-flow */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden flex items-center justify-center gap-3 mt-10 w-full">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="w-9 h-9 rounded-full border-2 border-white/50 overflow-hidden shrink-0" style={{ background: "#D2B48C" }}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sugi&backgroundColor=D2B48C" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-black text-xs text-white leading-none">sugi.dev</p>
                <p className="text-[10px] text-white/70 mt-0.5 font-semibold">42+ projects</p>
              </div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <div className="w-9 h-9 rounded-full border-2 border-white/50 overflow-hidden shrink-0" style={{ background: "#2C3E50" }}>
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Frontend" alt="Avatar" className="w-full h-full object-cover scale-150" />
              </div>
              <div>
                <p className="font-black text-xs text-white leading-none">React Dev</p>
                <p className="text-[10px] text-white/70 mt-0.5 font-semibold">3+ yrs exp</p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
