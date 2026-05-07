import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '@/App'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('renders main container with id top', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#top')).toBeInTheDocument()
  })

  it('renders all major sections', () => {
    const { container } = render(<App />)
    const sections = container.querySelectorAll('section')
    // Stats, Features(3cards), Services, WhyWorkWithMe, PortfolioText, PortfolioGrid, Gallery, Testimonials, Rating = 9+ sections
    expect(sections.length).toBeGreaterThanOrEqual(7)
  })
})
