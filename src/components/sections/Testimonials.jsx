import React, { memo, useMemo } from "react";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Testimonials } from "../ui/testimonials-columns";
import { CircularTestimonials } from "../ui/circular-testimonials";

const TestimonialsSection = memo(() => {
  const testimonials = useMemo(() => [
    {
      text: "Tama keeps the work direct: routes are clear, API behavior is predictable, and handoff notes are easy to follow.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Alex Johnson",
      role: "CTO at TechStart Inc",
    },
    {
      text: "The implementation felt fast without becoming messy. He handled integration details and kept edge cases visible.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Sarah Chen",
      role: "Product Manager at CloudSync",
    },
    {
      text: "Clean code, practical security notes, and a repo structure that was simple to continue after delivery.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Rodriguez",
      role: "Lead Developer at DataFlow",
    },
    {
      text: "The auth and API flow landed solid. The review notes helped our team avoid a few risky shortcuts.",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Watson",
      role: "Founder at StartupHub",
    },
    {
      text: "Payment integration, webhook behavior, and release checks were documented clearly enough for the whole team.",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "David Kim",
      role: "Engineering Manager at FinTech",
    },
    {
      text: "The UI polish did not come at the cost of performance. Motion felt intentional and responsive.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Lisa Anderson",
      role: "Tech Lead at E-Commerce Pro",
    },
  ], []);

  return (
    <section className="py-16 sm:py-24" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[1.8rem] p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <div className="section-kicker">Testimonials</div>
              <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
                Feedback with motion and rhythm.
              </h2>
              <p className="mt-5 text-base leading-8" style={{ color: "var(--text-secondary)" }}>
                Dua mode testimonial tetap dipakai: circular active card untuk interaksi, lalu column marquee untuk density.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: testimonials.length, label: "voices", icon: MessageSquare },
                { value: "2", label: "layouts", icon: Sparkles },
                { value: "A11y", label: "controls", icon: ShieldCheck },
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

          <div className="mt-10">
            <CircularTestimonials testimonials={testimonials} autoplayInterval={5200} />
          </div>
        </div>

        <div className="mt-10">
          <Testimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;
