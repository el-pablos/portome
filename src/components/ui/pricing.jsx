import { Label } from "./label";
import { Switch } from "./switch";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

// Custom hook for media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useState(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl transition-colors duration-200" style={{color: 'var(--text-primary)'}}>
          {title}
        </h2>
        <p className="text-lg whitespace-pre-line transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10 items-center">
        <span className="mr-3 font-semibold transition-colors duration-200" style={{color: isMonthly ? 'var(--text-primary)' : 'var(--text-secondary)'}}>
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
              style={{
                '--tw-ring-color': 'var(--violet-primary)'
              }}
            />
          </Label>
        </label>
        <span className="ml-3 font-semibold transition-colors duration-200" style={{color: !isMonthly ? 'var(--text-primary)' : 'var(--text-secondary)'}}>
          Annual <span style={{color: 'var(--violet-primary)'}}>(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 sm:2 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg p-6 text-center lg:flex lg:flex-col lg:justify-center relative`,
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
            style={{
              borderColor: plan.isPopular ? 'var(--violet-primary)' : 'var(--border-color)',
              borderWidth: plan.isPopular ? '2px' : '1px',
              backgroundColor: 'var(--bg-card)',
              boxShadow: plan.isPopular ? '0 10px 40px rgba(124, 58, 237, 0.3)' : '0 10px 25px var(--shadow-color)'
            }}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center" style={{backgroundColor: 'var(--violet-primary)'}}>
                <Star className="h-4 w-4 fill-current text-white" />
                <span className="ml-1 font-sans font-semibold text-white">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight transition-colors duration-200" style={{color: 'var(--violet-primary)'}}>
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    formatter={(value) => `$${value}`}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 transition-colors duration-200" style={{color: 'var(--text-muted)'}}>
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-1 flex-shrink-0" style={{color: 'var(--violet-secondary)'}} />
                    <span className="text-left text-sm transition-colors duration-200" style={{color: 'var(--text-secondary)'}}>{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" style={{borderColor: 'var(--border-color)'}} />

              <a
                href={plan.href}
                className={cn(
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "inline-flex items-center justify-center rounded-md px-4 py-2",
                  "transform-gpu transition-all duration-300 ease-out",
                  "hover:scale-105"
                )}
                style={{
                  backgroundColor: plan.isPopular ? 'var(--violet-primary)' : 'var(--bg-button)',
                  color: plan.isPopular ? 'white' : 'var(--text-primary)',
                  border: plan.isPopular ? 'none' : '1px solid var(--border-color)',
                }}
                onMouseEnter={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-button-hover)';
                  } else {
                    e.currentTarget.style.backgroundColor = 'var(--violet-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.isPopular) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-button)';
                  } else {
                    e.currentTarget.style.backgroundColor = 'var(--violet-primary)';
                  }
                }}
              >
                {plan.buttonText}
              </a>
              <p className="mt-6 text-xs leading-5 transition-colors duration-200" style={{color: 'var(--text-muted)'}}>
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

