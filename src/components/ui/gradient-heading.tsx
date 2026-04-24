import React from "react";
import { cn } from "../../lib/utils";

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function GradientHeading({
  children,
  className = "",
  as: Tag = "h2",
}: GradientHeadingProps) {
  return (
    <Tag
      className={cn(
        "bg-clip-text text-transparent font-bold",
        className
      )}
      style={{
        backgroundImage: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
      }}
    >
      {children}
    </Tag>
  );
}

export default GradientHeading;
