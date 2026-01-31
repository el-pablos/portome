import React, { useMemo, memo } from 'react';
import { FocusCards } from '../ui/focus-cards';

// ---------- Photo Gallery Section ----------
const PhotoGallery = memo(() => {
  const photos = useMemo(() => [
    {
      title: "Moment 1",
      src: "/me/IMG-20251010-WA0020.jpg"
    },
    {
      title: "Moment 2",
      src: "/me/IMG-20251010-WA0021.jpg"
    },
    {
      title: "Moment 3",
      src: "/me/IMG-20251010-WA0022.jpg"
    },
    {
      title: "Moment 4",
      src: "/me/IMG-20251010-WA0023.jpg"
    },
    {
      title: "Moment 5",
      src: "/me/IMG-20251010-WA0024.jpg"
    },
    {
      title: "Moment 6",
      src: "/me/IMG-20251010-WA0025.jpg"
    },
    {
      title: "Moment 7",
      src: "/me/IMG-20251010-WA0026.jpg"
    },
    {
      title: "Moment 8",
      src: "/me/IMG-20251010-WA0027.jpg"
    },
    {
      title: "Moment 9",
      src: "/me/IMG-20251010-WA0028.jpg"
    },
    {
      title: "Moment 10",
      src: "/me/IMG-20251010-WA0029.jpg"
    },
    {
      title: "Moment 11",
      src: "/me/WhatsApp%20Image%202025-10-10%20at%2022.26.17_c4dc76b3.jpg"
    },
    {
      title: "Special Moment",
      src: "/me/WhatsApp%20Image%202025-10-10%20at%2022.29.14_344c694c.jpg"
    }
  ], []);

  return (
    <div className="py-16">
      <FocusCards cards={photos} />
    </div>
  );
});

PhotoGallery.displayName = 'PhotoGallery';

export default PhotoGallery;
