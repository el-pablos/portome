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
    expect(screen.getByText('PHP')).toBeInTheDocument()
    expect(screen.getByText('shadcn/ui · Tailwind')).toBeInTheDocument()
  })

  it('renders project count', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText('Projects Done')).toBeInTheDocument()
  })

  it('renders el-pablos pill', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('el-pablos')).toBeInTheDocument()
    expect(screen.getByText('Laravel · PHP')).toBeInTheDocument()
  })
})
