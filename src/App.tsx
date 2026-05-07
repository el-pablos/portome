import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Hero } from "./components/ui/hero";
import { SocialLinks } from "./components/ui/social-links";
import { Footer } from "./components/ui/footer-section";
import { FeaturesSection, StatsSection, WhyWorkWithMe } from "./components/ui/features-section";
import { ServicesSection } from "./components/ui/services-section";
import { RatingSection } from "./components/ui/rating-section";
import { PortfolioTextSection } from "./components/ui/portfolio-text-section";
import { GallerySection } from "./components/ui/gallery-section";
import { PortfolioGrid } from "./components/ui/portfolio-grid";
import { TestimonialsSection } from "./components/ui/testimonials-section";
import { PageLoader } from "./components/ui/page-loader";

export default function App() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -120]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div id="top" className="relative" style={{ background: "var(--clr-bg)" }}>
      <PageLoader duration={3000} />
      <SocialLinks />
      <Hero />
      <motion.div
        className="relative z-20 bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.15)]"
        style={{ y: shouldReduceMotion ? 0 : y, marginTop: '-5rem' }}
      >
        <StatsSection />
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <FeaturesSection />
        </div>
        <ServicesSection />
        <WhyWorkWithMe />
        <PortfolioTextSection />
        <PortfolioGrid />
        <GallerySection />
        <TestimonialsSection />
        <RatingSection />
      </motion.div>
      <Footer />
    </div>
  );
}
