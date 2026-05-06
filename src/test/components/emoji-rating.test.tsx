import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { EmojiRating } from '@/components/ui/emoji-rating'

describe('EmojiRating', () => {
  it('renders 5 emoji buttons', () => {
    render(<EmojiRating onRate={vi.fn()} />)
    expect(screen.getByText('😔')).toBeInTheDocument()
    expect(screen.getByText('😕')).toBeInTheDocument()
    expect(screen.getByText('😐')).toBeInTheDocument()
    expect(screen.getByText('🙂')).toBeInTheDocument()
    expect(screen.getByText('😍')).toBeInTheDocument()
  })

  it('calls onRate with correct rating when clicked', () => {
    const onRate = vi.fn()
    render(<EmojiRating onRate={onRate} />)
    fireEvent.click(screen.getByText('😍'))
    expect(onRate).toHaveBeenCalledWith(5)
  })

  it('shows label when emoji is selected', () => {
    render(<EmojiRating onRate={vi.fn()} />)
    fireEvent.click(screen.getByText('🙂'))
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('shows Amazing label for highest rating', () => {
    render(<EmojiRating onRate={vi.fn()} />)
    fireEvent.click(screen.getByText('😍'))
    expect(screen.getByText('Amazing')).toBeInTheDocument()
  })

  it('shows Terrible label for lowest rating', () => {
    render(<EmojiRating onRate={vi.fn()} />)
    fireEvent.click(screen.getByText('😔'))
    expect(screen.getByText('Terrible')).toBeInTheDocument()
  })
})
