import { describe, it, expect } from 'vitest';
import { calculateInvoiceTotal, calculateEventFinancials } from './logic';
import type { Event, InvoiceItem } from '../types';

describe('Financial Logic', () => {
    it('calculates invoice total correctly', () => {
        const items: InvoiceItem[] = [
            { description: 'Item 1', qty: 2, price: 100 },
            { description: 'Item 2', qty: 1, price: 50 }
        ];
        expect(calculateInvoiceTotal(items)).toBe(250);
    });

    it('calculates event financials correctly', () => {
        const events: Event[] = [
            {
                id: '1',
                title: 'Event 1',
                status: 'completed',
                startDate: '2026-01-01',
                endDate: '2026-01-01',
                location: 'KL',
                region: 'MY',
                pnl: {
                    revenue: 1000,
                    cogs: 300,
                    expenses: { fee: 50, transport: 50, staff: 100, misc: 0 }
                },
                logistics: { travelDistanceKm: 50, prepDays: 1, crewCount: 2, vehicle: 'van' },
                eoContact: { name: 'Test', phone: '0123456789', company: 'Test Co' }
            },
            {
                id: '2',
                title: 'Event 2',
                status: 'confirmed',
                startDate: '2026-02-01',
                endDate: '2026-02-01',
                location: 'Penang',
                region: 'MY',
                pnl: {
                    revenue: 2000,
                    cogs: 500,
                    expenses: { fee: 100, transport: 100, staff: 200, misc: 100 }
                },
                logistics: { travelDistanceKm: 100, prepDays: 2, crewCount: 3, vehicle: 'van' },
                eoContact: { name: 'Test 2', phone: '0198765432', company: 'Test Co 2' }
            }
        ];

        const result = calculateEventFinancials(events);

        // Event 1 Cost: 300 + 50 + 50 + 100 + 0 = 500. Profit: 1000 - 500 = 500
        // Event 2 Cost: 500 + 100 + 100 + 200 + 100 = 1000. Profit: 2000 - 1000 = 1000

        expect(result.totalRevenue).toBe(3000);
        expect(result.totalCost).toBe(1500);
        expect(result.netProfit).toBe(1500);
        expect(result.margin).toBe(50); // (1500 / 3000) * 100
        expect(result.completedEvents).toBe(1);
        expect(result.upcomingEvents).toBe(1);
    });
});
