import { motion } from "motion/react";

const testimonials = [
  { name: "Alex Johnson", role: "CTO at TechStart Inc", avatar: "https://randomuser.me/api/portraits/men/1.jpg", quote: "Tama delivered an exceptional backend system that scaled perfectly with our growth. His expertise in Node.js and database optimization was invaluable." },
  { name: "Sarah Chen", role: "Product Manager at CloudSync", avatar: "https://randomuser.me/api/portraits/women/2.jpg", quote: "Working with Tama was a breeze. He understood our requirements perfectly and delivered a robust API that handles millions of requests daily." },
  { name: "Michael Rodriguez", role: "Lead Developer at DataFlow", avatar: "https://randomuser.me/api/portraits/men/3.jpg", quote: "Tama's code quality is outstanding. Clean, well-documented, and maintainable. He's my go-to developer for complex backend projects." },
  { name: "Emily Watson", role: "Founder at StartupHub", avatar: "https://randomuser.me/api/portraits/women/4.jpg", quote: "The authentication system Tama built for us is rock solid. Zero security issues and excellent performance. Highly recommended!" },
  { name: "David Kim", role: "Engineering Manager at FinTech", avatar: "https://randomuser.me/api/portraits/men/5.jpg", quote: "Tama's expertise in payment gateway integration saved us months of development time. Professional, reliable, and highly skilled." },
  { name: "Lisa Anderson", role: "Tech Lead at E-Commerce Pro", avatar: "https://randomuser.me/api/portraits/women/6.jpg", quote: "The real-time notification system Tama developed exceeded our expectations. Fast, reliable, and perfectly integrated with our stack." },
  { name: "James Wilson", role: "CTO at ScaleUp", avatar: "https://randomuser.me/api/portraits/men/7.jpg", quote: "Outstanding work on our microservices architecture. Tama's solutions are always elegant and performant." },
  { name: "Maria Garcia", role: "Data Engineer at BigData Corp", avatar: "https://randomuser.me/api/portraits/women/8.jpg", quote: "The database optimization Tama performed improved our query performance by 10x. Absolutely brilliant work!" },
  { name: "Robert Taylor", role: "Senior Developer at API Solutions", avatar: "https://randomuser.me/api/portraits/men/9.jpg", quote: "Tama's API design is world-class. Clean, RESTful, and perfectly documented. A pleasure to work with." },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl p-6 border flex flex-col gap-4"
      style={{ background: "var(--clr-bg-card)", borderColor: "var(--clr-border)" }}
    >
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--clr-text-muted)" }}>
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--clr-border)" }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border-2"
          style={{ borderColor: "var(--clr-primary)" }}
        />
        <div>
          <p className="text-sm font-bold">{testimonial.name}</p>
          <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 border-t" style={{ borderColor: "var(--clr-border)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--clr-primary)" }}>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3">
            Feedback dari orang-orang yang udah kerja bareng gue.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
