import { useEffect, useMemo, useRef, useState } from "react";
import { presetData } from "./preset";
import {
  clearBrandData,
  loadBrandData,
  saveBrandData,
} from "./lib/storage";
import { searchData, type SearchResult } from "./lib/search";
import type { BrandOSData, ManifestoVariant } from "./types";
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

const DARK_MODE_KEY = "abangColekDarkMode";

const AUTOSAVE_DEBOUNCE_MS = 500;

const buildCopyText = (label: string, content: string) =>
  `${label}\n\n${content}`.trim();

const buildTaglineText = (data: BrandOSData) => {
  const lines = [
    `Primary: ${data.tagline.primary}`,
    ...data.tagline.alternatives.map((alt) => `Alternative: ${alt}`),
  ];
  return lines.join("\n");
};

const createManifestoVariant = (count: number): ManifestoVariant => ({
  id: `manifesto-${Date.now()}`,
  title: `Variant ${count}`,
  content: "",
});

function App() {
  const loaded = useMemo(() => loadBrandData(presetData), []);
  const [data, setData] = useState<BrandOSData>(loaded.data);
  const [warning, setWarning] = useState<string | null>(loaded.warning);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(
    loaded.updatedAt
  );
  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>("Deck");
  const [selectedDeckId, setSelectedDeckId] = useState(
    loaded.data.deck[0]?.id ?? ""
  );
  const [selectedSongId, setSelectedSongId] = useState(
    loaded.data.song[0]?.id ?? ""
  );
  const [selectedSopId, setSelectedSopId] = useState(
    loaded.data.sop[0]?.id ?? ""
  );
  const [selectedManifestoId, setSelectedManifestoId] = useState<string>(
    "tagline"
  );
  const [selectedEventId, setSelectedEventId] = useState(
    loaded.data.events[0]?.id ?? ""
  );
  const [selectedHookId, setSelectedHookId] = useState(
    loaded.data.hooks[0]?.id ?? ""
  );

  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useMemo(
    () => searchData(data, searchQuery),
    [data, searchQuery]
  );

  const isFirstLoad = useRef(true);
  const saveTimer = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    return saved === "true";
  });

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
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape to clear search and blur
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    // Defer state update to avoid synchronous render
    queueMicrotask(() => setIsSaving(true));

    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
    }
    saveTimer.current = window.setTimeout(() => {
      const savedAt = saveBrandData(data);
      setLastSavedAt(savedAt);
      setIsSaving(false);
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimer.current) {
        window.clearTimeout(saveTimer.current);
      }
    };
  }, [data]);

  useEffect(() => {
    if (!data.deck.find((slide) => slide.id === selectedDeckId)) {
      queueMicrotask(() => setSelectedDeckId(data.deck[0]?.id ?? ""));
    }
  }, [data.deck, selectedDeckId]);

  useEffect(() => {
    if (!data.song.find((section) => section.id === selectedSongId)) {
      queueMicrotask(() => setSelectedSongId(data.song[0]?.id ?? ""));
    }
  }, [data.song, selectedSongId]);

  useEffect(() => {
    if (!data.sop.find((item) => item.id === selectedSopId)) {
      queueMicrotask(() => setSelectedSopId(data.sop[0]?.id ?? ""));
    }
  }, [data.sop, selectedSopId]);

  useEffect(() => {
    if (
      selectedManifestoId !== "tagline" &&
      !data.manifesto.find((variant) => variant.id === selectedManifestoId)
    ) {
      queueMicrotask(() => setSelectedManifestoId("tagline"));
    }
  }, [data.manifesto, selectedManifestoId]);

  useEffect(() => {
    if (!data.events.find((event) => event.id === selectedEventId)) {
      queueMicrotask(() => setSelectedEventId(data.events[0]?.id ?? ""));
    }
  }, [data.events, selectedEventId]);

  useEffect(() => {
    if (!data.hooks.find((hook) => hook.id === selectedHookId)) {
      queueMicrotask(() => setSelectedHookId(data.hooks[0]?.id ?? ""));
    }
  }, [data.hooks, selectedHookId]);

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

  const handleResetPreset = () => {
    setData(presetData);
    setWarning(null);
  };

  const handleHardReset = () => {
    clearBrandData();
    setData(presetData);
    setWarning(null);
    setLastSavedAt(null);
  };

  const handleAddManifesto = () => {
    setData((prev) => {
      const next = createManifestoVariant(prev.manifesto.length + 1);
      setSelectedManifestoId(next.id);
      return { ...prev, manifesto: [...prev.manifesto, next] };
    });
  };

  const handleRemoveManifesto = () => {
    if (selectedManifestoId === "tagline") return;
    setData((prev) => {
      const filtered = prev.manifesto.filter(
        (variant) => variant.id !== selectedManifestoId
      );
      const nextId = filtered[0]?.id ?? "tagline";
      setSelectedManifestoId(nextId);
      return { ...prev, manifesto: filtered };
    });
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleImportData = (importedData: BrandOSData) => {
    setData(importedData);
    setWarning(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7b500] via-[#ffd86b] to-[#fff1b8] text-[#111111]">
      <Header
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        onSearchNavigate={handleSearchNavigate}
        onReset={handleResetPreset}
        onHardReset={handleHardReset}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onImportData={handleImportData}
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
            onAddManifesto={handleAddManifesto}
            onRemoveManifesto={handleRemoveManifesto}
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
