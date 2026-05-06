import { useState } from "react";
import { motion } from "motion/react";

interface RevealImageListItemProps {
  title: string;
  images: [string, string];
  index: number;
}

function RevealImageListItem({ title, images, index }: RevealImageListItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative py-6 border-b cursor-pointer group"
      style={{ borderColor: "var(--clr-border)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-2xl md:text-4xl font-black uppercase tracking-tight transition-colors duration-300"
        style={{ color: hovered ? "var(--clr-primary)" : "var(--clr-text)" }}>
        {title}
      </span>

      {/* Reveal images on hover */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-3 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden shadow-lg">
          <img src={images[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden shadow-lg">
          <img src={images[1]} alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}

const services = [
  {
    title: "Branding",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&auto=format&fit=crop&q=60",
    ] as [string, string],
  },
  {
    title: "Web Design",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60",
    ] as [string, string],
  },
  {
    title: "Illustration",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400&auto=format&fit=crop&q=60",
    ] as [string, string],
  },
];

export function RevealImageList() {
  return (
    <div className="flex flex-col gap-2">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-xs font-black uppercase tracking-widest mb-4"
        style={{ color: "var(--clr-text-muted)" }}
      >
        Services
      </motion.h3>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {services.map((service, i) => (
          <RevealImageListItem
            key={service.title}
            title={service.title}
            images={service.images}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}
