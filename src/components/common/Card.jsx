import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg hoverlift hoverpulse ${className}`} style={{
    borderColor: 'var(--border-color)',
    backgroundColor: 'var(--bg-card)',
    boxShadow: `0 10px 25px var(--shadow-color)`
  }}>
    {children}
  </div>
);

