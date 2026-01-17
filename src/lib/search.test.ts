import { describe, it, expect } from 'vitest';
import { searchData, SearchResult } from './search';
import type { BrandOSData } from '../types';

const createTestData = (): BrandOSData => ({
    deck: [
        { id: 'slide-1', title: 'ABANG COLEK', body: 'Street Taste. Real Talk.' },
        { id: 'slide-2', title: 'What We Are', body: 'Street food brand built from the ground up.' },
    ],
    song: [
        { id: 'song-1', title: 'TikTok 30s', content: 'Abang Colek pedas naik darah' },
    ],
    sop: [
        { id: 'sop-1', title: 'Posting cadence', content: '4-5 video seminggu' },
    ],
    tagline: { primary: 'Pedas Ni Jujur.', alternatives: ['Level Abang Colek.'] },
    manifesto: [
        { id: 'manifesto-1', title: 'Variant 1', content: 'We believe taste shouldnt lie.' },
    ],
    events: [],
    boothChecklists: [],
    hooks: [],
    contentPlans: [],
    postEventReviews: [],
    invoices: [],
    participants: [],
});

describe('searchData', () => {
    it('returns empty array for empty query', () => {
        const data = createTestData();
        expect(searchData(data, '')).toEqual([]);
        expect(searchData(data, '   ')).toEqual([]);
    });

    it('finds matches in deck titles', () => {
        const data = createTestData();
        const results = searchData(data, 'ABANG');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.tab === 'Deck')).toBe(true);
        expect(results.some(r => r.label.includes('ABANG COLEK'))).toBe(true);
    });

    it('finds matches in deck body', () => {
        const data = createTestData();
        const results = searchData(data, 'Street');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.tab === 'Deck')).toBe(true);
    });

    it('finds matches in song content', () => {
        const data = createTestData();
        const results = searchData(data, 'pedas naik darah');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.tab === 'Song')).toBe(true);
    });

    it('finds matches in SOP', () => {
        const data = createTestData();
        const results = searchData(data, 'video');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.tab === 'SOP')).toBe(true);
    });

    it('finds matches in manifesto', () => {
        const data = createTestData();
        const results = searchData(data, 'taste shouldnt lie');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.tab === 'Manifesto')).toBe(true);
    });

    it('finds matches in tagline', () => {
        const data = createTestData();
        const results = searchData(data, 'Pedas Ni Jujur');

        expect(results.length).toBeGreaterThan(0);
        expect(results.some(r => r.id === 'tagline')).toBe(true);
    });

    it('search is case-insensitive', () => {
        const data = createTestData();
        const upper = searchData(data, 'ABANG');
        const lower = searchData(data, 'abang');

        expect(upper.length).toBe(lower.length);
    });

    it('returns results with correct structure', () => {
        const data = createTestData();
        const results = searchData(data, 'Colek');

        results.forEach((result: SearchResult) => {
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('tab');
            expect(result).toHaveProperty('label');
            expect(result).toHaveProperty('snippet');
            expect(['Deck', 'Song', 'SOP', 'Manifesto']).toContain(result.tab);
        });
    });
});
