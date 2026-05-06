import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PortfolioTextSection } from '@/components/ui/portfolio-text-section'

describe('PortfolioTextSection', () => {
  it('renders PORTFOLIO text with animated letters', () => {
    render(<PortfolioTextSection />)
    // The text is split into individual letters, check for P, R, T, F, L, I
    expect(screen.getByText('P')).toBeInTheDocument()
    expect(screen.getByText('R')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<PortfolioTextSection />)
    expect(screen.getByText(/curated selection of digital works/)).toBeInTheDocument()
  })

  it('renders established year', () => {
    render(<PortfolioTextSection />)
    expect(screen.getByText('Established 2024')).toBeInTheDocument()
  })
})
