import { useEffect, useMemo, useRef, useState } from "react";
import { BrandProvider, useBrand } from "./context/BrandContext";
import { searchData, type SearchResult } from "./lib/search";
import type { BrandOSData } from "./types";
import { Header } from "./components/layout/Header";
import { Sidebar, type Tab } from "./components/layout/Sidebar";
import { ContentEditor } from "./components/features/ContentEditor";
import { LivePreview } from "./components/features/LivePreview";
import { ExportsView } from "./components/features/ExportsView";
import { EventsView } from "./components/features/EventsView";
import { BoothOpsView } from "./components/features/BoothOpsView";
import { TikTokView } from "./components/features/TikTokView";
import { ReviewsView } from "./components/features/ReviewsView";
import { DashboardView } from "./components/features/DashboardView";
import { WocsView } from "./components/features/WocsView";
import { LuckyDrawView } from "./components/features/LuckyDrawView";
import { LaunchCampaignView } from "./components/features/LaunchCampaignView";
import { UserGuideView } from "./components/features/UserGuideView";
import { MascotLibraryView } from "./components/features/MascotLibraryView";

const DARK_MODE_KEY = "abangColekDarkMode";

const buildCopyText = (label: string, content: string) =>
  `${label}\n\n${content}`.trim();

const buildTaglineText = (data: BrandOSData) => {
  const lines = [
    `Primary: ${data.tagline.primary}`,
    ...data.tagline.alternatives.map((alt) => `Alternative: ${alt}`),
  ];
  return lines.join("\n");
};

