import { describe, it, expect, beforeEach } from 'vitest';
import { loadBrandData, saveBrandData, clearBrandData, STORAGE_KEY } from './storage';
import type { BrandOSData } from '../types';

const createMinimalData = (): BrandOSData => ({
    deck: [{ id: 'slide-1', title: 'Test', body: 'Body' }],
    song: [{ id: 'song-1', title: 'Test Song', content: 'Lyrics' }],
    sop: [{ id: 'sop-1', title: 'Test SOP', content: 'Steps' }],
    tagline: { primary: 'Test Tagline', alternatives: [] },
    manifesto: [{ id: 'manifesto-1', title: 'Test', content: 'Content' }],
    events: [],
    boothChecklists: [],
    hooks: [],
    contentPlans: [],
    postEventReviews: [],
    invoices: [],
    participants: [],
});

describe('storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('loadBrandData', () => {
        it('returns fallback when localStorage is empty', () => {
            const fallback = createMinimalData();
            const result = loadBrandData(fallback);
            expect(result.data).toEqual(fallback);
            expect(result.updatedAt).toBeNull();
            expect(result.warning).toBeNull();
        });

        it('returns stored data when valid', () => {
            const data = createMinimalData();
            data.tagline.primary = 'Modified Tagline';

            const payload = { version: 2, updatedAt: 1234567890, data };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

            const fallback = createMinimalData();
            const result = loadBrandData(fallback);

            expect(result.data.tagline.primary).toBe('Modified Tagline');
            expect(result.updatedAt).toBe(1234567890);
            expect(result.warning).toBeNull();
        });

        it('returns fallback with warning when data is corrupted', () => {
            localStorage.setItem(STORAGE_KEY, 'not valid json {{{');

            const fallback = createMinimalData();
            const result = loadBrandData(fallback);

            expect(result.data).toEqual(fallback);
            expect(result.warning).toContain('unreadable');
        });

        it('returns fallback with warning when data structure is invalid', () => {
            const corruptedData = { version: 2, updatedAt: 123, data: { deck: 'not-an-array' } };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(corruptedData));

            const fallback = createMinimalData();
            const result = loadBrandData(fallback);

            // Should normalize the data using fallback
            expect(Array.isArray(result.data.deck)).toBe(true);
        });
    });

    describe('saveBrandData', () => {
        it('stores data with timestamp', () => {
            const data = createMinimalData();
            const timestamp = saveBrandData(data);

            expect(timestamp).toBeGreaterThan(0);

            const stored = localStorage.getItem(STORAGE_KEY);
            expect(stored).toBeTruthy();

            const parsed = JSON.parse(stored!);
            expect(parsed.version).toBe(2);
            expect(parsed.updatedAt).toBe(timestamp);
            expect(parsed.data.tagline.primary).toBe('Test Tagline');
        });
    });

    describe('clearBrandData', () => {
        it('removes stored data', () => {
            const data = createMinimalData();
            saveBrandData(data);

            expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();

            clearBrandData();

            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });
    });
});
