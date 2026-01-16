import { useMemo } from "react";
import type { BrandOSData, ContentPlan, HookTemplate } from "../../types";

interface TikTokViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedHook: HookTemplate | undefined;
  setSelectedHookId: (id: string) => void;
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
}

const createHook = (count: number): HookTemplate => ({
  id: `hook-${Date.now()}`,
  title: `Hook ${count}`,
  text: "",
  tags: [],
});

const createPlan = (eventId: string): ContentPlan => ({
  id: `plan-${Date.now()}`,
  eventId,
  date: new Date().toISOString(),
  hookIds: [],
  shotList: [],
  notes: "",
});

export function TikTokView({
  data,
  setData,
  selectedHook,
  setSelectedHookId,
  selectedEventId,
  setSelectedEventId,
}: TikTokViewProps) {
  const selectedEvent = data.events.find((event) => event.id === selectedEventId);
  const plan = useMemo(
    () => data.contentPlans.find((item) => item.eventId === selectedEventId),
    [data.contentPlans, selectedEventId]
  );

  const handleAddHook = () => {
    const next = createHook(data.hooks.length + 1);
    setData((prev) => ({ ...prev, hooks: [...prev.hooks, next] }));
    setSelectedHookId(next.id);
  };

  const handleRemoveHook = () => {
    if (!selectedHook) return;
    setData((prev) => ({
      ...prev,
      hooks: prev.hooks.filter((hook) => hook.id !== selectedHook.id),
      contentPlans: prev.contentPlans.map((item) =>
        item.hookIds.includes(selectedHook.id)
          ? { ...item, hookIds: item.hookIds.filter((id) => id !== selectedHook.id) }
          : item
      ),
    }));
  };

  const handleCreatePlan = () => {
    if (!selectedEvent) return;
    const next = createPlan(selectedEvent.id);
    setData((prev) => ({ ...prev, contentPlans: [...prev.contentPlans, next] }));
  };

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
            TikTok Content Engine
          </div>
          <div className="text-lg font-semibold text-black">
            {selectedEvent ? selectedEvent.title : "Select an event"}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddHook}
            className="rounded-md border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase text-black/70 hover:border-black/20"
          >
            Add Hook
          </button>
          <button
            onClick={handleRemoveHook}
            className="rounded-md border border-[#e53935] bg-[#e53935] px-3 py-2 text-xs font-semibold uppercase text-white hover:bg-[#d32f2f]"
            disabled={!selectedHook}
          >
            Remove Hook
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-black/70">
          Event
          <select
            value={selectedEventId}
            onChange={(event) => setSelectedEventId(event.target.value)}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
          >
            {data.events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </label>
        <div className="text-sm text-black/60">
          Select hooks from the sidebar and assign them to this event plan.
        </div>
      </div>

      {selectedHook && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-black/70">
            Hook Title
            <input
              value={selectedHook.title}
              onChange={(event) => {
                const value = event.target.value;
                setData((prev) => ({
                  ...prev,
                  hooks: prev.hooks.map((hook) =>
                    hook.id === selectedHook.id ? { ...hook, title: value } : hook
                  ),
                }));
              }}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
            />
          </label>
          <label className="text-sm text-black/70">
            Tags (comma separated)
            <input
              value={selectedHook.tags.join(", ")}
              onChange={(event) => {
                const value = event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean);
                setData((prev) => ({
                  ...prev,
                  hooks: prev.hooks.map((hook) =>
                    hook.id === selectedHook.id ? { ...hook, tags: value } : hook
                  ),
                }));
              }}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
            />
          </label>
        </div>
      )}

      {selectedHook && (
        <div className="mt-4">
          <label className="text-sm text-black/70">
            Hook Text
            <textarea
              value={selectedHook.text}
              onChange={(event) => {
                const value = event.target.value;
                setData((prev) => ({
                  ...prev,
                  hooks: prev.hooks.map((hook) =>
                    hook.id === selectedHook.id ? { ...hook, text: value } : hook
                  ),
                }));
              }}
              className="mt-1 min-h-[120px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
            />
          </label>
        </div>
      )}

      <div className="mt-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
          Event Content Plan
        </div>
        {!plan && (
          <button
            onClick={handleCreatePlan}
            className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20"
          >
            Create Plan
          </button>
        )}
        {plan && (
          <div className="space-y-4">
            <div className="rounded-md border border-black/10 p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                Hook Selection
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {data.hooks.map((hook) => (
                  <label
                    key={hook.id}
                    className="flex items-center gap-2 text-sm text-black/70"
                  >
                    <input
                      type="checkbox"
                      checked={plan.hookIds.includes(hook.id)}
                      onChange={(event) => {
                        const checked = event.target.checked;
                        setData((prev) => ({
                          ...prev,
                          contentPlans: prev.contentPlans.map((item) =>
                            item.id === plan.id
                              ? {
                                ...item,
                                hookIds: checked
                                  ? [...item.hookIds, hook.id]
                                  : item.hookIds.filter((id) => id !== hook.id),
                              }
                              : item
                          ),
                        }));
                      }}
                    />
                    {hook.title}
                  </label>
                ))}
              </div>
            </div>

            <label className="text-sm text-black/70">
              Shot List (one per line)
              <textarea
                value={plan.shotList.join("\n")}
                onChange={(event) => {
                  const value = event.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean);
                  setData((prev) => ({
                    ...prev,
                    contentPlans: prev.contentPlans.map((item) =>
                      item.id === plan.id ? { ...item, shotList: value } : item
                    ),
                  }));
                }}
                className="mt-1 min-h-[140px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
              />
            </label>

            <label className="text-sm text-black/70">
              Notes
              <textarea
                value={plan.notes ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  setData((prev) => ({
                    ...prev,
                    contentPlans: prev.contentPlans.map((item) =>
                      item.id === plan.id ? { ...item, notes: value } : item
                    ),
                  }));
                }}
                className="mt-1 min-h-[90px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
              />
            </label>
          </div>
        )}
      </div>
    </section>
  );
}
