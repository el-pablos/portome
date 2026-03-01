// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = [];
  }
  observe(el) { this.elements.push(el); }
  unobserve() {}
  disconnect() {}
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock requestAnimationFrame
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
window.cancelAnimationFrame = (id) => clearTimeout(id);

// Mock matchMedia
window.matchMedia = window.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

// Mock canvas for ASCII/Flickering components
const mockCtx = {
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  fillText: jest.fn(),
  strokeText: jest.fn(),
  measureText: jest.fn(() => ({ width: 10 })),
  getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
  putImageData: jest.fn(),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createPattern: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  arc: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  setTransform: jest.fn(),
  resetTransform: jest.fn(),
  clip: jest.fn(),
  rect: jest.fn(),
  font: '',
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  lineCap: 'butt',
  lineJoin: 'miter',
  textAlign: 'start',
  textBaseline: 'alphabetic',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  canvas: { width: 100, height: 100, toDataURL: jest.fn(() => 'data:image/png;base64,test') },
};

HTMLCanvasElement.prototype.getContext = jest.fn(function() {
  // Bind the canvas reference properly
  mockCtx.canvas = this;
  return mockCtx;
});
HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,test');

// Suppress console errors from lazy loading in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('act(') || args[0].includes('not wrapped in act'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
