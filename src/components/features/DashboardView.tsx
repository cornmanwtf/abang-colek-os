import { useMemo, useState } from "react";
import type { BrandOSData, Event, Invoice, InvoiceItem } from "../../types";
import { calculateEventFinancials, calculateInvoiceTotal } from "../../lib/logic";

interface DashboardViewProps {
  data: BrandOSData;
  selectedEvent: Event | undefined;
}

const createInvoice = (eventId: string, eventTitle: string, eoName: string): Invoice => ({
  id: `inv-${Date.now()}`,
  number: `INV-2026-${Math.floor(Math.random() * 1000)}`,
  eventId,
  to: eoName || "Client Name",
  date: new Date().toISOString(),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  status: "DRAFT",
  items: [
    { description: `Event Fee: ${eventTitle}`, qty: 1, price: 1500 }
  ]
});

export function DashboardView({ data, setData }: DashboardViewProps & { setData: React.Dispatch<React.SetStateAction<BrandOSData>> }) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "INVOICES">("OVERVIEW");
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // METRICS CALCULATION (Using Testable Logic)
  const metrics = useMemo(() => calculateEventFinancials(data.events), [data.events]);

  const recentEvents = useMemo(() => {
    return [...data.events].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).slice(0, 5);
  }, [data.events]);

  // INVOICE HANDLERS
  const handleCreateInvoice = () => {
    // For simplicity, just pick the first confirmed event without an invoice, or generic
    const targetEvent = data.events.find(e => e.status === 'confirmed') || data.events[0];
    if (!targetEvent) { alert("No events found to invoice."); return; }

    const newInv = createInvoice(targetEvent.id, targetEvent.title, targetEvent.eoContact?.company || targetEvent.eoContact?.name || "");
    setData(prev => ({ ...prev, invoices: [...(prev.invoices || []), newInv] }));
    setEditingInvoice(newInv);
    setActiveTab("INVOICES");
  };

  const updateInvoice = (updates: Partial<Invoice>) => {
    if (!editingInvoice) return;
    const updated = { ...editingInvoice, ...updates };
    setEditingInvoice(updated);
    setData(prev => ({
      ...prev,
      invoices: prev.invoices.map(inv => inv.id === editingInvoice.id ? updated : inv)
    }));
  };

  const addItem = () => {
    if (!editingInvoice) return;
    updateInvoice({ items: [...editingInvoice.items, { description: "Item", qty: 1, price: 0 }] });
  };

  const updateItem = (idx: number, field: keyof InvoiceItem, value: any) => {
    if (!editingInvoice) return;
    const newItems = [...editingInvoice.items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    updateInvoice({ items: newItems });
  };

  const deleteInvoice = (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    setData(prev => ({ ...prev, invoices: prev.invoices.filter(i => i.id !== id) }));
    if (editingInvoice?.id === id) setEditingInvoice(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-brand-black">Finance Dashboard</h2>
        </div>
        <div className="flex bg-white rounded-lg border border-black/10 p-1">
          <button
            onClick={() => setActiveTab("OVERVIEW")}
            className={`px-4 py-2 text-xs font-bold uppercase rounded ${activeTab === "OVERVIEW" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("INVOICES")}
            className={`px-4 py-2 text-xs font-bold uppercase rounded ${activeTab === "INVOICES" ? "bg-brand-black text-white" : "text-black/60 hover:bg-gray-50"}`}
          >
            Invoices
          </button>
        </div>
      </div>

      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
              <div className="text-xs font-bold uppercase text-black/50 mb-1">Total Revenue</div>
              <div className="text-2xl font-heading font-bold text-brand-black">RM {metrics.totalRevenue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
              <div className="text-xs font-bold uppercase text-black/50 mb-1">Net Profit</div>
              <div className={`text-2xl font-heading font-bold ${metrics.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                RM {metrics.netProfit.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
              <div className="text-xs font-bold uppercase text-black/50 mb-1">Margin</div>
              <div className="text-2xl font-heading font-bold text-brand-black">{metrics.margin.toFixed(1)}%</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
              <div className="text-xs font-bold uppercase text-black/50 mb-1">Pipeline</div>
              <div className="text-2xl font-heading font-bold text-brand-black">
                {metrics.upcomingEvents} <span className="text-sm font-sans font-normal text-black/50">Upcoming</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl border border-black/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 bg-gray-50 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg">Recent Performance</h3>
              <button className="text-xs font-bold text-brand-red uppercase hover:underline">View All Events</button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-black/50 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 font-bold">Event</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                  <th className="px-6 py-3 font-bold text-right">Revenue</th>
                  <th className="px-6 py-3 font-bold text-right">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEvents.map(event => {
                  const revenue = event.pnl?.revenue || 0;
                  const expenses = event.pnl?.expenses;
                  const cost = (event.pnl?.cogs || 0) + (expenses?.fee || 0) + (expenses?.transport || 0) + (expenses?.staff || 0) + (expenses?.misc || 0);
                  const profit = revenue - cost;

                  return (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-bold text-brand-black">{event.title}</td>
                      <td className="px-6 py-3 text-gray-600">{new Date(event.startDate).toLocaleDateString()}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${event.status === 'completed' ? 'bg-green-100 text-green-700' :
                          event.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">RM {revenue.toLocaleString()}</td>
                      <td className={`px-6 py-3 text-right font-bold ${profit > 0 ? "text-green-600" : "text-gray-400"}`}>
                        {profit > 0 ? "+" : ""}RM {profit.toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "INVOICES" && (
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {/* Invoice List */}
          <div className="space-y-4">
            <button onClick={handleCreateInvoice} className="w-full bg-brand-black text-white py-3 rounded-lg font-bold uppercase text-sm hover:brightness-110">
              + New Invoice
            </button>
            <div className="space-y-2">
              {(data.invoices || []).map(inv => (
                <div
                  key={inv.id}
                  onClick={() => setEditingInvoice(inv)}
                  className={`p-4 rounded-lg border cursor-pointer ${editingInvoice?.id === inv.id ? "bg-brand-paper border-brand-gold" : "bg-white border-black/5 hover:border-black/20"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-brand-black">{inv.number}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${inv.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{inv.status}</span>
                  </div>
                  <div className="text-xs text-black/60 truncate">{inv.to}</div>
                  <div className="text-right font-bold text-sm mt-2">RM {calculateInvoiceTotal(inv.items).toLocaleString()}</div>
                </div>
              ))}
              {(data.invoices || []).length === 0 && <div className="text-center text-gray-400 text-xs italic py-4">No Invoices</div>}
            </div>
          </div>

          {/* Invoice Editor */}
          <div className="bg-white rounded-xl border border-black/10 p-8 shadow-sm print:shadow-none print:border-none">
            {editingInvoice ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start border-b border-black/10 pb-6">
                  <div>
                    <div className="text-xs font-bold text-black/40 uppercase mb-1">Invoice To</div>
                    <input
                      value={editingInvoice.to}
                      onChange={e => updateInvoice({ to: e.target.value })}
                      className="text-2xl font-bold font-heading w-full bg-transparent focus:outline-none focus:border-b border-black/20"
                      placeholder="Client Name..."
                    />
                    <div className="mt-2 text-sm text-black/60">
                      Due: <input type="date" value={editingInvoice.dueDate.split('T')[0]} onChange={e => updateInvoice({ dueDate: new Date(e.target.value).toISOString() })} className="bg-transparent" />
                    </div>
                  </div>
                  <div className="text-right">
                    <input
                      value={editingInvoice.number}
                      onChange={e => updateInvoice({ number: e.target.value })}
                      className="text-right font-bold text-brand-black focus:outline-none"
                    />
                    <div className={`mt-2 inline-block px-3 py-1 rounded text-xs font-bold uppercase cursor-pointer ${editingInvoice.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`} onClick={() => updateInvoice({ status: editingInvoice.status === 'PAID' ? 'SENT' : 'PAID' })}>
                      Status: {editingInvoice.status}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <table className="w-full text-left text-sm mb-4">
                    <thead className="border-b border-black/10 text-black/50 uppercase text-xs">
                      <tr>
                        <th className="py-2 w-[50%]">Description</th>
                        <th className="py-2 text-center w-[15%]">Qty</th>
                        <th className="py-2 text-right w-[20%]">Price</th>
                        <th className="py-2 text-right w-[15%]">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {editingInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2">
                            <input
                              value={item.description}
                              onChange={e => updateItem(idx, 'description', e.target.value)}
                              className="w-full bg-transparent focus:outline-none"
                            />
                          </td>
                          <td className="py-2 text-center">
                            <input
                              type="number"
                              value={item.qty}
                              onChange={e => updateItem(idx, 'qty', Number(e.target.value))}
                              className="w-12 text-center bg-transparent focus:outline-none"
                            />
                          </td>
                          <td className="py-2 text-right">
                            <input
                              type="number"
                              value={item.price}
                              onChange={e => updateItem(idx, 'price', Number(e.target.value))}
                              className="w-20 text-right bg-transparent focus:outline-none"
                            />
                          </td>
                          <td className="py-2 text-right font-bold">
                            {(item.price * item.qty).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={addItem} className="text-xs font-bold text-brand-red uppercase hover:underline">+ Add Item</button>
                </div>

                <div className="flex justify-end border-t border-black/10 pt-6">
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase text-black/50 mb-1">Total Amount</div>
                    <div className="text-4xl font-heading font-bold text-brand-black">RM {calculateInvoiceTotal(editingInvoice.items).toLocaleString('en-MY', { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-black/5 no-print">
                  <button onClick={() => deleteInvoice(editingInvoice.id)} className="text-red-500 text-xs font-bold uppercase hover:underline">Delete Invoice</button>
                  <button onClick={() => window.print()} className="bg-brand-black text-white px-6 py-2 rounded font-bold uppercase text-sm hover:brightness-110">
                    Print / PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-black/30 text-sm font-medium">Select or create an invoice</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
