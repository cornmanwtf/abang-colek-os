import type { BrandOSData, Event } from "../../types";

interface DashboardViewProps {
  data: BrandOSData;
  selectedEvent: Event | undefined;
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString();
};

export function DashboardView({ data, selectedEvent }: DashboardViewProps) {
  const totalEvents = data.events.length;
  const confirmedEvents = data.events.filter((event) => event.status === "confirmed").length;
  const hooksCount = data.hooks.length;
  const reviewsCount = data.postEventReviews.length;
  const selectedReview = data.postEventReviews.find(
    (review) => review.eventId === selectedEvent?.id
  );
  const totalViews = data.postEventReviews.reduce(
    (sum, review) => sum + (review.tiktokViews || 0),
    0
  );

  const nextEvent = [...data.events]
    .filter((event) => event.startDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

  const upcomingEvents = [...data.events]
    .filter((event) => event.startDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const selectedChecklist = data.boothChecklists.find(
    (item) => item.eventId === selectedEvent?.id
  );
  const selectedPlan = data.contentPlans.find(
    (item) => item.eventId === selectedEvent?.id
  );
  const checklistDone = selectedChecklist
    ? selectedChecklist.items.filter((item) => item.done).length
    : 0;
  const checklistTotal = selectedChecklist ? selectedChecklist.items.length : 0;

  return (
    <section className="space-y-4">
      <div className="grid gap-4 md:grid-cols-6 auto-rows-[140px]">
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Total Events
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {totalEvents}
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Confirmed
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {confirmedEvents}
          </div>
        </div>
        <div className="md:col-span-1 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Hook Bank
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {hooksCount}
          </div>
        </div>
        <div className="md:col-span-1 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Reviews Logged
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {reviewsCount}
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Total TikTok Views
          </div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {totalViews}
          </div>
        </div>
        <div className="md:col-span-4 md:row-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Event Pipeline
          </div>
          <div className="mt-3 space-y-3">
            {upcomingEvents.length === 0 && (
              <div className="text-sm text-black/60">No upcoming events.</div>
            )}
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-black/5 bg-[#fff3c4] px-3 py-2"
              >
                <div>
                  <div className="text-sm font-semibold text-black">
                    {event.title}
                  </div>
                  <div className="text-xs text-black/60">
                    {event.location} · {formatDate(event.startDate)}
                  </div>
                </div>
                <div className="text-xs font-semibold uppercase text-[#e53935]">
                  {event.status}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Booth Ops
          </div>
          <div className="mt-2 text-sm text-black/70">
            Checklist: {checklistDone}/{checklistTotal}
          </div>
          <div className="mt-2 text-xs text-black/60">
            {selectedChecklist ? "Linked to selected event." : "No checklist yet."}
          </div>
        </div>
        <div className="md:col-span-2 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            TikTok Engine
          </div>
          <div className="mt-2 text-sm text-black/70">
            Shots: {selectedPlan ? selectedPlan.shotList.length : 0}
          </div>
          <div className="mt-2 text-xs text-black/60">
            {selectedPlan ? "Plan ready for selected event." : "No plan yet."}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Next Event
          </div>
          <div className="mt-2 text-lg font-semibold text-black">
            {nextEvent ? nextEvent.title : "No upcoming event"}
          </div>
          {nextEvent && (
            <div className="text-sm text-black/60">
              {nextEvent.location} · {formatDate(nextEvent.startDate)}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            Selected Event Snapshot
          </div>
          {selectedEvent ? (
            <>
              <div className="mt-2 text-lg font-semibold text-black">
                {selectedEvent.title}
              </div>
              <div className="mt-1 text-sm text-black/60">
                {selectedEvent.location} · {selectedEvent.status}
              </div>
              <div className="mt-3 grid gap-2 text-sm text-black/70">
                <div>Start: {formatDate(selectedEvent.startDate)}</div>
                <div>End: {formatDate(selectedEvent.endDate)}</div>
                <div>Region: {selectedEvent.region}</div>
                {selectedReview && (
                  <div>
                    TikTok: {selectedReview.tiktokViews} views · {selectedReview.watchTimeSeconds}s watch time
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="mt-2 text-sm text-black/60">
              Select an event to view details.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
