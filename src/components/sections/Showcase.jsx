import React, { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Play, 
  X, 
  Filter, 
  Image as ImageIcon, 
  Video as VideoIcon 
} from 'lucide-react';
import { LampContainer } from '../ui/lamp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// ---------- Card Component ----------
const Card = memo(({ children, className = "" }) => (
  <div 
    className={`rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg ${className}`} 
    style={{
      borderColor: 'var(--border-color)',
      backgroundColor: 'var(--bg-card)',
      boxShadow: `0 10px 25px var(--shadow-color)`
    }}
  >
    {children}
  </div>
));

// ---------- Lazy Load Image Component (Optimized) ----------
const LazyImage = memo(({ src, alt, className, onClick, style }) => {
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
      { rootMargin: '100px', threshold: 0.01 }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className} onClick={onClick} style={style}>
      {isInView && (
        <>
          {!isLoaded && (
            <div 
              className="absolute inset-0 flex items-center justify-center" 
              style={{backgroundColor: 'var(--bg-card)'}}
            >
              <div 
                className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" 
                style={{borderColor: 'var(--violet-primary)', borderTopColor: 'transparent'}}
              />
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
});

// ---------- Lazy Load Video Component (Optimized) ----------
const LazyVideo = memo(({ src, className, onClick, style }) => {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className={className} onClick={onClick} style={style}>
      {isInView ? (
        <video
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center" 
          style={{backgroundColor: 'var(--bg-card)'}}
        >
          <Play className="size-12" style={{color: 'var(--violet-secondary)', opacity: 0.5}} />
        </div>
      )}
    </div>
  );
});

// ---------- Web Stresser Showcase ----------
const WebStresserShowcase = memo(() => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const prefersReducedMotion = useReducedMotion();

  const proofItems = useMemo(() => [
    {
      title: "DPR RI Website Takedown",
      description: "Successfully brought down DPR RI website showing 'Under Maintenance PAGE NOT FOUND' status",
      mediaUrl: "/photo_4913463250167902324_w.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "Stress Test", "Verified"]
    },
    {
      title: "Tax Office Server Disruption",
      description: "coretaxdjp.pajak.go.id rendered unreachable with global connection timeouts",
      mediaUrl: "/photo_4913463250167902361_y.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "Multi-Location", "Connection Timeout"]
    },
    {
      title: "UGM University Portal Down",
      description: "ugm.ac.id successfully targeted with connection timeouts verified from international test points",
      mediaUrl: "/photo_4915715049981588609_y.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "Global Testing"]
    },
    {
      title: "POLICETUBE Down IPOS",
      description: "Complete server disruption of POLICETUBE platform with comprehensive takedown verification",
      mediaUrl: "/document_4906738443322655853.mp4",
      mediaType: "video",
      category: "Law Enforcement",
      tags: ["Law Enforcement", "Platform Down", "Verified"]
    },
    {
      title: "KEJAGUNG RI Down IPOS",
      description: "Attorney General's office website successfully targeted with complete system disruption",
      mediaUrl: "/document_4913463249711662401.mp4",
      mediaType: "video",
      category: "Government",
      tags: ["Government", "Attorney General", "System Down"]
    },
    {
      title: "Indonesia.go.id Down IPOS",
      description: "Main Indonesian government portal successfully disrupted with complete system takedown",
      mediaUrl: "/indogoid.jpg",
      mediaType: "image",
      category: "Government",
      tags: ["Government", "National Portal", "IPOS"]
    },
    {
      title: "BPJS Kesehatan Down IPOS",
      description: "National health insurance system successfully disrupted with connection timeouts globally",
      mediaUrl: "/bpjsgoid.jpg",
      mediaType: "image",
      category: "Healthcare",
      tags: ["Healthcare", "Government", "IPOS"]
    },
    {
      title: "UPN Yogyakarta Down IPOS",
      description: "National university TCP connection completely disrupted across all VPS servers",
      mediaUrl: "/upnyogyakarta.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "IPOS"]
    },
    {
      title: "Mobile JKN Down IPOS",
      description: "National health insurance mobile platform rendered completely inaccessible",
      mediaUrl: "/jkn.jpg",
      mediaType: "image",
      category: "Healthcare",
      tags: ["Healthcare", "Mobile App", "IPOS"]
    },
    {
      title: "Universitas Indonesia Down IPOS",
      description: "Premier Indonesian university website successfully taken offline",
      mediaUrl: "/universitasindonesia.jpg",
      mediaType: "image",
      category: "Education",
      tags: ["Education", "University", "IPOS"]
    },
    {
      title: "MyTelkomsel Down IPOS",
      description: "Major telecommunications provider platform disrupted with full system takedown",
      mediaUrl: "/mytelkomsel.mp4",
      mediaType: "video",
      category: "Telecommunications",
      tags: ["Telco", "Mobile Platform", "IPOS"]
    }
  ], []);

  const categories = useMemo(() => 
    ['All', ...new Set(proofItems.map(item => item.category))], 
    [proofItems]
  );
  
  const filteredItems = useMemo(() =>
    filterCategory === 'All'
      ? proofItems
      : proofItems.filter(item => item.category === filterCategory),
    [filterCategory, proofItems]
  );

  const handleMediaSelect = useCallback((proof) => {
    setSelectedMedia(proof);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMedia(null);
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Lamp Effect Section Title */}
        <LampContainer className="min-h-[600px] mb-8">
          <div className="text-center pt-8">
            <div className="text-sm uppercase tracking-[0.3em] mb-4" style={{color: 'var(--violet-secondary)'}}>
              Showcase Gallery
            </div>
            <h1 className="mt-4 py-2 text-center text-4xl font-extrabold tracking-tight md:text-7xl">
              <span style={{
                color: 'var(--text-primary)',
                textShadow: '0 0 30px rgba(167, 139, 250, 0.6), 0 0 60px rgba(167, 139, 250, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)'
              }}>
                Proven
              </span>{' '}
              <span className="bg-gradient-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent">
                Attack Results
              </span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
              Real proof of successful IPOS operations. Dengan bypass yang terbukti bisa jebol berbagai CDN terkenal.
            </p>
          </div>
        </LampContainer>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2" style={{color: 'var(--text-primary)'}}>
            <Filter className="size-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filterCategory === cat ? 'shadow-lg' : 'hover:scale-105'
              }`}
              style={filterCategory === cat ? {
                backgroundColor: 'var(--violet-primary)',
                color: 'white'
              } : {
                backgroundColor: 'var(--bg-button)',
                color: 'var(--text-secondary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((proof, index) => {
            const content = (
              <Card className="overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-2xl cursor-pointer">
                <div className="relative h-56 bg-gradient-to-br from-violet-600/20 to-purple-600/20 overflow-hidden">
                  {proof.mediaType === 'video' ? (
                    <>
                      <LazyVideo src={proof.mediaUrl} className="w-full h-full" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-200 flex items-center justify-center pointer-events-none">
                        <div className="bg-violet-600/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                          <Play className="size-8 text-white fill-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <LazyImage
                        src={proof.mediaUrl}
                        alt={proof.title}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <ImageIcon className="size-12 text-white" />
                      </div>
                    </>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      {proof.mediaType === 'video' ? <VideoIcon className="size-3" /> : <ImageIcon className="size-3" />}
                      {proof.mediaType === 'video' ? 'VIDEO' : 'IMAGE'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-600/90 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                      ✓ VERIFIED
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 line-clamp-1" style={{color: 'var(--text-primary)'}}>
                    {proof.title}
                  </h3>
                  <p className="text-xs mb-3 line-clamp-2" style={{color: 'var(--text-secondary)'}}>
                    {proof.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proof.tags.slice(0, 2).map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 rounded text-xs" 
                        style={{ backgroundColor: 'var(--violet-bg)', color: 'var(--violet-primary)' }}
                      >
                        {tag}
                      </span>
                    ))}
                    {proof.tags.length > 2 && (
                      <span 
                        className="px-2 py-0.5 rounded text-xs" 
                        style={{ backgroundColor: 'var(--bg-button)', color: 'var(--text-muted)' }}
                      >
                        +{proof.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );

            if (prefersReducedMotion) {
              return (
                <div 
                  key={proof.title} 
                  className="group" 
                  onClick={() => handleMediaSelect(proof)}
                >
                  {content}
                </div>
              );
            }

            return (
              <motion.div
                key={proof.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                className="group"
                onClick={() => handleMediaSelect(proof)}
              >
                {content}
              </motion.div>
            );
          })}
        </div>

        {/* Modal Lightbox */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{backgroundColor: 'rgba(0,0,0,0.95)'}}
            onClick={handleCloseModal}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col" 
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 p-2 rounded-full hover:scale-110 transition-transform"
                style={{backgroundColor: 'var(--bg-button)', color: 'var(--text-primary)'}}
              >
                <X className="size-6" />
              </button>

              <div className="rounded-2xl overflow-hidden shadow-2xl">
                {selectedMedia.mediaType === 'video' ? (
                  <video
                    src={selectedMedia.mediaUrl}
                    className="w-full max-h-[70vh] object-contain bg-black"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedMedia.mediaUrl}
                    alt={selectedMedia.title}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )}
              </div>

              <div 
                className="mt-4 p-6 rounded-2xl" 
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-color)',
                  border: '1px solid'
                }}
              >
                <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--text-primary)'}}>
                  {selectedMedia.title}
                </h2>
                <p className="mb-4" style={{color: 'var(--text-secondary)'}}>
                  {selectedMedia.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 rounded-lg text-sm font-medium" 
                      style={{ backgroundColor: 'var(--violet-bg)', color: 'var(--violet-primary)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Counter */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-violet-600/10 to-purple-600/10 border border-violet-500/20 rounded-3xl px-8 py-6">
            <div className="flex items-center gap-3">
              <Zap className="size-6" style={{color: 'var(--violet-secondary)'}} />
              <span className="text-xl font-bold" style={{color: 'var(--text-primary)'}}>
                Managed by myself | TamsHub Stresser
              </span>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-3xl font-bold" style={{color: 'var(--violet-primary)'}}>
                  {proofItems.length}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{color: 'var(--text-muted)'}}>
                  Total Attacks
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{color: 'var(--violet-primary)'}}>
                  100%
                </div>
                <div className="text-xs uppercase tracking-wider" style={{color: 'var(--text-muted)'}}>
                  Success Rate
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{color: 'var(--violet-primary)'}}>
                  {categories.length - 1}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{color: 'var(--text-muted)'}}>
                  Categories
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WebStresserShowcase.displayName = 'WebStresserShowcase';
Card.displayName = 'Card';
LazyImage.displayName = 'LazyImage';
LazyVideo.displayName = 'LazyVideo';

export default WebStresserShowcase;
