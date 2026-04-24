import React from "react";

export const Button = ({ as: Tag = "a", href, onClick, children, className = "", target, rel, type, style }) => (
  <Tag
    href={href}
    onClick={onClick}
    target={target}
    rel={rel}
    type={type}
    className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-[transform,background,opacity] duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 active:scale-[0.99] ${className}`}
    style={{ "--tw-ring-color": "var(--accent)", ...style }}
  >
    {children}
  </Tag>
);

