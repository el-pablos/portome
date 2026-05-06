import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SocialLinks } from '@/components/ui/social-links'

describe('SocialLinks', () => {
  it('renders desktop social links', () => {
    render(<SocialLinks />)
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('X / Twitter')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders mobile toggle button', () => {
    const { container } = render(<SocialLinks />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('has correct href for links', () => {
    render(<SocialLinks />)
    const githubLink = screen.getAllByText('GitHub')[0].closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sugidev')
  })
})
