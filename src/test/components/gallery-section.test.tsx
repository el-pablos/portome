import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { GallerySection } from '@/components/ui/gallery-section'

describe('GallerySection', () => {
  it('renders gallery grid with items', () => {
    const { container } = render(<GallerySection />)
    // Check grid exists
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })

  it('renders all 7 media items', () => {
    const { container } = render(<GallerySection />)
    // 4 images + 3 videos = 7 items
    const images = container.querySelectorAll('img')
    const videos = container.querySelectorAll('video')
    expect(images.length + videos.length).toBe(7)
  })

  it('renders image items with correct alt text', () => {
    render(<GallerySection />)
    expect(screen.getByAltText('Visual Identity')).toBeInTheDocument()
    expect(screen.getByAltText('Architecture')).toBeInTheDocument()
    expect(screen.getByAltText('Nature Focus')).toBeInTheDocument()
    expect(screen.getByAltText('Coastal Serenity')).toBeInTheDocument()
  })

  it('renders video items with loop attribute', () => {
    const { container } = render(<GallerySection />)
    const videos = container.querySelectorAll('video')
    videos.forEach((video) => {
      // muted is a boolean property in React, check via property
      expect(video.muted).toBe(true)
      expect(video).toHaveAttribute('loop')
    })
  })
})
