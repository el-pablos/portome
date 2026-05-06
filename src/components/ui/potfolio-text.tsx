interface AnimatedLetterTextProps {
  text: string;
  letterToReplace: string;
  className?: string;
}

export function AnimatedLetterText({ text, letterToReplace, className = "" }: AnimatedLetterTextProps) {
  const letters = text.split("");
  let replaced = false;

  return (
    <span className={`inline-flex items-center font-black tracking-tighter uppercase ${className}`}
      style={{ fontFamily: '"Arial Black", Impact, sans-serif' }}>
      {letters.map((letter, i) => {
        if (!replaced && letter.toUpperCase() === letterToReplace.toUpperCase()) {
          replaced = true;
          return (
            <span key={i} className="inline-flex items-center justify-center relative mx-1">
              <svg
                viewBox="0 0 80 80"
                className="animate-diamond-rotate"
                style={{ width: "0.75em", height: "0.75em" }}
              >
                <defs>
                  <filter id="innerShadow">
                    <feOffset dx="0" dy="2" />
                    <feGaussianBlur stdDeviation="2" result="offset-blur" />
                    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                    <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                  </filter>
                  <filter id="diamondGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--clr-accent)" />
                    <stop offset="100%" stopColor="#a8e600" />
                  </linearGradient>
                  <linearGradient id="diamondShine" x1="0%" y1="0%" x2="50%" y2="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                {/* Scalloped/flower shape */}
                <path
                  d="M40 5 C45 15, 55 10, 55 20 C65 15, 70 25, 65 35 C75 35, 75 45, 65 45 C70 55, 65 65, 55 60 C55 70, 45 75, 40 65 C35 75, 25 70, 25 60 C15 65, 10 55, 15 45 C5 45, 5 35, 15 35 C10 25, 15 15, 25 20 C25 10, 35 15, 40 5Z"
                  fill="#0a0a0a"
                  filter="url(#innerShadow)"
                />
                {/* Diamond center */}
                <path
                  d="M40 22 L54 40 L40 58 L26 40 Z"
                  fill="url(#diamondGradient)"
                  filter="url(#diamondGlow)"
                />
                <path
                  d="M40 22 L26 40 L40 40 Z"
                  fill="url(#diamondShine)"
                />
              </svg>
            </span>
          );
        }
        return (
          <span key={i} style={{ color: "var(--clr-text)" }}>
            {letter}
          </span>
        );
      })}
    </span>
  );
}
