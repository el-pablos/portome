import React, { memo, useCallback, useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Filter, Image as ImageIcon, Play, ShieldCheck, Video, X, Zap } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const showcaseItems = [
  {
    title: "Government portal observation",
    description: "Visual proof asset retained as portfolio evidence while public copy stays focused on authorized review and resilience notes.",
    mediaUrl: "/assets/showcase/photo_4913463250167902324_w.jpg",
    mediaType: "image",
    category: "Government",
    tags: ["Evidence", "Observation", "Report"],
  },
  {
    title: "Tax service availability note",
    description: "Network availability screenshot used as a case-study style artifact for documenting public-facing service conditions.",
    mediaUrl: "/assets/showcase/photo_4913463250167902361_y.jpg",
    mediaType: "image",
    category: "Government",
    tags: ["Availability", "Screenshot", "Case note"],
  },
  {
    title: "University portal signal",
    description: "Education-sector evidence item kept for visual continuity and reframed as an authorized resilience documentation pattern.",
    mediaUrl: "/assets/showcase/photo_4915715049981588609_y.jpg",
    mediaType: "image",
    category: "Education",
    tags: ["Education", "Signal", "Documentation"],
  },
  {
    title: "Operational video capture",
    description: "Short video proof asset for showing how media evidence can be displayed inside a polished portfolio lightbox.",
    mediaUrl: "/assets/showcase/document_4906738443322655853.mp4",
    mediaType: "video",
    category: "Video",
    tags: ["Video", "Capture", "Lightbox"],
  },
  {
    title: "Agency interface capture",
    description: "A second video artifact used to validate lazy media loading, modal playback, and responsive card behavior.",
    mediaUrl: "/assets/showcase/document_4913463249711662401.mp4",
    mediaType: "video",
    category: "Video",
    tags: ["Video", "Responsive", "Proof"],
  },
  {
    title: "National portal screenshot",
    description: "Static evidence item with preserved visual asset path and safe public wording for portfolio presentation.",
    mediaUrl: "/assets/showcase/indogoid.jpg",
    mediaType: "image",
    category: "Government",
    tags: ["Portal", "Asset", "Review"],
  },
  {
    title: "Healthcare service note",
    description: "Healthcare-category proof media used to exercise the filter UI and gallery density on mobile.",
    mediaUrl: "/assets/showcase/bpjsgoid.jpg",
    mediaType: "image",
    category: "Healthcare",
    tags: ["Healthcare", "Evidence", "UI"],
  },
  {
    title: "University network view",
    description: "Education screenshot retained as visual material for the redesigned showcase section.",
    mediaUrl: "/assets/showcase/upnyogyakarta.jpg",
    mediaType: "image",
    category: "Education",
    tags: ["Education", "Screenshot", "Asset"],
  },
  {
    title: "Mobile service capture",
    description: "Mobile service evidence item for validating varied screenshot proportions in the portfolio grid.",
    mediaUrl: "/assets/showcase/jkn.jpg",
    mediaType: "image",
    category: "Healthcare",
    tags: ["Mobile", "Health", "Evidence"],
  },
  {
    title: "Telecom platform video",
    description: "Video media retained to prove the modal player, lazy loading, and asset copy pipeline work after build.",
    mediaUrl: "/assets/showcase/mytelkomsel.mp4",
    mediaType: "video",
    category: "Telecom",
    tags: ["Telecom", "Video", "Asset"],
  },
];

