import React from "react";

export const SectionTitle = ({ pre, title, desc }) => (
  <div className="mx-auto mb-12 max-w-4xl text-center">
    <div className="section-kicker">{pre}</div>
    <h2 className="section-title mt-4 font-display text-4xl sm:text-5xl">
      {title}
    </h2>
    {desc && (
      <p className="mx-auto mt-5 max-w-3xl px-4 text-base leading-8" style={{ color: "var(--text-secondary)" }}>
        {desc}
      </p>
    )}
  </div>
);
