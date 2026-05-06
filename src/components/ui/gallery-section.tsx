import { InteractiveBentoGallery } from "./interactive-bento-gallery";

const mediaItems = [
  { id: 1, type: "image" as const, title: "Visual Identity", desc: "Clean & modern branding",
    url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
  { id: 2, type: "video" as const, title: "Abstract Motion", desc: "Dynamic digital art",
    url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2" },
  { id: 3, type: "image" as const, title: "Architecture", desc: "Minimalist structure",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=60",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2" },
  { id: 4, type: "image" as const, title: "Nature Focus", desc: "Organic elements",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
  { id: 5, type: "video" as const, title: "Macro Life", desc: "Detailed closeups",
    url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
  { id: 6, type: "image" as const, title: "Coastal Serenity", desc: "Ocean breeze",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2" },
  { id: 7, type: "video" as const, title: "Cultural Heritage", desc: "Peaceful atmosphere",
    url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2" },
];

export function GallerySection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <InteractiveBentoGallery items={mediaItems} />
    </section>
  );
}
