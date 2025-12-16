import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock react-markdown
jest.mock('react-markdown', () => {
    return {
        __esModule: true,
        default: ({ children }) => {
            return children;
        },
    };
});
