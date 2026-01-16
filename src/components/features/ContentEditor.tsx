import type { BrandOSData, DeckSlide, ManifestoVariant, SongSection, SopItem } from "../../types";
import type { Tab } from "../layout/Sidebar";

interface ContentEditorProps {
    activeTab: Tab;
    activeTitle: string;
    activeContent: string;
    data: BrandOSData;
    setData: React.Dispatch<React.SetStateAction<BrandOSData>>;
    selectedDeck: DeckSlide | undefined;
    selectedSong: SongSection | undefined;
    selectedSop: SopItem | undefined;
    selectedManifesto: ManifestoVariant | null;
    selectedManifestoId: string;
}

export function ContentEditor({
    activeTab,
    activeTitle,
    activeContent,
    data,
    setData,
    selectedDeck,
    selectedSong,
    selectedSop,
    selectedManifesto,
    selectedManifestoId,
}: ContentEditorProps) {
    if (activeTab === "Exports") return null;

    return (
        <section className="rounded-xl border border-black/10 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-black/50">
                    Editor
                </div>
                <div className="text-xs text-black/60">{activeTitle}</div>
            </div>

            {activeTab === "Manifesto" && selectedManifestoId === "tagline" ? (
                <div className="space-y-3">
                    <label htmlFor="primary-tagline" className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Primary Tagline
                    </label>
                    <input
                        id="primary-tagline"
                        value={data.tagline.primary}
                        onChange={(event) =>
                            setData((prev) => ({
                                ...prev,
                                tagline: {
                                    ...prev.tagline,
                                    primary: event.target.value,
                                },
                            }))
                        }
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
                    />
                    <label htmlFor="tagline-alternatives" className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Alternatives (one per line)
                    </label>
                    <textarea
                        id="tagline-alternatives"
                        value={data.tagline.alternatives.join("\n")}
                        onChange={(event) =>
                            setData((prev) => ({
                                ...prev,
                                tagline: {
                                    ...prev.tagline,
                                    alternatives: event.target.value
                                        .split("\n")
                                        .map((line) => line.trim())
                                        .filter(Boolean),
                                },
                            }))
                        }
                        className="min-h-[180px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
                    />
                </div>
            ) : (
                <div className="space-y-3">
                    <label htmlFor="content-title" className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Title
                    </label>
                    <input
                        id="content-title"
                        value={activeTitle}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (activeTab === "Deck" && selectedDeck) {
                                setData((prev) => ({
                                    ...prev,
                                    deck: prev.deck.map((slide) =>
                                        slide.id === selectedDeck.id
                                            ? { ...slide, title: value }
                                            : slide
                                    ),
                                }));
                            }
                            if (activeTab === "Song" && selectedSong) {
                                setData((prev) => ({
                                    ...prev,
                                    song: prev.song.map((section) =>
                                        section.id === selectedSong.id
                                            ? { ...section, title: value }
                                            : section
                                    ),
                                }));
                            }
                            if (activeTab === "SOP" && selectedSop) {
                                setData((prev) => ({
                                    ...prev,
                                    sop: prev.sop.map((item) =>
                                        item.id === selectedSop.id
                                            ? { ...item, title: value }
                                            : item
                                    ),
                                }));
                            }
                            if (activeTab === "Manifesto" && selectedManifesto) {
                                setData((prev) => ({
                                    ...prev,
                                    manifesto: prev.manifesto.map((variant) =>
                                        variant.id === selectedManifesto.id
                                            ? { ...variant, title: value }
                                            : variant
                                    ),
                                }));
                            }
                        }}
                        className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
                    />
                    <label htmlFor="content-body" className="text-xs font-semibold uppercase tracking-wide text-black/50">
                        Content
                    </label>
                    <textarea
                        id="content-body"
                        value={activeContent}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (activeTab === "Deck" && selectedDeck) {
                                setData((prev) => ({
                                    ...prev,
                                    deck: prev.deck.map((slide) =>
                                        slide.id === selectedDeck.id
                                            ? { ...slide, body: value }
                                            : slide
                                    ),
                                }));
                            }
                            if (activeTab === "Song" && selectedSong) {
                                setData((prev) => ({
                                    ...prev,
                                    song: prev.song.map((section) =>
                                        section.id === selectedSong.id
                                            ? { ...section, content: value }
                                            : section
                                    ),
                                }));
                            }
                            if (activeTab === "SOP" && selectedSop) {
                                setData((prev) => ({
                                    ...prev,
                                    sop: prev.sop.map((item) =>
                                        item.id === selectedSop.id
                                            ? { ...item, content: value }
                                            : item
                                    ),
                                }));
                            }
                            if (activeTab === "Manifesto" && selectedManifesto) {
                                setData((prev) => ({
                                    ...prev,
                                    manifesto: prev.manifesto.map((variant) =>
                                        variant.id === selectedManifesto.id
                                            ? { ...variant, content: value }
                                            : variant
                                    ),
                                }));
                            }
                        }}
                        className="min-h-[320px] w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#e53935] focus:outline-none"
                    />
                </div>
            )}
        </section>
    );
}
