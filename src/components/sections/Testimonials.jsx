import React, { useMemo, memo } from 'react';
import { Testimonials } from '../ui/testimonials-columns';

// ---------- Testimonials Section Wrapper ----------
const TestimonialsSection = memo(() => {
  const testimonials = useMemo(() => [
    {
      text: "Tama delivered an exceptional backend system that scaled perfectly with our growth. His expertise in Node.js and database optimization was invaluable.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Alex Johnson",
      role: "CTO at TechStart Inc",
    },
    {
      text: "Working with Tama was a breeze. He understood our requirements perfectly and delivered a robust API that handles millions of requests daily.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Sarah Chen",
      role: "Product Manager at CloudSync",
    },
    {
      text: "Tama's code quality is outstanding. Clean, well-documented, and maintainable. He's my go-to developer for complex backend projects.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Rodriguez",
      role: "Lead Developer at DataFlow",
    },
    {
      text: "The authentication system Tama built for us is rock solid. Zero security issues and excellent performance. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Watson",
      role: "Founder at StartupHub",
    },
    {
      text: "Tama's expertise in payment gateway integration saved us months of development time. Professional, reliable, and highly skilled.",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "David Kim",
      role: "Engineering Manager at FinTech",
    },
    {
      text: "The real-time notification system Tama developed exceeded our expectations. Fast, reliable, and perfectly integrated with our stack.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Lisa Anderson",
      role: "Tech Lead at E-Commerce Pro",
    },
    {
      text: "Outstanding work on our microservices architecture. Tama's solutions are always elegant and performant.",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "James Wilson",
      role: "CTO at ScaleUp",
    },
    {
      text: "The database optimization Tama performed improved our query performance by 10x. Absolutely brilliant work!",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Maria Garcia",
      role: "Data Engineer at BigData Corp",
    },
    {
      text: "Tama's API design is world-class. Clean, RESTful, and perfectly documented. A pleasure to work with.",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Robert Taylor",
      role: "Senior Developer at API Solutions",
    },
  ], []);

  return <Testimonials testimonials={testimonials} />;
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
