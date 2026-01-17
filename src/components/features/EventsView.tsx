import { useState } from "react";
import type { BrandOSData, BoothChecklist, Event, EventStatus, PostEventReview } from "../../types";

interface EventsViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
}

const statusOptions: EventStatus[] = [
  "lead",
  "confirmed",
  "completed",
  "cancelled",
];

const toLocalInputValue = (iso: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60000;
  const localIso = new Date(date.getTime() - offset).toISOString().slice(0, 16);
  return localIso;
};

const fromLocalInputValue = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
};

const createEvent = (count: number): Event => ({
  id: `event-${Date.now()}`,
  title: `New Event ${count}`,
  location: "",
  region: "MY",
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  status: "lead",
  pnl: {
    revenue: 0,
    cogs: 0,
    expenses: { fee: 0, transport: 0, staff: 0, misc: 0 }
  },
  logistics: {
    travelDistanceKm: 0,
    prepDays: 1,
    crewCount: 3,
    vehicle: "van"
  },
  eoContact: { name: "", phone: "", company: "" }
});

const createDefaultChecklist = (eventId: string): BoothChecklist => ({
  id: `booth-${Date.now()}`,
  eventId,
  items: [
    { id: `booth-${Date.now()}-1`, label: "Canopy + side walls", required: true, done: false },
    { id: `booth-${Date.now()}-2`, label: "Signage + menu board", required: true, done: false },
    { id: `booth-${Date.now()}-3`, label: "Cooking setup + gas", required: true, done: false },
    { id: `booth-${Date.now()}-4`, label: "Packaging + gloves", required: true, done: false },
  ],
  notes: "Auto-generated checklist",
});

const createDefaultPlan = (eventId: string) => ({
  id: `plan-${Date.now()}`,
  eventId,
  date: new Date().toISOString(),
  hookIds: [],
  shotList: [
    "Crowd line + sizzling sound",
    "First bite reaction close-up",
    "Founder shoutout CTA",
  ],
  notes: "Auto-generated plan",
});

const createDefaultReview = (eventId: string): PostEventReview => ({
  id: `review-${Date.now()}`,
  eventId,
  salesNote: "",
  crowdNote: "",
  topHook: "",
  issueNote: "",
  nextAction: "",
  tiktokViews: 0,
  watchTimeSeconds: 0,
  createdAt: new Date().toISOString(),
});

type EventTab = "Details" | "Logistics" | "PnL";

