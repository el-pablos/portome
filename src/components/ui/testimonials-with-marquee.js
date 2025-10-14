import React from "react";
import { cn } from "../../lib/utils";
import { TestimonialCard } from "./testimonial-card";

/**
 * Komponen Marquee - Animasi marquee untuk scroll otomatis
 * Pure CSS animation, sangat ringan dan performant
 * 
 * @param {Object} props - Props komponen
 * @param {React.ReactNode} props.children - Content yang akan di-scroll
 * @param {boolean} props.reverse - Arah scroll (default: false)
 * @param {boolean} props.pauseOnHover - Pause saat hover (default: true)
 * @param {string} props.className - Class CSS tambahan
 */
const Marquee = ({
  children,
  reverse = false,
  pauseOnHover = true,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      {/* First set of items */}
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>

      {/* Duplicate set for seamless loop */}
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Komponen TestimonialsWithMarquee - Section testimonial dengan marquee animation
 * Dikonversi dari TypeScript ke JavaScript untuk kompatibilitas
 * 
 * Features:
 * - Dual row marquee (satu ke kanan, satu ke kiri)
 * - Pause on hover
 * - Responsive design
 * - SEO-friendly (content tetap readable)
 * 
 * @param {Object} props - Props komponen
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {string} props.className - Class CSS tambahan
 */
export const TestimonialsWithMarquee = ({
  testimonials = [],
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it - hear from some of our satisfied clients",
  className,
}) => {
  // Split testimonials into two rows
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative px-4 md:px-8">
          {/* Gradient overlays for fade effect - Diperbesar untuk breathing space */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          {/* First Row - Scroll Right */}
          <Marquee pauseOnHover className="mb-4 [--duration:50s]">
            {firstRow.map((testimonial, idx) => (
              <div key={idx} className="w-[350px] md:w-[400px] shrink-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Marquee>

          {/* Second Row - Scroll Left */}
          <Marquee reverse pauseOnHover className="[--duration:50s]">
            {secondRow.map((testimonial, idx) => (
              <div key={idx} className="w-[350px] md:w-[400px] shrink-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Optional: Add more testimonials CTA */}
        <div className="text-center mt-12">
          <p className="text-sm transition-colors duration-200" style={{ color: 'var(--text-muted)' }}>
            Join hundreds of satisfied clients who trust our services
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export { Marquee };

