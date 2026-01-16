import type { BrandOSData } from "../../types";
import { exportEventPack, exportJson, exportMarkdown, exportTikTokPack } from "../../lib/exporters";
import type { Tab } from "../layout/Sidebar";

interface ExportsViewProps {
    activeTab: Tab;
    data: BrandOSData;
    selectedEventId: string;
}

export function ExportsView({ activeTab, data, selectedEventId }: ExportsViewProps) {
    if (activeTab !== "Exports") return null;
    const selectedEvent = data.events.find((event) => event.id === selectedEventId);

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <button
                onClick={() => exportJson(data)}
                className="rounded-xl border border-black/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#e53935]"
            >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#e53935]">
                    JSON Export
                </div>
                <div className="mt-2 text-lg font-semibold">
                    abang-colek-brand-os.json
                </div>
                <p className="mt-1 text-sm text-black/60">
                    Includes full data + timestamp.
                </p>
            </button>
            <button
                onClick={() => exportMarkdown(data)}
                className="rounded-xl border border-black/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#e53935]"
            >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#e53935]">
                    Markdown Export
                </div>
                <div className="mt-2 text-lg font-semibold">
                    abang-colek-brand-os.md
                </div>
                <p className="mt-1 text-sm text-black/60">
                    Structured for quick sharing.
                </p>
            </button>

            <button
                onClick={() => exportEventPack(data, selectedEventId)}
                className="rounded-xl border border-black/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#e53935]"
                disabled={!selectedEvent}
            >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#e53935]">
                    Event Pack
                </div>
                <div className="mt-2 text-lg font-semibold">
                    {selectedEvent ? selectedEvent.title : "Select an event"}
                </div>
                <p className="mt-1 text-sm text-black/60">
                    Checklist + shot list + review.
                </p>
            </button>

            <button
                onClick={() => exportTikTokPack(data, selectedEventId)}
                className="rounded-xl border border-black/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#e53935]"
                disabled={!selectedEvent}
            >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#e53935]">
                    TikTok Pack
                </div>
                <div className="mt-2 text-lg font-semibold">
                    {selectedEvent ? selectedEvent.title : "Select an event"}
                </div>
                <p className="mt-1 text-sm text-black/60">
                    Hooks, captions, shot list.
                </p>
            </button>
        </div>
    );
}
