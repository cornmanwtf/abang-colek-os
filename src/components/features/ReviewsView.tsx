import type { BrandOSData, PostEventReview } from "../../types";

interface ReviewsViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedEventId: string;
}

const createReview = (eventId: string): PostEventReview => ({
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

export function ReviewsView({ data, setData, selectedEventId }: ReviewsViewProps) {
  const event = data.events.find((item) => item.id === selectedEventId);
  const review = data.postEventReviews.find(
    (item) => item.eventId === selectedEventId
  );

  const handleCreate = () => {
    if (!event) return;
    const next = createReview(event.id);
    setData((prev) => ({
      ...prev,
      postEventReviews: [...prev.postEventReviews, next],
    }));
  };

  if (!event) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <div className="text-sm text-black/60">
          Select an event to review.
        </div>
      </section>
    );
  }

  if (!review) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
          Post-Event Review
        </div>
        <div className="text-sm text-black/60">
          No review yet for {event.title}.
        </div>
        <button
          onClick={handleCreate}
          className="mt-3 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20"
        >
          Create Review
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
          Post-Event Review
        </div>
        <div className="text-lg font-semibold text-black">{event.title}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-black/70">
          Sales Note
          <input
            value={review.salesNote}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, salesNote: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          Crowd Note
          <input
            value={review.crowdNote}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, crowdNote: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          Top Hook
          <input
            value={review.topHook}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, topHook: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          Issue Note
          <input
            value={review.issueNote}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, issueNote: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          TikTok Views
          <input
            type="number"
            value={review.tiktokViews}
            onChange={(event) => {
              const value = Number(event.target.value) || 0;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, tiktokViews: value } : item
                ),
              }));
            }}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          />
        </label>
        <label className="text-sm text-black/70">
          Watch Time (seconds)
          <input
            type="number"
            value={review.watchTimeSeconds}
            onChange={(event) => {
              const value = Number(event.target.value) || 0;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id
                    ? { ...item, watchTimeSeconds: value }
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
          Next Action
          <textarea
            value={review.nextAction}
            onChange={(event) => {
              const value = event.target.value;
              setData((prev) => ({
                ...prev,
                postEventReviews: prev.postEventReviews.map((item) =>
                  item.id === review.id ? { ...item, nextAction: value } : item
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
