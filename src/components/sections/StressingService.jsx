import React, { memo } from 'react';
import { Pricing } from '../ui/pricing';

// ---------- Web Stressing Service Section ----------
const WebStressingService = memo(() => {
  const pricingPlans = [
    {
      name: "1 HOURS",
      price: "17",
      yearlyPrice: "250000",
      period: "per session",
      features: [
        "Jasa Takedown Website Slot",
        "Jasa Takedown Website Phising",
        "Jasa Takedown Website Pemerintah",
        "Jasa Takedown Website Store/E-commerce",
        "Custom Target Analysis",
        "CDN Bypass (Akamai, Cloudflare, Fastly)",
        "Real-time Monitoring",
        "Detailed Attack Report",
        "24/7 Support & Consultation"
      ],
      description: "Perfect for quick stress testing",
      buttonText: "Order via Telegram",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "2 HOURS",
      price: "27",
      yearlyPrice: "400000",
      period: "per session",
      features: [
        "Jasa Takedown Website Slot",
        "Jasa Takedown Website Phising",
        "Jasa Takedown Website Pemerintah",
        "Jasa Takedown Website Store/E-commerce",
        "Custom Target Analysis",
        "CDN Bypass (Akamai, Cloudflare, Fastly)",
        "Real-time Monitoring",
        "Detailed Attack Report",
        "24/7 Support & Consultation"
      ],
      description: "Most popular choice for testing",
      buttonText: "Order via Telegram",
      href: "https://t.me/ImTamaa",
      isPopular: true,
    },
    {
      name: "3 HOURS",
      price: "33",
      yearlyPrice: "500000",
      period: "per session",
      features: [
        "Jasa Takedown Website Slot",
        "Jasa Takedown Website Phising",
        "Jasa Takedown Website Pemerintah",
        "Jasa Takedown Website Store/E-commerce",
        "Custom Target Analysis",
        "CDN Bypass (Akamai, Cloudflare, Fastly)",
        "Real-time Monitoring",
        "Detailed Attack Report",
        "24/7 Support & Consultation"
      ],
      description: "Extended testing duration",
      buttonText: "Order via Telegram",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "1 DAYS",
      price: "80",
      yearlyPrice: "1200000",
      period: "per session",
      features: [
        "Jasa Takedown Website Slot",
        "Jasa Takedown Website Phising",
        "Jasa Takedown Website Pemerintah",
        "Jasa Takedown Website Store/E-commerce",
        "Custom Target Analysis",
        "CDN Bypass (Akamai, Cloudflare, Fastly)",
        "Real-time Monitoring",
        "Detailed Attack Report",
        "24/7 Support & Consultation"
      ],
      description: "Full day comprehensive testing",
      buttonText: "Order via Telegram",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "2 DAYS",
      price: "160",
      yearlyPrice: "2400000",
      period: "per session",
      features: [
        "Jasa Takedown Website Slot",
        "Jasa Takedown Website Phising",
        "Jasa Takedown Website Pemerintah",
        "Jasa Takedown Website Store/E-commerce",
        "Custom Target Analysis",
        "CDN Bypass (Akamai, Cloudflare, Fastly)",
        "Real-time Monitoring",
        "Detailed Attack Report",
        "24/7 Support & Consultation"
      ],
      description: "Maximum duration for complex testing",
      buttonText: "Order via Telegram",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
  ];

  return (
    <section className="py-16 md:py-32 relative">
      <Pricing
        plans={pricingPlans}
        title="Web Stress Testing Services"
        description="Professional web stress testing and security analysis services. Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal seperti Akamai, Cloudflare, Fastly, dan lainnya."
      />
    </section>
  );
});

WebStressingService.displayName = 'WebStressingService';

export default WebStressingService;
