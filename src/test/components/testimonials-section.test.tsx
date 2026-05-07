import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TestimonialsSection } from '@/components/ui/testimonials-section'

describe('TestimonialsSection', () => {
  it('renders section title', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText(/Feedback dari orang-orang/)).toBeInTheDocument()
  })

  it('renders testimonial cards', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument()
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Michael Rodriguez')).toBeInTheDocument()
  })

  it('renders testimonial roles', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('CTO at TechStart Inc')).toBeInTheDocument()
    expect(screen.getByText('Product Manager at CloudSync')).toBeInTheDocument()
  })

  it('renders all 9 testimonials', () => {
    const { container } = render(<TestimonialsSection />)
    const avatars = container.querySelectorAll('img')
    expect(avatars.length).toBe(9)
  })
})
