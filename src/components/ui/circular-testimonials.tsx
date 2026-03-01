import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplayDuration?: number;
  className?: string;
}

export function CircularTestimonials({
  testimonials,
  autoplayDuration = 5000,
  className = "",
}: CircularTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    const id = setInterval(next, autoplayDuration);
    return () => clearInterval(id);
  }, [next, autoplayDuration]);

  const current = testimonials[currentIndex];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className={cn("relative max-w-3xl mx-auto px-4", className)}>
      {/* Main content */}
      <div className="relative overflow-hidden min-h-[280px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full text-center"
          >
            {/* Quote */}
            <div className="mb-6">
              <svg
                className="w-8 h-8 mx-auto mb-4 opacity-30"
                style={{ color: "var(--violet-primary)" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.51.884-3.995 3.156-3.995 5.458h4v10.391h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.511.884-3.996 3.156-3.996 5.458h4v10.391h-10z" />
              </svg>
              <p
                className="text-lg md:text-xl leading-relaxed italic"
                style={{ color: "var(--text-primary)" }}
              >
                "{current.text}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={current.image}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: "var(--violet-primary)" }}
                loading="lazy"
              />
              <div className="text-left">
                <div
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {current.name}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {current.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full transition-colors hover:opacity-80"
          style={{
            backgroundColor: "var(--bg-button)",
            color: "var(--text-primary)",
          }}
          aria-label="Previous testimonial"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1.5 mx-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === currentIndex ? "w-6" : ""
              )}
              style={{
                backgroundColor:
                  i === currentIndex
                    ? "var(--violet-primary)"
                    : "var(--bg-button)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full transition-colors hover:opacity-80"
          style={{
            backgroundColor: "var(--bg-button)",
            color: "var(--text-primary)",
          }}
          aria-label="Next testimonial"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CircularTestimonials;
