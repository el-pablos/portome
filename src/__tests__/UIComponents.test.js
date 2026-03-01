import React from 'react';
import { render, screen } from '@testing-library/react';

describe('UI Components', () => {
  it('GlowCard renders children', async () => {
    const { GlowCard } = await import('../components/ui/spotlight-card');
    render(<GlowCard>Test Content</GlowCard>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('GradientHeading renders text', async () => {
    const { GradientHeading } = await import('../components/ui/gradient-heading');
    render(<GradientHeading>Hello Gradient</GradientHeading>);
    expect(screen.getByText('Hello Gradient')).toBeInTheDocument();
  });

  it('TubelightNavbar renders items', async () => {
    const { TubelightNavbar } = await import('../components/ui/tubelight-navbar');
    const items = [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
    ];
    render(<TubelightNavbar items={items} activeSection="home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('CircularTestimonials renders testimonials', async () => {
    const { CircularTestimonials } = await import('../components/ui/circular-testimonials');
    const testimonials = [
      { name: 'Alice', text: 'Great work!', rating: 5 },
      { name: 'Bob', text: 'Awesome!', rating: 4 },
    ];
    render(<CircularTestimonials testimonials={testimonials} autoplay={false} />);
    expect(screen.getByText(/Great work/)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('CircularTestimonials returns null with empty array', async () => {
    const { CircularTestimonials } = await import('../components/ui/circular-testimonials');
    const { container } = render(<CircularTestimonials testimonials={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('cn utility merges classes correctly', async () => {
    const { cn } = await import('../lib/utils');
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    expect(cn('px-4', 'px-6')).toBe('px-6'); // tailwind-merge dedupes
    expect(cn('text-red-500', false && 'hidden')).toBe('text-red-500');
  });
});
