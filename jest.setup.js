// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

// Mock react-markdown to avoid ES module issues in Jest
jest.mock('react-markdown', () => {
  return function ReactMarkdown({ children }) {
    return children;
  };
});

// Clean up after each test for React Testing Library
afterEach(() => {
  cleanup();
});

// Clean up database connections after all tests
afterAll(async () => {
  // Dynamically import to avoid issues when DATABASE_URL is not set
  try {
    const { closePool } = await import('./src/lib/db');
    await closePool();
  } catch (error) {
    // Ignore errors if db module can't be loaded
  }
});
