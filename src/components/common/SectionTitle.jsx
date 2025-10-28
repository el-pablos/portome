import React from "react";
import { ShaderLines } from "../ui/shader-lines";

export const SectionTitle = ({ pre, title, desc, withShader = false }) => (
  <div className="mx-auto max-w-4xl text-center mb-12">
    <div className="text-sm uppercase tracking-[0.3em] transition-colors duration-200 mb-4" style={{color: 'var(--violet-secondary)'}}>{pre}</div>
    {withShader ? (
      <div className="relative mt-4 mb-6 inline-block w-full px-4">
        {/* Shader Background - Responsive height dengan opacity yang subtle */}
        <div className="absolute inset-0 h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] w-full overflow-hidden rounded-2xl opacity-90">
          <ShaderLines />
        </div>

        {/* Glow overlay untuk enhance effect - Lebih subtle */}
        <div className="absolute inset-0 h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] w-full rounded-2xl"
             style={{
               background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, transparent 60%)',
               pointerEvents: 'none'
             }} />

        {/* Title Text with higher z-index and enhanced styling */}
        <h2 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold transition-colors duration-200 py-6 sm:py-8 md:py-10 leading-tight"
            style={{
              color: 'var(--text-primary)',
              textShadow: `
                0 0 30px rgba(167, 139, 250, 0.8),
                0 0 60px rgba(167, 139, 250, 0.5),
                0 0 90px rgba(167, 139, 250, 0.3),
                0 2px 4px rgba(0, 0, 0, 0.3)
              `,
              WebkitTextStroke: '0.5px rgba(167, 139, 250, 0.4)',
              letterSpacing: '-0.02em',
            }}>
          {title}
        </h2>
      </div>
    ) : (
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold transition-colors duration-200" style={{color: 'var(--text-primary)'}}>{title}</h2>
    )}
    {desc && <p className="mt-4 text-base sm:text-lg transition-colors duration-200 max-w-3xl mx-auto px-4" style={{color: 'var(--text-secondary)'}}>{desc}</p>}
  </div>
);

