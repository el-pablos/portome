import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from '@/components/ui/footer-section'

describe('Footer', () => {
  it('renders footer logo', () => {
    render(<Footer />)
    expect(screen.getByText('SUGI')).toBeInTheDocument()
    expect(screen.getByText('DEV')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders contact links', () => {
    render(<Footer />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Twitter/X')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} sugi.dev — All rights reserved.`)).toBeInTheDocument()
  })

  it('renders back to top link', () => {
    render(<Footer />)
    expect(screen.getByText('Back to top ↑')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<Footer />)
    expect(screen.getByText(/Building performant, accessible/)).toBeInTheDocument()
  })
})
