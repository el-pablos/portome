import React from "react";

export const Button = ({ as: Tag = "a", href, onClick, children, className = "", target, rel, type }) => (
  <Tag
    href={href}
    onClick={onClick}
    target={target}
    rel={rel}
    type={type}
    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 font-medium transition-[transform,background,opacity] duration-150 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400/60 active:scale-[0.99] ${className}`}
  >
    {children}
  </Tag>
);

