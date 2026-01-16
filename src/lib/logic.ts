import type { Event, InvoiceItem } from "../types";

export const calculateInvoiceTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
};

export const calculateEventFinancials = (events: Event[]) => {
    let totalRevenue = 0;
    let totalCost = 0;
    let completedEvents = 0;
    let upcomingEvents = 0;

    events.forEach((event) => {
        if (event.status === "completed") completedEvents++;
        else if (['lead', 'confirmed'].includes(event.status)) upcomingEvents++;

        if (event.pnl) {
            totalRevenue += event.pnl.revenue || 0;
            const expenses = event.pnl.expenses;
            const eventCost = (event.pnl.cogs || 0) + (expenses.fee || 0) + (expenses.transport || 0) + (expenses.staff || 0) + (expenses.misc || 0);
            totalCost += eventCost;
        }
    });

    const netProfit = totalRevenue - totalCost;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return { totalRevenue, totalCost, netProfit, margin, completedEvents, upcomingEvents };
};
