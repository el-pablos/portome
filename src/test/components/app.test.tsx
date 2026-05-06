import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '@/App'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('renders main container with id top', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#top')).toBeInTheDocument()
  })

  it('renders all major sections', () => {
    const { container } = render(<App />)
    // Check that sections exist
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(4)
  })
})
