import React, { useMemo, memo } from 'react';
import { FocusCards } from '../ui/focus-cards';
import { ZoomParallax } from '../ui/zoom-parallax';

// ---------- Photo data ----------
const photos = [
  { title: "Moment 1",  src: "/me/IMG-20251010-WA0020.jpg" },
  { title: "Moment 2",  src: "/me/IMG-20251010-WA0021.jpg" },
  { title: "Moment 3",  src: "/me/IMG-20251010-WA0022.jpg" },
  { title: "Moment 4",  src: "/me/IMG-20251010-WA0023.jpg" },
  { title: "Moment 5",  src: "/me/IMG-20251010-WA0024.jpg" },
  { title: "Moment 6",  src: "/me/IMG-20251010-WA0025.jpg" },
  { title: "Moment 7",  src: "/me/IMG-20251010-WA0026.jpg" },
  { title: "Moment 8",  src: "/me/IMG-20251010-WA0027.jpg" },
  { title: "Moment 9",  src: "/me/IMG-20251010-WA0028.jpg" },
  { title: "Moment 10", src: "/me/IMG-20251010-WA0029.jpg" },
  { title: "Moment 11", src: "/me/WhatsApp%20Image%202025-10-10%20at%2022.26.17_c4dc76b3.jpg" },
  { title: "Special Moment", src: "/me/WhatsApp%20Image%202025-10-10%20at%2022.29.14_344c694c.jpg" },
];

// ---------- ZoomParallax items (first 7 photos) ----------
const parallaxItems = photos.slice(0, 7).map((p, i) => ({
  src: p.src,
  scale: [1, 4 + i],
  top: i < 3 ? "0%" : "-10%",
  left: `${(i % 4) * 25}%`,
  width: i === 1 || i === 4 ? "35%" : "25%",
}));

// ---------- Photo Gallery Section ----------
const PhotoGallery = memo(() => {
  const cards = useMemo(() => photos, []);

  return (
    <section id="gallery" className="py-16" aria-label="Photo Gallery">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <div className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--violet-secondary)' }}>
            Gallery
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            My Moments
          </h2>
          <p className="mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" style={{ color: 'var(--text-secondary)' }}>
            Koleksi foto-foto pribadi dan momen awikwok.
          </p>
        </div>
      </div>

      {/* Parallax zoom intro */}
      <ZoomParallax items={parallaxItems} className="mb-16" />

      {/* Focus cards grid */}
      <div className="py-8">
        <FocusCards cards={cards} />
      </div>
    </section>
  );
});

PhotoGallery.displayName = 'PhotoGallery';

export default PhotoGallery;
