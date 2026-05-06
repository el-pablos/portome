import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesSection } from '@/components/ui/services-section'

describe('ServicesSection', () => {
  it('renders section title', () => {
    render(<ServicesSection />)
    expect(screen.getByText(/Crafting digital/)).toBeInTheDocument()
  })

  it('renders tech stack pills', () => {
    render(<ServicesSection />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
    expect(screen.getByText('Framer Motion')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders experience card', () => {
    render(<ServicesSection />)
    expect(screen.getByText('3+')).toBeInTheDocument()
    expect(screen.getByText('Years of Experience')).toBeInTheDocument()
  })

  it('renders availability badge', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Open to work')).toBeInTheDocument()
  })

  it('renders services list items', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Branding')).toBeInTheDocument()
    expect(screen.getByText('Web Design')).toBeInTheDocument()
    expect(screen.getByText('Illustration')).toBeInTheDocument()
  })
})
