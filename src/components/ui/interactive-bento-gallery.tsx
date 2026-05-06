import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export interface MediaItemType {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  span: string;
}

function MediaItem({ item, className = "" }: { item: MediaItemType; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [item.type]);

  if (item.type === "video") {
    return (
      <div ref={containerRef} className={`w-full h-full ${className}`}>
        <video
          ref={videoRef}
          src={item.url}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <img src={item.url} alt={item.title} className={`w-full h-full object-cover ${className}`} />
  );
}

function GalleryModal({
  items,
  selectedId,
  onClose,
}: {
  items: MediaItemType[];
  selectedId: number;
  onClose: () => void;
}) {
  const [currentId, setCurrentId] = useState(selectedId);
  const currentItem = items.find((i) => i.id === currentId) || items[0];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="gallery-modal-backdrop"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-6xl h-[85vh] rounded-[2.5rem] overflow-hidden border-2 flex flex-col"
          style={{ borderColor: "var(--clr-primary)" }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>

          {/* Main media */}
          <div className="flex-1 bg-black">
            <MediaItem item={currentItem} className="rounded-none" />
          </div>

          {/* Thumbnail dock */}
          <div className="bg-black/90 backdrop-blur-md p-4 border-t border-white/10">
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentId(item.id)}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    item.id === currentId ? "border-white" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">▶</div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export function InteractiveBentoGallery({ items }: { items: MediaItemType[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 auto-rows-[160px] gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`gallery-item-${item.id}`}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedId(item.id)}
          >
            <MediaItem item={item} />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div>
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-white/70 text-xs">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedId !== null && (
        <GalleryModal
          items={items}
          selectedId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}
