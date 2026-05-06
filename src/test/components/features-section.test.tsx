import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FeaturesSection } from '@/components/ui/features-section'

describe('FeaturesSection', () => {
  it('renders three feature cards', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('BUILD FAST UIs')).toBeInTheDocument()
    expect(screen.getByText('CLEAN CODEBASE')).toBeInTheDocument()
    expect(screen.getByText('SHIP ON TIME')).toBeInTheDocument()
  })

  it('renders tech badges', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('shadcn/ui · Tailwind')).toBeInTheDocument()
  })

  it('renders project count', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('42+')).toBeInTheDocument()
    expect(screen.getByText('Projects Done')).toBeInTheDocument()
  })

  it('renders sugi.dev pill', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('sugi.dev')).toBeInTheDocument()
    expect(screen.getByText('React · Next.js')).toBeInTheDocument()
  })
})
