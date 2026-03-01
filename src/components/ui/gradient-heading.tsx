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
        "bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 bg-clip-text text-transparent font-bold",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export default GradientHeading;
