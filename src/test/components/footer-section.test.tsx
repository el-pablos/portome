import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/ui/footer-section'

describe('Footer', () => {
  it('renders footer logo', () => {
    render(<Footer />)
    expect(screen.getByText('TAMA')).toBeInTheDocument()
    expect(screen.getByText('DEV')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    // "Contact" appears both as nav link and section title
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1)
  })

  it('renders contact links', () => {
    render(<Footer />)
    expect(screen.getByText('admin@porto.tams.codes')).toBeInTheDocument()
    expect(screen.getByText('t.me/ImTamaa')).toBeInTheDocument()
    expect(screen.getByText('GitHub (el-pablos)')).toBeInTheDocument()
    expect(screen.getByText('GitHub (dasaraul)')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} Tama EL Pablo — All rights reserved.`)).toBeInTheDocument()
  })

  it('renders back to top link', () => {
    render(<Footer />)
    expect(screen.getByText('Back to top ↑')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<Footer />)
    expect(screen.getByText(/Backend Developer berfokus pada Laravel/)).toBeInTheDocument()
  })
})
