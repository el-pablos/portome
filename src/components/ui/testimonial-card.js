import React from "react";
import { cn } from "../../lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

/**
 * Komponen TestimonialCard - Card untuk menampilkan testimonial/review
 * Dikonversi dari TypeScript ke JavaScript untuk kompatibilitas
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.name - Nama reviewer
 * @param {string} props.role - Role/posisi reviewer
 * @param {string} props.company - Nama perusahaan
 * @param {string} props.content - Isi testimonial
 * @param {string} props.avatar - URL avatar image
 * @param {number} props.rating - Rating (1-5)
 * @param {string} props.className - Class CSS tambahan
 */
export const TestimonialCard = ({
  name,
  role,
  company,
  content,
  avatar,
  rating = 5,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300",
        "bg-white/5 backdrop-blur-sm border border-white/10",
        "hover:bg-white/10 hover:border-white/20 hover:shadow-lg",
        "dark:bg-white/5 dark:border-white/10",
        className
      )}
    >
      {/* Rating Stars */}
      {rating && (
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-4 h-4",
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-sm leading-relaxed transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
        "{content}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-auto">
        <Avatar className="h-10 w-10 border-2 border-violet-500/20">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-violet-500/20 text-violet-300">
            {name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold transition-colors duration-200" style={{ color: 'var(--text-primary)' }}>
            {name}
          </span>
          <span className="text-xs transition-colors duration-200" style={{ color: 'var(--text-muted)' }}>
            {role} {company && `at ${company}`}
          </span>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 pointer-events-none" />
    </div>
  );
};

