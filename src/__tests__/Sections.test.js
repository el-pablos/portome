import React from 'react';
import { render, screen } from '@testing-library/react';

// Test each section component renders without crashing

describe('Hero section', () => {
  it('renders with #home id', async () => {
    const Hero = (await import('../components/sections/Hero')).default;
    const { container } = render(<Hero theme="dark" />);
    expect(container.querySelector('#home')).toBeInTheDocument();
  });
});

describe('About section', () => {
  it('renders with #about id', async () => {
    const About = (await import('../components/sections/About')).default;
    const { container } = render(<About theme="dark" />);
    expect(container.querySelector('#about')).toBeInTheDocument();
  });
});

describe('Services section', () => {
  it('renders with #services id', async () => {
    const Services = (await import('../components/sections/Services')).default;
    const { container } = render(<Services />);
    expect(container.querySelector('#services')).toBeInTheDocument();
  });
});

describe('Portfolio section', () => {
  it('renders with #portfolio id', async () => {
    const Portfolio = (await import('../components/sections/Portfolio')).default;
    const { container } = render(<Portfolio />);
    expect(container.querySelector('#portfolio')).toBeInTheDocument();
  });
});

describe('Contact section', () => {
  it('renders with #contact id', async () => {
    const Contact = (await import('../components/sections/Contact')).default;
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });
});

describe('Footer section', () => {
  it('renders copyright text', async () => {
    const Footer = (await import('../components/sections/Footer')).default;
    render(<Footer />);
    const matches = screen.getAllByText(/Tama EL Pablo/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});

describe('TechStack section', () => {
  it('renders without crashing', async () => {
    const TechStack = (await import('../components/sections/TechStack')).default;
    const { container } = render(<TechStack />);
    expect(container).toBeInTheDocument();
  });
});

describe('Testimonials section', () => {
  it('renders without crashing', async () => {
    const Testimonials = (await import('../components/sections/Testimonials')).default;
    const { container } = render(<Testimonials />);
    expect(container).toBeInTheDocument();
  });
});