function BrandOS() {
  const {
    data,
    setData,
    warning,
    lastSavedAt,
    isSaving,
    resetData,
    hardResetData,
    importData,
    addManifesto,
    removeManifesto,
  } = useBrand();

  const [activeTab, setActiveTab] = useState<Tab>("Deck");

  // Local UI state for selections
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("");
  const [selectedSopId, setSelectedSopId] = useState("");
  const [selectedManifestoId, setSelectedManifestoId] = useState<string>("tagline");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedHookId, setSelectedHookId] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useMemo(
    () => searchData(data, searchQuery),
    [data, searchQuery]
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    return saved === "true";
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Selection safety checks - executed during render or via specific effects cautiously
  // We use effects here to sync selection if the underlying data disappears
  // But strictly avoiding the set-state-during-render warning pattern

  useEffect(() => {
    if (data.deck.length > 0 && !data.deck.find((slide) => slide.id === selectedDeckId)) {
      setSelectedDeckId(data.deck[0].id);
    } else if (data.deck.length === 0 && selectedDeckId !== "") {
      setSelectedDeckId("");
    }
  }, [data.deck, selectedDeckId]);

  useEffect(() => {
    if (data.song.length > 0 && !data.song.find((s) => s.id === selectedSongId)) {
      setSelectedSongId(data.song[0].id);
    } else if (data.song.length === 0 && selectedSongId !== "") {
      setSelectedSongId("");
    }
  }, [data.song, selectedSongId]);

  useEffect(() => {
    if (data.sop.length > 0 && !data.sop.find((s) => s.id === selectedSopId)) {
      setSelectedSopId(data.sop[0].id);
    } else if (data.sop.length === 0 && selectedSopId !== "") {
      setSelectedSopId("");
    }
  }, [data.sop, selectedSopId]);

  useEffect(() => {
    if (selectedManifestoId !== "tagline" && !data.manifesto.find((m) => m.id === selectedManifestoId)) {
      setSelectedManifestoId("tagline");
    }
  }, [data.manifesto, selectedManifestoId]);

  useEffect(() => {
    if (data.events.length > 0 && !data.events.find((e) => e.id === selectedEventId)) {
      setSelectedEventId(data.events[0].id);
    } else if (data.events.length === 0 && selectedEventId !== "") {
      setSelectedEventId("");
    }
  }, [data.events, selectedEventId]);

  useEffect(() => {
    if (data.hooks.length > 0 && !data.hooks.find((h) => h.id === selectedHookId)) {
      setSelectedHookId(data.hooks[0].id);
    } else if (data.hooks.length === 0 && selectedHookId !== "") {
      setSelectedHookId("");
    }
  }, [data.hooks, selectedHookId]);

  // Derived selected items
  const selectedDeck = data.deck.find((slide) => slide.id === selectedDeckId);
  const selectedSong = data.song.find((section) => section.id === selectedSongId);
  const selectedSop = data.sop.find((item) => item.id === selectedSopId);
  const selectedManifesto =
    selectedManifestoId === "tagline"
      ? null
      : data.manifesto.find((variant) => variant.id === selectedManifestoId) ??
      null;
  const selectedEvent = data.events.find((event) => event.id === selectedEventId);
  const selectedHook = data.hooks.find((hook) => hook.id === selectedHookId);

  const editorTabs: Tab[] = ["Deck", "Song", "SOP", "Manifesto"];
  const isEditorTab = editorTabs.includes(activeTab);
  const canCopy = isEditorTab;

  const activeTitle = (() => {
    if (activeTab === "Deck") return selectedDeck?.title ?? "";
    if (activeTab === "Song") return selectedSong?.title ?? "";
    if (activeTab === "SOP") return selectedSop?.title ?? "";
    if (activeTab === "Manifesto") {
      return selectedManifestoId === "tagline"
        ? "Tagline"
        : selectedManifesto?.title ?? "";
    }
    return "";
  })();

  const activeContent = (() => {
    if (activeTab === "Deck") return selectedDeck?.body ?? "";
    if (activeTab === "Song") return selectedSong?.content ?? "";
    if (activeTab === "SOP") return selectedSop?.content ?? "";
    if (activeTab === "Manifesto") {
      if (selectedManifestoId === "tagline") {
        return buildTaglineText(data);
      }
      return selectedManifesto?.content ?? "";
    }
    return "";
  })();

  const handleSearchNavigate = (result: SearchResult) => {
    setActiveTab(result.tab);
    if (result.tab === "Deck") setSelectedDeckId(result.id);
    if (result.tab === "Song") setSelectedSongId(result.id);
    if (result.tab === "SOP") setSelectedSopId(result.id);
    if (result.tab === "Manifesto") setSelectedManifestoId(result.id);
    setSearchQuery("");
  };

  const handleCopySelected = async () => {
    if (activeTab === "Exports") return;
    const label = activeTitle;
    const content = activeContent;
    const text =
      activeTab === "Manifesto" && selectedManifestoId === "tagline"
        ? content
        : buildCopyText(label, content);
    await navigator.clipboard.writeText(text);
  };

  const handleCopySection = async () => {
    let text = "";
    if (activeTab === "Deck") {
      text = data.deck
        .map((slide, index) =>
          buildCopyText(`Slide ${index + 1} - ${slide.title}`, slide.body)
        )
        .join("\n\n");
    }
    if (activeTab === "Song") {
      text = data.song
        .map((section) => buildCopyText(section.title, section.content))
        .join("\n\n");
    }
    if (activeTab === "SOP") {
      text = data.sop
        .map((item) => buildCopyText(item.title, item.content))
        .join("\n\n");
    }
    if (activeTab === "Manifesto") {
      const parts = [
        buildCopyText("Tagline", buildTaglineText(data)),
        ...data.manifesto.map((variant) =>
          buildCopyText(variant.title, variant.content)
        ),
      ];
      text = parts.join("\n\n");
    }
    if (activeTab === "Exports") return;
    await navigator.clipboard.writeText(text);
  };

  const handleAddBtn = () => {
    addManifesto();
    // Auto-select the new manifesto is tricky without knowing its ID synchronously
    // but in the context we generate ID.
    // For now, we rely on user clicking it, or we could improve the context to return the ID.
  };

  const handleRemoveBtn = () => {
    if (selectedManifestoId === "tagline") return;
    removeManifesto(selectedManifestoId, (nextId) => setSelectedManifestoId(nextId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7b500] via-[#ffd86b] to-[#fff1b8] text-[#111111]">
      <Header
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        onSearchNavigate={handleSearchNavigate}
        onReset={resetData}
        onHardReset={hardResetData}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onImportData={importData}
        searchInputRef={searchInputRef}
      />

      {warning && (
        <div className="bg-[#fff3c4] px-6 py-3 text-sm text-black/80">
          {warning}
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {([
            "Deck",
            "Song",
            "SOP",
            "Manifesto",
            "Events",
            "Booth",
            "TikTok",
            "Reviews",
            "Dashboard",
            "WOCS",
            "Marketing",
            "Launch",
            "Guide",
            "Assets",
            "Exports",
          ] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === tab
                ? "border-[#e53935] bg-[#e53935] text-white"
                : "border-black/10 bg-white text-black/70 hover:border-black/20"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <Sidebar
            activeTab={activeTab}
            data={data}
            selectedDeckId={selectedDeckId}
            setSelectedDeckId={setSelectedDeckId}
            selectedSongId={selectedSongId}
            setSelectedSongId={setSelectedSongId}
            selectedSopId={selectedSopId}
            setSelectedSopId={setSelectedSopId}
            selectedManifestoId={selectedManifestoId}
            setSelectedManifestoId={setSelectedManifestoId}
            onAddManifesto={handleAddBtn}
            onRemoveManifesto={handleRemoveBtn}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            selectedHookId={selectedHookId}
            setSelectedHookId={setSelectedHookId}
          />

          <main className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopySelected}
                className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20 disabled:opacity-50"
                disabled={!canCopy}
              >
                Copy Item
              </button>
              <button
                onClick={handleCopySection}
                className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/70 hover:border-black/20 disabled:opacity-50"
                disabled={!canCopy}
              >
                Copy Section
              </button>
              {activeTab === "Exports" && (
                <div className="text-sm text-black/60">
                  Use export buttons below.
                </div>
              )}
            </div>

            <ExportsView
              activeTab={activeTab}
              data={data}
              selectedEventId={selectedEventId}
            />

            {isEditorTab && (
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <ContentEditor
                  activeTab={activeTab}
                  activeTitle={activeTitle}
                  activeContent={activeContent}
                  data={data}
                  setData={setData}
                  selectedDeck={selectedDeck}
                  selectedSong={selectedSong}
                  selectedSop={selectedSop}
                  selectedManifesto={selectedManifesto}
                  selectedManifestoId={selectedManifestoId}
                />

                <LivePreview
                  activeTab={activeTab}
                  activeTitle={activeTitle}
                  activeContent={activeContent}
                />
              </div>
            )}

            {activeTab === "Events" && (
              <EventsView
                data={data}
                setData={setData}
                selectedEventId={selectedEventId}
                setSelectedEventId={setSelectedEventId}
              />
            )}

            {activeTab === "Booth" && (
              <BoothOpsView
                data={data}
                setData={setData}
                selectedEventId={selectedEventId}
              />
            )}

            {activeTab === "TikTok" && (
              <TikTokView
                data={data}
                setData={setData}
                selectedHook={selectedHook}
                setSelectedHookId={setSelectedHookId}
                selectedEventId={selectedEventId}
                setSelectedEventId={setSelectedEventId}
              />
            )}

            {activeTab === "Reviews" && (
              <ReviewsView
                data={data}
                setData={setData}
                selectedEventId={selectedEventId}
              />
            )}

            {activeTab === "Dashboard" && (
              <DashboardView data={data} selectedEvent={selectedEvent} />
            )}

            {activeTab === "WOCS" && (
              <WocsView data={data} />
            )}

            {activeTab === "Marketing" && (
              <LuckyDrawView data={data} setData={setData} />
            )}

            {activeTab === "Launch" && (
              <LaunchCampaignView data={data} setData={setData} />
            )}

            {activeTab === "Guide" && (
              <UserGuideView data={data} />
            )}

            {activeTab === "Assets" && (
              <MascotLibraryView />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrandProvider>
      <BrandOS />
    </BrandProvider>
  )
}

export default App;
