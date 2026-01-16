import { useState } from "react";
import type { BrandOSData, BoothChecklist } from "../../types";

interface BoothOpsViewProps {
  data: BrandOSData;
  setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
  selectedEventId: string;
}

const createChecklist = (eventId: string): BoothChecklist => ({
  id: `booth-${Date.now()}`,
  eventId,
  items: [],
  notes: "",
});

export function BoothOpsView({
  data,
  setData,
  selectedEventId,
}: BoothOpsViewProps) {
  const [newItemLabel, setNewItemLabel] = useState("");
  const event = data.events.find((item) => item.id === selectedEventId);
  const checklist = data.boothChecklists.find(
    (item) => item.eventId === selectedEventId
  );

  const handleCreateChecklist = () => {
    if (!event) return;
    const next = createChecklist(event.id);
    setData((prev) => ({
      ...prev,
      boothChecklists: [...prev.boothChecklists, next],
    }));
  };

  const handleToggleItem = (id: string) => {
    if (!checklist) return;
    setData((prev) => ({
      ...prev,
      boothChecklists: prev.boothChecklists.map((list) =>
        list.id === checklist.id
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
              ),
            }
          : list
      ),
    }));
  };

  const handleToggleRequired = (id: string) => {
    if (!checklist) return;
    setData((prev) => ({
      ...prev,
      boothChecklists: prev.boothChecklists.map((list) =>
        list.id === checklist.id
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === id ? { ...item, required: !item.required } : item
              ),
            }
          : list
      ),
    }));
  };

  const handleAddItem = () => {
    if (!checklist || !newItemLabel.trim()) return;
    const item = {
      id: `booth-item-${Date.now()}`,
      label: newItemLabel.trim(),
      required: true,
      done: false,
    };
    setData((prev) => ({
      ...prev,
      boothChecklists: prev.boothChecklists.map((list) =>
        list.id === checklist.id
          ? { ...list, items: [...list.items, item] }
          : list
      ),
    }));
    setNewItemLabel("");
  };

  if (!event) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <div className="text-sm text-black/60">
          Select an event to manage booth ops.
        </div>
      </section>
    );
  }

  if (!checklist) {
    return (
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
          Booth Ops
        </div>
        <div className="text-sm text-black/60">
          No checklist yet for {event.title}.
        </div>
        <button
          onClick={handleCreateChecklist}
          className="mt-3 rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20"
        >
          Create Checklist
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4">
      <div className="mb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
          Booth Ops Checklist
        </div>
        <div className="text-lg font-semibold text-black">{event.title}</div>
      </div>

      <div className="space-y-2">
        {checklist.items.length === 0 && (
          <div className="text-sm text-black/60">
            Add items to start your checklist.
          </div>
        )}
        {checklist.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md border border-black/10 px-3 py-2"
          >
            <div>
              <div className="text-sm font-medium text-black">
                {item.label}
              </div>
              <div className="text-xs text-black/60">
                {item.required ? "Required" : "Optional"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleRequired(item.id)}
                className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold text-black/70 hover:border-black/20"
              >
                Toggle Required
              </button>
              <button
                onClick={() => handleToggleItem(item.id)}
                className={`rounded-md px-2 py-1 text-xs font-semibold ${item.done
                  ? "bg-[#e6f6d9] text-[#1f7a1f]"
                  : "bg-[#fff3c4] text-black/70"
                  }`}
              >
                {item.done ? "Done" : "Todo"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={newItemLabel}
          onChange={(event) => setNewItemLabel(event.target.value)}
          placeholder="Add checklist item"
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
        />
        <button
          onClick={handleAddItem}
          className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20"
        >
          Add
        </button>
      </div>
    </section>
  );
}