const LazyImage = memo(({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && <div className="absolute inset-0 animate-pulse" style={{ background: "var(--bg-button)" }} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`h-full w-full object-cover transition duration-500 ${isLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
      />
    </>
  );
});

const LazyVideo = memo(({ src }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: "120px",
      threshold: 0.01,
    });
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className="h-full w-full">
      {isInView ? (
        <video src={src} className="h-full w-full object-cover" muted loop playsInline preload="metadata" />
      ) : (
        <div className="grid h-full w-full place-items-center" style={{ background: "var(--bg-button)" }}>
          <Play className="size-10" style={{ color: "var(--accent)" }} />
        </div>
      )}
    </div>
  );
});

const Showcase = memo(() => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  const categories = useMemo(() => ["All", ...new Set(showcaseItems.map((item) => item.category))], []);
  const filteredItems = useMemo(
    () => (filterCategory === "All" ? showcaseItems : showcaseItems.filter((item) => item.category === filterCategory)),
    [filterCategory]
  );

  const closeModal = useCallback(() => setSelectedMedia(null), []);

  return (
    <section className="py-16 sm:py-24" aria-label="Showcase evidence">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel overflow-hidden rounded-[1.8rem] p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <div className="section-kicker">Showcase Gallery</div>
              <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
                Evidence wall, rebuilt as a clean visual system.
              </h2>
              <p className="mt-5 text-base leading-8" style={{ color: "var(--text-secondary)" }}>
                Bagian showcase tetap mempertahankan media lama, tapi framing publiknya dibuat aman: dokumentasi, observability, proof asset, dan visual evidence untuk portfolio, bukan instruksi teknis yang berbahaya.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: showcaseItems.length, label: "media assets", icon: Eye },
                { value: categories.length - 1, label: "categories", icon: Filter },
                { value: "100%", label: "public asset paths", icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg border p-4" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)" }}>
                    <Icon className="size-5" style={{ color: "var(--accent-2)" }} />
                    <div className="mt-3 font-display text-3xl font-black" style={{ color: "var(--accent)" }}>
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase" style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar sm:flex-wrap">
            {categories.map((category) => {
              const isActive = filterCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilterCategory(category)}
                  className="shrink-0 rounded-lg border px-4 py-2 text-xs font-black transition-colors"
                  style={{
                    borderColor: isActive ? "var(--accent)" : "var(--border-color)",
                    background: isActive ? "var(--accent)" : "var(--bg-button)",
                    color: isActive ? "#11100d" : "var(--text-secondary)",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item, index) => {
            const content = (
              <button
                type="button"
                onClick={() => setSelectedMedia(item)}
                className="group kinetic-card h-full overflow-hidden rounded-lg text-left"
                style={{ color: "var(--text-primary)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.mediaType === "video" ? <LazyVideo src={item.mediaUrl} /> : <LazyImage src={item.mediaUrl} alt={item.title} />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-xs font-black text-white backdrop-blur">
                    {item.mediaType === "video" ? <Video className="size-3" /> : <ImageIcon className="size-3" />}
                    {item.mediaType}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="line-clamp-2 font-display text-lg font-black text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-3 text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );

            if (prefersReducedMotion) return <div key={item.title}>{content}</div>;

            return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: Math.min(index * 0.025, 0.22) }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-lg border px-5 py-4 text-sm font-bold" style={{ borderColor: "var(--border-color)", background: "var(--bg-button)", color: "var(--text-secondary)" }}>
          <Zap className="size-5" style={{ color: "var(--accent)" }} />
          Managed as portfolio evidence. No public exploit instructions.
        </div>
      </div>

      {selectedMedia && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4" onClick={closeModal}>
          <div className="max-h-[92vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={closeModal} className="mb-3 ml-auto grid size-11 place-items-center rounded-lg border text-white" style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)" }}>
              <X className="size-5" />
            </button>
            <div className="overflow-hidden rounded-lg bg-black">
              {selectedMedia.mediaType === "video" ? (
                <video src={selectedMedia.mediaUrl} className="max-h-[70vh] w-full object-contain" controls autoPlay />
              ) : (
                <img src={selectedMedia.mediaUrl} alt={selectedMedia.title} className="max-h-[70vh] w-full object-contain" />
              )}
            </div>
            <div className="mt-3 rounded-lg border p-5" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(17,16,13,0.9)", color: "#fff7e6" }}>
              <h3 className="font-display text-2xl font-black">{selectedMedia.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

LazyImage.displayName = "LazyImage";
LazyVideo.displayName = "LazyVideo";
Showcase.displayName = "Showcase";

export default Showcase;
