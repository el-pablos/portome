import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { PageLoader } from '@/components/ui/page-loader'

describe('PageLoader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders loader with TAMA logo', () => {
    render(<PageLoader duration={3000} />)
    expect(screen.getByText('TAMA')).toBeInTheDocument()
    expect(screen.getByText('DEV')).toBeInTheDocument()
  })

  it('shows Loading text initially', () => {
    render(<PageLoader duration={3000} />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('displays percentage counter', () => {
    render(<PageLoader duration={3000} />)
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('locks scroll on mount', () => {
    render(<PageLoader duration={3000} />)
    expect(document.documentElement.style.overflow).toBe('hidden')
  })

  it('accepts custom duration prop', () => {
    const { container } = render(<PageLoader duration={1000} />)
    expect(container).toBeTruthy()
  })
})
