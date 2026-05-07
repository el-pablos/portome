import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServicesSection } from '@/components/ui/services-section'

describe('ServicesSection', () => {
  it('renders section title', () => {
    render(<ServicesSection />)
    expect(screen.getByText(/Building reliable/)).toBeInTheDocument()
  })

  it('renders tech stack pills', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Laravel')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
    expect(screen.getByText('MySQL')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Linux')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
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
    expect(screen.getByText('Backend API')).toBeInTheDocument()
    expect(screen.getByText('DevOps & Deploy')).toBeInTheDocument()
    expect(screen.getByText('Security & OSINT')).toBeInTheDocument()
  })
})
