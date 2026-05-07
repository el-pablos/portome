import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/ui/hero'

describe('Hero', () => {
  it('renders hero text TAMA, BACKEND, DEV', () => {
    render(<Hero />)
    const tamaElements = screen.getAllByText('TAMA')
    expect(tamaElements.length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('BACKEND')).toBeInTheDocument()
    expect(screen.getAllByText('DEV').length).toBeGreaterThanOrEqual(1)
  })

  it('renders navbar with navigation links', () => {
    render(<Hero />)
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Stack')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders Hire me button', () => {
    render(<Hero />)
    expect(screen.getByText('Hire me')).toBeInTheDocument()
  })

  it('renders availability badge', () => {
    render(<Hero />)
    expect(screen.getByText('Available for freelance')).toBeInTheDocument()
  })

  it('renders desktop floating cards with project info', () => {
    render(<Hero />)
    expect(screen.getAllByText('el-pablos').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('10+ projects').length).toBeGreaterThanOrEqual(1)
  })

  it('renders mobile pill cards', () => {
    render(<Hero />)
    expect(screen.getAllByText('Laravel Dev').length).toBeGreaterThanOrEqual(1)
  })
})
