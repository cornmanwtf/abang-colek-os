/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';

// Mock localStorage for tests
const localStorageMock = {
    store: {} as Record<string, string>,
    getItem(key: string) {
        return this.store[key] ?? null;
    },
    setItem(key: string, value: string) {
        this.store[key] = value;
    },
    removeItem(key: string) {
        delete this.store[key];
    },
    clear() {
        this.store = {};
    },
};

Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
});

// Reset localStorage before each test
beforeEach(() => {
    localStorageMock.clear();
});
