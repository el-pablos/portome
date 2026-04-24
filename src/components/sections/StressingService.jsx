import React, { memo } from "react";
import { Pricing } from "../ui/pricing";
import { HeroAscii } from "../ui/hero-ascii-one";

const WebStressingService = memo(() => {
  const pricingPlans = [
    {
      name: "1 HOUR",
      price: "17",
      yearlyPrice: "250000",
      period: "scoping sprint",
      features: [
        "Authorized resilience check only",
        "Endpoint inventory and risk notes",
        "Basic load profile discussion",
        "Rate-limit and caching review",
        "Concise remediation checklist",
        "Telegram coordination",
      ],
      description: "Quick technical read for small flows",
      buttonText: "Discuss scope",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "2 HOURS",
      price: "27",
      yearlyPrice: "400000",
      period: "lab session",
      features: [
        "Authorized resilience check only",
        "Critical route mapping",
        "API response and error review",
        "Observability notes",
        "Actionable remediation plan",
        "Follow-up chat summary",
      ],
      description: "Balanced session for active apps",
      buttonText: "Discuss scope",
      href: "https://t.me/ImTamaa",
      isPopular: true,
    },
    {
      name: "3 HOURS",
      price: "33",
      yearlyPrice: "500000",
      period: "deep review",
      features: [
        "Authorized resilience check only",
        "Database and queue pressure review",
        "Auth boundary inspection",
        "CI/build hygiene notes",
        "Prioritized fix plan",
        "Delivery recap",
      ],
      description: "Deeper technical pass for complex stacks",
      buttonText: "Discuss scope",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "1 DAY",
      price: "80",
      yearlyPrice: "1200000",
      period: "audit day",
      features: [
        "Authorized resilience check only",
        "Architecture and dependency review",
        "API and route cross-check",
        "Security notes for exposed surfaces",
        "Repo hygiene and release review",
        "Detailed written recap",
      ],
      description: "Full day review for launch prep",
      buttonText: "Discuss scope",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
    {
      name: "2 DAYS",
      price: "160",
      yearlyPrice: "2400000",
      period: "delivery lab",
      features: [
        "Authorized resilience check only",
        "Implementation support window",
        "CI/CD and release flow review",
        "Documentation cleanup",
        "Final verification checklist",
        "Handoff notes",
      ],
      description: "Maximum coverage for serious cleanup",
      buttonText: "Discuss scope",
      href: "https://t.me/ImTamaa",
      isPopular: false,
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <HeroAscii text="RESILIENCE" fontSize={9} />
      </div>
      <div className="relative">
        <Pricing
          plans={pricingPlans}
          title="Authorized Resilience Lab"
          description="Layanan ini hanya untuk sistem yang kamu miliki atau kamu punya izin eksplisit untuk diuji. Fokusnya review performa, observability, keamanan permukaan publik, dan rencana perbaikan yang bisa dieksekusi."
        />
      </div>
    </div>
  );
});

WebStressingService.displayName = "WebStressingService";

export default WebStressingService;
