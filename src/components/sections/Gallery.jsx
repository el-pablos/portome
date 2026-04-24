import React, { memo, useMemo } from "react";
import { Camera, GalleryHorizontalEnd, MapPinned } from "lucide-react";
import { FocusCards } from "../ui/focus-cards";
import { ZoomParallax } from "../ui/zoom-parallax";

const photos = [
  { title: "Waterfall Camp", src: "/assets/me/IMG-20251010-WA0021.jpg" },
  { title: "River Outlook", src: "/assets/me/IMG-20251010-WA0024.jpg" },
  { title: "Travel Frame 01", src: "/assets/me/IMG-20251010-WA0020.jpg" },
  { title: "Travel Frame 02", src: "/assets/me/IMG-20251010-WA0022.jpg" },
  { title: "Travel Frame 03", src: "/assets/me/IMG-20251010-WA0023.jpg" },
  { title: "Travel Frame 04", src: "/assets/me/IMG-20251010-WA0025.jpg" },
  { title: "Travel Frame 05", src: "/assets/me/IMG-20251010-WA0026.jpg" },
  { title: "Travel Frame 06", src: "/assets/me/IMG-20251010-WA0027.jpg" },
  { title: "Travel Frame 07", src: "/assets/me/IMG-20251010-WA0028.jpg" },
  { title: "Travel Frame 08", src: "/assets/me/IMG-20251010-WA0029.jpg" },
  { title: "Evening Portrait", src: "/assets/me/WhatsApp%20Image%202025-10-10%20at%2022.26.17_c4dc76b3.jpg" },
  { title: "Special Moment", src: "/assets/me/WhatsApp%20Image%202025-10-10%20at%2022.29.14_344c694c.jpg" },
];

const parallaxItems = photos.slice(0, 7).map((photo, index) => ({
  src: photo.src,
  scale: [1, 3.4 + index * 0.55],
  top: index < 3 ? "0%" : "-10%",
  left: `${(index % 4) * 24}%`,
  width: index === 1 || index === 4 ? "35%" : "25%",
}));

const PhotoGallery = memo(() => {
  const cards = useMemo(() => photos, []);

  return (
    <section id="gallery" className="py-16 sm:py-24" aria-label="Photo Gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <div className="section-kicker">Gallery</div>
            <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
              Real moments, not stock filler.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8" style={{ color: "var(--text-secondary)" }}>
              Asset visual portfolio memakai foto asli dari folder project. Ini bikin halaman terasa personal, bukan template generik.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: photos.length, label: "photos", icon: Camera },
              { value: "2", label: "featured frames", icon: GalleryHorizontalEnd },
              { value: "ID", label: "local story", icon: MapPinned },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border p-4" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
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
      </div>

      <ZoomParallax items={parallaxItems} className="my-10 sm:my-16" />

      <div className="px-4 pb-4 sm:px-6 lg:px-8">
        <FocusCards cards={cards} />
      </div>
    </section>
  );
});

PhotoGallery.displayName = "PhotoGallery";

export default PhotoGallery;
