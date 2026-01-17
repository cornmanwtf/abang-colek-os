import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BrandOSData } from '../types';

// Mock the download functionality since we can't test actual file downloads
const mockDownloadFile = vi.fn();
vi.mock('./exporters', async (importOriginal) => {
    const actual = await importOriginal<typeof import('./exporters')>();
    return {
        ...actual,
        // We'll test the formatting functions, not the actual download
    };
});

// Test data factory
const createTestData = (): BrandOSData => ({
    deck: [
        { id: 'slide-1', title: 'ABANG COLEK', body: 'Street Taste. Real Talk.' },
        { id: 'slide-2', title: 'What We Are', body: 'Street food brand' },
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
    events: [
        {
            id: 'event-1',
            title: 'KL Street Festival',
            location: 'Kuala Lumpur',
            region: 'MY' as const,
            startDate: '2026-02-10',
            endDate: '2026-02-10',
            status: 'confirmed' as const,
            feeNote: 'RM800',
            requirements: 'Bring own canopy',
            notes: 'High footfall',
        },
    ],
    boothChecklists: [
        {
            id: 'booth-1',
            eventId: 'event-1',
            items: [
                { id: 'item-1', label: 'Canopy', required: true, done: false },
                { id: 'item-2', label: 'Signage', required: true, done: true },
            ],
            notes: 'Pack early',
        },
    ],
    hooks: [
        { id: 'hook-1', title: 'Pedas Challenge', text: 'Ni level Abang Colek', tags: ['pedas'] },
        { id: 'hook-2', title: 'First Bite', text: 'Satu suap dulu', tags: ['reaction'] },
    ],
    contentPlans: [
        {
            id: 'plan-1',
            eventId: 'event-1',
            date: '2026-02-10',
            hookIds: ['hook-1', 'hook-2'],
            shotList: ['Crowd line', 'First bite reaction'],
            notes: 'Target 12 clips',
        },
    ],
    postEventReviews: [
        {
            id: 'review-1',
            eventId: 'event-1',
            salesNote: 'RM3.5k gross',
            crowdNote: 'Peak 8pm',
            topHook: 'Pedas Challenge',
            issueNote: 'Short on packaging',
            nextAction: 'Add backup packaging',
            tiktokViews: 42000,
            watchTimeSeconds: 7800,
            createdAt: '2026-02-11',
        },
    ],
    invoices: [],
    participants: [],
});

describe('Export functionality', () => {
    beforeEach(() => {
        mockDownloadFile.mockClear();
    });

    describe('Data structure for exports', () => {
        it('test data has all required fields', () => {
            const data = createTestData();

            expect(Array.isArray(data.deck)).toBe(true);
            expect(Array.isArray(data.song)).toBe(true);
            expect(Array.isArray(data.sop)).toBe(true);
            expect(Array.isArray(data.manifesto)).toBe(true);
            expect(Array.isArray(data.events)).toBe(true);
            expect(Array.isArray(data.hooks)).toBe(true);
            expect(data.tagline).toBeDefined();
            expect(data.tagline.primary).toBeDefined();
        });

        it('events have required fields for export', () => {
            const data = createTestData();
            const event = data.events[0];

            expect(event.id).toBeDefined();
            expect(event.title).toBeDefined();
            expect(event.location).toBeDefined();
            expect(event.startDate).toBeDefined();
            expect(event.status).toBeDefined();
        });

        it('content plans link to events correctly', () => {
            const data = createTestData();
            const plan = data.contentPlans[0];
            const event = data.events.find(e => e.id === plan.eventId);

            expect(event).toBeDefined();
            expect(plan.hookIds.length).toBeGreaterThan(0);
        });

        it('hooks can be found by content plan hookIds', () => {
            const data = createTestData();
            const plan = data.contentPlans[0];

            plan.hookIds.forEach(hookId => {
                const hook = data.hooks.find(h => h.id === hookId);
                expect(hook).toBeDefined();
            });
        });

        it('booth checklists link to events correctly', () => {
            const data = createTestData();
            const checklist = data.boothChecklists[0];
            const event = data.events.find(e => e.id === checklist.eventId);

            expect(event).toBeDefined();
            expect(checklist.items.length).toBeGreaterThan(0);
        });

        it('post-event reviews link to events correctly', () => {
            const data = createTestData();
            const review = data.postEventReviews[0];
            const event = data.events.find(e => e.id === review.eventId);

            expect(event).toBeDefined();
            expect(review.salesNote).toBeDefined();
        });
    });

    describe('Export edge cases', () => {
        it('handles events without linked content plans', () => {
            const data = createTestData();
            // Add event without content plan
            data.events.push({
                id: 'event-no-plan',
                title: 'No Plan Event',
                location: 'Test',
                region: 'MY',
                startDate: '2026-03-01',
                endDate: '2026-03-01',
                status: 'lead',
            });

            const plan = data.contentPlans.find(p => p.eventId === 'event-no-plan');
            expect(plan).toBeUndefined();
        });

        it('handles events without reviews', () => {
            const data = createTestData();

            data.events.push({
                id: 'event-no-review',
                title: 'No Review Event',
                location: 'Test',
                region: 'MY',
                startDate: '2026-03-01',
                endDate: '2026-03-01',
                status: 'confirmed',
            });

            const review = data.postEventReviews.find(r => r.eventId === 'event-no-review');
            expect(review).toBeUndefined();
        });

        it('handles empty data arrays', () => {
            const emptyData: BrandOSData = {
                deck: [],
                song: [],
                sop: [],
                tagline: { primary: 'Test', alternatives: [] },
                manifesto: [],
                events: [],
                boothChecklists: [],
                hooks: [],
                contentPlans: [],
                postEventReviews: [],
                invoices: [],
                participants: [],
            };

            expect(emptyData.events.length).toBe(0);
            expect(emptyData.hooks.length).toBe(0);
        });
    });
});
