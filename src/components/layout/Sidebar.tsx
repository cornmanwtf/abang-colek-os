import type { BrandOSData } from "../../types";

export type Tab =
    | "Deck"
    | "Song"
    | "SOP"
    | "Manifesto"
    | "Exports"
    | "Events"
    | "Booth"
    | "TikTok"
    | "Reviews"
    | "Dashboard";

interface SidebarProps {
    activeTab: Tab;
    data: BrandOSData;
    selectedDeckId: string;
    setSelectedDeckId: (id: string) => void;
    selectedSongId: string;
    setSelectedSongId: (id: string) => void;
    selectedSopId: string;
    setSelectedSopId: (id: string) => void;
    selectedManifestoId: string;
    setSelectedManifestoId: (id: string) => void;
    onAddManifesto: () => void;
    onRemoveManifesto: () => void;
    selectedEventId: string;
    setSelectedEventId: (id: string) => void;
    selectedHookId: string;
    setSelectedHookId: (id: string) => void;
}

export function Sidebar({
    activeTab,
    data,
    selectedDeckId,
    setSelectedDeckId,
    selectedSongId,
    setSelectedSongId,
    selectedSopId,
    setSelectedSopId,
    selectedManifestoId,
    setSelectedManifestoId,
    onAddManifesto,
    onRemoveManifesto,
    selectedEventId,
    setSelectedEventId,
    selectedHookId,
    setSelectedHookId,
}: SidebarProps) {
    return (
        <aside className="rounded-xl border border-black/10 bg-white p-4">
            {activeTab === "Deck" && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Slides
                    </div>
                    <div className="space-y-1">
                        {data.deck.map((slide, index) => (
                            <button
                                key={slide.id}
                                onClick={() => setSelectedDeckId(slide.id)}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedDeckId === slide.id
                                    ? "bg-[#111111] text-[#f7b500]"
                                    : "hover:bg-[#fff3c4]"
                                    }`}
                            >
                                <div className="text-xs text-[#e53935]">Slide {index + 1}</div>
                                <div className="font-medium">{slide.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "Song" && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Sections
                    </div>
                    {data.song.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setSelectedSongId(section.id)}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedSongId === section.id
                                ? "bg-[#111111] text-[#f7b500]"
                                : "hover:bg-[#fff3c4]"
                                }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            )}

            {activeTab === "SOP" && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Content Days
                    </div>
                    {data.sop.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedSopId(item.id)}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedSopId === item.id
                                ? "bg-[#111111] text-[#f7b500]"
                                : "hover:bg-[#fff3c4]"
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            )}

            {activeTab === "Manifesto" && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                            Variants
                        </div>
                        <button
                            onClick={onAddManifesto}
                            className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold uppercase text-black/70 hover:border-black/20"
                        >
                            Add
                        </button>
                    </div>
                    <button
                        onClick={() => setSelectedManifestoId("tagline")}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedManifestoId === "tagline"
                            ? "bg-[#111111] text-[#f7b500]"
                            : "hover:bg-[#fff3c4]"
                            }`}
                    >
                        Tagline
                    </button>
                    {data.manifesto.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => setSelectedManifestoId(variant.id)}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedManifestoId === variant.id
                                ? "bg-[#111111] text-[#f7b500]"
                                : "hover:bg-[#fff3c4]"
                                }`}
                        >
                            {variant.title}
                        </button>
                    ))}
                    <button
                        onClick={onRemoveManifesto}
                        disabled={selectedManifestoId === "tagline"}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-xs font-semibold uppercase text-black/70 hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Remove Selected
                    </button>
                </div>
            )}

            {["Events", "Booth", "Reviews", "Dashboard"].includes(activeTab) && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Events
                    </div>
                    <div className="space-y-1">
                        {data.events.map((event) => (
                            <button
                                key={event.id}
                                onClick={() => setSelectedEventId(event.id)}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedEventId === event.id
                                    ? "bg-[#111111] text-[#f7b500]"
                                    : "hover:bg-[#fff3c4]"
                                    }`}
                            >
                                <div className="text-xs text-[#e53935]">{event.status}</div>
                                <div className="font-medium">{event.title}</div>
                                <div className="text-xs text-black/60">{event.location}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "TikTok" && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Hook Bank
                    </div>
                    <div className="space-y-1">
                        {data.hooks.map((hook) => (
                            <button
                                key={hook.id}
                                onClick={() => setSelectedHookId(hook.id)}
                                className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedHookId === hook.id
                                    ? "bg-[#111111] text-[#f7b500]"
                                    : "hover:bg-[#fff3c4]"
                                    }`}
                            >
                                <div className="text-xs text-[#e53935]">{hook.tags.join(", ")}</div>
                                <div className="font-medium">{hook.title}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "Exports" && (
                <div className="space-y-2 text-sm text-black/60">
                    <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Export
                    </div>
                    <p>Download the full Brand OS as JSON or Markdown.</p>
                </div>
            )}
        </aside>
    );
}
