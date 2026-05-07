import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PortfolioGrid } from '@/components/ui/portfolio-grid'

describe('PortfolioGrid', () => {
  it('renders section title', () => {
    render(<PortfolioGrid />)
    expect(screen.getByText('Selected Works')).toBeInTheDocument()
  })

  it('renders project cards', () => {
    render(<PortfolioGrid />)
    expect(screen.getByText('Pentest For Qa')).toBeInTheDocument()
    expect(screen.getByText('Tamshub Store')).toBeInTheDocument()
    expect(screen.getByText('Valentine')).toBeInTheDocument()
  })

  it('renders language filter buttons', () => {
    render(<PortfolioGrid />)
    expect(screen.getByText('All')).toBeInTheDocument()
    // Language names appear both as filter buttons and card badges
    expect(screen.getAllByText('JavaScript').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Go').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1)
  })

  it('renders all 10 projects by default', () => {
    render(<PortfolioGrid />)
    // Check for a few project names
    expect(screen.getByText('Ai Whatsapp Chatbot')).toBeInTheDocument()
    expect(screen.getByText('Reboot Godot Uas Projek')).toBeInTheDocument()
    expect(screen.getByText('Platform Aduan Masyarakat')).toBeInTheDocument()
  })
})
