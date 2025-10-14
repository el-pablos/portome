import React, { useState, useEffect, useRef } from "react";

export const LazyImage = ({ src, alt, className, onClick, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className} onClick={onClick} style={style}>
      {isInView && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center" style={{backgroundColor: 'var(--bg-card)'}}>
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--violet-primary)', borderTopColor: 'transparent'}}></div>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  );
};

