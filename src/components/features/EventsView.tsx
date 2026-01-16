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
  return date.toISOString().slice(0, 16);
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

export function EventsView({
  data,
  setData,
  selectedEventId,
  setSelectedEventId,
}: EventsViewProps) {
  const selectedEvent = data.events.find((event) => event.id === selectedEventId);

  const handleCreate = () => {
    const next = createEvent(data.events.length + 1);
    setData((prev) => ({ ...prev, events: [...prev.events, next] }));
    setSelectedEventId(next.id);
  };

  const handleQuickSetup = () => {
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

  if (!selectedEvent) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
          Events
        </div>
        <p className="text-sm text-black/60">Add your first event.</p>
        <button
          onClick={handleCreate}
          className="mt-3 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20"
        >
          Add Event
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Event Pipeline
          </div>
          <div className="text-lg font-semibold text-black">
            {selectedEvent.title}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreate}
            className="rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase text-black/70 hover:border-black/20"
          >
            Add
          </button>
          <button
            onClick={handleQuickSetup}
            className="rounded-md border border-black/10 bg-[#fff3c4] px-3 py-2 text-xs font-semibold uppercase text-black/80 hover:border-black/20"
          >
            Quick Setup
          </button>
          <button
            onClick={handleRemove}
            className="rounded-md border border-[#e53935] bg-[#e53935] px-3 py-2 text-xs font-semibold uppercase text-white hover:bg-[#d32f2f]"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-black/70">
          Title
          <input
            value={selectedEvent.title}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, title: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>

        <label className="text-sm text-black/70">
          Location
          <input
            value={selectedEvent.location}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, location: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>

        <label className="text-sm text-black/70">
          Region
          <select
            value={selectedEvent.region}
            onChange={(event) => {
              const value = event.target.value as Event["region"];
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, region: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          >
            <option value="MY">MY</option>
            <option value="MY-SABAH">MY-SABAH</option>
            <option value="MY-SARAWAK">MY-SARAWAK</option>
            <option value="SG">SG</option>
            <option value="BN">BN</option>
          </select>
        </label>

        <label className="text-sm text-black/70">
          Status
          <select
            value={selectedEvent.status}
            onChange={(event) => {
              const value = event.target.value as EventStatus;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, status: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-black/70">
          Start Date
          <input
            type="datetime-local"
            value={toLocalInputValue(selectedEvent.startDate)}
            onChange={(event) => {
              const value = fromLocalInputValue(event.target.value);
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, startDate: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>

        <label className="text-sm text-black/70">
          End Date
          <input
            type="datetime-local"
            value={toLocalInputValue(selectedEvent.endDate)}
            onChange={(event) => {
              const value = fromLocalInputValue(event.target.value);
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, endDate: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-black/70">
          Fee Notes
          <input
            value={selectedEvent.feeNote ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, feeNote: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          Requirements
          <input
            value={selectedEvent.requirements ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id
                    ? { ...item, requirements: value }
                    : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4">
        <label className="text-sm text-black/70">
          Notes
          <textarea
            value={selectedEvent.notes ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                events: prev.events.map((item) =>
                  item.id === selectedEvent.id ? { ...item, notes: value } : item
                ),
              }));
            }}
            className="mt-1 min-h-[120px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
      </div>
    </section>
  );
}
