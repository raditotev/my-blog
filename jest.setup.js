// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock next/dynamic so LoadableComponent doesn't trigger async state updates (act warning)
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => null,
}));

// Mock remark plugins to avoid ES module issues
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-github-blockquote-alert', () => () => {});