export function EventsView({
  data,
  setData,
  selectedEventId,
  setSelectedEventId,
}: EventsViewProps) {
  const selectedEvent = data.events.find((event) => event.id === selectedEventId);
  const [activeTab, setActiveTab] = useState<EventTab>("Details");

  const handleCreate = () => {
    const next = createEvent(data.events.length + 1);
    setData((prev) => ({ ...prev, events: [...prev.events, next] }));
    setSelectedEventId(next.id);
  };

  const _handleQuickSetup = () => {
    const next = createEvent(data.events.length + 1);
    const checklist = createDefaultChecklist(next.id);
    const plan = createDefaultPlan(next.id);
    const review = createDefaultReview(next.id);
    setData((prev) => ({
      ...prev,
      events: [...prev.events, next],
      boothChecklists: [...prev.boothChecklists, checklist],
      contentPlans: [...prev.contentPlans, plan],
      postEventReviews: [...prev.postEventReviews, review],
    }));
    setSelectedEventId(next.id);
  };

  const handleRemove = () => {
    if (!selectedEvent) return;
    if (!confirm("Are you sure? This will delete linked Data.")) return;

    setData((prev) => ({
      ...prev,
      events: prev.events.filter((event) => event.id !== selectedEvent.id),
      boothChecklists: prev.boothChecklists.filter(
        (item) => item.eventId !== selectedEvent.id
      ),
      contentPlans: prev.contentPlans.filter(
        (plan) => plan.eventId !== selectedEvent.id
      ),
      postEventReviews: prev.postEventReviews.filter(
        (review) => review.eventId !== selectedEvent.id
      ),
    }));
  };

  const updateEvent = (updates: Partial<Event>) => {
    if (!selectedEvent) return;
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === selectedEvent.id ? { ...e, ...updates } : e)
    }));
  };

  if (!selectedEvent) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-6 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
          Events Pipeline
        </div>
        <p className="text-sm text-black/60 mb-4">No event selected. Create one to get started.</p>
        <button
          onClick={handleCreate}
          className="rounded-md bg-brand-red px-4 py-2 text-sm font-bold text-white shadow-sm hover:brightness-110"
        >
          Add First Event
        </button>
      </section>
    );
  }

  // PnL Calcs
  const pnl = selectedEvent.pnl || { revenue: 0, cogs: 0, expenses: { fee: 0, transport: 0, staff: 0, misc: 0 } };
  const totalExpenses = pnl.expenses.fee + pnl.expenses.transport + pnl.expenses.staff + pnl.expenses.misc;
  const netProfit = pnl.revenue - pnl.cogs - totalExpenses;
  const profitMargin = pnl.revenue > 0 ? ((netProfit / pnl.revenue) * 100).toFixed(1) : "0.0";

  return (
    <section className="rounded-xl border border-black/10 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="border-b border-black/5 bg-gray-50 p-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-black/40">Event Pipeline</div>
          <h2 className="text-xl font-heading font-bold text-brand-black leading-none mt-1">{selectedEvent.title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreate}
            className="px-3 py-1.5 text-xs font-bold uppercase rounded border border-black/10 bg-white hover:bg-gray-50 text-black/70"
          >
            Add New
          </button>
          <button
            onClick={handleRemove}
            className="px-3 py-1.5 text-xs font-bold uppercase rounded bg-red-100 text-red-700 hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/5 bg-white px-4 pt-2 gap-4">
        {(["Details", "Logistics", "PnL"] as EventTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab ? "border-brand-red text-brand-red" : "border-transparent text-black/50 hover:text-black/80"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "Details" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Event Title</label>
                <input
                  value={selectedEvent.title}
                  onChange={e => updateEvent({ title: e.target.value })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm font-medium focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Location / Venue</label>
                <input
                  value={selectedEvent.location}
                  onChange={e => updateEvent({ location: e.target.value })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Start & End Date</label>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={toLocalInputValue(selectedEvent.startDate)}
                    onChange={e => updateEvent({ startDate: fromLocalInputValue(e.target.value) })}
                    className="w-full rounded border border-black/10 px-2 py-2 text-sm focus:border-brand-gold focus:outline-none"
                  />
                  <input
                    type="datetime-local"
                    value={toLocalInputValue(selectedEvent.endDate)}
                    onChange={e => updateEvent({ endDate: fromLocalInputValue(e.target.value) })}
                    className="w-full rounded border border-black/10 px-2 py-2 text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-black/50 mb-1">Status</label>
                  <select
                    value={selectedEvent.status}
                    onChange={e => updateEvent({ status: e.target.value as EventStatus })}
                    className="w-full rounded border border-black/10 px-3 py-2 text-sm font-medium focus:border-brand-gold focus:outline-none bg-white"
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-black/50 mb-1">Region</label>
                  <select
                    value={selectedEvent.region}
                    onChange={e => updateEvent({ region: e.target.value as any })}
                    className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none bg-white"
                  >
                    <option value="MY">Peninsula</option>
                    <option value="MY-SABAH">Sabah</option>
                    <option value="MY-SARAWAK">Sarawak</option>
                    <option value="SG">Singapore</option>
                    <option value="BN">Brunei</option>
                  </select>
                </div>
              </div>

              {/* EO Contact */}
              <div className="rounded-lg bg-gray-50 p-3 border border-black/5">
                <label className="block text-xs font-bold uppercase text-black/40 mb-2">Event Organizer (EO)</label>
                <div className="space-y-2">
                  <input
                    placeholder="Details..."
                    value={selectedEvent.eoContact?.name ?? ""}
                    onChange={e => updateEvent({ eoContact: { ...selectedEvent.eoContact!, name: e.target.value } })}
                    className="w-full text-sm bg-transparent border-b border-black/10 focus:border-brand-black focus:outline-none px-1 py-1"
                  />
                  <input
                    placeholder="Phone..."
                    value={selectedEvent.eoContact?.phone ?? ""}
                    onChange={e => updateEvent({ eoContact: { ...selectedEvent.eoContact!, phone: e.target.value } })}
                    className="w-full text-sm bg-transparent border-b border-black/10 focus:border-brand-black focus:outline-none px-1 py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Logistics" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Travel Distance (KM)</label>
                <input
                  type="number"
                  value={selectedEvent.logistics?.travelDistanceKm || 0}
                  onChange={e => updateEvent({ logistics: { ...selectedEvent.logistics!, travelDistanceKm: Number(e.target.value) } })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Vehicle Type</label>
                <select
                  value={selectedEvent.logistics?.vehicle || "van"}
                  onChange={e => updateEvent({ logistics: { ...selectedEvent.logistics!, vehicle: e.target.value as any } })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none bg-white"
                >
                  <option value="van">Van</option>
                  <option value="4x4">4x4 Pickup</option>
                  <option value="lorry">Lorry</option>
                  <option value="car">Car</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Prep Days Required</label>
                <input
                  type="number"
                  value={selectedEvent.logistics?.prepDays || 0}
                  onChange={e => updateEvent({ logistics: { ...selectedEvent.logistics!, prepDays: Number(e.target.value) } })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-black/50 mb-1">Crew Count</label>
                <input
                  type="number"
                  value={selectedEvent.logistics?.crewCount || 0}
                  onChange={e => updateEvent({ logistics: { ...selectedEvent.logistics!, crewCount: Number(e.target.value) } })}
                  className="w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "PnL" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 rounded border border-green-100">
                <div className="text-xs text-green-800 font-bold uppercase">Revenue</div>
                <div className="text-xl font-bold text-green-700">RM {pnl.revenue.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-red-50 rounded border border-red-100">
                <div className="text-xs text-red-800 font-bold uppercase">Total Cost</div>
                <div className="text-xl font-bold text-red-700">RM {(pnl.cogs + totalExpenses).toFixed(2)}</div>
              </div>
              <div className={`p-3 rounded border ${netProfit > 0 ? "bg-blue-50 border-blue-100" : "bg-red-50 border-red-100"}`}>
                <div className="text-xs text-blue-800 font-bold uppercase">Net Profit</div>
                <div className={`text-xl font-bold ${netProfit > 0 ? "text-blue-700" : "text-red-700"}`}>RM {netProfit.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="text-xs text-gray-500 font-bold uppercase">Margin</div>
                <div className="text-xl font-bold text-gray-700">{profitMargin}%</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase border-b pb-2 mb-3">Income</h3>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">Total Revenue Sales</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.revenue}
                      onChange={e => updateEvent({ pnl: { ...pnl, revenue: Number(e.target.value) } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm font-medium"
                    />
                  </div>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase border-b pb-2 mb-3">Expenses</h3>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">COGS (Ingredients)</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.cogs}
                      onChange={e => updateEvent({ pnl: { ...pnl, cogs: Number(e.target.value) } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </label>
                <div className="h-px bg-gray-100 my-2"></div>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">Booth/Event Fee</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.expenses.fee}
                      onChange={e => updateEvent({ pnl: { ...pnl, expenses: { ...pnl.expenses, fee: Number(e.target.value) } } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </label>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">Transport & Fuel</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.expenses.transport}
                      onChange={e => updateEvent({ pnl: { ...pnl, expenses: { ...pnl.expenses, transport: Number(e.target.value) } } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </label>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">Staff Wages</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.expenses.staff}
                      onChange={e => updateEvent({ pnl: { ...pnl, expenses: { ...pnl.expenses, staff: Number(e.target.value) } } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </label>
                <label className="flex justify-between items-center mb-2">
                  <span className="text-sm">Misc / Other</span>
                  <div className="flex items-center">
                    <span className="mr-2 text-xs text-gray-400">RM</span>
                    <input
                      type="number"
                      value={pnl.expenses.misc}
                      onChange={e => updateEvent({ pnl: { ...pnl, expenses: { ...pnl.expenses, misc: Number(e.target.value) } } })}
                      className="w-24 text-right rounded border px-2 py-1 text-sm"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
