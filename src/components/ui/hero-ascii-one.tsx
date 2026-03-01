import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../lib/utils";

// ---------- ASCII Art Generator ----------
const ASCII_CHARS = " .:-=+*#%@";

interface HeroAsciiProps {
  text?: string;
  className?: string;
  fontSize?: number;
  color?: string;
}

/**
 * HeroAscii — generative ASCII text art effect.
 * Purely client-side, no external services.
 * No branding/watermark removal logic.
 */
export function HeroAscii({
  text = "STRESSING",
  className = "",
  fontSize = 12,
  color,
}: HeroAsciiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [asciiArt, setAsciiArt] = useState<string>("");
  const frameRef = useRef<number>(0);

  const generateAscii = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const containerWidth = containerRef.current?.clientWidth || 600;
    const cols = Math.min(Math.floor(containerWidth / (fontSize * 0.6)), 80);

    canvas.width = cols * 10;
    canvas.height = 60;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = `bold 48px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    const rows = Math.floor(height / 3);
    const colStep = Math.floor(width / cols);
    const rowStep = 3;

    let result = "";
    const time = frameRef.current * 0.02;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = x * colStep;
        const py = y * rowStep;
        const idx = (py * width + px) * 4;
        const brightness = data[idx] || 0;

        // Add subtle wave distortion
        const wave = Math.sin(x * 0.1 + time) * Math.cos(y * 0.2 + time * 0.7);
        const adjusted = Math.min(
          ASCII_CHARS.length - 1,
          Math.max(0, Math.floor((brightness / 255) * ASCII_CHARS.length + wave * 1.5))
        );

        result += ASCII_CHARS[adjusted] || " ";
      }
      result += "\n";
    }

    setAsciiArt(result);
    frameRef.current++;
  }, [text, fontSize]);

  useEffect(() => {
    let animId: number;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;
      generateAscii();
      animId = requestAnimationFrame(animate);
    };

    // Throttle to ~15fps for performance
    const intervalId = setInterval(() => {
      generateAscii();
    }, 66);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
    };
  }, [generateAscii]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} className="hidden" />
      <pre
        className="text-center leading-none select-none font-mono"
        style={{
          fontSize: `${fontSize}px`,
          color: color || "var(--violet-primary)",
          letterSpacing: "0.1em",
          opacity: 0.7,
        }}
        aria-hidden="true"
      >
        {asciiArt}
      </pre>
    </div>
  );
}

export default HeroAscii;
