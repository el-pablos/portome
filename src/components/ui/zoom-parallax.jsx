import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const defaultItems = [
  { src: "/images/project1.jpg", scale: [1, 4], top: "0%", left: "0%", width: "25%" },
  { src: "/images/project2.jpg", scale: [1, 5], top: "0%", left: "25%", width: "35%" },
  { src: "/images/project3.jpg", scale: [1, 6], top: "0%", left: "60%", width: "25%" },
  { src: "/images/project4.jpg", scale: [1, 5], top: "-10%", left: "5%", width: "20%" },
  { src: "/images/project5.jpg", scale: [1, 6], top: "-10%", left: "27.5%", width: "25%" },
  { src: "/images/project6.jpg", scale: [1, 8], top: "-10%", left: "55%", width: "20%" },
  { src: "/images/project7.jpg", scale: [1, 9], top: "0%", left: "35%", width: "15%" },
];

function ZoomParallaxItem({ item, scrollYProgress, reducedMotion }) {
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [1, 1] : item.scale
  );

  return (
    <motion.div
      style={{
        scale,
        position: "absolute",
        top: item.top,
        left: item.left,
        width: item.width,
        height: "auto",
      }}
      className="overflow-hidden rounded-lg shadow-xl"
    >
      {item.src ? (
        <img
          src={item.src}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full aspect-video rounded-lg"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        />
      )}
    </motion.div>
  );
}

export function ZoomParallax({
  items = defaultItems,
  className = "",
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${items.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl h-[60vh]">
          {items.map((item, i) => (
            <ZoomParallaxItem
              key={i}
              item={item}
              scrollYProgress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ZoomParallax;
