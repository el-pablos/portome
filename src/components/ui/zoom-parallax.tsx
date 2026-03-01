import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface ZoomParallaxImage {
  src: string;
  alt: string;
  scale?: number;
  className?: string;
}

interface ZoomParallaxProps {
  images: ZoomParallaxImage[];
  className?: string;
  reducedMotion?: boolean;
}

export function ZoomParallax({
  images,
  className = "",
  reducedMotion = false,
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // If reduced motion, show static grid
  if (reducedMotion) {
    return (
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
        {images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-xl overflow-hidden"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  }

  const scaleValues = images.map(
    (img) => img.scale || 1 + (images.indexOf(img) % 3) * 0.3
  );

  return (
    <div ref={containerRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto grid grid-cols-3 gap-4 p-8">
          {images.slice(0, 7).map((img, i) => {
            const targetScale = scaleValues[i] || 1;
            return (
              <ZoomParallaxItem
                key={i}
                img={img}
                progress={scrollYProgress}
                index={i}
                targetScale={targetScale}
                total={Math.min(images.length, 7)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ZoomParallaxItem({
  img,
  progress,
  index,
  targetScale,
  total,
}: {
  img: ZoomParallaxImage;
  progress: any;
  index: number;
  targetScale: number;
  total: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const scale = useTransform(progress, [start, end], [0.8, targetScale]);
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)],
    [0.3, 1, 1, 0.8]
  );

  // Layout positions
  const gridClass = cn(
    "relative overflow-hidden rounded-xl",
    // Center main image spans 2 cols on larger layouts
    index === 0
      ? "col-span-2 row-span-2 aspect-[4/3]"
      : "col-span-1 aspect-square"
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className={cn(gridClass, img.className)}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
      />
    </motion.div>
  );
}

export default ZoomParallax;
