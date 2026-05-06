import '@testing-library/jest-dom'

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(callback: IntersectionObserverCallback) {
    // Immediately call with isIntersecting: true for testing
    setTimeout(() => {
      callback(
        [{ isIntersecting: true, target: document.createElement('div') }] as unknown as IntersectionObserverEntry[],
        this as unknown as IntersectionObserver
      )
    }, 0)
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock requestAnimationFrame — use setTimeout to avoid infinite recursion with framer-motion
let rafId = 0
window.requestAnimationFrame = vi.fn((cb) => {
  rafId++
  setTimeout(() => cb(performance.now()), 0)
  return rafId
})

window.cancelAnimationFrame = vi.fn((id: number) => {
  clearTimeout(id)
})

// Mock performance.now
if (!window.performance) {
  (window as unknown as { performance: { now: () => number } }).performance = { now: () => Date.now() }
}

// Mock scrollTo
window.scrollTo = vi.fn()

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
})
