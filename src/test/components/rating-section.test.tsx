import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RatingSection } from '@/components/ui/rating-section'

describe('RatingSection', () => {
  it('renders section title', () => {
    render(<RatingSection />)
    expect(screen.getByText("How's the vibe?")).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<RatingSection />)
    expect(screen.getByText(/Rate your experience/)).toBeInTheDocument()
  })

  it('renders emoji rating component', () => {
    render(<RatingSection />)
    expect(screen.getByText('😍')).toBeInTheDocument()
  })
})
