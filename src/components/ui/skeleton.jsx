import React from "react";
import { cn } from "../../lib/utils";

// Base Skeleton component with shimmer effect
export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]",
        "relative overflow-hidden",
        className
      )}
      style={{
        backgroundColor: 'var(--bg-card)',
        animation: 'shimmer 2s infinite',
      }}
      {...props}
    >
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

// Hero Section Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto mt-6" />
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="rounded-2xl border p-6 space-y-4" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)'}}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
};

// Services Section Skeleton
export const ServicesSkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
};

// Pricing Section Skeleton
export const PricingSkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-8 w-32 mx-auto mt-6" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border p-8 space-y-4" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)'}}>
              <Skeleton className="h-8 w-32 mx-auto" />
              <Skeleton className="h-12 w-40 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto" />
              <div className="space-y-2 mt-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Gallery Skeleton
export const GallerySkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Skeleton
export const TestimonialsSkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border p-6 space-y-4" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)'}}>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <div className="flex items-center gap-3 mt-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Portfolio Skeleton
export const PortfolioSkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border p-6 space-y-4" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)'}}>
              <div className="flex items-start justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-6 rounded" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex gap-3 mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Section Skeleton
export const ContactSkeleton = () => {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
};

