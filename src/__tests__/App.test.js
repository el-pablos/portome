import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App (smoke test)', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('renders the skip-to-content link', () => {
    render(<App />);
    const skipLink = screen.getByText('Skip to content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#home');
  });

  it('renders the navbar brand', () => {
    render(<App />);
    const brands = screen.getAllByText('Tama EL Pablo');
    expect(brands.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the theme toggle button', () => {
    render(<App />);
    const toggle = screen.getByLabelText(/switch to light mode/i);
    expect(toggle).toBeInTheDocument();
  });

  it('renders the contact CTA in navbar', () => {
    render(<App />);
    // The navbar Contact button
    const contactLinks = screen.getAllByText('Contact');
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('has a main landmark', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
